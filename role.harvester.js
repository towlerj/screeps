<<<<<<< HEAD
let roleHarvester = {
=======
var roleHarvester = {
>>>>>>> f11448e9eee1c656b1d234e990c207b19bc4b2c5

    /** @param {Creep} creep **/
    run: function(creep) {
        
        
        if (creep.memory.role == 'superharvester'){
            creep.say('S');
            //console.log('super');
        } else {
            creep.say('H');
        }
        
        
        if(creep.store.getFreeCapacity() > 0) {
<<<<<<< HEAD
            let sources = creep.room.find(FIND_SOURCES);
<<<<<<< HEAD
=======
            var sources = creep.room.find(FIND_SOURCES);
>>>>>>> f11448e9eee1c656b1d234e990c207b19bc4b2c5
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
=======
            if (creep.memory.type == 'harvester'){
                var useSource = sources[1];
            } else {
                var useSource = sources[0];
            }
            
            
            if(creep.harvest(useSource) == ERR_NOT_IN_RANGE) {
                //creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                creep.moveTo(useSource);
>>>>>>> RPI
            }
        }
        else {
<<<<<<< HEAD
            let targets = creep.room.find(FIND_STRUCTURES, {
=======
            var targets = creep.room.find(FIND_STRUCTURES, {
>>>>>>> f11448e9eee1c656b1d234e990c207b19bc4b2c5
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    //creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    creep.moveTo(targets[0]);
                }
            }
        }
    }
};

module.exports = roleHarvester;