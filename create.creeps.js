/*
This is for creating creeps
*/


const types = ["builder", "harvester", "repairer", "upgrader", "roomtaker", 'superharvester', 'remoteupgrader', "remotebuilder"];

// 'upgrader': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
//'superharvester': [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],
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
        let maxEnergy = Game.spawns[spawnName].room.energyCapacityAvailable;

        let bodies = {
            'harvester': [WORK, WORK, CARRY, MOVE],
            'repairer': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
            'upgrader': [WORK, CARRY, CARRY, MOVE, MOVE],
            'builder': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
            'remotebuilder': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
            'generic': [WORK, CARRY, CARRY, MOVE],
            'roomtaker': [CLAIM, MOVE, MOVE, MOVE, MOVE],
            'superharvester': [WORK, WORK, WORK, CARRY, MOVE, MOVE],
            'remoteupgrader': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
            //"longDistanceHarvester":[WORK,CARRY,CARRY,MOVE,MOVE]
        };

        if (maxEnergy < 600) {
            bodies = {
                'harvester': [WORK, WORK, CARRY, MOVE],
                'repairer': [WORK, WORK, CARRY, MOVE],
                'upgrader': [WORK, WORK, CARRY, MOVE],
                'builder': [WORK, WORK, CARRY, MOVE],
                'remotebuilder': [WORK, WORK, CARRY, MOVE],
                'generic': [WORK, CARRY, CARRY, MOVE],
                'roomtaker': [CLAIM, MOVE, MOVE, MOVE, MOVE],
                'superharvester': [WORK, WORK, CARRY, MOVE],
                //'remoteupgrader': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
                //"longDistanceHarvester":[WORK,CARRY,CARRY,MOVE,MOVE]
            };
        }
        if (maxEnergy > 1000) {
            bodies = {
                'harvester': [WORK, WORK, CARRY, MOVE],
                'repairer': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
                'upgrader': [WORK, CARRY, CARRY, MOVE, MOVE],
                'builder': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
                'remotebuilder': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
                'generic': [WORK, CARRY, CARRY, MOVE],
                'roomtaker': [CLAIM, MOVE, MOVE, MOVE, MOVE],
                'superharvester': [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],
                'remoteupgrader': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
                //"longDistanceHarvester":[WORK,CARRY,CARRY,MOVE,MOVE]
            };
        }


        //console.log(maxEnergy);
        // for now I want work:carry:move equal
        // so thats an energy cost of 200
        let bodypartscount = Math.floor(maxEnergy / 200);
        if (bodypartscount > 5) {
            bodypartscount = 5;
        }
        let bodyparts = [];
        for (b = 0; b < bodypartscount; b++) {
            bodyparts.push(WORK);
        }
        for (b = 0; b < bodypartscount; b++) {
            bodyparts.push(CARRY);
        }
        for (b = 0; b < bodypartscount; b++) {
            bodyparts.push(MOVE);
        }

        /*
        if (spawnName == 'Spawn3') {
            console.log(creepType + ' ' + spawnName + ' ' + maxEnergy + ' ' + bodyparts);
        }
        */

        //console.log(creepType, ' - ', spawnName);
        if (Game.spawns[spawnName].spawning) {
            //console.log('Spawning');
        } else {
            //console.log('Going to build a ' + creepType + ' in ' + spawnName);



            if (maxEnergy < 600 && creepType == 'superharvester') {
                creepType = 'harvester';
            }
            if (maxEnergy < 600 && creepType == 'repairer') {
                creepType = 'builder';
            }

            let newName = spawnName + '_' + creepType + '_' + Game.time;
            let parts;
            /*
            if (maxEnergy > 1000 || maxEnergy < 1000) {
                parts = bodyparts;
            } else */
            /*
            if (creepType == 'superupgrader') {
                parts = bodyparts;
                console.log('SU BP: ', bodypartscount);
            } else */
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