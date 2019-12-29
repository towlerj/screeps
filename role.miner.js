module.exports = {

    run: function(creep) {

        let mySource = Game.getObjectById(creep.memory.sourceID);
        //console.log('MySource: ' + mySource.id);
        /*
        if (creep.body.length < 7 && creep.room.energyAvailable > 700){
            console.log(creep.name + ' goodbye cruel world');
            creep.suicide();
            
        } 
        */
        // find container next to source
        /*
        if (!mySource){
            console.log('miner container doesnt exist ' + creep.room.name);
            const ret = creep.room.createConstructionSite(creep.pos,STRUCTURE_CONTAINER);
            creep.say(ret);
            creep.memort.ret = ret;
            if (ret == OK){
                creep.suicide();
                return;
            } 
        } 
        */

            let container = mySource.pos.findInRange(FIND_STRUCTURES, 1, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
            })[0];
            /*
            if (!container){
                console.log('miner container doesnt exist ' + creep.room.name);
                //const ret = creep.room.createConstructionSite(creep.pos,STRUCTURE_CONTAINER);
                //creep.say(ret);
                //creep.memort.ret = ret;
                if (creep.room.createConstructionSite(creep.pos,STRUCTURE_CONTAINER) == OK){
                    creep.suicide();
                    
                } 
            }   
            */
            if (creep.pos.isEqualTo(container.pos)) {
                
                
                if (Game.time % 27 == 1){
                    creep.say('miner healing');
                    //console.log(creep.name + ' container hits ' + container.hits);
                    creep.repair(container);
                    //console.log(creep.name + ' container hits ' + container.hits);
                } else {
                    creep.say('mining');
                    creep.harvest(mySource);
                }

            }
            // if creep is not on top of the container
            else {
                creep.say('mnr mv');
                creep.moveTo(container);
            }
        

    }
};