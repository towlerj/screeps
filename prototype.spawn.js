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
            if (roleName == 'roomtaker') {
                let body = [CLAIM, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
                return this.createCreep(body, newName, { role: roleName, spawner: this.name, bodyParts: body });
            }
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
            noParts = Math.min(25, noParts);

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

            return this.createCreep(body, newName, { role: roleName, sources: sNumber, sourceID: srcName, spawner: this.name, bodyParts: body });
        };
    StructureSpawn.prototype.createRoomTaker =
        function(roomName, flagName) {
            let newName = this.name + '_roomtaker_' + Game.time;
            let body = [CLAIM, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            return this.createCreep(body, newName, { role: 'roomtaker', remoteroom: roomName, flagname: flagName, spawner: this.name, bodyParts: body });
        };

    StructureSpawn.prototype.createRemoteHarvester =
        function(energy, roomName) {
            // let's create a name
            let newName = this.name + '_remoteharvester_' + Game.time;
            let energyAvailable = this.room.energyAvailable;
            // and get a default energy source



            if (energyAvailable < 1000) {
                energy = Math.min(energy, 400);
            }
            // energy based body parts
            var noParts = Math.floor(energy / 200);
            noParts = Math.min(15, noParts);
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

            return this.createCreep(body, newName, { role: 'remoteharvester', remoteroom: roomName, spawner: this.name, bodyParts: body });
        };

    StructureSpawn.prototype.createContainerMiner =
        function(mineSourceID) {
            //console.log('CreateContainerMiner');
            let newName = this.name + '_containerminer_' + Game.time;
            if (this.room.energyAvailable >= 600) {
                return this.createCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE], newName, { role: 'containerminer', sourceID: mineSourceID, small: 1, spawner: this.name });
            } else if (this.room.energyAvailable < 400) {
                return this.createCreep([WORK, CARRY, MOVE], newName, { role: 'containerminer', sourceID: mineSourceID, small: 0, spawner: this.name });
            } else {
                return this.createCreep([WORK, WORK, WORK, CARRY, MOVE], newName, { role: 'containerminer', sourceID: mineSourceID, small: 0, spawner: this.name });
            }
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
    StructureSpawn.prototype.createEnergyDonater =
        function(localSrcID, remoteRoom) {
            // more move than carry, no work
            let newName = this.name + '_energydonater_' + remoteRoom + ' ' + Game.time;
            const parts = [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
            return this.createCreep(parts, newName, { role: 'energydonater', localsrc: localSrcID, remoteroom: remoteRoom, bodyParts: parts, spawner: this.name });
        };

};