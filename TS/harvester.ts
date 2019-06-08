class Harvester {
    private static config: IHarvester

    public static run(creep: Creep) {
        // Init creep
        this.config = creep.memory.config;
        if (this.config === undefined) { this.init(); }

        if (!this.config.atSource && creep.pos != Converter.toRoomPosition(this.config.position)) creep.moveTo(Converter.toRoomPosition(this.config.position));
        else this.config.atSource = true;

        if (this.config.atSource && creep.harvest(Game.getObjectById(this.config.source.id)) == OK) creep.drop(RESOURCE_ENERGY);
    }

    private static init() {
        let sources = GameManager.config.sources;
        for (let i = 0, source: ISource; source = sources[i]; i++) {
            
        }
    }
}