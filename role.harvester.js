var roleUpgrader = require('role.upgrader');
let getSource = require('misc.sources');

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
            getSource.run(creep);
        } else {
            let targets;
            if (creep.room.memory.roomcreeps > 0){
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (targets.length == 0) {

                //let targets;
                targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
            }
            if (targets.length > 0) {
                let myTarget = creep.pos.findClosestByRange(targets);
                //myTarget = targets[0];
                creep.say('g ' + myTarget.id);
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
