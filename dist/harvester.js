class Harvester {
    static run(creep) {
        const target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
        if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
        else {
            creep.drop(RESOURCE_ENERGY);
        }
    }
}
//# sourceMappingURL=harvester.js.map