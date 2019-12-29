module.exports = {
    run: function(roomName) {

        /*
        console.log(roomName + ' funcs');
        const thisRoom = Game.rooms[roomName];
        thisRoom.memory.repairs = [];
        const repairTargets = thisRoom.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax
        });
        let numRepairs = repairTargets.length;
        repairTargets.sort((a, b) => a.hits - b.hits);
        for (let x = 0;x< numRepairs;x++){
            thisRoom.memory.repairs.push(repairTargets[x].id);
        } 
        
        const allCreeps = _.filter(Game.creeps, (creep) => (
             creep.room.name == roomName
        ));
        //let allCreeps = Game.rooms[roomName].creeps;
        console.log(allCreeps);
        for (let x = 0;x<allCreeps.name;x++){
            console.log(allCreeps[x].name);
            allCreeps[x].memory.repairs = '';
        }
        */

        /*
        if (Game.time % 11 == 1) {
            let listExtensions = [];
            console.log('In room funcs for ' + roomName);
            const locExtensions = Game.rooms[roomName].find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == 'extension' && structure.energy > 0)
                }
            });
            //console.log('strucs length: ' + locExtensions.length);

            for (let x = 0; x < locExtensions.length; x++) {
                listExtensions.push(locExtensions[x].id);
                //console.log(locExtensions[x].id + ' _ ' + locExtensions[x].structureType + " _ " + locExtensions[x].energy);
            }
            Game.rooms[roomName].memory.energyExtensions = listExtensions;
        }
        */
    }
};