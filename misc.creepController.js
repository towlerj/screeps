const roleUpgrader = require('role.upgrader');
const roleHarvester = require('role.harvester');
const roleBuilder = require('role.builder');
const roleRepairer = require('role.repairer');
const roleRoomTaker = require('role.roomtaker');
const roleRemoteHarvester = require('role.remoteharvester');
const roleRemoteUpgrader = require('role.remoteUpgrader');
const roleRemoteBuilder = require('role.remoteBuilder');
const roomTasks = require('room.taskQueue');
const roleContainerMiner = require('role.miner');
const roleEnergyTransfer = require('role.energytransfer');
const roomFuncs = require('misc.roomFuncs');

module.exports = {
    run: function(creep) {
        if (!creep.memory.role) {
            creep.memory.role = creep.memory.type;
        }
        let type = creep.memory.role;
        let room = creep.room;
        //let remoteRoom = 'W2N4';
        //let remoteRoom = 'W1N4';
        let remoteRoom = 'W3N4';
        const useTaskList = false;


        if (type == 'roomtaker') {
            roleRoomTaker.run(creep, remoteRoom);
        } /*else if (type == 'remoteupgrader') {
            roleRemoteUpgrader.run(creep, remoteRoom);
        } */
        else if (type == 'remotebuilder') {
            let buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
            creep.memory.buildTarget = buildTargets[0];
            roleRemoteBuilder.run(creep, remoteRoom);
        } else if (type == 'remoteharvester') {
            roleRemoteHarvester.run(creep);
        } 
        else if (type == 'containerminer') {
            roleContainerMiner.run(creep);
        } else if (type == 'harvester' || type == 'superharvester') {
            //console.log(creep.room.name + ' harvesting')
            roleHarvester.run(creep);
        } else if (useTaskList) {
            // need to fix the task list, so the creeps don't swithc role every tick
            let taskList = creep.room.memory.tasklist;
            if (taskList.length < 1) {
                roomTasks.run(creep.room.name);
                taskList = creep.room.memory.tasklist;
            }
            const nextTask = creep.room.memory.tasklist.shift();

            switch (nextTask) {
                case 'harvest':
                    roleHarvester.run(creep);
                    break;
                case 'upgrade':
                    roleUpgrader.run(creep);
                    break
                case 'build':
                    const buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
                    const closestBuildTarget = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                    creep.memory.buildTarget = closestBuildTarget;

                    roleBuilder.run(creep);
                    break;
                case 'repair':
                    const repairTargets = creep.room.find(FIND_STRUCTURES, {
                        filter: object => object.hits < object.hitsMax
                    });
                    repairTargets.sort((a, b) => a.hits - b.hits);
                    creep.memory.repairTarget = repairTargets[0];
                    roleRepairer.run(creep);
                    break;
                default:
                    roleUpgrader.run(creep);
                    break;
            }
        } else if (type == 'upgrader' || type == 'genric') {
            roleUpgrader.run(creep);
        } else if (type == 'energytransfer') {
            roleEnergyTransfer.run(creep);
        } else {
            /*
            let repContainer = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER  && structure.hits < 235000)
                }
            });
            //console.log(creep.room.name + ' rep ' + repContainer.length);
            //console.log(repContainer.length);
            let repairTargets = repContainer;
            if (repContainer.length == 0){
                repairTargets = creep.room.find(FIND_STRUCTURES, {
                    filter: object => object.hits < object.hitsMax
                });
            }
            */
            const repairTargets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });
            let numRepairs = repairTargets.length;
            
            repairTargets.sort((a, b) => a.hits - b.hits);
            if (repairTargets.length > 0){
                creep.memory.repairTarget = repairTargets[0].id;
             }
            /* 
            console.log(creep.room.name);
            if (creep.room.memory.repairs.length == 0){
                roomFuncs.run(creep.memory.name);
            }
            const thisRepair = creep.memory.repairs.shift();
            creep.memory.repairTarget = thisRepair;
            */

            const buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
            const closestBuildTarget = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            creep.memory.buildTarget = closestBuildTarget;

            let numBuild = buildTargets.length;
            
            
            if (numRepairs < 1 && numBuild > 0) {
                roleBuilder.run(creep);
            } else if (type == 'builder' && numBuild > 0) {
                roleBuilder.run(creep);
            } else if (creep.room.energyAvailable < 100) {
                roleHarvester.run(creep);
            } else if (numBuild > 0 && type == 'builder') {
                roleBuilder.run(creep);
            } else if (numBuild > 5) {
                //console.log('BUILD ' + creep.room.name);
                roleBuilder.run(creep);
            } else if (numRepairs > 0) {
                roleRepairer.run(creep);
            } else {
                roleUpgrader.run(creep);
            }

        }

    }

};