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
            const repTarget = Game.getObjectById(creep.memory.repairTarget);
            if (creep.repair(repTarget) == ERR_NOT_IN_RANGE) {
                //creep.moveTo(creep.memory.repairTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                creep.moveTo(repTarget);
                //creep.say('r ' + repTarget.structureType); // + creep.memory.repairTarget.id);
                //console.log(creep.name + ' r ' + repTarget.structureType);
            }
        } else {
            getSource.run(creep);
            /*
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
            */
        }
    }
}

module.exports = roleRepairer;