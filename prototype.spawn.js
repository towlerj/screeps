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
            //sList = Game.spawns[spawnName].room.find(FIND_SOURCES)

            //const sNumber = Math.floor(Math.random() * sList.length)
            
            // and get a default energy source
            let sList = Game.spawns[this.name].room.find(FIND_SOURCES)
            const sNumber = Math.floor(Math.random() * sList.length)
            const srcName = sList[sNumber].id;

            // energy based body parts
            //var noParts = Math.min(4,Math.floor(energy / 200));
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

            return this.createCreep(body, newName, { role: roleName, sources: sNumber,sourceID: srcName, spawner: this.name });
        };

};