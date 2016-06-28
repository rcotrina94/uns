// Level manager

pc.script.create('global', function (app) {
    // Creates a new Global instance
    var Global = function (entity) {
        this.entity = entity;
        this.currentLevel = 0;
        this.levels = [
            440976,
            440975,
            440974
        ];
    };

    Global.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            if (app.keyboard.wasPressed(pc.KEY_R)) {
                this.resetGame();
            }
        },

        loadLevel: function(level) {
            app.root.destroy();
            app.loadSceneHierarchy(this.levels[level]+'.json', function(err, entity) {
                if (!err) {
                    entity.script.global.currentLevel = level;
                } else {
                    alert("Level not found. Please reload the page.");
                }
            });
        }, 

        nextLevel: function() {
            this.loadLevel((this.currentLevel + 1) % this.levels.length);
        },
        
        resetGame: function(){
            var uiEntity = app.root.findByName('UI');
            if (uiEntity){
                uiEntity.script.ui.resetGems();
            } else {
                console.log(uiEntity);
                console.log("No hubo UI");
            }
            this.currentLevel = 0;
            this.loadLevel(0);
        }
    };

    return Global;
});