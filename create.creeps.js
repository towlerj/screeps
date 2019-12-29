require('prototype.spawn')();

const types = ["builder", "harvester", "repairer", "upgrader", "roomtaker", 'superharvester', 'remoteupgrader', "remotebuilder"];

// 'upgrader': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
//'superharvester': [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],

let createCreep = {

    /** @param {String} creepType **/

    run: function(creepType, spawnName) {
        let maxEnergy = Game.spawns[spawnName].room.energyCapacityAvailable;

        //console.log('in spawn');
        if (maxEnergy < 1500) {
            maxEnergy = Math.min(maxEnergy, 1000);
        }

        if (maxEnergy < 600 && creepType == 'superharvester') {
            creepType = 'harvester';
        }
        let useEnergy;
        if (creepType == 'harvester') {
            useEnergy = 300;
        } else if (maxEnergy < 2000) {
            useEnergy = Math.min(maxEnergy, 1000);
        }
        /*else if (creepType == 'superharvester'){
            useEnergy = Math.min(1200, maxEnergy-200);
        } */
        else {
            useEnergy = Math.max(300, Math.min(1000, maxEnergy - 200));
        }

        useEnergy = Math.min(useEnergy, 1000);
        /*
        if (Game.spawns[spawnName].room.name == 'W1N4') {
            useEnergy = Math.min(useEnergy, 800);
        } else if (Game.spawns[spawnName].room.name == 'W3N4') {
            useEnergy = Math.min(useEnergy, 400);
        }
        */
        return Game.spawns[spawnName].createCustomCreep(useEnergy, creepType);


    }
};

module.exports = createCreep;
