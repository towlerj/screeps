let roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {

        
        
        if (creep.memory.role == 'superharvester') {
            creep.say('S');
            //console.log('super');
        } else {
            creep.say('H');
        }


        if (creep.store.getFreeCapacity() > 0) {
            let sources = creep.room.find(FIND_SOURCES);
            if (sources.length >1 && creep.memory.type == 'harvester') {
                var useSource = sources[1];
            } else {
                var useSource = sources[0];
            }


            if (creep.harvest(useSource) == ERR_NOT_IN_RANGE) {
                //creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                creep.moveTo(useSource);
            }
        } else {
            let targets;
            // if under attack just supply towers
            // this assumes skirmishes for now!
            if (creep.room.memory.underattack){
                targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
                });
            } else {
                targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
            }
            //creep.say(targets.length);
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    //creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    creep.moveTo(targets[0]);
                }
            }
        }
    }
};

module.exports = roleHarvester;