let createCreep = require('create.creeps');
let roomMem = require('misc.roomMem');
let miscUtils = require('misc.constructionSites');
let creepController = require('misc.creepController');
let tempTest = require('misc.temp');
let defenseTower = require('defense.tower');
//require('misc.utils2');

module.exports.loop = function() {

    //tempTest.run();
    

    let wantedRooms = ['W2N5', 'W2N4', 'W1N4'];
    let homeRoom = 'W2N5';
    // W3N4
    for (const i in Game.spawns) {
        let thisRoom = Game.spawns[i].room.name;
        
        let hostiles = Game.rooms[thisRoom].find(FIND_HOSTILE_CREEPS).length;
        if (hostiles > 0){
            Game.spawns[i].room.memory.underAttack = true;
        } else {
            Game.spawns[i].room.memory.underAttack = false;
        }
        
        defenseTower.run(thisRoom);
        
        //const myCreeps = Game.spawns[i].room.find(FIND_MY_CREEPS);
        //const roomSource = Game.spawns[i].room.Source;
        //console.log(roomSource);
        
        let harvesters = _.filter(Game.creeps, (creep) => (
            creep.memory.role == 'harvester' && creep.memory.spawner == i
        ));

        let superharvesters = _.filter(Game.creeps, (creep) => (
            creep.memory.role == 'superharvester' && creep.memory.spawner == i
        ));

        let upgraders = _.filter(Game.creeps, (creep) => (
            creep.memory.role == 'upgrader' && creep.memory.spawner == i
        ));

        //let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        let builders = _.filter(Game.creeps, (creep) => (
            creep.memory.role == 'builder' && creep.memory.spawner == i
        ));

        let repairers = _.filter(Game.creeps, (creep) => (
            creep.memory.role == 'repairer' && creep.memory.spawner == i
        ));

        let roomtakers = _.filter(Game.creeps, (creep) => creep.memory.role == 'roomtaker');

        let remoteupgraders = _.filter(Game.creeps, (creep) => (
            creep.memory.role == 'remoteupgrader' && creep.memory.spawner == i
        ));

        let remotebuilders = _.filter(Game.creeps, (creep) => (
            creep.memory.role == 'remotebuilder' && creep.memory.spawner == i
        ));

        let minimumHarvesters = 1;
        let minimumUpgraders = 4;
        let minimumBuilders = 3;
        let minimumRepairers = 1;
        let minimumSuperHarvesters = 2;

        let maxRoomTakers = 1;
        let minimumRemoteUpgraders = 1;
        let minimumRemoteBuilders = 2;
        
        if (Game.spawns[i].room.energyCapacityAvailable < 500) {
            minimumHarvesters = 1;
            minimumUpgraders = 2;
            minimumBuilders = 3;
            minimumRepairers = 1;
            minimumSuperHarvesters = 0
            minimumRemoteUpgraders = 1;
            minimumRemoteBuilders = 1;
        } else if (Game.spawns[i].room.energyCapacityAvailable < 800) {
            minimumHarvesters = 2;
            minimumUpgraders = 2;
            minimumBuilders = 3;
            minimumRepairers = 1;
            minimumRemoteUpgraders = 0;
            minimumRemoteBuilders = 0;
            minimumSuperHarvesters = 0;
        } else if (Game.spawns[i].room.energyCapacityAvailable > 2000) {
            minimumHarvesters = 2;
            minimumRemoteUpgraders = 2;
            minimumRemoteBuilders = 3;
        }

        /*
        if (Game.spawns[i].room.energyCapacityAvailable > 1500) {
            minimumHarvesters = 1;
            minimumUpgraders = 2;
            minimumBuilders = 1;
            minimumRepairers = 1;
            minimumSuperHarvesters = 1;
        }
        */

        let takeRoom = false;
        if (i == 'Spawn1') {
            takeRoom = false;
        }
        const takenRoom = false;



        if (Game.time % 180 == 1) {
            console.log(Game.spawns[i].room.name);
            console.log(i + ' Harvesters: ' + harvesters.length + ' of ' + minimumHarvesters);
            console.log(i + ' Upgraders: ' + upgraders.length + ' of ' + minimumUpgraders);
            console.log(i + ' Builders: ' + builders.length + ' of ' + minimumBuilders);
            console.log(i + ' Repairers: ' + repairers.length + ' of ' + minimumRepairers);
            console.log(i + ' Super Harvesters: ' + superharvesters.length + ' of ' + minimumSuperHarvesters);
            if (takeRoom) {
                console.log(i + ' Room Takers: ' + roomtakers.length + ' of ' + maxRoomTakers);
            }
            if (takenRoom) {
                console.log(i + ' Remote Upgraders: ' + remoteupgraders.length + ' of ' + minimumRemoteUpgraders);
                console.log(i + ' Remote Builders: ' + remotebuilders.length + ' of ' + minimumRemoteBuilders);
            }
            if (i == 'Spawn1') {
                for (var name in Game.rooms) {
                    console.log('Room "' + name + '" has ' + Game.rooms[name].energyAvailable + ' energy');
                    console.log(' and ' + Game.rooms[name].energyCapacityAvailable + ' max energy.');
                }
                for (let i in Memory.creeps) {
                    if (!Game.creeps[i]) {
                        delete Memory.creeps[i];
                    }
                }
            }
        }
       
        if (harvesters.length < minimumHarvesters) {
            createCreep.run('harvester', i);
        } else if (roomtakers.length < maxRoomTakers && takeRoom) {
            //console.log('create roomtaker');
            createCreep.run('roomtaker', i);
        } else if (upgraders.length < minimumUpgraders) {
            createCreep.run('upgrader', i);
        } else if (repairers.length < minimumRepairers) {
            createCreep.run('repairer', i);
        } else if (builders.length < minimumBuilders) {
            createCreep.run('builder', i);
        } else if (superharvesters.length < minimumSuperHarvesters) {
            createCreep.run('superharvester', i);
        } else if (Game.spawns[i].room.energyAvailable > 700) {
            createCreep.run('upgrader', i);
        }

        //else if (longDistanceHarvesters.length < minimumLongDistanceHarvester) {
        //    createCreep.run('longDistanceHarvester');
        //} 
                if (takeRoom && roomtakers.length < maxRoomTakers) {
            createCreep.run('roomtaker', i);
        }

        if (takenRoom && remoteupgraders.length < minimumRemoteUpgraders) {
            createCreep.run('remoteupgrader', i);
        }

        if (takenRoom && remotebuilders.length < minimumRemoteBuilders) {
            createCreep.run('remotebuilder', i);
        }
    };


    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        if (Game.creeps[name].ticksToLive < CREEP_LIFE_TIME) {
            creepController.run(creep);
        }
    }
};