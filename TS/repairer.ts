class Repairer {
    public static run(creep: Creep) {
        if (!creep.memory.isBusy) {
            Helper.getEnergy(creep);
        } else if (creep.memory.isBusy) {
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
                } else if (creep.carry.energy == 0) {
                    creep.memory.isBusy = false;
                }
            }
        }

    }
}