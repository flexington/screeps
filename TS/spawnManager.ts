class SpawnManager {

    private checkUnits(type: string): boolean {
        // Unit ratio
        let unitTypes: number = 6;
        let harvesterRatio: number = 1 / unitTypes;
        let carrierRatio: number = 1 / unitTypes;
        let upgraderRatio: number = 1 / unitTypes;
        let builderRatio: number = 1 / unitTypes * 2;
        let repairerRatio: number = 1 / unitTypes;

        // Total units
        let totalScreeps: number = _.size(Game.creeps);

        // Current units
        let harvesterCurrent: number = _.filter(Game.creeps, (c) => c.memory.role == 'harvester').length;
        let carrierCurrent: number = _.filter(Game.creeps, (c) => c.memory.role == 'carrier').length;
        let upgraderCurrent: number = _.filter(Game.creeps, (c) => c.memory.role == 'upgrader').length;
        let builderCurrent: number = _.filter(Game.creeps, (c) => c.memory.role == 'builder').length;
        let repairerCurrent: number = _.filter(Game.creeps, (c) => c.memory.role == 'repairer').length;

        if (type === 'harvester') {
            if (harvesterCurrent === 0 || harvesterCurrent / totalScreeps < harvesterRatio) { return true; }
            return false;
        } else if (type === 'carrier') {
            if (carrierCurrent === 0 || carrierCurrent / totalScreeps < carrierRatio) { return true; }
            return false;
        } else if (type === 'upgrader') {
            if (upgraderCurrent === 0 || upgraderCurrent / totalScreeps < upgraderRatio) { return true; }
            return false;
        } else if (type === 'builder') {
            if (builderCurrent === 0 || builderCurrent / totalScreeps < builderRatio) { return true; }
            return false;
        } else if (type === 'repairer') {
            if (repairerCurrent === 0 || repairerCurrent / totalScreeps < repairerRatio) { return true; }
            return false;
        } else {
            return false;
        }
    }

    public spawn() {
        if (this.checkUnits('harvester')) {
            Game.spawns['Spawn1'].spawnCreep([MOVE, WORK, WORK], 'H-' + Game.time, {
                memory: { role: 'harvester', isBusy: false }
            });
        } else if (this.checkUnits('carrier')) {
            Game.spawns['Spawn1'].spawnCreep([MOVE, MOVE, MOVE, CARRY, CARRY, CARRY], 'C-' + Game.time, {
                memory: { role: 'carrier', isBusy: false }
            })
        } else if (this.checkUnits('upgrader')) {
            Game.spawns['Spawn1'].spawnCreep([MOVE, WORK, WORK, CARRY], 'U-' + Game.time, {
                memory: { role: 'upgrader', isBusy: false }
            })
        } else if (this.checkUnits('builder')) {
            Game.spawns['Spawn1'].spawnCreep([MOVE, WORK, WORK, CARRY], 'B-' + Game.time, {
                memory: { role: 'builder', isBusy: false }
            })
        } else if (this.checkUnits('repairer')) {
            Game.spawns['Spawn1'].spawnCreep([MOVE, WORK, WORK, CARRY], 'R-' + Game.time, {
                memory: { role: 'repairer', isBusy: false }
            })
        }

    }
}