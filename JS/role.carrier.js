module.exports = {

    /**
     * @param {Creep} creep The creep
     */
    run: function (creep) {
        if (!creep.isBusy()) {
            let sources = creep.room.find(FIND_DROPPED_RESOURCES);
            let source = creep.pos.findClosestByPath(sources);
            if (source != undefined) {
                if (creep.pickup(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }

        if (creep.isBusy()) {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter:
                    (object) => {
                        if (object.structureType == STRUCTURE_SPAWN || object.structureType == STRUCTURE_EXTENSION) {
                            return object.energy < object.energyCapacity;
                        }
                        else if (object.structureType == STRUCTURE_CONTAINER) {
                            return _.sum(object.store) < object.storeCapacity;
                        } else{
                            return false;
                        }
                    }
            });
            
            if (targets.length == 1) {
                var target = targets[0];
            } else {
                var target = creep.pos.findClosestByPath(targets)
            }
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }

        // if (creep.memory.busy == true) {
        //     let structures = creep.room.find(FIND_STRUCTURES);
        //     console.log(structures.length);

        //     // let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        //     //     filter: {
        //     //         constructionType == (STRUCTURE_EXTENSION||Structure_)
        //     //     }
        //     // })
        // }
    }
};