class Builder {
    static run(creep) {
        if (!creep.memory.isBusy) {
            Helper.getEnergy(creep);
        }
        if (creep.memory.isBusy) {
            let constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (constructionSite != undefined) {
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSite);
                }
            }
            else if (creep.carry.energy == 0) {
                creep.memory.isBusy = false;
            }
        }
    }
}
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
class GameManager {
    static update() {
        this.config = Memory.Config;
        if (this.config === undefined)
            this.reset();
        if (this.canCheck('low')) {
            this.FindAllSources();
        }
    }
    static finalize() {
        if (this.canCheck('low'))
            this.config.lowTick = Game.time;
        if (this.canCheck('medium'))
            this.config.mediumTick = Game.time;
        if (this.canCheck('high'))
            this.config.highTick = Game.time;
        Memory.Config = this.config;
    }
    static reset() {
        Memory.Config = {
            highPrio: 60,
            highTick: 0,
            mediumPrio: 120,
            mediumTick: 0,
            lowPrio: 240,
            lowTick: 0
        };
    }
    static canCheck(prio) {
        if (prio.toLowerCase() === 'high' && this.config.highTick < Game.time - this.config.highPrio)
            return true;
        else if (prio.toLowerCase() === 'medium' && this.config.mediumTick < Game.time - this.config.mediumPrio)
            return true;
        else if (prio.toLowerCase() === 'low' && this.config.lowTick < Game.time - this.config.lowPrio)
            return true;
        else
            return false;
    }
    static FindAllSources() {
        let result = [];
        for (let name in Game.rooms) {
            let room = Game.rooms[name];
            let sources = room.find(FIND_SOURCES);
            for (let i = 0, source; source = sources[i]; i++) {
                let entry = {
                    position: {
                        id: source.id,
                        room: source.pos.roomName,
                        x: source.pos.x,
                        y: source.pos.y
                    },
                    places: MapManager.getWalkableFields({
                        room: source.pos.roomName,
                        x: source.pos.x,
                        y: source.pos.y
                    })
                };
                result.push(entry);
            }
        }
        this.config.sources = result;
    }
}
class Harvester {
    static run(creep) {
    }
    static init() {
    }
}
class MapManager {
    checkRooms() {
        if (this._lastTick === undefined || Game.time > this._lastTick + 500) {
        }
        return this.roomConfig;
    }
    static getWalkableFields(position) {
        let terrain = new Room.Terrain(position.room);
        let fields = [];
        for (let x = position.x - 1; x <= position.x + 1; x++) {
            for (let y = position.y - 1; y <= position.y + 1; y++) {
                if (x === position.x && y === position.y)
                    continue;
                if (terrain.get(x, y) !== 1) {
                    fields.push({ x: x, y: y, room: position.room });
                }
            }
        }
        return fields;
    }
}
class Repairer {
    static run(creep) {
        if (!creep.memory.isBusy) {
            Helper.getEnergy(creep);
        }
        else if (creep.memory.isBusy) {
            let structures = creep.room.find(FIND_STRUCTURES, {
                filter: (f) => {
                    return f.structureType != STRUCTURE_CONTROLLER &&
                        f.structureType != STRUCTURE_WALL && f.hits < f.hitsMax;
                }
            });
            if (structures.length > 0) {
                if (structures.length > 1) {
                    structures = _.sortBy(structures, [function (s) { return s.hitsMax - s.hits; }]);
                }
                if (creep.repair(structures[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structures[0]);
                }
                else if (creep.carry.energy == 0) {
                    creep.memory.isBusy = false;
                }
            }
        }
    }
}
class Upgrader {
    static run(creep) {
        if (creep.memory.isBusy) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
            else if (creep.carry.energy == 0) {
                creep.memory.isBusy = false;
            }
        }
        else if (!creep.memory.isBusy) {
            Helper.getEnergy(creep);
        }
    }
}
class SpawnManager {
    static spawnHarvester() {
        if (!GameManager.canCheck('medium'))
            return;
        let sources = GameManager.config.sources;
        for (let i = 0, source; source = sources[i]; i++) {
            for (let y = 0, place; place = source.places[y]; y++) {
                if (place.creepID === undefined || place.creepID === '') {
                    let entry = {
                        name: 'H-' + new Date().getTime() + '-' + Math.floor(Math.random() * 100000),
                        body: [MOVE, WORK, WORK],
                        role: 'harvester',
                        target: {
                            x: place.x,
                            y: place.y,
                            room: place.room
                        }
                    };
                    if (this.schedule(entry) === OK)
                        source.places[y].creepID = entry.name;
                }
            }
            sources[i] = source;
        }
        GameManager.config.sources = sources;
    }
    static spawn() {
        this.spawnHarvester();
        this.executeSpawning();
    }
    static cleanup() {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
    }
    static schedule(spawnEntry) {
        let entries = GameManager.config.spawnEntries;
        if (entries === undefined)
            entries = [];
        entries.push(spawnEntry);
        GameManager.config.spawnEntries = entries;
        return OK;
    }
    static executeSpawning() {
        let entries = GameManager.config.spawnEntries;
        if (entries === undefined || entries.length === 0)
            return;
        let type = this.getNextType();
        let spawnEntry = _.filter(entries, f => f.role === type)[0];
        let result = Game.spawns['Spawn1'].spawnCreep(spawnEntry.body, spawnEntry.name, {
            memory: {
                role: spawnEntry.role,
                target: spawnEntry.target,
                isBusy: spawnEntry.isBusy
            }
        });
        if (result === OK) {
            entries.splice(entries.indexOf(spawnEntry), 1);
            GameManager.config.spawnEntries = entries;
        }
    }
    static getNextType() {
        let types = [
            'harvester',
            'carrier',
            'upgrader',
            'builder',
            'repairer'
        ];
        let type = GameManager.config.lastSpawned;
        if (type === undefined) {
            GameManager.config.lastSpawned = 'harvester';
            return GameManager.config.lastSpawned;
        }
        let entries = GameManager.config.spawnEntries;
        ;
        for (let i = types.indexOf(type); i < types.length; i++) {
            let result = _.filter(entries, f => f.role === types[i]);
            if (result !== undefined && result.length > 0) {
                GameManager.config.lastSpawned = types[i];
                return types[i];
            }
        }
        return undefined;
    }
}
module.exports.loop = () => {
    GameManager.update();
    SpawnManager.spawn();
    SpawnManager.cleanup();
    GameManager.finalize();
};
class Converter {
    static toRoomPosition(position) {
        return new RoomPosition(position.x, position.y, position.room);
    }
}
class Helper {
    static getEnergy(creep) {
        let containers = creep.room.find(FIND_STRUCTURES, {
            filter: (f) => {
                return f.structureType == STRUCTURE_CONTAINER && f.store[RESOURCE_ENERGY] > 0;
            }
        });
        if (containers.length > 0) {
            let conatiner = creep.pos.findClosestByPath(containers);
            if (creep.withdraw(conatiner, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(conatiner);
            }
            else if (creep.carry.energy == creep.carryCapacity) {
                creep.memory.isBusy = true;
            }
        }
        else {
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
    }
    static getSoutce(id) {
    }
}
//# sourceMappingURL=main.js.map