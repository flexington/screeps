/// <reference path="spawnManager.ts" />
/// <reference path="harvester.ts" />

let unitManager: SpawnManager = new SpawnManager();

module.exports.loop = () => {
    // unitManager.spawn();

    let creeps = Game.creeps;
    for (let x = 0, creep: Creep; creep = creeps[x]; x++) {
        Harvester.run(creep);
    }
}







