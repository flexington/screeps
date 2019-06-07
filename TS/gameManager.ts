class GameManager {
    config: IConfig;
    /**
     *
     */
    constructor() {
        this.config = Memory.Config as IConfig;
        if (this.config === undefined) {
            this.config.lastTick = Game.time;
        }
    }

    public check() {
    }
}