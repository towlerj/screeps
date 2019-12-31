module.exports = function() {
    Room.prototype.getRepairs =
        function() {


            const roomName = this.name;
            var tempBoolean = false;

            this.memory.repairs = [];
            var repairTargets = this.find(FIND_MY_STRUCTURES, {
                filter: (object) => {
                    return (object.hits < object.hitsMax && object.hits < 500000)
                }
            });

            /*
            const locExtensions = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] > 0)
                }
            });
            */

            /*
            if (this.name == 'W2N4') {

                //console.log(this.name + ' repairs ' + repairTargets.length);
                const allStrucs = this.find(FIND_STRUCTURES)
                    //console.log(allStrucs.length);
                for (let x = 0; x < allStrucs.length; x++) {
                    let st = Game.getObjectById(allStrucs[x].id)
                    if (st.structureType == STRUCTURE_RAMPART) {
                        console.log(x + ' - ' + st.id + ' - ' + st.structureType + ' hits: ' + st.hits + ' maxhits: ' + st.hitsMax);
                        tempBoolean = true;
                    }
                }
            }
            */


            if (!repairTargets || repairTargets.length == 0) {
                repairTargets = this.find(FIND_STRUCTURES, {
                    filter: object => object.hits < object.hitsMax
                });
            }

            let numRepairs = repairTargets.length;
            /*
            if (this.name == 'W2N4') {
                console.log(numRepairs);
            }
            */


            //console.log(roomName + ' repairs ' + repairTargets.length);
            repairTargets.sort((a, b) => a.hits - b.hits);

            for (let x = 0; x < numRepairs; x++) {
                //if (this.name == 'W2N4') {
                //    console.log('Pushing ' + x + ': ' + repairTargets[x].id + ' - ' + repairTargets[x].structureType + ' - hits: ' + repairTargets[x].hits);
                //}
                this.memory.repairs.push(repairTargets[x].id);
            }


            const allCreeps = _.filter(Game.creeps, (creep) => (
                creep.room.name == this.name
            ));
            for (let x = 0; x < allCreeps.length; x++) {
                allCreeps[x].memory.repairTarget = '';
            }
            this.memory.repairCounter = 0;

        }
};