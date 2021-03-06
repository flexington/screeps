class GameManager {
    public static config: IConfig;

    /**
     * Update the gameManager.
     */
    public static update() {
        // Load config
        this.config = Memory.Config as IConfig;

        // Create config if not exists
        if (this.config === undefined) this.reset();

        // Verify if check can be performed
        if (this.canCheck('low')) {
            this.FindAllSources();
        }
    }

    /**
     * Finalizes the game manager and save the config to the memeory.
     */
    public static finalize() {
        if (this.canCheck('low')) this.config.lowTick = Game.time;
        if (this.canCheck('medium')) this.config.mediumTick = Game.time;
        if (this.canCheck('high')) this.config.highTick = Game.time;
        Memory.Config = this.config;
    }

    public static reset() {
        Memory.Config = {
            highPrio: 60,
            highTick: 0,
            mediumPrio: 120,
            mediumTick: 0,
            lowPrio: 240,
            lowTick: 0
        } as IConfig;
    }

    /**
     * Verifies that a check should be performed in this tick.
     */
    public static canCheck(prio: string) {
        if (prio.toLowerCase() === 'high' && this.config.highTick < Game.time - this.config.highPrio) return true;
        else if (prio.toLowerCase() === 'medium' && this.config.mediumTick < Game.time - this.config.mediumPrio) return true;
        else if (prio.toLowerCase() === 'low' && this.config.lowTick < Game.time - this.config.lowPrio) return true;
        else return false;

    }

    /**
     * Checks all sources in owned rooms
     * @returns An array of IRoomPosition describing the position of the sources
     */
    private static FindAllSources() {
        let result: Array<ISource> = [];
        for (let name in Game.rooms) {
            let room: Room = Game.rooms[name];
            let sources = room.find(FIND_SOURCES);
            for (let i = 0, source: Source; source = sources[i]; i++) {
                let entry = {
                    position: {
                        id: source.id,
                        room: source.pos.roomName,
                        x: source.pos.x,
                        y: source.pos.y
                    } as IPosition,
                    places: MapManager.getWalkableFields({
                        room: source.pos.roomName,
                        x: source.pos.x,
                        y: source.pos.y
                    } as IPosition) as Array<IAssignablePosition>
                } as ISource;
                result.push(entry);
            }
        }
        this.config.sources = result;
    }
}