"use strict";
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
//# sourceMappingURL=spawnManager.js.map