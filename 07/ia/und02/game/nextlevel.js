pc.script.create('nextlevel', function (app) {
    // Creates a new Nextlevel instance
    var Nextlevel = function (entity) {
        this.entity = entity;
    };

    Nextlevel.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
        },

        onTriggerEnter: function() {
            app.root.findByName('scene').script.global.nextLevel();
        }
    };

    return Nextlevel;
});