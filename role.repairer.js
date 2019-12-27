//let roleBuilder = require('role.builder');


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
                creep.say('r '); // + creep.memory.repairTarget.id);
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
}

module.exports = roleRepairer;