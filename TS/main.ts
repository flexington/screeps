/// <reference path="builder.ts" />
/// <reference path="carrier.ts" />
/// <reference path="harvester.ts" />
/// <reference path="mapManager.ts" />
/// <reference path="repairer.ts" />
/// <reference path="upgrader.ts" />
/// <reference path="spawnManager.ts" />

let mapManager: MapManager = new MapManager();
let unitManager: SpawnManager = new SpawnManager();
// let roomConfig: RoomConfig;

module.exports.loop = () => {
    let gameManager: GameManager = new GameManager();
    console.log(gameManager.config.lastTick);
    mapManager.checkRooms();
    unitManager.cleanup();
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