//let roleRepairer = require('role.repairer');
let roleUpgrader = require('role.upgrader');
let getSource = require('misc.sources');

var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('harvest');

        }
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('build');
        }

        let buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);

        if (creep.memory.building) {
            creep.say('b');

            if (creep.build(creep.memory.buildTarget) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.memory.buildTarget);
            }
        } else {
            creep.say('b_h');
            getSource.run(creep);
            /*
            var mySource;
            var sources = creep.room.find(FIND_SOURCES);
            if (!creep.memory.sourceID) {
                var useSource = creep.memory.sources;
                creep.memory.sourceID = sources[useSource].id;
            }
            mySource = Game.getObjectById(creep.memory.sourceID);
            if (creep.harvest(mySource) == ERR_NOT_IN_RANGE) {
                //creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                creep.moveTo(mySource);
            }
            */
        }
    }
};

module.exports = roleBuilder;