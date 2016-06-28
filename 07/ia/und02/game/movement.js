// Controls the movement speed
pc.script.attribute('speed', 'number', 0.1, {
    min: 0.05,
    max: 0.5,
    step: 0.05,
    decimalPrecision: 2
});

// Script Definition
pc.script.create('movement', function (app) {
    
    // Creates a new Movement instance
    var Movement = function (entity) {
        this.entity = entity;
        this.force = new pc.Vec3();
        this.camera = null;
    };

    Movement.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.camera = app.root.findByName('camera');
        },
        
        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            
            var forward = this.camera.forward;
            var right = this.camera.right;
            
            var x = 0;
            var z = 0;
            
            
            // calculate force based on pressed keys
            if (app.keyboard.isPressed(pc.KEY_LEFT) || app.keyboard.isPressed(pc.KEY_A)) {
                x -= right.x;
                z -= right.z;
            } 
            
            if (app.keyboard.isPressed(pc.KEY_RIGHT) || app.keyboard.isPressed(pc.KEY_D)) {
                x += right.x;
                z += right.z;
            }
            
            if (app.keyboard.isPressed(pc.KEY_UP) || app.keyboard.isPressed(pc.KEY_W)) {
                x += forward.x;
                z += forward.z;
            } 
            
            if (app.keyboard.isPressed(pc.KEY_DOWN) || app.keyboard.isPressed(pc.KEY_S)) {
                x -= forward.x;
                z -= forward.z;
            }
            
            this.force.set(x, 0, z).scale(this.speed);
            
            // if we have some non-zero force
            if (this.force.length()) {
                
                // calculate force vector
                var rX = Math.cos(-Math.PI * 0.25);
                var rY = Math.sin(-Math.PI * 0.25);
                this.force.set(this.force.x * rX, 0, this.force.z * rX);
                
                // clamp force to the speed
                if (this.force.length() > this.speed) {
                    this.force.normalize().scale(this.speed);
                }
                
                // apply impulse to move the entity
                this.entity.rigidbody.applyImpulse(this.force);
            }
            
        }
    };

    return Movement;
});