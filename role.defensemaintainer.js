/*
Not currently used!
*/

module.exports = {
    run: function(creep){
        creep.say('dm');
        if (creep.store.getFreeCapacity() > 0) {
            let sources = creep.room.find(FIND_SOURCES);
            var useSource = sources[0];
            
            if (creep.harvest(useSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(useSource);
            }
        } else {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    //creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    creep.moveTo(targets[0]);
                }
            }
        }
    }
};