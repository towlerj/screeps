//let roleBuilder = require('role.builder');
let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');

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
                //creep.moveTo(creep.memory.repairTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                creep.moveTo(creep.memory.repairTarget);
                creep.say('r');
            }
        } else {
            var sources = creep.room.find(FIND_SOURCES);
            var useSource = creep.memory.sources;

            if (creep.harvest(sources[useSource]) == ERR_NOT_IN_RANGE) {
                //creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            } else {

                if (creep.memory.role == 'builder') {
                    //console.log('Builder Repairer is an upgrader');
                    roleUpgrader.run(creep);
                } else {
                    //console.log('Repairer is a harvester');
                    roleHarvester.run(creep);
                }
            }
        }
    }
}

module.exports = roleRepairer;