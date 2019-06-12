class SpawnManager {
    /**
     * Check if a new harvester need to be spwaned
     */
    private static spawnHarvester() {
        if (!GameManager.canCheck('medium')) return;

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
                    if (this.schedule(entry) === OK) source.places[y].creepID = entry.name;
                }
            }
            sources[i] = source;
        }
        GameManager.config.sources = sources;
    }

    public static spawn() {
        this.spawnHarvester();
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

        return OK;
    }

    private static executeSpawning() {
        // Load spawnEntries, exit if no entries
        let entries: Array<ISpawnEntry> = GameManager.config.spawnEntries;
        if (entries === undefined || entries.length === 0) return

        // Get next creep-type to spawn
        let type: string = this.getNextType();

        // Get creep to spawn
        let spawnEntry: ISpawnEntry = _.filter(entries, f => f.role === type)[0];

        let result = Game.spawns['Spawn1'].spawnCreep(spawnEntry.body, spawnEntry.name, {
            role: spawnEntry.role,
            target: Converter.toRoomPosition(spawnEntry.target),
            isBusy: spawnEntry.isBusy
        } as SpawnOptions)

        if (result === OK) {
            entries.splice(entries.indexOf(spawnEntry), 1);
            GameManager.config.spawnEntries = entries;
        }
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

        // Load last spawned type, if first spawn start with harvester
        let type = GameManager.config.lastSpawned;
        if (type === undefined) {
            GameManager.config.lastSpawned = 'harvester';
            return GameManager.config.lastSpawned;
        }

        let entries = GameManager.config.spawnEntries;;
        for (let i = types.indexOf(type); i < types.length; i++) {
            let result: Array<ISpawnEntry> = _.filter(entries, f => f.role === types[i]);
            if (result !== undefined && result.length > 0) {
                GameManager.config.lastSpawned = types[i];
                return types[i];
            }
        }

        return undefined;
    }
}