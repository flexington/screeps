class Harvester {
    static run(creep) {
        const target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
        else {
            creep.drop(RESOURCE_ENERGY);
        }
    }
}
class SpawnManager {
    checkUnits(type) {
        let unitTypes = 6;
        let harvesterRatio = 1 / unitTypes;
        let carrierRatio = 1 / unitTypes;
        let upgraderRatio = 1 / unitTypes;
        let builderRatio = 1 / unitTypes * 2;
        let repairerRatio = 1 / unitTypes;
        let totalScreeps = _.size(Game.creeps);
        let harvesterCurrent = _.filter(Game.creeps, (c) => c.memory.role == 'harvester').length;
        let carrierCurrent = _.filter(Game.creeps, (c) => c.memory.role == 'carrier').length;
        let upgraderCurrent = _.filter(Game.creeps, (c) => c.memory.role == 'upgrader').length;
        let builderCurrent = _.filter(Game.creeps, (c) => c.memory.role == 'builder').length;
        let repairerCurrent = _.filter(Game.creeps, (c) => c.memory.role == 'repairer').length;
        if (type === 'harvester') {
            if (harvesterCurrent / totalScreeps < harvesterRatio) {
                return true;
            }
            return false;
        }
        else if (type === 'carrier') {
            if (carrierCurrent / totalScreeps < carrierRatio) {
                return true;
            }
            return false;
        }
        else if (type === 'upgrader') {
            if (upgraderCurrent / totalScreeps < upgraderRatio) {
                return true;
            }
            return false;
        }
        else if (type === 'builder') {
            if (builderCurrent / totalScreeps < builderRatio) {
                return true;
            }
            return false;
        }
        else if (type === 'repairer') {
            if (repairerCurrent / totalScreeps < repairerRatio) {
                return true;
            }
            return false;
        }
        else {
            return false;
        }
    }
    spawn() {
        if (this.checkUnits('harvester')) {
            Game.spawns['London'].spawnCreep([MOVE, WORK, WORK], 'H-' + Game.time, {
                memory: { role: 'harvester', isBusy: false }
            });
        }
        else if (this.checkUnits('carrier')) {
            Game.spawns['Spawn1'].spawnCreep([MOVE, MOVE, MOVE, CARRY, CARRY, CARRY], 'C-' + Game.time, {
                memory: { role: 'carrier', isBusy: false }
            });
        }
        else if (this.checkUnits('upgrader')) {
            Game.spawns['Spawn1'].spawnCreep([MOVE, WORK, WORK, CARRY], 'U-' + Game.time, {
                memory: { role: 'upgrader', isBusy: false }
            });
        }
        else if (this.checkUnits('builder')) {
            Game.spawns['Spawn1'].spawnCreep([MOVE, WORK, WORK, CARRY], 'B-' + Game.time, {
                memory: { role: 'builder', isBusy: false }
            });
        }
        else if (this.checkUnits('repairer')) {
            Game.spawns['Spawn1'].spawnCreep([MOVE, WORK, WORK, CARRY], 'R-' + Game.time, {
                memory: { role: 'repairer', isBusy: false }
            });
        }
    }
}
let unitManager = new SpawnManager();
module.exports.loop = () => {
    let creeps = Game.creeps;
    for (let x = 0, creep; creep = creeps[x]; x++) {
        Harvester.run(creep);
    }
};
//# sourceMappingURL=main.js.map