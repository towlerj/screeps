let roleRemoteUpgrader = {
    /** @param {Creep} creep **/
    run: function(creep, remoteRoom) {

        creep.say('ru ' + remoteRoom);
        //console.log(claimroom);
        let inRoom = creep.room.name;
        
        if (remoteRoom != creep.room.name) {
            creep.moveTo(Game.flags.Flag1);
        } else {


            creep.say('ru');
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
                    //creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                    creep.moveTo(creep.room.controller);
                }
            } else {
                let sources = creep.room.find(FIND_SOURCES);
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    //creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    creep.moveTo(sources[0]);
                }
            }
        }
    }
};

module.exports = roleRemoteUpgrader;