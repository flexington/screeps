class Carrier {
    static run(creep) {
        if (!creep.memory.isBusy) {
            let sources = creep.room.find(FIND_DROPPED_RESOURCES);
            let source = creep.pos.findClosestByPath(sources);
            if (source != undefined) {
                if (creep.pickup(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
                else if (creep.carry.energy == creep.carryCapacity) {
                    creep.memory.isBusy = true;
                }
            }
        }
        else {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (object) => {
                    if (object.structureType == STRUCTURE_SPAWN || object.structureType == STRUCTURE_EXTENSION) {
                        return object.energy < object.energyCapacity;
                    }
                    else if (object.structureType == STRUCTURE_CONTAINER) {
                        return _.size(object.store) < object.storeCapacity;
                    }
                    else {
                        return false;
                    }
                }
            });
            let target;
            if (targets.length == 1) {
                target = targets[0];
            }
            else {
                target = creep.pos.findClosestByPath(targets);
            }
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
            else if (creep.carry.energy == 0) {
                creep.memory.isBusy = false;
            }
        }
    }
}
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
            if (harvesterCurrent === 0 || harvesterCurrent / totalScreeps < harvesterRatio) {
                return true;
            }
            return false;
        }
        else if (type === 'carrier') {
            if (carrierCurrent === 0 || carrierCurrent / totalScreeps < carrierRatio) {
                return true;
            }
            return false;
        }
        else if (type === 'upgrader') {
            if (upgraderCurrent === 0 || upgraderCurrent / totalScreeps < upgraderRatio) {
                return true;
            }
            return false;
        }
        else if (type === 'builder') {
            if (builderCurrent === 0 || builderCurrent / totalScreeps < builderRatio) {
                return true;
            }
            return false;
        }
        else if (type === 'repairer') {
            if (repairerCurrent === 0 || repairerCurrent / totalScreeps < repairerRatio) {
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
            Game.spawns['Spawn1'].spawnCreep([MOVE, WORK, WORK], 'H-' + Game.time, {
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
    unitManager.spawn();
    let creeps = Game.creeps;
    for (let name in creeps) {
        let creep = creeps[name];
        if (creep.memory.role === 'harvester') {
            Harvester.run(creep);
        }
        if (creep.memory.role === 'carrier') {
            Carrier.run(creep);
        }
    }
};
//# sourceMappingURL=main.js.map