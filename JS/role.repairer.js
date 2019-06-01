module.exports = {

    /**
     * @param {Creep} creep The creep
     */
    run: function (creep) {
        if (!creep.isBusy()) {
            creep.getEnergy();
        } else if (creep.isBusy()) {
             let structures = creep.room.find(FIND_STRUCTURES, {
                 filter: (f) => {
                     return f.structureType != STRUCTURE_CONTROLLER && f.structureType != STRUCTURE_WALL && f.hits < f.hitsMax;// && f.structureType != STRUCTURE_CONTROLLER;
                 }
            });
            if (structures.length > 0) {
                if (structures.length > 1) {
                    structures = _.sortBy(structures, [function (s) { return s.hitsMax - s.hits; }])
                }
                if (creep.repair(structures[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structures[0]);
                }
            }
        }
    }
};