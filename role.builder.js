let roleRepairer = require('role.repairer');

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
        creep.say('b');
        if (creep.memory.building) {
            const buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
            const closestBuildTarget = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            creep.memory.buildTarget = closestBuildTarget;
            if (creep.build(creep.memory.buildTarget) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.memory.buildTarget);
            }
        } else {
            
            var mySource;
            if (!creep.memory.sourceID) {
                var useSource = creep.memory.sources;
                var sources = creep.room.find(FIND_SOURCES);
                creep.memory.sourceID = sources[useSource].id;
            }
            mySource = Game.getObjectById(creep.memory.sourceID);
            if (creep.harvest(mySource) == ERR_NOT_IN_RANGE) {
                //creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                creep.moveTo(mySource);
            }
        }
    }
};

module.exports = roleBuilder;