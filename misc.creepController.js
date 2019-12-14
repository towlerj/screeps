const roleUpgrader = require('role.upgrader');
const roleHarvester = require('role.harvester');
const roleBuilder = require('role.builder');
const roleRepairer = require('role.repairer');

module.exports = {
    run: function(creep){
        let type = creep.memory.role;

        let room = creep.room;
        //room.memory.count = 1;
        //console.log(room.memory.count);


        if (type == 'harvester'){
            roleHarvester.run(creep);
        } else if (type == 'upgrader'){
            roleUpgrader.run(creep);
        } else {

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
                roleBuilder(creep);
            } else if (type == 'builder' && numBuild>0){
                creep.memory.buildTarget = buildTargets[0];
                roleBuilder.run(creep);
            } else if (creep.room.energyAvailable < 100) {
                //console.log('We need eneeeergy');
                roleHarvester.run(creep);
            }
            else if (numRepairs > 0){
                creep.memory.repairTarget = repairTargets[0];
                roleRepairer.run(creep);
            } else {
                console.log('Unknown type being sent to upgrade ' + type);

                roleUpgrader.run(creep);
            }

        }







    }
 
};