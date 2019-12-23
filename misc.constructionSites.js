
let miscConstructionSites = {

    /** @param {Creep} creep **/
    constructionSites: function(creep) {
        return creep.room.find(FIND_CONSTRUCTION_SITES);
    }

};

module.exports = miscConstructionSites;