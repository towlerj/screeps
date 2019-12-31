require('prototype.spawn')();
require('prototype.room')();
let createCreep = require('create.creeps');
let roomMem = require('misc.roomMem');
let miscUtils = require('misc.constructionSites');
let creepController = require('misc.creepController');
let tempTest = require('misc.temp');
let defenseTower = require('defense.tower');
//require('misc.utils2');
let roomFuncs = require('misc.roomFuncs');
let roomTasks = require('room.taskQueue');
let myRooms = [];

/*
First fourty primes - useful for offsettign actions in Game.time modulo checks!
2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227
*/


module.exports.loop = function() {
    let getCPUDetails = false
        /*
        if (Game.time % 2300 == 1) {
            getCPUDetails = true;
        }
        */

    const allMyCreeps = Game.creeps;
    //let myRooms = ['W2N5', 'W2N4', 'W1N4', 'W3N4'];
    //let myRooms = [];
    let homeRoom = 'W2N5';
    // W3N4
    for (const i in Game.spawns) {
        let thisSpawn = Game.spawns[i];
        let thisRoom = thisSpawn.room;
        if (!myRooms.includes(thisRoom.name)) {
            myRooms.push(thisRoom.name);
            console.log('Adding ' + thisRoom.name + ' at ' + myRooms.indexOf(thisRoom.name));
        }
        let tickCounter = myRooms.indexOf(thisRoom.name);
        //thisRoom.memory.cpulog = getCPUDetails;
        let spawnTrigger = undefined;

        const allRoomCreeps = _.filter(allMyCreeps, (creep) => (
            creep.memory.spawner == i
        ));


        if (i == 'Spawn1') {
            if (Game.time % 23 == 1) {
                tempTest.run();
                //roomFuncs.run()
            }
        }

        let roomCreeps = thisRoom.find(FIND_MY_CREEPS);
        thisRoom.memory.roomcreeps = roomCreeps.length;
        if (roomCreeps.length == 0) {
            spawnTrigger = createCreep.run('harvester', i);
        }

        //if (thisRoom)

        if (Game.time % 53 == tickCounter * 3) {
            thisRoom.getRepairs();
            //roomFuncs.run(thisRoom.name);
        }


        roomTasks.run(thisRoom.name);

        if (!thisRoom.memory.useSources) {
            console.log('Getting sources');
            const roomSources = [];
            const sList = thisRoom.find(FIND_SOURCES);
            for (let x = 0; x < sList.length; x++) {
                roomSources.push(sList[x].id);
            }
            thisRoom.memory.useSources = roomSources;
        }

        let rMaxEnergy = thisRoom.energyAvailable;

        if (!thisRoom.storage) {
            console.log('no storage container');
        } else {
            rMaxEnergy = rMaxEnergy + thisRoom.storage.store[RESOURCE_ENERGY];
        }

        thisRoom.memory.energyavailable = rMaxEnergy;

        let hostiles = thisRoom.find(FIND_HOSTILE_CREEPS).length;
        if (hostiles > 0) {
            thisRoom.memory.underAttack = true;
        } else {
            thisRoom.memory.underAttack = false;
        }

        //if (getCPUDetails) console.log(thisRoom.name + ' tower cpu');
        //if (getCPUDetails) console.log("Start = " + Game.cpu.getUsed());
        defenseTower.run(thisRoom.name);
        //if (getCPUDetails) console.log("End = " + Game.cpu.getUsed());

        //if (getCPUDetails) console.log(thisRoom.name + ' set lists');
        //if (getCPUDetails) console.log("Start = " + Game.cpu.getUsed());

        let energytransfers = _.filter(allRoomCreeps, (creep) => (
            creep.memory.role == 'energytransfer'
        ));

        let containerminers = _.filter(allRoomCreeps, (creep) => (
            creep.memory.role == 'containerminer'
        ));

        let harvesters = _.filter(allRoomCreeps, (creep) => (
            creep.memory.role == 'harvester'
        ));

        let remoteharvesters = _.filter(allRoomCreeps, (creep) => (
            creep.memory.role == 'remoteharvester'
        ));

        let superharvesters = _.filter(allRoomCreeps, (creep) => (
            creep.memory.role == 'superharvester'
        ));

        let upgraders = _.filter(allRoomCreeps, (creep) => (
            creep.memory.role == 'upgrader'
        ));

        let builders = _.filter(allRoomCreeps, (creep) => (
            creep.memory.role == 'builder'
        ));

        let repairers = _.filter(allRoomCreeps, (creep) => (
            creep.memory.role == 'repairer'
        ));

        let roomtakers = _.filter(allRoomCreeps, (creep) => creep.memory.role == 'roomtaker');

        let remoteupgraders = _.filter(allRoomCreeps, (creep) => (
            creep.memory.role == 'remoteupgrader'
        ));

        let remotebuilders = _.filter(allRoomCreeps, (creep) => (
            creep.memory.role == 'remotebuilder'
        ));
        let energydonaters = _.filter(allRoomCreeps, (creep) => (
            creep.memory.role == 'energydonater'
        ));
        if (getCPUDetails) console.log("End = " + Game.cpu.getUsed());

        let minimumHarvesters = 1;
        let minimumUpgraders = 2;
        let minimumBuilders = 2;
        let minimumRepairers = 2;
        let minimumSuperHarvesters = 2;
        let maxRoomTakers = 1;
        let minimumRemoteUpgraders = 1;
        let minimumRemoteBuilders = 2;
        let minimumRemoteHarvesters = 0;
        let minimumEnergyDonaters = 0;
        if (thisRoom.energyCapacityAvailable < 500) {
            minimumHarvesters = 1;
            minimumUpgraders = 1;
            minimumBuilders = 3;
            minimumRepairers = 1;
            minimumSuperHarvesters = 0;
            minimumRemoteUpgraders = 0;
            minimumRemoteBuilders = 0;
        } else if (thisRoom.energyCapacityAvailable < 800) {
            minimumHarvesters = 1;
            minimumUpgraders = 1;
            minimumBuilders = 3;
            minimumRepairers = 1;
            minimumRemoteUpgraders = 1;
            minimumRemoteBuilders = 1;
            minimumSuperHarvesters = 0;
        } else if (thisRoom.energyCapacityAvailable > 10000) {
            minimumHarvesters = 0;
            minimumUpgraders = 1;
            minimumBuilders = 1;
            minimumRepairers = 1;
            minimumSuperHarvesters = 1;
            minimumRemoteUpgraders = 1;
            minimumRemoteBuilders = 1;
            minimumRemoteTakers = 1;
        } else if (thisRoom.energyCapacityAvailable > 2000) {
            minimumHarvesters = 0;
            minimumUpgraders = 3;
            minimumBuilders = 1;
            minimumRepairers = 4;
            minimumSuperHarvesters = 2;
            minimumRemoteUpgraders = 1;
            minimumRemoteBuilders = 2;
            minimumRemoteTakers = 1;
        }

        if (thisRoom.controller.level == 8) {
            minimumUpgraders = Math.min(minimumUpgraders, 1);
        }

        let edRoom = 'W2N4';
        if (Game.rooms['W3N4'].energyAvailable < Game.rooms['W2N4'].energyAvailable) {
            edRoom = 'W3N4';
        }
        if (i == 'Spawn1' && Game.rooms[edRoom].energyAvailable < 4000 && thisRoom.storage.store[RESOURCE_ENERGY] > 400000) {
            minimumEnergyDonaters = 2;
        }

        if (energydonaters.length < minimumEnergyDonaters) {
            //createEnergyDonater
            console.log('creating an energy donater: ' + thisRoom.name);
            if (energydonaters.length == 0) {
                spawnTrigger = thisSpawn.createEnergyDonater(thisRoom.storage.id, edRoom);
            } else if (energydonaters.length == 1) {

                spawnTrigger = thisSpawn.createEnergyDonater(thisRoom.storage.id, edRoom);

            }
        }




        let takeRoom = false;
        if (i == 'Spawn1') {
            takeRoom = false;
        }
        const takenRoom = false;


        let minimumEnergyTransfer = 0
        const allContainers = thisRoom.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER)
            }
        });

        minimumEnergyTransfer = allContainers.length;

        if (containerminers.length > 0) {
            minimumHarvesters = 0;
            minimumSuperHarvesters = 0;
        }


        // Check for miners
        let sources = thisRoom.find(FIND_SOURCES);

        // iterate over all sources
        for (let iSrc of sources) {
            // if the source has no miner
            if (!_.some(roomCreeps, c => c.memory.role == 'containerminer' && c.memory.sourceID == iSrc.id)) {
                // check whether or not the source has a container
                let containers = iSrc.pos.findInRange(FIND_STRUCTURES, 1, {
                    filter: s => s.structureType == STRUCTURE_CONTAINER
                });
                // if there is a container next to the source
                if (containers.length > 0) {
                    // spawn a miner
                    spawnTrigger = thisSpawn.createContainerMiner(iSrc.id);
                    break;
                }
            }
        }


        if (Game.time % 1024 == 1) {
            console.log(thisRoom.name);
            console.log(i + ' All: ' + allRoomCreeps.length);
            console.log(i + ' Harvesters: ' + harvesters.length + ' of ' + minimumHarvesters);
            if (minimumRemoteHarvesters > 0) {
                console.log(i + ' Remote Harvesters: ' + remoteharvesters.length + ' of ' + minimumRemoteHarvesters);
            }
            console.log(i + ' Upgraders: ' + upgraders.length + ' of ' + minimumUpgraders);
            console.log(i + ' Builders: ' + builders.length + ' of ' + minimumBuilders);
            console.log(i + ' Repairers: ' + repairers.length + ' of ' + minimumRepairers);
            console.log(i + ' Super Harvesters: ' + superharvesters.length + ' of ' + minimumSuperHarvesters);
            console.log(i + ' ContainerMiners: ' + containerminers.length + ' of ' + allContainers.length);
            console.log(i + ' Energy Transfers: ' + energytransfers.length + ' of ' + allContainers.length);
            if (energydonaters.length > 0) {
                console.log(i + ' Energy Donaters: ' + energydonaters.length + ' of ' + minimumEnergyDonaters);
            }

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


        if (energytransfers.length < minimumEnergyTransfer) {
            if (energytransfers.length == 0) {
                spawnTrigger = thisSpawn.createEnergyTransfer(300);
            } else {
                spawnTrigger = thisSpawn.createEnergyTransfer(600);
            }
        } else if (harvesters.length < minimumHarvesters && superharvesters.length == 0) {
            spawnTrigger = createCreep.run('harvester', i);
        } else if (harvesters.length == 0 && superharvesters.length == 0 && containerminers == 0) {
            spawnTrigger = createCreep.run('superharvester', i);
        } else if (roomtakers.length < maxRoomTakers && takeRoom) {
            spawnTrigger = createCreep.run('roomtaker', i);
        } else if (builders.length < minimumBuilders && builders.length == 0) {
            spawnTrigger = createCreep.run('builder', i);
        } else if (upgraders.length < minimumUpgraders) {
            spawnTrigger = createCreep.run('upgrader', i);
        } else if (superharvesters.length < minimumSuperHarvesters && superharvesters.length == 0) {
            spawnTrigger = createCreep.run('superharvester', i);
        } else if (builders.length < minimumBuilders) {
            spawnTrigger = createCreep.run('builder', i);
        } else if (repairers.length < minimumRepairers) {
            spawnTrigger = createCreep.run('repairer', i);
        } else if (harvesters.length < minimumHarvesters) {
            spawnTrigger = createCreep.run('harvester', i);
        } else if (superharvesters.length < minimumSuperHarvesters) {
            spawnTrigger = createCreep.run('superharvester', i);
        } else if (thisRoom.find(FIND_CONSTRUCTION_SITES).length > 5 && builders.length < 5) {
            //console.log('Emergency builder in ' + Game.spawns[i].room.name);
            spawnTrigger = createCreep.run('builder', i);
        } else if (thisRoom.energyAvailable > 2400 && upgraders.length < 5 && thisRoom.controller.level < 8) {
            spawnTrigger = createCreep.run('upgrader', i);
        }

        //else if (longDistanceHarvesters.length < minimumLongDistanceHarvester) {
        //    createCreep.run('longDistanceHarvester');
        //} 
        if (!spawnTrigger) {
            if (takeRoom && roomtakers.length < maxRoomTakers) {
                createCreep.run('roomtaker', i);
            }

            if (takenRoom && remoteupgraders.length < minimumRemoteUpgraders) {
                createCreep.run('remoteupgrader', i);
            }

            if (takenRoom && remotebuilders.length < minimumRemoteBuilders) {
                createCreep.run('remotebuilder', i);
            }
        }

    };

    if (getCPUDetails) console.log('Run actions');
    if (getCPUDetails) console.log("RA Start = " + Game.cpu.getUsed());

    for (let name in allMyCreeps) {
        let creep = Game.creeps[name];
        if (Game.creeps[name].ticksToLive < CREEP_LIFE_TIME) {
            creepController.run(creep);
        }
    }
    if (getCPUDetails) console.log("RA End = " + Game.cpu.getUsed());
}