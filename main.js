<<<<<<< HEAD
<<<<<<< HEAD
//let roleHarvester = require('role.harvester');
//let roleUpgrader = require('role.upgrader');
//let roleBuilder = require('role.builder');
//let roleRepairer = require('role.repairer');
=======

>>>>>>> RPI
let createCreep = require('create.creeps');
let roomMem = require('misc.roomMem');
let miscUtils = require('misc.constructionSites');
let creepController = require('misc.creepController');
let tempTest = require('misc.temp');
//require('misc.utils2');

//Global.home = "W2N4";



module.exports.loop = function () {
    
    tempTest.run();
    
    let wantedRooms = ['W2N5','W2N4'];
    let homeRoom = 'W2N5';
    let longDistRoom = 'W2N4';    
    
    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    let minimumHarvesters = 1;
    
    let superharvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'superharvester');
    let minimumSuperHarvesters = 3;
    
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    let minimumUpgraders = 3;
    
    let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    let minimumBuilders = 4;
    
    let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    let minimumRepairers = 2;
    
    //let longDistanceHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'longDistanceHarvester');
    //let minimumLongDistanceHarvester = 2;
    
    let roomtakers = _.filter(Game.creeps, (creep) => creep.memory.role == 'roomtaker');
    let maxRoomTakers = 1;
    const takeRoom = false;

    if (takeRoom && roomtakers.length < maxRoomTakers){
        createCreep.run('roomtaker');
        minimumBuilders = 0;
        minimumRepairers = 1;
        minimumHarvesters = 1;
        minimumUpgraders = 1;
    }
        
    if (Game.time % 10 == 2){
        console.log('Harvesters: ' + harvesters.length + ' of ' + minimumHarvesters);
        console.log('Upgraders: ' + upgraders.length + ' of ' + minimumUpgraders);
        console.log('Builders: ' + builders.length + ' of ' + minimumBuilders);
        console.log('Repairers: ' + repairers.length + ' of ' + minimumRepairers);
        console.log('Room Takers: ' + roomtakers.length + ' of ' + maxRoomTakers);
        console.log('Super Harvesters: ' + superharvesters.length + ' of ' + minimumSuperHarvesters);
        //console.log('Long Distance Harvesters: ' + longDistanceHarvesters.length + ' of ' + minimumLongDistanceHarvester);
        //roomMem.setValues ('W2N5');
        //miscUtils2.energyInRoom();
        for(var name in Game.rooms) {
            console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
        }
        for(let i in Memory.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }

        
        
    } 

    if (harvesters.length < minimumHarvesters) {
        createCreep.run('harvester');
    } else if (superharvesters.length < minimumSuperHarvesters){
        createCreep.run('superharvester');
    }
    else if (upgraders.length < minimumUpgraders) {
        createCreep.run('upgrader');
    }
     else if (repairers.length < minimumRepairers) 
    {
        createCreep.run('repairer');
    }
    else if (builders.length < minimumBuilders) 
    {
        createCreep.run('builder');
    } else if (roomtakers.length < maxRoomTakers && takeRoom){
        createCreep.run('roomtaker');
    } else if (Game.rooms['W2N5'].energyAvailable > 700) {
        createCreep.run('upgrader');
    }
    //else if (longDistanceHarvesters.length < minimumLongDistanceHarvester) {
    //    createCreep.run('longDistanceHarvester');
    //} 



    for(let name in Game.creeps) {
        let creep = Game.creeps[name];
        if (Game.creeps[name].ticksToLive < CREEP_LIFE_TIME ){
            //if (creep.memory.role = 'longDistanceHarvester'){
            //    creep.memory.remoteRoom = longDistRoom;
            //    creep.memory.homeRoom = homeRoom;
            //}
            
            creepController.run(creep);
=======
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    //console.log('Harvesters: ' + harvesters.length);
    var minimumHarvesters = 5;
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    //console.log('Upgraders: ' + upgraders.length);
    var minimumUpgraders = 5;
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    //console.log('Builders: ' + builders.length);
    var minimumBuilders = 2;
    var newName = 'temp';
    if(harvesters.length < minimumHarvesters) {
        newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
            {memory: {role: 'harvester'}});
    }
    else if(upgraders.length < minimumUpgraders) {
        newName = 'Upgrader' + Game.time;
        console.log('Spawning new Upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'upgrader'}});
    }
    else if(builders.length < minimumBuilders) {
        newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'builder'}});
    }




    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }
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
>>>>>>> f11448e9eee1c656b1d234e990c207b19bc4b2c5
        }
    }
};