let roleRemoteBuilder = {
    /** @param {Creep} creep **/
    run: function(creep, remoteRoom) {
        //console.log(claimroom);
        let inRoom = creep.room.name;

        if (remoteRoom != creep.room.name) {
            creep.moveTo(Game.flags.Flag1);
        } else {

            if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.building = false;
                creep.say('harvest');
            }
            if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
                creep.memory.building = true;
                creep.say('build');
            }

            if (creep.memory.building) {
                creep.say('rb here ');
                if (creep.build(creep.memory.buildTarget) == ERR_NOT_IN_RANGE) {
                    //creep.moveTo(creep.memory.buildTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                    //creep.say('rb here ' + creep.memory.buildTarget);
                    creep.moveTo(creep.memory.buildTarget);
                }
            } else {

                var sources = creep.room.find(FIND_SOURCES);
                let sID = Game.time % 2;
                if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    //creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});

                    creep.moveTo(sources[1]);
                }
            }
        }
    }
}
module.exports = roleRemoteBuilder;