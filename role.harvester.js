var roleUpgrader = require('role.upgrader');

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

            var useSource = creep.memory.sources;
            var mySource;
            if (!creep.memory.sourceID) {
                var sources = creep.room.find(FIND_SOURCES);
                creep.memory.sourceID = sources[useSource].id;
            }
            mySource = Game.getObjectById(creep.memory.sourceID);

            if (creep.harvest(mySource) == ERR_NOT_IN_RANGE) {
                //creep.say('h ' + mySource.id);
                creep.moveTo(mySource);
            }
        } else {
            let targets;
            // if under attack just supply towers
            // this assumes skirmishes for now!
            if (creep.room.memory.underattack) {
                console.log('Under attack - from harvester')
                targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });

                
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
                
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
                const myTarget = creep.pos.findClosestByRange(targets);
                //creep.say('g ' + myTarget);
                if (creep.transfer(myTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    //creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    creep.moveTo(myTarget);
                }
            } else {
                roleUpgrader.run(creep);
            }
        }
    }
};

module.exports = roleHarvester;