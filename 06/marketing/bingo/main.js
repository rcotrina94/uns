var td = function(content, class_name){
	class_attr = class_name?("class='"+class_name+"'"):"";
	return "<td "+class_attr+">"+content+"</td>";
}

var tr = function(content){ return "<tr>"+content+"</tr>"; }
// var game;
// autoStart: false,
$(document).ready(function(){
	$("#init").hide();
	$("#tarjeta_container").hide();

	var Game = function(){
		var self = this;
		var isClient
		var initialized;
		var bolillas = (function(){
			var _bolillas = [];
			for (var i = 0; i < 75; i++) {
				_bolillas.push(i+1);
			};
			return _bolillas;
		})();

		var bingoInterval, bingofn = function(){
			// console.count("RANDOMS")
			var bl = bolillas.length;
			// console.warn("BOLILLAS: "+ bl);
			if (bl <= 0){
				clearInterval(bingoInterval);
			} else {
				var numero = bolillas.splice(r(bl)-1,1)[0]
				TogetherJS.send({type: "numero", numero : numero})
				self.marcarNumero(numero);
			}
		};

		var r = function(max){
			return Math.floor((Math.random() * max) + 1);
		};
		var rmin = function(min, max){
			return r(max) + min;
		};
		

		this.init = function(is_client){
			$("#play").hide();
			console.log("Inicializando como", isClient?"Cliente":"Servidor");
			isClient = is_client;
			if (isClient){
				TogetherJS.hub.on("numero", function (msg) {
					console.info("Mensaje" + msg.numero);
					self.marcarNumero(msg.numero);
				});
				TogetherJS.hub.on("start", function () {
					console.info("EMPEZANDO JUEGO");
					self.generateCard();
				});
				TogetherJS.hub.on("win", function(data){
					console.info("ALGUIEN GANÓ EL JUEGO");
					self.win(data.winner);
				});
			} else {
				$("#init").show();
			}
			initialized = true;
		}

		this.start = function(){
			if (!initialized) return false;

			if (!isClient){
				TogetherJS.send({type: "start"});
				console.log("INICIANDO JUEGO")
				setTimeout(function () {
					console.log("RANDOMS")
					bingoInterval = window.setInterval(bingofn, 2000)
				}, 1000);
			} else {}
			self.generateCard();
			$('#play').hide();
		}

		this.generateCard = function(){
			var condiciones = [
				{ min:  1, max : 15, qty: 5},
				{ min: 16, max : 30, qty: 5},
				{ min: 31, max : 45, qty: 4},
				{ min: 46, max : 60, qty: 5},
				{ min: 61, max : 75, qty: 5}
			];
			var tarjeta = [];
			for (var i = 0; i < condiciones.length; i++) {
				var cond = condiciones[i];
				var col = [];
				var _qty = 0;
				while (_qty < cond.qty){
					var num = rmin(cond.min, cond.max);
					if (col.indexOf(num) == -1){
						col.push(num);
						_qty++;
					}
				}
				tarjeta.push(col);
			};
			tarjeta[2].splice(2,0,"LIBRE");

			var html = "";
			for (var row = 0; row < 5; row++) {
				var _row = "";
				for (var col = 0; col < 5; col++) {
					var item = tarjeta[col][row];
					_row += td(item, isNaN(item)?"text-muted":"");
				};
				html += tr(_row);
			};
			$("#numeros").html(html);
			$("#tarjeta_container").show();
		};
		
		this.marcarNumero = function(num){
			$("#bolillas").prepend("<li>"+num+"</li>");
			var celdas = $("#numeros td");
			var nums = jQuery.map(celdas, function(elm){ return parseInt($(elm).text())});
			var index = nums.indexOf(num);
			// console.warn(num, index);
			if (index != -1){
				console.warn("ENCONTRADO")
				var celda = celdas[index];
				$(celda).addClass("warning");

				(function(){
					var column = celda.cellIndex;
					var row = $(celda).closest('tr').index();
					console.warn("Columna:", column, "Fila:",row);
				})();
				
			}
		};
		this.win = function(winner){
			clearInterval(bingoInterval);
			alert("El gannador es "+ winner)
		}
	};
	var session;
	var game = new Game();

	$("#init").click(function(){
		game.start();
	});

	$("#play").click(function(){
		$('html').css({'cursor' : 'wait !important'});
		TogetherJS(this)

	});

	TogetherJS.on("ready", function () {
		$('html').css({'cursor' : 'default'});
		session = TogetherJS.require("session");
		console.log(session.isClient?"CLIENTE":"SERVIDOR")
		game.init(session.isClient);
	});

	TogetherJS.on("close", function () {
		// close
	});

})

