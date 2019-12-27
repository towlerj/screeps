const roleUpgrader = require('role.upgrader');
const roleHarvester = require('role.harvester');
const roleBuilder = require('role.builder');
const roleRepairer = require('role.repairer');
const roleRoomTaker = require('role.roomtaker');
const roleLongDistHarvester = require('role.longdistanceharvester');
const roleRemoteUpgrader = require('role.remoteUpgrader');
const roleRemoteBuilder = require('role.remoteBuilder');

module.exports = {
    run: function(creep) {
        let type = creep.memory.role;
        let room = creep.room;
        //let remoteRoom = 'W2N4';
        //let remoteRoom = 'W1N4';
        let remoteRoom = 'W3N4';

        if (type == 'roomtaker') {
            roleRoomTaker.run(creep, remoteRoom);
        } else if (type == 'remoteupgrader') {
            roleRemoteUpgrader.run(creep, remoteRoom);
        } else if (type == 'remotebuilder') {
            let buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
            creep.memory.buildTarget = buildTargets[0];
            roleRemoteBuilder.run(creep, remoteRoom);
        } else if (type == 'harvester' || type == 'superharvester') {
            //console.log(creep.room.name + ' harvesting')
            roleHarvester.run(creep);
        } else if (type == 'upgrader' || type == 'genric') {
            roleUpgrader.run(creep);
        } else {
            const repairTargets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });

            repairTargets.sort((a, b) => a.hits - b.hits);
            const buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
            const closestBuildTarget = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            //console.log(closestBuildTarget);
            creep.memory.buildTarget = closestBuildTarget;

            let numBuild = buildTargets.length;
            let numRepairs = repairTargets.length;

            if (numRepairs < 1 && numBuild > 0) {
                roleBuilder.run(creep);
            } else if (type == 'builder' && numBuild > 0) {
                roleBuilder.run(creep);
            } else if (creep.room.energyAvailable < 100) {
                roleHarvester.run(creep);
            } else if (numBuild > 0 && type == 'builder') {
                roleBuilder.run(creep);
            } else if (numRepairs > 0) {
                creep.memory.repairTarget = repairTargets[0];
                roleRepairer.run(creep);
            } else {
                roleUpgrader.run(creep);
            }

        }
    }

};