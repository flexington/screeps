class GameManager {
    public static config: IConfig;

    /**
     * Update the gameManager.
     */
    public static update() {
        // Load config
        this.config = Memory.Config as IConfig;

        // Create config if not exists
        if (this.config === undefined) this.config = { lastTick: Game.time - 501 } as IConfig;

        // Verify if check can be performed
        if (!this.canCheck()) return;
        this.FindAllSources();
        this.getMaxHarvester();
    }

    /**
     * Finalizes the game manager and save the config to the memeory.
     */
    public static finalize() {
        if (this.canCheck) this.config.lastTick = Game.time;
        Memory.Config = this.config;
    }

    /**
     * Verifies that a check should be performed in this tick.
     */
    private static canCheck() {
        if (this.config.lastTick < Game.time - 60) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Checks all sources in owned rooms
     * @returns An array of IRoomPosition describing the position of the sources
     */
    private static FindAllSources() {
        let result: Array<ISource>;
        for (let name in Game.rooms) {
            let room: Room = Game.rooms[name];
            let sources = room.find(FIND_SOURCES);
            for (let i = 0, source: Source; source = sources[0]; i++) {
                let entry = {
                    creeps: {} as ICreep,
                    position: {
                        id: source.id,
                        room: source.pos.roomName,
                        x: source.pos.x,
                        y: source.pos.y
                    } as IRoomPosition
                } as ISource;
                result.push(entry);
            }
        }
        this.config.sources = result;
    }

    private static getMaxHarvester() {
        let sources: Array<ISource> = this.config.sources;
        for (let i = 0; i < sources.length; i++) {
            sources[i].maxCreeps = MapManager.getWalkableFields(sources[i].position).length
        }
    }
}