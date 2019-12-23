/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('misc.temp');
 * mod.thing == 'a thing'; // true
 */

/*
USEFUL CODE
    // memory
    for(var name in Game.rooms) {
        console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
    }



 */


module.exports = {
    run: function(){
        
        /*
        for (let s in Room.Source){
            console.log('Source: ' + s.energy);
        }
        */
        
        const sources = Game.rooms['W2N5'].find[FIND_SOURCES];
        //console.log(sources[sources[0]);
        for (s in sources){
            console.log(s.pos);
        }
        
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