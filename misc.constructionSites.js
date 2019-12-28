let miscConstructionSites = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //const buildSites = creep.room.find(FIND_CONSTRUCTION_SITES);
        let target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        console.log('In construction sites');
        //return target;
        return creep.room.find(FIND_CONSTRUCTION_SITES);

    }

};

module.exports = miscConstructionSites;