class Helper {
    public static getEnergy(creep: Creep) {
        let containers = creep.room.find(FIND_STRUCTURES, {
            filter: (f) => {
                return f.structureType == STRUCTURE_CONTAINER && f.store[RESOURCE_ENERGY] > 0;
            }
        });

        if (containers.length > 0) {
            let conatiner = creep.pos.findClosestByPath(containers);
            if (creep.withdraw(conatiner, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(conatiner);
            }
        } else {
            let sources = creep.room.find(FIND_DROPPED_RESOURCES);
            let source = creep.pos.findClosestByPath(sources);
            if (source != undefined) {
                if (creep.pickup(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
    }
}