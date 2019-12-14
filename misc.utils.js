
var miscUtils = {

    /** @param {Creep} creep **/
    constructionSites: function(creep) {
        //console.log('miscutils.constsites');
        
        //let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        return creep.room.find(FIND_CONSTRUCTION_SITES);
        //return targets;
    }
    /*
    energyInRoom: function(creep){
        var energyAvailable = 0;
        energyAvailable += Game.spawns.Spawn1.energy;
            _.filter(Game.structures, function(structure){
        if (structure.structureType == STRUCTURE_EXTENSION){
            energyAvailable += structure.energy;
        }
        });
        
        // Shows energy available to Spawn1 plus extensions
        console.log('Available energy:', energyAvailable);
    };
    */
};

module.exports = miscUtils;