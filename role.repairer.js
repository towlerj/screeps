//let roleBuilder = require('role.builder');
let getSource = require('misc.sources');


let roleRepairer = {
    /** @param {Creep} creep **/
    run: function(creep) {
        creep.say('rep')
        if (creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;

        } else if (!creep.memory.repairing && creep.carry.energy < creep.carryCapacity) {
            creep.memory.repairing = false;

        } else if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
        }

        if (creep.memory.repairing) {
            if (creep.repair(creep.memory.repairTarget) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.memory.repairTarget);
                creep.say('r '); // + creep.memory.repairTarget.id);
            }
        } else {
            getSource.run(creep);
        }
    }
}

module.exports = roleRepairer;