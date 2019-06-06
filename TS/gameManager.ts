class GameManager {
    config: IConfig;
    /**
     *
     */
    constructor() {
        this.config = Memory.Config as IConfig;
        if (this.config === undefined) {
            this.config = { lastTick: Game.time } as IConfig;
        }
    }

    public check() {
    }

    public finalize() {
        Memory.Config = this.config;
    }
}