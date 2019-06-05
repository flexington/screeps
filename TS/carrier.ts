class Carrier {
    public static run(creep: Creep) {
        if (!creep.memory.isBusy) {
            let sources = creep.room.find(FIND_DROPPED_RESOURCES);
            let source = creep.pos.findClosestByPath(sources);
            if (source != undefined) {
                if (creep.pickup(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        } else {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (object) => {
                    if (object.structureType == STRUCTURE_SPAWN || object.structureType == STRUCTURE_EXTENSION) {
                        return object.energy < object.energyCapacity;
                    } else if (object.structureType == STRUCTURE_CONTAINER) {
                        return _.size(object.store) < object.storeCapacity;
                    } else {
                        return false;
                    }
                }
            });

            let target;
            if (targets.length == 1) {
                target = targets[0];
            } else {
                target = creep.pos.findClosestByPath(targets);
            }

            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
}