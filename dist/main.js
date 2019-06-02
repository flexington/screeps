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
class SpawnManager {
    checkUnits(type) {
    }
    spawn() {
        Game.spawns['London'].spawnCreep([MOVE, WORK, WORK], 'H-' + Game.time, {
            memory: { role: 'harvester', isBusy: false }
        });
    }
}
let unitManager = new SpawnManager();
module.exports.loop = () => {
    let creeps = Game.creeps;
    for (let x = 0, creep; creep = creeps[x]; x++) {
        Harvester.run(creep);
    }
};
//# sourceMappingURL=main.js.map