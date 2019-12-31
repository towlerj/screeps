let roleEnergyDonater = {
    /** @param {Creep} creep **/
    run: function(creep) {

        let localSrc = creep.memory.localsrc;
        var remoteRoom = creep.memory.remoteroom;
        creep.say('ED ' + remoteRoom);
        //creep say('ED' + remoteRoom);
        if (creep.memory.donating && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.donating = false;
            //creep.say('harvest');
        }
        if (!creep.memory.donating && creep.store.getFreeCapacity() == 0) {
            creep.memory.donating = true;
            //creep.say('donate');
        }

        if (!creep.memory.donating) {
            //console.log('ED in ' + creep.room.name);
            //creep.say('ED???');

            mySource = Game.getObjectById(localSrc);
            if (creep.withdraw(mySource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                //creep.say('ED M');
                creep.moveTo(mySource);
            }
        } else {
            //let remoteRoom = 'W2N4';

            //creep.say('ED ' + remoteRoom);
            if (remoteRoom != creep.room.name) {
                //creep.say('ED M');

                //console.log('ED moving ' + creep.room.name);
                if (remoteRoom == 'W3N4') {
                    //console.log('ED to ' + remoteRoom);
                    creep.moveTo(Game.flags.Flag1);
                } else if (remoteRoom == 'W2N4') {
                    //console.log('ED to ' + remoteRoom);
                    creep.moveTo(Game.flags.Flag2);
                } else if (remoteRoom == 'W1N4') {
                    //console.log('ED to ' + remoteRoom);
                    creep.moveTo(Game.flags.Flag3);
                }
            } else {
                //console.log('ED here ' + creep.room.name);
                creep.say('ED in ' + remoteRoom);
                let targets;
                if (remoteRoom == 'W2N4') {
                    targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION ||
                                    structure.structureType == STRUCTURE_SPAWN ||
                                    structure.structureType == STRUCTURE_TOWER
                                ) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                    });
                } else {
                    targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION ||
                                    structure.structureType == STRUCTURE_SPAWN ||
                                    structure.structureType == STRUCTURE_TOWER ||
                                    structure.structureType == STRUCTURE_STORAGE
                                ) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                    });
                }
                if (targets.length > 0) {
                    let locTarget = creep.pos.findClosestByPath(targets);
                    if (creep.transfer(locTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(locTarget);
                    }
                    /*
                                        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                            creep.moveTo(targets[0]);
                                        }*/
                }
            }
        }
    }
};

module.exports = roleEnergyDonater;