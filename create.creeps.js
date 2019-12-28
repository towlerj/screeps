require('prototype.spawn')();

const types = ["builder", "harvester", "repairer", "upgrader", "roomtaker", 'superharvester', 'remoteupgrader', "remotebuilder"];

// 'upgrader': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
//'superharvester': [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],

let createCreep = {

    /** @param {String} creepType **/

    run: function(creepType, spawnName) {
        let maxEnergy = Game.spawns[spawnName].room.energyCapacityAvailable;
        
        //console.log('in spawn');
        if (maxEnergy < 1500){
            maxEnergy = Math.min(maxEnergy,1000);
        }
        
        if (maxEnergy < 600 && creepType == 'superharvester') {
            creepType = 'harvester';
        }
        let useEnergy;
        if (creepType == 'harvester') {
            useEnergy = 300;
        } else if (maxEnergy < 2000) {
            useEnergy = Math.min(maxEnergy,1000);
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

        
    }
};

module.exports = createCreep;