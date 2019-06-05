/// <reference path="spawnManager.ts" />
/// <reference path="harvester.ts" />
/// <reference path="carrier.ts" />

let unitManager: SpawnManager = new SpawnManager();

module.exports.loop = () => {
    unitManager.spawn();

    let creeps = Game.creeps;
    for (let name in creeps) {
        let creep = creeps[name];
        if (creep.memory.role === 'harvester') { Harvester.run(creep); }
        if (creep.memory.role === 'carrier') { Carrier.run(creep); }
    }
}







