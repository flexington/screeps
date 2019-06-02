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
    run() {
    }
    checkUnits(type) {
        // Unit ratio
        // let unitTypes: number = 6;
        // let harvesterRatio: number = 1 / unitTypes;
        // let carrierRatio: number = 1 / unitTypes;
        // let upgraderRatio: number = 1 / unitTypes;
        // let builderRatio: number = 1 / unitTypes * 2;
        // let repairerRatio: number = 1 / unitTypes;
        // let harvesterCurrent = _.countBy(Game.creeps, (c) => c.memory.role == 'harvester');
    }
    spawn() {
        Game.spawns['London'].spawnCreep([MOVE, WORK, WORK], 'H-' + Game.time, {
            memory: { role: 'harvester', isBusy: false }
        });
    }
}
/// <reference path="spawnManager.ts" />
/// <reference path="harvester.ts" />
let unitManager = new SpawnManager();
module.exports.loop = () => {
    // unitManager.spawn();
    // let creeps = Game.creeps;
    // for (let x = 0, creep; creep = creeps[x]; x++) {
    //     Harvester.run(creep);
    // }
    console.log("TICK");
};
//# sourceMappingURL=main.js.map