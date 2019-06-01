module.exports = {

    /**
     * @param {Creep} creep The creep
     */
    run: function (creep) {
        if (!creep.isBusy()) {
            creep.getEnergy();
        }

        if(creep.isBusy()){
            let constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(constructionSite != undefined){
                if(creep.build(constructionSite) == ERR_NOT_IN_RANGE){
                    creep.moveTo(constructionSite);
                }
            }
        }
    }
}