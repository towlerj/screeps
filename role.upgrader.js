<<<<<<< HEAD
let roleUpgrader = {
=======
var roleUpgrader = {
>>>>>>> f11448e9eee1c656b1d234e990c207b19bc4b2c5

    /** @param {Creep} creep **/
    run: function(creep) {
        //creep.say('u');
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
<<<<<<< HEAD
        }
        else {
<<<<<<< HEAD
            let sources = creep.room.find(FIND_SOURCES);
<<<<<<< HEAD
=======
            var sources = creep.room.find(FIND_SOURCES);
>>>>>>> f11448e9eee1c656b1d234e990c207b19bc4b2c5
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
=======
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                //creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                creep.moveTo(sources[1]);
>>>>>>> RPI
=======
        } else {

            let sources = creep.room.find(FIND_SOURCES);

            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                //creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                //creep.say("here");
                creep.moveTo(sources[0]);
>>>>>>> PrototypeRework
            }
        }
    }
};

module.exports = roleUpgrader;