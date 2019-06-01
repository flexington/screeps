// Prototypes
require('prototype.creep');

// Manager
var unitManager = require('manager.unitManager');

var harvester = require('role.harvester');
var carrier = require('role.carrier');
var upgrader = require('role.upgrader');
var builder = require('role.builder');
var repairer = require('role.repairer');

module.exports.loop = function () {
    unitManager.run();

    let creeps = Game.creeps;
    for(let name in creeps){
        if(creeps[name].memory.role == 'harvester'){
            harvester.run(creeps[name]);
        } 
        else if(creeps[name].memory.role =='carrier'){
            carrier.run(creeps[name]);
        }
        else if(creeps[name].memory.role =='upgrader'){
            upgrader.run(creeps[name]);
        }
        else if(creeps[name].memory.role =='builder'){
            builder.run(creeps[name]);
        }
        else if(creeps[name].memory.role =='repairer'){
            repairer.run(creeps[name]);
        }
    }
};