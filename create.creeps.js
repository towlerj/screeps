const types = ["builder","harvester","repairer","upgrader"];
const bodies = {'harvester':[WORK,WORK,CARRY,MOVE],
    'repairer':[WORK,WORK,CARRY,CARRY,MOVE,MOVE],
    'upgrader':[WORK,CARRY,MOVE],
    'builder':[WORK,WORK,CARRY,MOVE,MOVE],
    'generic':[WORK,CARRY,MOVE],
    };
const bodiesHigh = {'harvester':[WORK,CARRY,MOVE],
    'repairer':[WORK,CARRY,MOVE],
    'upgrader':[WORK,CARRY,MOVE],
    'builder':[WORK,CARRY,MOVE],
    'generic':[WORK,CARRY,MOVE],
};

let createCreep = {

    /** @param {Creep} creep **/

    run: function(creep) {

        //for(var name in Game.rooms) {
            //console.log('Room W2N5 has '+Game.rooms['W2N5'].energyAvailable+' energy');

            //}

        let energyAvailable = Game.rooms['W2N5'].energyAvailable;

        if(Game.spawns['Spawn1'].spawning){
            //console.log('Spawning');
        } else {
            //console.log('Going to build a ' + creep);
            let newName = creep + Game.time;
            let parts;
            if (bodies.propertyIsEnumerable(creep)) {
                parts = bodies[creep];
            } else {
                parts = bodies['generic'];
            }

            if (types.includes(creep)) {
                Game.spawns['Spawn1'].spawnCreep(parts, newName,
                    {memory: {role: creep}});
            } else {
                console.log("Type not known: " + creep);
            }
        }
    }

};

module.exports = createCreep;