/*
 * *****
 * WRITTEN BY FLORIAN RAPPL, 2012.
 * florian-rappl.de
 * mail@florian-rappl.de
 * *****
 */

var keys = {
	bind : function() {
		$(document).on('keydown', function(event) {
			return keys.handler(event, true);
		});
		$(document).on('keyup', function(event) {
			return keys.handler(event, false);
		});
	},
	reset : function() {
		keys.left = false;
		keys.right = false;
		keys.accelerate = false;
		keys.up = false;
		keys.down = false;
		// 2nd player
		keys.left2 = false;
		keys.right2 = false;
		keys.accelerate2 = false;
		keys.up2 = false;
		keys.down2 = false;
	},
	unbind : function() {
		$(document).off('keydown');
		$(document).off('keyup');
	},
	handler : function(event, status) {
		switch(event.keyCode) {
			case 57392://CTRL on MAC
			case 17://CTRL
			case 65://A
				keys.accelerate = status;
				break;
			case 40://DOWN ARROW
				keys.down = status;
				break;
			case 39://RIGHT ARROW
				keys.right = status;
				break;
			case 37://LEFT ARROW
				keys.left = status;
				break;
			case 38://UP ARROW
				keys.up = status;
				break;
			// 2nd player
			case 32://SPACE
				keys.accelerate2 = status;
				break;
			case 75://DOWN ARROW
				keys.down2 = status;
				break;
			case 76://RIGHT ARROW
				keys.right2 = status;
				break;
			case 74://LEFT ARROW
				keys.left2 = status;
				break;
			case 73://UP ARROW
				keys.up2 = status;
				break;
			default:
				return true;
		}

		event.preventDefault();
		return false;
	},
	accelerate : false,
	left : false,
	up : false,
	right : false,
	down : false,
	accelerate2 : false,
	left2 : false,
	up2 : false,
	right2 : false,
	down2 : false
};
