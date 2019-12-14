
let miscConstructionSites = {

    /** @param {Creep} creep **/
    constructionSites: function(creep) {

        

        return creep.room.find(FIND_CONSTRUCTION_SITES);

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

module.exports = miscConstructionSites;