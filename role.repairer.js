//let roleBuilder = require('role.builder');
let getSource = require('misc.sources');
//let roomFuncs = require('misc.roomFuncs');
require('prototype.room')();

let roleRepairer = {
    /** @param {Creep} creep **/
    run: function(creep) {
        creep.say('r');
        if (creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
        } else if (!creep.memory.repairing && creep.carry.energy < creep.carryCapacity) {
            creep.memory.repairing = false;
        } else if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
        }
        /*else if (creep.memory.repairing && Game.getObjectById(creep.memory.repairTarget).hits == Game.getObjectById(creep.memory.repairTarget).hitsMax) {
                   creep.memory.repairTarget = false;
               }*/

        if (creep.memory.repairing) {
            if (!Game.getObjectById(creep.memory.repairTarget) || !creep.memory.repairTarget || Game.getObjectById(creep.memory.repairTarget).hits == Game.getObjectById(creep.memory.repairTarget).hitsMax) {
                creep.memory.repairTarget = creep.room.memory.repairs[creep.room.memory.repairCounter];


                if (creep.room.memory.repairs.length > 0) {
                    if (creep.room.memory.repairCounter + 1 >= creep.room.memory.repairs.length) {
                        //creep.room.memory.repairs = [];
                        creep.room.memory.repairCounter = 0;
                        creep.room.structureType.getRepairs();
                        require('prototype.room')();
                        //console.log('regen room repairs ' + creep.room.memory.repairs.length + ' ' + creep.room.memory.repairCounter);
                        //roomFuncs.run(creep.room.name);
                    } else {
                        creep.room.memory.repairCounter++;
                    }
                }
            }
            const repTarget = Game.getObjectById(creep.memory.repairTarget);
            /*
            if (creep.room.name == 'W2N4') {
                console.log(creep.room.memory.repairCounter + ' ' + creep.memory.repairTarget + ' - ' + repTarget.structureType);
            }
            */
            creep.say('r rep');
            if (creep.repair(repTarget) == ERR_NOT_IN_RANGE) {
                creep.say('r m');
                creep.moveTo(repTarget);
            }
        } else {
            getSource.run(creep);

        }
    }
}

module.exports = roleRepairer;