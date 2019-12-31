module.exports = {
    run: function(roomName) {
        /*
        I want to store the repair targets in the room so:
         - I need to search less often
         - anyone in the room has an easy way of accessing them
         - I can change repair target logic here, and have it affect all repeairers

        Every time it's called I regen the repair list.
        I first check if any of 'my' structures need to be repaired,
        then look at all (which will include walls!)
        I also clear out all repair memories from my creeps
        */

        console.log(roomName + ' here - roomfuncs');

        const thisRoom = Game.rooms[roomName];
        thisRoom.memory.repairs = [];
        let repairTargets = thisRoom.find(FIND_MY_STRUCTURES, {
            filter: object => object.hits < object.hitsMax
        });
        console.log(repairTargets.length);
        if (!repairTargets || repairTargets.length == 0) {
            console.log('room funcs here');
            repairTargets = thisRoom.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });
            console.log('And now: ' + repairTargets.length);
        }
        let numRepairs = repairTargets.length;


        //console.log(roomName + ' repairs ' + repairTargets.length);
        repairTargets.sort((a, b) => a.hits - b.hits);
        for (let x = 0; x < numRepairs; x++) {
            thisRoom.memory.repairs.push(repairTargets[x].id);
        }
        const allCreeps = _.filter(Game.creeps, (creep) => (
            creep.room.name == roomName
        ));
        for (let x = 0; x < allCreeps.length; x++) {
            allCreeps[x].memory.repairTarget = '';
        }
        thisRoom.memory.repairCounter = 0;
    }
};