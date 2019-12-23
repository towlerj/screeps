let createCreep = require('create.creeps');
let roomMem = require('misc.roomMem');
let miscUtils = require('misc.constructionSites');
let creepController = require('misc.creepController');
let tempTest = require('misc.temp');
//require('misc.utils2');

//Global.home = "W2N4";
/*
Need to update
*/



module.exports.loop = function() {

    //tempTest.run();

    let wantedRooms = ['W2N5', 'W2N4'];
    let homeRoom = 'W2N5';
    let longDistRoom = 'W2N4';

    for (const i in Game.spawns) {
        //console.log(Game.spawns[i].room);

        const myCreeps = Game.spawns[i].room.find(FIND_MY_CREEPS);
        //let myCreep = myCreeps[0];
        //console.log('Creep 0 type', myCreep.memory.role);
        //console.log(i);

        if (Game.time % 10 == 2) {
            /*
            const TESTharvesters = Game.spawns[i].room.find(FIND_MY_CREEPS, {
                filter: { memory.role: 'harvester' }
            });
            const TESTharvesters = myCreeps.filter(memory.role == 'harvester');
            */
        }
        let harvesters = _.filter(Game.creeps, (creep) => (
            creep.memory.role == 'harvester' && creep.memory.spawner == i
        ));

        let minimumHarvesters = 1;

        let superharvesters = _.filter(Game.creeps, (creep) => (
            creep.memory.role == 'superharvester' && creep.memory.spawner == i
        ));
        let minimumSuperHarvesters = 3;

        let upgraders = _.filter(Game.creeps, (creep) => (
            creep.memory.role == 'upgrader' && creep.memory.spawner == i
        ));
        let minimumUpgraders = 3;

        //let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        let builders = _.filter(Game.creeps, (creep) => (
            creep.memory.role == 'builder' && creep.memory.spawner == i
        ));
        let minimumBuilders = 4;

        let repairers = _.filter(Game.creeps, (creep) => (
            creep.memory.role == 'repairer' && creep.memory.spawner == i
        ));
        let minimumRepairers = 2;

        let roomtakers = _.filter(Game.creeps, (creep) => creep.memory.role == 'roomtaker');
        let maxRoomTakers = 1;
        const takeRoom = false;

        let remoteupgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteupgrader');
        let minimumRemoteUpgraders = 2;
        const takenRoom = false;

        let remotebuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'remotebuilder');
        let minimumRemoteBuilders = 2;

        if (takeRoom && roomtakers.length < maxRoomTakers) {
            createCreep.run('roomtaker', i);
        }

        if (takenRoom && remoteupgraders.length < minimumRemoteUpgraders) {
            createCreep.run('remoteupgrader', i);
        }

        if (takenRoom && remotebuilders.length < minimumRemoteBuilders) {
            createCreep.run('remotebuilder', i);
        }

        if (Game.time % 50 == 1) {
            console.log(Game.spawns[i].room);
            console.log(i + ' Harvesters: ' + harvesters.length + ' of ' + minimumHarvesters);
            console.log(i + ' Upgraders: ' + upgraders.length + ' of ' + minimumUpgraders);
            console.log(i + ' Builders: ' + builders.length + ' of ' + minimumBuilders);
            console.log(i + ' Repairers: ' + repairers.length + ' of ' + minimumRepairers);
            console.log('Room Takers: ' + roomtakers.length + ' of ' + maxRoomTakers);
            console.log(i + 'Super Harvesters: ' + superharvesters.length + ' of ' + minimumSuperHarvesters);
            console.log('Remote Upgraders: ' + remoteupgraders.length + ' of ' + minimumRemoteUpgraders);
            console.log('Remote Builders: ' + remotebuilders.length + ' of ' + minimumRemoteBuilders);
            for (var name in Game.rooms) {
                console.log('Room "' + name + '" has ' + Game.rooms[name].energyAvailable + ' energy');
            }
            for (let i in Memory.creeps) {
                if (!Game.creeps[i]) {
                    delete Memory.creeps[i];
                }
            }



        }
        /*
        if (harvesters.length < minimumHarvesters) {
            createCreep.run('harvester', 'Spawn1');
        } else if (superharvesters.length < minimumSuperHarvesters) {
            createCreep.run('superharvester', 'Spawn1');
        } else if (upgraders.length < minimumUpgraders) {
            createCreep.run('upgrader', 'Spawn1');
        } else if (repairers.length < minimumRepairers) {
            createCreep.run('repairer', 'Spawn1');
        } else if (builders.length < minimumBuilders) {
            createCreep.run('builder', 'Spawn1');
        } else if (roomtakers.length < maxRoomTakers && takeRoom) {
            createCreep.run('roomtaker', 'Spawn1');
        } else if (Game.spawns[i].room.energyAvailable > 700) {
            createCreep.run('upgrader', 'Spawn1');
        }
        */
        if (harvesters.length < minimumHarvesters) {
            createCreep.run('harvester', i);
        } else if (superharvesters.length < minimumSuperHarvesters) {
            createCreep.run('superharvester', i);
        } else if (upgraders.length < minimumUpgraders) {
            createCreep.run('upgrader', i);
        } else if (repairers.length < minimumRepairers) {
            createCreep.run('repairer', i);
        } else if (builders.length < minimumBuilders) {
            createCreep.run('builder', i);
        } else if (roomtakers.length < maxRoomTakers && takeRoom) {
            createCreep.run('roomtaker', i);
        } else if (Game.spawns[i].room.energyAvailable > 700) {
            createCreep.run('upgrader', i);
        }

        //else if (longDistanceHarvesters.length < minimumLongDistanceHarvester) {
        //    createCreep.run('longDistanceHarvester');
        //} 
    };


    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        if (Game.creeps[name].ticksToLive < CREEP_LIFE_TIME) {
            creepController.run(creep);
        }
    }
};