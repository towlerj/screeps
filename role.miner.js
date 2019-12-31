module.exports = {

    run: function(creep) {

        let mySource = Game.getObjectById(creep.memory.sourceID);
        let container = mySource.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: s => s.structureType == STRUCTURE_CONTAINER
        })[0];
        if (creep.pos.isEqualTo(container.pos)) {
            if (creep.memory.containerRepair && creep.store[RESOURCE_ENERGY] > 0 & container.hits < 250000) {
                creep.say('miner healing 2');
                creep.repair(container);
            } else if (Game.time % 257 == 1) {
                creep.say('miner healing 1');
                creep.repair(container);
                creep.memory.containerRepair = true;
            } else {
                creep.say('m ' + creep.room.memory.energyavailable);
                creep.harvest(mySource);
                creep.memory.containerRepair = false;
            }

        }
        // if creep is not on top of the container
        else {
            creep.say('mnr mv');
            creep.moveTo(container);
        }


    }
};