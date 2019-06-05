class Builder {
    public static run(creep: Creep) {
        if (!creep.memory.isBusy) {
            Helper.getEnergy(creep);
        }

        if (creep.memory.isBusy) {
            let constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (constructionSite != undefined) {
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSite);
                }
            }else if (creep.carry.energy == 0) {
                creep.memory.isBusy = false;
            }
        }
    }
}