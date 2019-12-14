var roleUpgrader = require('role.upgrader');
var miscUtils = require('misc.utils');


var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        //var targets = miscUtils.constructionSites(creep);
        var targets = miscUtils.constructionSites(creep);
        
        
        if (!targets.length){
            //console.log('Builder is a harvester');
            roleUpgrader.run(creep);
        } else if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else if (creep.store[RESOURCE_ENERGY] == 0){
            
            
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
    
};

module.exports = roleBuilder;