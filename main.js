let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let roleRepairer = require('role.repairer');
let createCreep = require('create.creeps');
let roomMem = require('misc.roomMem');
let miscUtils = require('misc.constructionSites');
let creepController = require('misc.creepController');

//require('misc.utils2');

module.exports.loop = function () {
    
    
    
    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    let minimumHarvesters = 3;
    
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    let minimumUpgraders = 3;
    
    let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    let minimumBuilders = 4;
    
    let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    let minimumRepairers = 2;
    

    
    if (Game.time % 100 == 2){
        console.log('Harvesters: ' + harvesters.length);
        console.log('Upgraders: ' + upgraders.length);
        console.log('Builders: ' + builders.length);
        console.log('Repairers: ' + repairers.length);
        //roomMem.setValues ('W2N5');
        //miscUtils2.energyInRoom();

        for(let i in Memory.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }
    }

    if (harvesters.length < minimumHarvesters) {
        createCreep.run('harvester');
    } else if (upgraders.length < minimumUpgraders) {
        createCreep.run('upgrader');
    }
     else if (repairers.length < minimumRepairers) 
    {
        createCreep.run('repairer');
    }
    else if (builders.length < minimumBuilders) 
    {
        createCreep.run('builder');
    }
    



    for(let name in Game.creeps) {
        let creep = Game.creeps[name];
        if (Game.creeps[name].ticksToLive < CREEP_LIFE_TIME ){
            creepController.run(creep);
            /*
            switch (creep.memory.role){
                case "harvester":
                    roleHarvester.run(creep);
                    break;
                case "upgrader":
                    roleUpgrader.run(creep);
                    break;
                case "repairer":
                    roleRepairer.run(creep);
                    break;
                case "builder":
                    roleBuilder.run(creep);
                    break;
                default:
                    console.log("Unknown type in work: "+creep);
            }
             */
        }
    }
};