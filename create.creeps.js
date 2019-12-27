require('prototype.spawn')();

const types = ["builder", "harvester", "repairer", "upgrader", "roomtaker", 'superharvester', 'remoteupgrader', "remotebuilder"];

// 'upgrader': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
//'superharvester': [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],

let createCreep = {

    /** @param {String} creepType **/

    run: function(creepType, spawnName) {
        let maxEnergy = Game.spawns[spawnName].room.energyCapacityAvailable;
        let useNew = false;
        useNew = true;
        //console.log('in spawn');
        if (maxEnergy < 1500){
            maxEnergy = Math.min(maxEnergy,1000);
        }
        if (useNew) {
            if (maxEnergy < 600 && creepType == 'superharvester') {
                creepType = 'harvester';
            }
            let useEnergy;
            if (creepType == 'harvester') {
                useEnergy = 300;
            } 
            /*else if (creepType == 'superharvester'){
                useEnergy = Math.min(1200, maxEnergy-200);
            } */ 
            else {
                useEnergy = Math.max(300,Math.min(1000,maxEnergy-200));
            }
            //console.log('Use energy ' + useEnergy + ' of ' + maxEnergy + ' for ' + Game.spawns[spawnName].room.name);
            useEnergy = Math.min(useEnergy,1000);
            Game.spawns[spawnName].createCustomCreep(useEnergy, creepType);

        } else {
            sList = Game.spawns[spawnName].room.find(FIND_SOURCES)

            const sNumber = Math.floor(Math.random() * sList.length)
            const srcName = sList[sNumber].id;
            srcName = Game.spawns[spawnName].room.memory.useSources[0];
            const retName = Game.spawns[spawnName].room.memory.useSources.shift;
            Game.spawns[spawnName].room.memory.useSources.push(retName);
            //console.log('srcName ' + srcName);

            
            let bodies = {
                'harvester': [WORK, WORK, CARRY, MOVE],
                'repairer': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
                'upgrader': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
                'builder': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
                'remotebuilder': [WORK, CARRY, CARRY, MOVE, MOVE],
                'remoteupgrader': [WORK, CARRY, CARRY, MOVE, MOVE],
                'generic': [WORK, CARRY, CARRY, MOVE],
                'roomtaker': [CLAIM, MOVE, MOVE, MOVE, MOVE],
                'superharvester': [WORK, WORK, WORK, CARRY, MOVE, MOVE],
                //"longDistanceHarvester":[WORK,CARRY,CARRY,MOVE,MOVE]
            };

            if (maxEnergy < 700) {
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