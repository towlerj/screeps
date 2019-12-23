const types = ["builder", "harvester", "repairer", "upgrader", "roomtaker", 'superharvester', 'remoteupgrader', "remotebuilder"];
const bodies = {
    'harvester': [WORK, WORK, CARRY, MOVE],
    'repairer': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
    'upgrader': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
    'builder': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
    'remotebuilder': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
    'generic': [WORK, CARRY, CARRY, MOVE],
    'roomtaker': [CLAIM, MOVE, MOVE],
    'superharvester': [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],
    'remoteupgrader': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
    //"longDistanceHarvester":[WORK,CARRY,CARRY,MOVE,MOVE]
};
const bodiesHigh = {
    'harvester': [WORK, CARRY, MOVE],
    'repairer': [WORK, CARRY, MOVE],
    'upgrader': [WORK, CARRY, MOVE],
    'builder': [WORK, CARRY, MOVE],
    'generic': [WORK, CARRY, MOVE],
};

let createCreep = {

    /** @param {String} creepType **/

    run: function(creepType, spawnName) {
        //console.log(creepType, ' - ', spawnName);
        if (Game.spawns[spawnName].spawning) {
            //console.log('Spawning');
        } else {
            //console.log('Going to build a ' + creepType + ' in ' + spawnName);
            let newName = spawnName + '_' + creepType + '_' + Game.time;
            let parts;
            if (bodies.propertyIsEnumerable(creepType)) {
                parts = bodies[creepType];
            } else {
                parts = bodies['generic'];
            }


            if (types.includes(creepType)) {
                //let sources = creep.room.find(FIND_SOURCES);
                //let useSource = source[Game.time % 2]
                Game.spawns[spawnName].spawnCreep(parts, newName, { memory: { role: creepType, sources: 0, spawner: spawnName } });
            } else {
                console.log("Type not known: " + creepType);
                Game.spawns[spawnName].spawnCreep(parts, newName, { memory: { role: 'generic', sources: 0, spawner: spawnName } });
            }
        }
    }

};

module.exports = createCreep;