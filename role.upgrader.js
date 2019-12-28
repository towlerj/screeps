let getSource = require('misc.sources');

let roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.say('u');
        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('harvest');
        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('upgrade');
        }



        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        } else {
            getSource.run(creep);
            /*
            let mySource = getSource.run(creep);
            if (!mySource) {
                let mySource = Game.getObjectById(creep.memory.sourceID);
                if (creep.harvest(mySource) == ERR_NOT_IN_RANGE) {
                    //creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    creep.moveTo(mySource);
                }
            } else {

                creep.say('u moving');
                if (creep.withdraw(mySource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    //creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    creep.moveTo(mySource);
                }
            }
            */
        }
    }
};

module.exports = roleUpgrader;