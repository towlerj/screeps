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
            //creep.say("here");
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                //creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                creep.moveTo(creep.room.controller);
            }
        } else {

            //let sources = creep.room.find(FIND_SOURCES);
            var useSource = creep.memory.sources;
            var sources = creep.room.find(FIND_SOURCES);


            if (creep.harvest(sources[useSource]) == ERR_NOT_IN_RANGE) {
                //creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                creep.moveTo(sources[useSource]);
            }
        }
    }
};

module.exports = roleUpgrader;