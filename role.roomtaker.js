
module.exports = {
    run: function(creep, claimroom) {
        console.log('RT ' + claimroom);
        creep.say('RT ' + claimroom);
        //console.log(claimroom);
        let inRoom = creep.room.name;

        if (claimroom != creep.room.name) {
            //console.log('Move to room');
            //creep.moveTo(10,10,claimroom);
            creep.moveTo(Game.flags.Flag1);
        } else if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            //console.log('Move to controller');
            creep.moveTo(creep.room.controller);
        }

    }
};