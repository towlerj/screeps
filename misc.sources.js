var miscSources = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // I need energy!
        let maxEnergy = creep.room.energyAvailable;
        if (creep.memory.role == 'harvester' || creep.memory.role == 'superharvester' || maxEnergy < 1000) {
            var useSource = creep.memory.sources;
            var mySource;
            if (!creep.memory.sourceID) {
                var sources = creep.room.find(FIND_SOURCES);
                creep.memory.sourceID = sources[useSource].id;
            }
            mySource = Game.getObjectById(creep.memory.sourceID);

            if (creep.harvest(mySource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(mySource);
            }
        } else {
            const locExtensions = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] > 0)
                }
            });
            if (locExtensions.length == 0) {
                return false;
            }
            let mySource = creep.pos.findClosestByPath(locExtensions);
            if (!mySource) {
                let mySource = Game.getObjectById(creep.memory.sourceID);
                if (creep.harvest(mySource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(mySource);
                }
            } else {
                if (creep.withdraw(mySource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(mySource);
                }
            }

        }
    }
};
module.exports = miscSources;