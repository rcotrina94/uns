pc.script.attribute('rotationSpeed', 'number', 3, {
    displayName: 'Rotational speed'
});

pc.script.create('camerastick', function (app) {
    // Creates a new Camerastick instance
    var Camerastick = function (entity) {
        this.entity = entity;
        this.rotation = 0;
    };

    Camerastick.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
        },

        // Called every frame, dt is time in seconds since last update
        postUpdate: function (dt) {
            if (app.keyboard.isPressed(pc.KEY_Q)) {
                this.rotation -= this.rotationSpeed;
            }
            
            if (app.keyboard.isPressed(pc.KEY_E)) {
                this.rotation += this.rotationSpeed;
            }
            
            this.rotation %= 360;
            
            this.entity.setEulerAngles(0, this.rotation, 0);
        }
    };

    return Camerastick;
});