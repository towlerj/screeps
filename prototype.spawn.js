/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('prototype.spawn');
 * mod.thing == 'a thing'; // true
 */

module.exports = function() {
    StructureSpawn.prototype.createCustomCreep =
        function(energy, roleName) {
            // let's create a name
            let newName = this.name + '_' + roleName + '_' + Game.time;
            let energyAvailable = this.room.energyAvailable;
            // and get a default energy source
            let sList = Game.spawns[this.name].room.find(FIND_SOURCES)
            const sNumber = Math.floor(Math.random() * sList.length)
            const srcName = sList[sNumber].id;

            if (energyAvailable < 1000) {
                energy = Math.min(energy, 400);
            }

            // energy based body parts
            var noParts = Math.floor(energy / 200);

            var body = [];
            for (let i = 0; i < noParts; i++) {
                body.push(WORK);
            }
            for (let i = 0; i < noParts; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < noParts; i++) {
                body.push(MOVE);
            }

            return this.createCreep(body, newName, { role: roleName, sources: sNumber, sourceID: srcName, spawner: this.name });
        };
    StructureSpawn.prototype.createContainerMiner =
        function(mineSourceID) {
            //console.log('CreateContainerMiner');
            let newName = this.name + '_containerminer_' + Game.time;
            return this.createCreep([WORK, WORK, WORK, WORK, WORK, MOVE], newName, { role: 'containerminer', sourceID: mineSourceID, spawner: this.name });
        };
    StructureSpawn.prototype.createEnergyTransfer =
        function(energy) {
            // more move than carry, no work
            var numberOfParts = Math.floor(energy / 150);
            var body = [];
            for (let i = 0; i < numberOfParts * 2; i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }
            let newName = this.name + '_energytransfer_' + Game.time;
            //console.log('creating an energy tranferererer');
            return this.createCreep(body, newName, { role: 'energytransfer', working: false, spawner: this.name });
        };

};