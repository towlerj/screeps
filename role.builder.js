<<<<<<< HEAD
let roleRepairer = require('role.repairer');
=======
var roleUpgrader = require('role.upgrader');
>>>>>>> f11448e9eee1c656b1d234e990c207b19bc4b2c5

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('build');
        }

        if(creep.memory.building) {
<<<<<<< HEAD
            if(creep.build(creep.memory.buildTarget) == ERR_NOT_IN_RANGE) {
                //creep.moveTo(creep.memory.buildTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                creep.moveTo(creep.memory.buildTarget);
            }
        }
        else {
=======
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            roleUpgrader.run(creep);
            /*
>>>>>>> f11448e9eee1c656b1d234e990c207b19bc4b2c5
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                //creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                creep.moveTo(sources[0]);
            }
<<<<<<< HEAD
=======

             */
>>>>>>> f11448e9eee1c656b1d234e990c207b19bc4b2c5
        }
    }
};

module.exports = roleBuilder;