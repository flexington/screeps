module.exports = {
    run: function () {
        // Delete died creeps from memory
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }

        // Total amount of units
        let totalHarvster = 2;
        let totalCarrier = 2;
        let totalUpgrader = 2;
        let totalBuilder = 4;
        let totalRepairer = 2;

        // Current amount of units
        let currentHarvester = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
        let currentCarrier = _.sum(Game.creeps, (c) => c.memory.role == 'carrier');
        let currentUpgrader = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
        let currentBuilder = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
        let currentRepairer = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');

        // Determine which unit to spawn as next
        if (Memory.spawnNext == undefined) {
            // Harvester
            if (currentHarvester < totalHarvster && Memory.spawnLast != 'harvester') {
                Memory.spawnNext = 'harvester';
            }
            // Carrier
            else if (currentCarrier < totalCarrier && Memory.spawnLast != 'carrier') {
                Memory.spawnNext = 'carrier';
            }
            // Upgrader
            else if (currentUpgrader < totalUpgrader && Memory.spawnLast != 'upgrader') {
                Memory.spawnNext = 'upgrader';
            }
            // Builder
            else if (currentBuilder < totalBuilder && Memory.spawnLast != 'builder') {
                Memory.spawnNext = 'builder';
            } 
            // Repairer
            else if (currentRepairer < totalRepairer && Memory.spawnLast != 'repairer') {
                Memory.spawnNext = 'repairer';
            }
            else {
                Memory.spawnLast = undefined;
            }
        }

        // Spawn units
        if (Memory.spawnNext == 'harvester') {
            if (Game.spawns['Spawn1'].spawnCreep([MOVE, WORK, WORK], 'H-' + Game.time, {
                memory: { role: 'harvester', isBusy: false }
            }) == OK) {
                Memory.spawnLast = Memory.spawnNext;
                Memory.spawnNext = undefined;
            }

        } else if (Memory.spawnNext == 'carrier') {
            if (Game.spawns['Spawn1'].spawnCreep([MOVE, MOVE, MOVE, CARRY, CARRY, CARRY], 'C-' + Game.time, {
                memory: { role: 'carrier', isBusy: false }
            }) == OK) {
                Memory.spawnLast = Memory.spawnNext;
                Memory.spawnNext = undefined;
            }
        } else if (Memory.spawnNext == 'upgrader') {
            if (Game.spawns['Spawn1'].spawnCreep([MOVE, WORK, WORK, CARRY], 'U-' + Game.time, {
                memory: { role: 'upgrader', isBusy: false }
            }) == OK) {
                Memory.spawnLast = Memory.spawnNext;
                Memory.spawnNext = undefined;
            }
        } else if (Memory.spawnNext == 'builder') {
            if (Game.spawns['Spawn1'].spawnCreep([MOVE, WORK, WORK, CARRY], 'B-' + Game.time, {
                memory: { role: 'builder', isBusy: false }
            }) == OK) {
                Memory.spawnLast = Memory.spawnNext;
                Memory.spawnNext = undefined;
            }
        }
        else if (Memory.spawnNext == 'repairer') {
            if (Game.spawns['Spawn1'].spawnCreep([MOVE, WORK, WORK, CARRY], 'R-' + Game.time, {
                memory: { role: 'repairer', isBusy: false }
            }) == OK) {
                Memory.spawnLast = Memory.spawnNext;
                Memory.spawnNext = undefined;
            }
        }
    }
};