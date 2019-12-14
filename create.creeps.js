const types = ["builder","harvester","repairer","upgrader"];
const bodies = {'harvester':[WORK,CARRY,MOVE],
    'repairer':[WORK,CARRY,MOVE],
    'upgrader':[WORK,CARRY,MOVE],
    'builder':[WORK,CARRY,MOVE],
    'generic':[WORK,CARRY,MOVE],
    };
const bodiesHigh = {'harvester':[WORK,CARRY,MOVE],
    'repairer':[WORK,CARRY,MOVE],
    'upgrader':[WORK,CARRY,MOVE],
    'builder':[WORK,CARRY,MOVE],
    'generic':[WORK,CARRY,MOVE],
};

var createCreep = {

    /** @param {Creep} creep **/
    
    run: function(creep) {

        let newName = creep + Game.time;
        let parts;
        if (bodies.propertyIsEnumerable(creep)){
            parts = bodies[creep];
        } else {
            parts = bodies['generic'];
        }

        if (types.includes(creep)){
            /*
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                {memory: {role: creep}});
             */
            Game.spawns['Spawn1'].spawnCreep(parts, newName,
                {memory: {role: creep}});
        } else {
            console.log("Type not known: " + creep);
        }

    }
    
};

module.exports = createCreep;