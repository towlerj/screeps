/*
USEFUL CODE
    // memory
    for(var name in Game.rooms) {
        console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
    }
 */

module.exports = {
    run: function() {

        /*
        for (let s in Room.Source){
            console.log('Source: ' + s.energy);
        }
        */

        /*
        const sources = Game.rooms['W2N5'].find[FIND_SOURCES];
        for (s in sources) {
            console.log(s.pos);
        }
        */
        /*
        var repairit = creep.room.find(FIND_STRUCTURES, { 
                filter: (structure) => { 
                    return ((structure.hits < 5000) && (structure.hits > 0))
            }
        });
        */

        const locExtensions = Game.spawns['Spawn3'].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == 'extension' && structure.energy > 0)
            }
        });
        console.log('strucs length: ' + locExtensions.length);
        for (let x = 0; x < locExtensions.length; x++) {
            //console.log(locExtensions[x].structureType + " _ " + locExtensions[x].energy);
            console.log(locExtensions[x].id + ' _ ' + locExtensions[x].structureType + " _ " + locExtensions[x].energy);
        }
        /*
        for (const struc in strucs) {
            console.log(struc);
        }
        */

        /*
        // SUICIDE Long Distnace Harvesters
        let longDistanceHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'longDistanceHarvester');
        let minimumLongDistanceHarvester = 2;
        for(let name in Game.creeps) {
            let creep = Game.creeps[name];
            if (Game.creeps[name].ticksToLive < CREEP_LIFE_TIME ){
                if (creep.memory.role = 'longDistanceHarvester'){
                    console.log('SUICIDE');
                    creep.suicide();
                }
            }
        }
        */
    }

};