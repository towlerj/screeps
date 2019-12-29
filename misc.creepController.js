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
const roleEnergyDonater = require('role.energydonater')
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


        if (type == 'roomtaker') {
            roleRoomTaker.run(creep, remoteRoom);
        } else if (type == 'energydonater') {
            roleEnergyDonater.run(creep);
        }
        /*else if (type == 'remoteupgrader') {
                   roleRemoteUpgrader.run(creep, remoteRoom);
               } */
        else if (type == 'remotebuilder') {
            let buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
            creep.memory.buildTarget = buildTargets[0];
            roleRemoteBuilder.run(creep, remoteRoom);
        } else if (type == 'remoteharvester') {
            roleRemoteHarvester.run(creep);
        } else if (type == 'containerminer') {
            roleContainerMiner.run(creep);
        } else if (type == 'harvester' || type == 'superharvester') {
            //console.log(creep.room.name + ' harvesting')
            roleHarvester.run(creep);
        } else if (type == 'upgrader' || type == 'genric') {
            roleUpgrader.run(creep);
        } else if (type == 'energytransfer') {
            roleEnergyTransfer.run(creep);
        } else {
            /*
            if (creep.room.memory.repairs.len == 0){
                roomFuncs.run(creep.room.name);
            }
            if (!creep.memory.repairs || creep.memory.repairs == ''){
                console.log(creep.name + ' repair target - ' + creep.memort.repairs);
                creep.memory.repairs = creep.room.memory.repairs.shift();
                console.log(creep.name + ' repair target - ' + creep.memort.repairs);
            }
            */
            let numRepairs = 1;
            //if (Game.time % 7 == 1){
            const repairTargets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });
            numRepairs = repairTargets.length;

            repairTargets.sort((a, b) => a.hits - b.hits);
            if (repairTargets.length > 0) {
                let rNum = Math.min(Math.floor(Math.random() * 5), repairTargets.length - 1);
                //console.log(repairTargets.length + ' - ' + rNum);
                creep.memory.repairTarget = repairTargets[rNum].id;
            }
            //}
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