class SpawnManager {
    /**
     * Check if a new harvester need to be spwaned
     */
    private static spawnHarvester() {
        if (!GameManager.canCheck('low')) return;

        // Process all know sources
        let sources: Array<ISource> = GameManager.config.sources;
        for (let i = 0, source: ISource; source = sources[i]; i++) {
            // Process all places at this source
            for (let y = 0, place: IAssignablePosition; place = source.places[y]; y++) {
                // If position does not have a creep, schedule creep
                if (place.creepID === undefined || !Game.creeps[place.creepID]) {
                    let entry = {
                        name: 'H-' + new Date().getTime() + '-' + Math.floor(Math.random() * 100000),
                        body: [MOVE, WORK, WORK],
                        role: 'harvester',
                        target: {
                            x: place.x,
                            y: place.y,
                            room: place.room
                        } as IPosition
                    } as ISpawnEntry;
                    this.schedule(entry);
                }
            }
        }

    }

    private static checkUnits(type: string): boolean {

        // Unit ratio
        let unitTypes: number = 6;
        let harvesterRatio: number = 1 / unitTypes;
        let carrierRatio: number = 1 / unitTypes;
        let upgraderRatio: number = 1 / unitTypes;
        let builderRatio: number = 1 / unitTypes * 2;
        let repairerRatio: number = 1 / unitTypes;

        // Total units
        let totalScreeps: number = _.size(Game.creeps);

        // Current units
        let harvesterCurrent: number = _.filter(Game.creeps, (c) => c.memory.role == 'harvester').length;
        let carrierCurrent: number = _.filter(Game.creeps, (c) => c.memory.role == 'carrier').length;
        let upgraderCurrent: number = _.filter(Game.creeps, (c) => c.memory.role == 'upgrader').length;
        let builderCurrent: number = _.filter(Game.creeps, (c) => c.memory.role == 'builder').length;
        let repairerCurrent: number = _.filter(Game.creeps, (c) => c.memory.role == 'repairer').length;

        if (type === 'harvester') {
            if (harvesterCurrent === 0 || harvesterCurrent / totalScreeps < harvesterRatio) { return true; }
            return false;
        } else if (type === 'carrier') {
            if (carrierCurrent === 0 || carrierCurrent / totalScreeps < carrierRatio) { return true; }
            return false;
        } else if (type === 'upgrader') {
            if (upgraderCurrent === 0 || upgraderCurrent / totalScreeps < upgraderRatio) { return true; }
            return false;
        } else if (type === 'builder') {
            if (builderCurrent === 0 || builderCurrent / totalScreeps < builderRatio) { return true; }
            return false;
        } else if (type === 'repairer') {
            if (repairerCurrent === 0 || repairerCurrent / totalScreeps < repairerRatio) { return true; }
            return false;
        } else {
            return false;
        }
    }

    public static spawn() {
        this.spawnHarvester();
        //  if (this.checkUnits('carrier')) {
        //     Game.spawns['Spawn1'].spawnCreep([MOVE, MOVE, MOVE, CARRY, CARRY, CARRY], 'C-' + Game.time, {
        //         memory: { role: 'carrier', isBusy: false } as CreepMemory
        //     })
        // } else if (this.checkUnits('upgrader')) {
        //     Game.spawns['Spawn1'].spawnCreep([MOVE, WORK, WORK, CARRY], 'U-' + Game.time, {
        //         memory: { role: 'upgrader', isBusy: false } as CreepMemory
        //     })
        // } else if (this.checkUnits('builder')) {
        //     Game.spawns['Spawn1'].spawnCreep([MOVE, WORK, WORK, CARRY], 'B-' + Game.time, {
        //         memory: { role: 'builder', isBusy: false } as CreepMemory
        //     })
        // } else if (this.checkUnits('repairer')) {
        //     Game.spawns['Spawn1'].spawnCreep([MOVE, WORK, WORK, CARRY], 'R-' + Game.time, {
        //         memory: { role: 'repairer', isBusy: false } as CreepMemory
        //     })
        // }
        this.executeSpawning();
    }

    public static cleanup() {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
    }

    private static schedule(spawnEntry: ISpawnEntry) {
        // Load or initialize spawnEntries
        let entries: Array<ISpawnEntry> = GameManager.config.spawnEntries;
        if (entries === undefined) entries = [];

        // Add new entry
        entries.push(spawnEntry);

        // Save list
        GameManager.config.spawnEntries = entries;
    }

    private static executeSpawning() {
        // Load spawnEntries, exit if no entries
        let entries: Array<ISpawnEntry> = GameManager.config.spawnEntries;
        if (entries === undefined || entries.length === 0) return

        // Get next creep-type to spawn
        let type: string = this.getNextType();
        if (type === undefined) throw new Error('No type to spawn found.');

        // Get creep to spawn
        let spawnEntry: ISpawnEntry = _.filter(entries, f => f.role === type)[0];
        Game.spawns['Spawn1'].spawnCreep(spawnEntry.body, spawnEntry.name, {
            role: spawnEntry.role,
            target: Converter.toRoomPosition(spawnEntry.target),
            isBusy: spawnEntry.isBusy
        } as SpawnOptions)
    }

    private static getNextType() {
        // Order in which screeps should be spawned
        let types: Array<string> = [
            'harvester',
            'carrier',
            'upgrader',
            'builder',
            'repairer'
        ];

        // Load spawnEntries
        let entries: Array<ISpawnEntry> = GameManager.config.spawnEntries;

        // Load type to spawn, if first spawn start with harvester
        let type = GameManager.config.nexToSpawn;
        if (type === undefined) type = 'harvester';

        // Reorder array
        for (let i = 0; i < types.length; i++) {
            if (types[i] === type) break;
            types.push(types.splice(i, 1)[0]);
            i--;
        }

        for (let i = 0; i < types.length; i++) {
            let result: Array<ISpawnEntry> = _.filter(entries, f => f.role === types[i]);
            if (result !== undefined && result.length > 0) {
                GameManager.config.nexToSpawn = types[i++];
                return types[i];
            }
        }

        return undefined;
    }
}