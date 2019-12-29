module.exports = {

    run: function(creep) {

        let mySource = Game.getObjectById(creep.memory.sourceID);
        //console.log('MySource: ' + mySource.id);

        // find container next to source
        let container = mySource.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: s => s.structureType == STRUCTURE_CONTAINER
        })[0];

        if (creep.pos.isEqualTo(container.pos)) {
            creep.say('mining');
            creep.harvest(mySource);
        }
        // if creep is not on top of the container
        else {
            creep.say('mnr mv');
            creep.moveTo(container);
        }

    }
};
