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
                        name: 'H-' + Date.now(),
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
    }

    public static cleanup() {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
    }

    private static schedule(spawnEntry: ISpawnEntry) {
        console.log('creep scheduled');
    }
}