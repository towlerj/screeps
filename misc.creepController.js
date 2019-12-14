const roleUpgrader = require('role.upgrader');
const roleHarvester = require('role.harvester');
const roleBuilder = require('role.builder');
const roleRepairer = require('role.repairer');

module.exports = {
    run: function(creep){
        let type = creep.memory.role;

        if (type == 'harvester'){
            roleHarvester.run(creep);
        } else if (type == 'upgrader'){
            roleUpgrader.run(creep);
        } else {
            const repairTargets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });
            repairTargets.sort((a,b) => a.hits - b.hits);
            const buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);


            if (type == 'builder'){
                roleBuilder.run(creep);
            } else if (type = 'repairer'){
                roleRepairer.run(creep);
            } else {
                console.log('Unknown type being sent to upgrade ' + type);
                roleUpgrader.run(creep);
            }

        }







    }
 
};