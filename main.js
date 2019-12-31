require('prototype.spawn')();
let createCreep = require('create.creeps');
let roomMem = require('misc.roomMem');
let miscUtils = require('misc.constructionSites');
let creepController = require('misc.creepController');
let tempTest = require('misc.temp');
let defenseTower = require('defense.tower');
//require('misc.utils2');
let roomFuncs = require('misc.roomFuncs');
let roomTasks = require('room.taskQueue');

module.exports.loop = function() {

    let wantedRooms = ['W2N5', 'W2N4', 'W1N4', 'W3N4'];
    let homeRoom = 'W2N5';
    // W3N4
    for (const i in Game.spawns) {
        let spawnTrigger = undefined;



        if (i == 'Spawn1') {
            if (Game.time % 23 == 1) {
                tempTest.run();
                //roomFuncs.run()
            }
        }

        let thisSpawn = Game.spawns[i];
        let thisRoom = thisSpawn.room;
        let roomCreeps = thisRoom.find(FIND_MY_CREEPS);
        thisRoom.memory.roomcreeps = roomCreeps.length;
        if (roomCreeps.length == 0) {
            console.log(10);
            spawnTrigger = createCreep.run('harvester', i);
        }

        if (thisRoom)

            if (Game.time % 101 == 1) {
                //tempTest.run();
                //console.log("About to go to " + thisRoom.name + ' funcs');
                roomFuncs.run(thisRoom.name);
            }



            /*
            for (let c in roomCreeps) {
                console.log(c.name);
                if (!c.memory.spawner) {
                    c.memory.spawner = i;
                }
            }
            */

        roomTasks.run(thisRoom.name);

        if (!thisRoom.memory.useSources) {
            console.log('Gettign sources');
            const roomSources = [];
            const sList = thisRoom.find(FIND_SOURCES);
            for (let x = 0; x < sList.length; x++) {
                console.log(x);
                roomSources.push(sList[x].id);
            }
            thisRoom.memory.useSources = roomSources;
        }

        let rMaxEnergy = thisRoom.energyAvailable;
        
        /*
        let rLocStorage = thisRoom.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE)
                }
            });
            */
        rMaxEnergy = rMaxEnergy + thisRoom.storage.store[RESOURCE_ENERGY];
        
        thisRoom.memory.energyavailable = rMaxEnergy;
        
        let hostiles = thisRoom.find(FIND_HOSTILE_CREEPS).length;
        if (hostiles > 0) {
            thisRoom.memory.underAttack = true;
        } else {
            thisRoom.memory.underAttack = false;
        }

        defenseTower.run(thisRoom.name);

        let energytransfers = _.filter(Game.creeps, (creep) => (
            creep.memory.role == 'energytransfer' && creep.memory.spawner == i
        ));
        let containerminers = _.filter(Game.creeps, (creep) => (
            creep.memory.role == 'containerminer' && creep.memory.spawner == i
        ));

        let harvesters = _.filter(Game.creeps, (creep) => (
            creep.memory.role == 'harvester' && creep.memory.spawner == i
        ));

        let remoteharvesters = _.filter(Game.creeps, (creep) => (
            creep.memory.role == 'remoteharvester' && creep.memory.spawner == i
        ));

        //let harvesters = _.sum(roomCreeps, (c) => c.memory.role == 'harvester');


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
        let energydonaters = _.filter(Game.creeps, (creep) => (
            creep.memory.role == 'energydonater' && creep.memory.spawner == i
        ));

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
            minimumRepairers = 2;
            minimumSuperHarvesters = 2;
            minimumRemoteUpgraders = 1;
            minimumRemoteBuilders = 2;
            minimumRemoteTakers = 1;

        }
        //creep.room.memory.energyavailable
        if (i == 'Spawn1' && Game.rooms['W3N4'].energyAvailable < 4000) {
            minimumEnergyDonaters = 2;
        }

        if (energydonaters.length < minimumEnergyDonaters) {
            //createEnergyDonater
            console.log('creating an energy donater: ' + thisRoom.name);
            if (energydonaters.length == 0) {
                spawnTrigger = thisSpawn.createEnergyDonater('faebe566e23c5dc', 'W3N4');
            } else if (energydonaters.length == 1) {

                spawnTrigger = thisSpawn.createEnergyDonater('faebe566e23c5dc', 'W3N4');

            } else if (energydonaters.length == 2) {

                spawnTrigger = thisSpawn.createEnergyDonater('faebe566e23c5dc', 'W1N4');

            }
        }

        /*
        if (thisRoom.name == 'W2N4'){
            minimumRemoteHarvesters = 1;
        }
        */
        if (thisRoom.controller.level == 8) {
            minimumUpgraders = Math.min(minimumUpgraders, 1);
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
        /*
        minimumEnergyTransfer = allContainers.length + 1;
        if (thisRoom.maxEnergy < 2000) {
            minimumEnergyTransfer = allContainers.length * 2;
        }
        */
        //minimumEnergyTransfer = 0;

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
                    //console.log(thisRoom.name + ' needs a miner');
                    spawnTrigger = thisSpawn.createContainerMiner(iSrc.id);
                    break;
                }
            }
        }


        if (Game.time % 181 == 1) {
            const allCreeps = _.filter(Game.creeps, (creep) => (
                creep.memory.spawner == i
            ));
            console.log(thisRoom.name);
            console.log(i + ' All: ' + allCreeps.length);
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

        if (!spawnTrigger) {
            if (energytransfers.length < minimumEnergyTransfer) {
                //console.log(thisRoom.name + ' ' + 1);
                if (energytransfers.length == 0) {
                    spawnTrigger = thisSpawn.createEnergyTransfer(300);
                } else {
                    spawnTrigger = thisSpawn.createEnergyTransfer(600);
                }
            } else if (harvesters.length < minimumHarvesters && superharvesters.length == 0) {
                //console.log(2);
                spawnTrigger = createCreep.run('harvester', i);
            } else if (harvesters.length == 0 && superharvesters.length == 0 && containerminers == 0) {
                //console.log(3);
                spawnTrigger = createCreep.run('superharvester', i);
            } else if (roomtakers.length < maxRoomTakers && takeRoom) {
                //console.log(4);
                spawnTrigger = createCreep.run('roomtaker', i);
            }
            /** else if (remoteharvesters.length < minimumRemoteHarvesters) {
                           spawnTrigger = thisSpawn.createRemoteHarvester(thisRoom.energyAvailable,'W2N3');
                       } */
            else if (builders.length < minimumBuilders && builders.length == 0) {
                //console.log(1);
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
        }
    };


    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        if (Game.creeps[name].ticksToLive < CREEP_LIFE_TIME) {
            creepController.run(creep);
        }
    }
};