/// <reference path="builder.ts" />
/// <reference path="carrier.ts" />
/// <reference path="gameManager.ts" />
/// <reference path="harvester.ts" />
/// <reference path="mapManager.ts" />
/// <reference path="repairer.ts" />
/// <reference path="upgrader.ts" />
/// <reference path="spawnManager.ts" />

// GameManager.reset();

module.exports.loop = () => {
    GameManager.update();
    SpawnManager.spawn();
    SpawnManager.cleanup();
    GameManager.finalize();
}