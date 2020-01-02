
module.exports = {
    run: function(creep, claimroom) {
        //console.log('RT ' + claimroom);
        creep.say('RT ' + claimroom);
        //console.log(claimroom);
        let inRoom = creep.room.name;
        
        
        console.log('mem ' +creep.memory.movingtoclaimroom);
        if (claimroom != creep.room.name) {
            creep.memory.movigntoclaimroom = true;
        } else {
            creep.memory.movingtoclaimroom = false;
        }
        if (creep.memory.movingtoclaimroom){
            console.log('Move to room ' + claimroom + ' - ' + creep.room.name);
            creep.moveTo(Game.flags.Flag4);
            
            //creep.memory.movingtoclaimroom == false;
        } else {
            console.log('Got here in room taker');
            //let path = creep.pos.findPathTo(Game.rooms[claimroom].controller, {maxOps: 200});
            //let path = creep.pos.findPathTo(Game.flags.Flag4, {maxOps: 200});
            //creep.moveTo(Game.flags.Flag4, {visualizePathStyle: {stroke: '#ffffff'}});
            //creep.moveTo(Game.rooms[claimroom].controller, {visualizePathStyle: {stroke: '#ffffff'}});
            //let path = creep.pos.findPathTo(target, {maxOps: 200});
            if (creep.claimController(Game.rooms[claimroom].controller) == ERR_NOT_IN_RANGE) {
                console.log('And here');
                creep.moveTo(Game.flags.Flag5);
                //creep.moveTo(Game.rooms[claimroom].controller);
            }
        }

    }
};