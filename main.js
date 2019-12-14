var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var createCreep = require('create.creeps');
var miscUtils = require('misc.utils');

//require('misc.utils2');

module.exports.loop = function () {
    
    
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var minimumHarvesters = 3;
    
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var minimumUpgraders = 3;
    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var minimumBuilders = 4;
    
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var minimumRepairers = 1;
    
    var newName = 'temp';
    
    if (Game.time % 100 == 2){
        console.log('Harvesters: ' + harvesters.length);
        console.log('Upgraders: ' + upgraders.length);
        console.log('Builders: ' + builders.length);
        console.log('Repairers: ' + repairers.length);
        //miscUtils2.energyInRoom();

        for(var i in Memory.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }
    }
    
    if (harvesters.length < minimumHarvesters) {
        createCreep.run('harvester');
        /*
        newName = 'Harvester' + Game.time;
        //console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
            {memory: {role: 'harvester'}});
        */
    } else if (upgraders.length < minimumUpgraders) {
        createCreep.run('upgrader');
        /*
        newName = 'Upgrader' + Game.time;
        //console.log('Spawning new Upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,MOVE], newName,
            {memory: {role: 'upgrader'}});
        */
    }
     else if (repairers.length < minimumRepairers) 
    {
        createCreep.run('repairer');
        /*
        newName = 'Repairer' + Game.time;
        //console.log('Spawning new repairer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'repairer'}});
        */
    }
    else if (builders.length < minimumBuilders) 
    {
        createCreep.run('builder');
        /*
        newName = 'Builder' + Game.time;
        //console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'builder'}});
            */
    } 
    


    /*
    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }
    */
    /*
    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    */

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }
};