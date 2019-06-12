class Harvester {
    private static config: IHarvester

    public static run(creep: Creep) {
        // if (!this.config.atSource && creep.pos != Converter.toRoomPosition(this.config.position)) creep.moveTo(Converter.toRoomPosition(this.config.position));
        // else this.config.atSource = true;

        // if (this.config.atSource && creep.harvest(Game.getObjectById(this.config.source.id)) == OK) creep.drop(RESOURCE_ENERGY);
    }

    private static init() {
    }
}