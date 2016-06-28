// Controls the movement speed
pc.script.attribute('gems', 'number', 0, {
    min: 0,
    step: 1,
    decimalPrecision: 0
});


pc.script.create('ui', function (app) {
    var UI = function (entity) {
        this.entity = entity;
    };

    UI.prototype = {
        initialize: function () {
            // Create a div centred inside the main canvas
            var div = document.getElementById('gemsCounter');
            if (!div){
                div = document.createElement('div');
                div.id = 'gemsCounter';
                div.style.position = 'absolute';
                div.style.width = '500px';
                div.style.top = '80%';
                div.style.left = '80%';
                div.style.marginLeft = '-250px';            
                div.style.textAlign = 'center';
                div.style.color = 'white';
                div.style.fontSize = 'xx-large';
                div.style.visibility = 'hidden';
    
                // Add the div to the DOM as a child of the document's body element
                document.body.appendChild(div);
                div.innerHTML = this.gems || 0;
                this.setVisibility(true);

                this.div = div;
                // Set some default state on the UI element
                
            }
            this.div = div;
            this.gems = parseInt(div.innerHTML,10);
            this.setVisibility(true);

        },
        update: function(dt){
            this.div.innerHTML = this.gems;
        },
        // Some utility functions that can be called from other game scripts
        setVisibility: function (visible) {
            if (this.div)
                this.div.style.visibility = visible ? 'visible' : 'hidden';
        },
        addGem : function(){
            this.gems++;            
        },
        resetGems : function(){
            this.gems = 0;
            this.setText(0);
        },
        setText: function (message) {
            this.div.innerHTML = message;
        }
    };

    return UI;
});