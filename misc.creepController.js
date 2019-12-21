const roleUpgrader = require('role.upgrader');
const roleHarvester = require('role.harvester');
const roleBuilder = require('role.builder');
const roleRepairer = require('role.repairer');
const roleRoomTaker = require('role.roomtaker');
const roleLongDistHarvester = require('role.longdistanceharvester');

module.exports = {
    run: function(creep){
        let type = creep.memory.role;
        let room = creep.room;
        
        /*
        //if (creep.memory.sources == 0){
            let sources = creep.room.find(FIND_SOURCES);
            let useSource = sources[Game.time % 2];
            //creep.memory.sources = 0;
            creep.memory.sources = useSource.pos;
        //}
        */
        if (type == 'roomtaker'){
            //console.log('in controller roomtaker');
            roleRoomTaker.run(creep,'W2N4');
        }
        else if (type == 'harvester' || type == 'superharvester'){
            roleHarvester.run(creep);
        } 
        else if (type == 'upgrader' || type == 'genric'){
            roleUpgrader.run(creep);
        } 
        else {
            const repairTargets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });

            repairTargets.sort((a, b) => a.hits - b.hits);
            const buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);

            let numBuild = buildTargets.length;
            let numRepairs = repairTargets.length;
            
            if (numRepairs<1 && numBuild>0){
                creep.memory.buildTarget = buildTargets[0];
                console.log('All building');
                roleBuilder.run(creep);
            } else if (type == 'builder' && numBuild>0){
                creep.memory.buildTarget = buildTargets[0];
                roleBuilder.run(creep);
            } else if (creep.room.energyAvailable < 100) {
                //console.log('We need eneeeergy');
                roleHarvester.run(creep);
            } else if (numBuild > 0 && type == 'builder'){
                //console.log('Builder to upgrader - <50 repairs');
                creep.memory.buildTarget = buildTargets[0];
                roleBuilder.run(creep);
            } else if (numRepairs > 0){
                creep.memory.repairTarget = repairTargets[0];
                roleRepairer.run(creep);
            } else {
                console.log('Unknown type being sent to upgrade ' + type);

                roleUpgrader.run(creep);
            }

        }
    }
 
};