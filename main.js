class Harvester {
    static run(creep) {
        let source = creep.pos.findClosestByPath(FIND_SOURCES);
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
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
    }
    spawn() {
        Game.spawns['London'].spawnCreep([MOVE, WORK, WORK], 'H-' + Game.time, {
            memory: { role: 'harvester', isBusy: false }
        });
    }
}
let unitManager = new SpawnManager();
unitManager.spawn();
let creeps = Game.creeps;
for (let x = 0, creep; creep = creeps[x]; x++) {
    Harvester.run(creep);
}
