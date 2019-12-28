/*
build a task queue, rather than having defined roles
 */

module.exports = {
    run: function(roomName){
        const thisRoom = Game.rooms[roomName];
        if (!thisRoom.memory.tasklist || (thisRoom.memory.tasklist.length == 0)){
            //console.log('setting tasks queue');
            const buildTargets = thisRoom.find(FIND_CONSTRUCTION_SITES);
            let buildCount = buildTargets.length;

            const repairTargets = thisRoom.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });
            let repairCount = repairTargets.length;
            
            const tasks = [];
            tasks.push('harvest');
            tasks.push('upgrade');
            tasks.push('harvest');
            if (buildCount > 0){
                tasks.push('build');
                buildCount --;
            }
            if (repairCount > 0){
                tasks.push('repair');
                repairCount --;
            }
            tasks.push('upgrade');
            for (let x = 0;x < 3;x++){
                if (buildCount > 0){
                    tasks.push('build');
                    buildCount --;
                }
                if (repairCount > 0){
                    tasks.push('repair');
                    repairCount --;
                }
            }
            thisRoom.memory.tasklist = tasks;
        }
        
    }
};