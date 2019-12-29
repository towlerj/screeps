/*
Code originally from:
https://steamcommunity.com/app/464350/discussions/5/152390014801780540/
*/

module.exports = {

    //TOWER CODE
    run: function (myRoomName) {
        //console.log ('in tower code');
        var hostiles = Game.rooms[myRoomName].find(FIND_HOSTILE_CREEPS);
        var hostileHealers = Game.rooms[myRoomName].find(FIND_HOSTILE_CREEPS, { filter: (s) => (s.getActiveBodyparts(HEAL) > 0) });
        var hostileAttackers = Game.rooms[myRoomName].find(FIND_HOSTILE_CREEPS, { filter: (s) => ( s.getActiveBodyparts(ATTACK) > 0  || s.getActiveBodyparts(RANGED_ATTACK) > 0) });
        var hostiles = Game.rooms[myRoomName].find(FIND_HOSTILE_CREEPS);
        var towers = Game.rooms[myRoomName].find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
        var healerHit = false;
        
        //Alternative to finding towers:
        //var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);

        //if there are hostileHealers - attack them    
        if (hostileHealers.length > 0 && healerHit == false) {
            towers.forEach(tower => tower.attack(hostileHealers[0]));
            healerHit = true;
            if (Game.time % 50 == 1) {
                console.log(myRoomName + " ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ");
            }
        }
        
        //if there are hostileAttackers - attack them    
        else if (hostileAttackers.length > 0) {
            towers.forEach(tower => tower.attack(hostileAttackers[0]));
            healerHit = false;
            if (Game.time % 23 == 1) {
                console.log(myRoomName + " ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ");
            }
        }
        //if there are ANY Hostiles - attack them    
        else if (hostiles.length > 0) {
            towers.forEach(tower => tower.attack(hostiles[0]));
            healerHit = false;
            if (Game.time % 23 == 1) {
                console.log(myRoomName + " ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ALERT!!!! WE ARE UNDER ATTACK!!!!! ");
            }
        }

        if (towers.length == 0){
            console.length(myRoomName + ' has no towers');
        } else if (hostiles.length === 0) {
            //if there are no hostiles....
            //....first heal any damaged creeps
            for (let name in Game.creeps) {
                // get the creep object
                var creep = Game.creeps[name];
                if (creep.hits < creep.hitsMax) {
                    towers.forEach(tower => tower.heal(creep));
                    //console.log("Tower is healing Creeps.");
                }
            }
            /*
            //console.log(towers.length);
            //console.log(towers[0]);
            for (var x = 0; x< towers.length;x++) {
                let i = towers[x];
                //...repair Buildings! :) But ONLY until HALF the energy of the tower is gone.
                //Because we don't want to be exposed if something shows up at our door :)
                //console.log ('in tower code: here');
                //console.log(i.energy + ' ' + i.id);
                if (i.energy > ((i.energyCapacity / 10) * 5)) {
                    //let myContainers = 
                    console.log ('in tower code: here');
                    //Find the closest damaged Structure

                    
                    
                    let closestDamagedStructure = i.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                        filter: (structure) => {
                            return ((structure.structureType = STRUCTURE_CONTAINER)  && structure.store[RESOURCE_ENERGY] > 0)
                        }
                    });

                    if (closestDamagedStructure.length == 0){
                        let closestDamagedStructure = i.pos.findClosestByRange(FIND_MY_STRUCTURES, { filter: (s) =>  s.hits < s.hitsMax });
                    }

                    //var closestDamagedStructure = towers.pos.findClosestByRange(FIND_STRUCTURES, { filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART });
                    if (closestDamagedStructure) {
                        console.log('tower here');
                        i.repair(closestDamagedStructure);
                        console.log("The tower is repairing buildings.");
                    } 


                }
            }*/
        
        }
    }
};