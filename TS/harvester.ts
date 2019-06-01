class Harvester {
    public static run(creep: Creep) {
        let source = creep.pos.findClosestByPath(FIND_SOURCES);
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        } else {
            creep.drop(RESOURCE_ENERGY);
        }
    }
}