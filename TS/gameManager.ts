class GameManager {
    config: IConfig;

    /**
     * Update the gameManager.
     */
    public update() {
        // Load config
        this.config = Memory.Config as IConfig;

        // Create config if not exists
        if (this.config === undefined) this.config = { lastTick: Game.time - 501 } as IConfig;

        // Verify if check can be performed
        if (!this.canCheck()) return;
        this.checkSources();
    }

    /**
     * Finalizes the game manager and save the config to the memeory.
     */
    public finalize() {
        if (this.canCheck) this.config.lastTick = Game.time;
        Memory.Config = this.config;
    }

    /**
     * Verifies that a check should be performed in this tick.
     */
    private canCheck() {
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
    private checkSources() {
        let coordinates: Array<IRoomPosition>;
        for (let name in Game.rooms) {
            let room: Room = Game.rooms[name];
            let sources = room.find(FIND_SOURCES);
            for (let i = 0, source: Source; source = sources[0]; i++) {
                let position = {
                    room: source.pos.roomName,
                    x: source.pos.x,
                    y: source.pos.y
                } as IRoomPosition;
                coordinates.push(position);
            }
        }
        this.config.sources = coordinates;
    }
}