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
//# sourceMappingURL=spawnManager.js.map