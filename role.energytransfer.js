module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is bringing energy to a structure but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }
        creep.say('ET');
        // if creep is supposed to transfer energy to a structure
        if (creep.memory.working == true) {
            // find closest spawn, extension or tower which is not full

            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => (s.structureType == STRUCTURE_SPAWN ||
                        s.structureType == STRUCTURE_EXTENSION ||
                        s.structureType == STRUCTURE_TOWER) &&
                    s.energy < s.energyCapacity
            });

            // if we found one
            if (structure != undefined) {
                // try to transfer energy, if it is not in range
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(structure);
                }
            }
        }
        // if creep is supposed to get energy
        else {
            // find closest container
            //Game.getObjectById('5d33db37cf3ab93').store[RESOURCE_ENERGY]
            /*
            const repairTargets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });


            const buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
            const closestBuildTarget = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            creep.memory.buildTarget = closestBuildTarget;

            let numBuild = buildTargets.length;
            let numRepairs = repairTargets.length;
            repairTargets.sort((a, b) => a.hits - b.hits);
            */
            let container = creep.room.find(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0
            });
            container.sort((a, b) => a.store[RESOURCE_ENERGY] - b.store[RESOURCE_ENERGY]);
            const useContainer = container[0];
            /*
            let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0
            });
            */

            // if one was found
            if (useContainer != undefined) {
                // try to withdraw energy, if the container is not in range
                if (creep.withdraw(useContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(useContainer);
                }
            }
        }
    }
};
