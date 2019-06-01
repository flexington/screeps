Creep.prototype.isBusy = function () {
    if (this.carry.energy == this.carryCapacity && this.memory.isBusy == false) {
        this.memory.isBusy = true;
    }
    else if (this.carry.energy == 0 && this.memory.isBusy == true) {
        this.memory.isBusy = false;
    }

    return this.memory.isBusy;
}

Creep.prototype.getEnergy = function () {
    let containers = this.room.find(FIND_STRUCTURES, {
        filter: (f) => { return f.structureType == STRUCTURE_CONTAINER && f.store[RESOURCE_ENERGY] > 0; }
    })
    
    if (containers.length > 0) {
        let container = this.pos.findClosestByPath(containers);
        if (this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.moveTo(container);
        }
    } else {
        let sources = this.room.find(FIND_DROPPED_RESOURCES);
        let source = this.pos.findClosestByPath(sources);
        if (source != undefined) {
            if (this.pickup(source) == ERR_NOT_IN_RANGE) {
                this.moveTo(source);
            }
        }
    }
}

Creep.prototype.setRoad = function(){
    let structures = this.room.lookAt(LOOK_STRUCTURES, this.pos.x, this.pos.y);
    
    console.log(structures);
}