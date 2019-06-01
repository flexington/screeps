require('prototype.creep');

module.exports = {

    /**
     * @param {Creep} creep The creep
     */
    run: function (creep) {
        if (creep.isBusy()) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }

        if (!creep.isBusy()) {
            creep.getEnergy();
            creep.setRoad();
            // let containers = creep.room.find(FIND_MY_STRUCTURES, {
            //     filter: (f) => { return f.structureType == STRUCTURE_CONTAINER }
            // })
            // if (containers.length > 0) {
            //     let container = creep.pos.findClosestByPath(containers);
            //     if (creep.withdraw(container) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(container);
            //     }
            // } else {
            //     let sources = creep.room.find(FIND_DROPPED_RESOURCES);
            //     let source = creep.pos.findClosestByPath(sources);
            //     if (source != undefined) {
            //         if (creep.pickup(source) == ERR_NOT_IN_RANGE) {
            //             creep.moveTo(source);
            //         }
            //     }
            // }
        }
    }
}