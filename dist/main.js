/// <reference path="spawnManager.ts" />
/// <reference path="harvester.ts" />
let unitManager = new SpawnManager();
export const loop = () => {
    unitManager.spawn();
    let creeps = Game.creeps;
    for (let x = 0, creep; creep = creeps[x]; x++) {
        Harvester.run(creep);
    }
};
//# sourceMappingURL=main.js.map