/// <reference path="builder.ts" />
/// <reference path="carrier.ts" />
/// <reference path="harvester.ts" />
/// <reference path="repairer.ts" />
/// <reference path="upgrader.ts" />
/// <reference path="spawnManager.ts" />

let unitManager: SpawnManager = new SpawnManager();

module.exports.loop = () => {
    unitManager.spawn();

    let creeps = Game.creeps;
    for (let name in creeps) {
        let creep = creeps[name];
        if (creep.memory.role === 'builder') { Builder.run(creep); }
        else if (creep.memory.role === 'carrier') { Carrier.run(creep); }
        else if (creep.memory.role === 'harvester') { Harvester.run(creep); }
        else if (creep.memory.role === 'repairer') { Repairer.run(creep); }
        else if (creep.memory.role === 'upgrader') { Upgrader.run(creep); }
    }
}







