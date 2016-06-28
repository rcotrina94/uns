pc.script.create('pickup', function (app) {
    // Creates a new Pickup instance
    var Pickup = function (entity) {
        this.entity = entity;
    };

    Pickup.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            this.entity.rotate(0, 1, 0);
        },
        
        onTriggerEnter: function (other) {
            this.entity.particlesystem.play();
            this.entity.model.enabled = false;
            var e = this.entity;
            setTimeout(function() {
                e.destroy();
            }, 4000);
            var uiEntity = app.root.findByName('UI');
            uiEntity.script.ui.addGem();
        }
        
        
    };

    return Pickup;
});