const types = ["builder", "harvester", "repairer", "upgrader", "roomtaker", 'superharvester', 'remoteupgrader', "remotebuilder"];

// 'upgrader': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
//'superharvester': [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],

let createCreep = {

    /** @param {String} creepType **/

    run: function(creepType, spawnName) {
        let maxEnergy = Game.spawns[spawnName].room.energyCapacityAvailable;
        const useNew = false;
        //console.log('in spawn');
        if (useNew) {

        } else {
            sList = Game.spawns[spawnName].room.find(FIND_SOURCES)

            const sNumber = Math.floor(Math.random() * sList.length)
            const srcName = sList[sNumber].id;
            //console.log('srcName ' + srcName);

            Math.floor(Math.random() * 2)
            let bodies = {
                'harvester': [WORK, WORK, CARRY, MOVE],
                'repairer': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
                'upgrader': [WORK, CARRY, CARRY, MOVE, MOVE],
                'builder': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
                'remotebuilder': [WORK, CARRY, CARRY, MOVE, MOVE],
                'remoteupgrader': [WORK, CARRY, CARRY, MOVE, MOVE],
                'generic': [WORK, CARRY, CARRY, MOVE],
                'roomtaker': [CLAIM, MOVE, MOVE, MOVE, MOVE],
                'superharvester': [WORK, WORK, WORK, CARRY, MOVE, MOVE],
                //"longDistanceHarvester":[WORK,CARRY,CARRY,MOVE,MOVE]
            };

            if (maxEnergy < 1000) {
                bodies = {
                    'harvester': [WORK, WORK, CARRY, MOVE],
                    'repairer': [WORK, WORK, CARRY, MOVE],
                    'upgrader': [WORK, WORK, CARRY, MOVE],
                    'builder': [WORK, WORK, CARRY, MOVE],
                    'remotebuilder': [WORK, WORK, CARRY, MOVE],
                    'remoteupgrader': [WORK, WORK, CARRY, MOVE],
                    'generic': [WORK, CARRY, CARRY, MOVE],
                    'roomtaker': [CLAIM, MOVE, MOVE, MOVE, MOVE],
                    'superharvester': [WORK, CARRY, CARRY, MOVE, MOVE],
                    //"longDistanceHarvester":[WORK,CARRY,CARRY,MOVE,MOVE]
                };
            }
            if (maxEnergy > 2000) {
                bodies = {
                    'harvester': [WORK, WORK, CARRY, MOVE],
                    'repairer': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
                    'upgrader': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
                    'builder': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
                    'remotebuilder': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
                    'generic': [WORK, CARRY, CARRY, MOVE],
                    'roomtaker': [CLAIM, MOVE, MOVE, MOVE, MOVE],
                    'superharvester': [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE],
                    'remoteupgrader': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
                };
            }


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

            if (Game.spawns[spawnName].spawning) {
                //console.log('Spawning');
            } else {
                if (maxEnergy < 600 && creepType == 'superharvester') {
                    creepType = 'harvester';
                }
                if (maxEnergy < 800 && creepType == 'repairer') {
                    creepType = 'builder';
                }

                let newName = spawnName + '_' + creepType + '_' + Game.time;
                let parts;
                if (bodies.propertyIsEnumerable(creepType)) {
                    parts = bodies[creepType];
                } else {
                    parts = bodies['generic'];
                }

                if (types.includes(creepType)) {
                    Game.spawns[spawnName].spawnCreep(parts, newName, { memory: { role: creepType, sources: sNumber, sourceID: srcName, spawner: spawnName } });
                } else {
                    console.log("Type not known: " + creepType);
                    Game.spawns[spawnName].spawnCreep(parts, newName, { memory: { role: 'generic', sources: sNumber, sourceID: srcName, spawner: spawnName } });
                }
            }
        }
    }
};

module.exports = createCreep;