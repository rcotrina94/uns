var td = function(content, class_name){
	class_attr = class_name?("class='"+class_name+"'"):"";
	return "<td "+class_attr+">"+content+"</td>";
}

var tr = function(content){ return "<tr>"+content+"</tr>"; }
// var game;
// autoStart: false,

var $STATS = {};

$(document).ready(function(){
	$("#init").hide();
	$("#tarjeta_container").hide();
	var session;
	var peers;

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

			var bl = bolillas.length;
			// console.warn("BOLILLAS: "+ bl);
			if (bl <= 0){
				clearInterval(bingoInterval);

				var me = peers.Self.name || peers.Self.defaultName;
				var winners = me;
				var qty = $("#numeros td.warning").length;

				for (name in $STATS){
					if ($STATS[name] == qty){
						winners += ","+name;
					} else if ($STATS[name] > qty){
						winners = name;
					}
				}
				console.warn(winners);
				TogetherJS.send({type: "win", winner : winners});
				self.win(winners);

			} else {
				console.count("BOLILLA");
				var numero = bolillas.splice(r(bl)-1,1)[0]
				TogetherJS.send({type: "numero", numero : numero})
				self.marcarNumero(numero);
			}
		};

		var r = function(max){
			return Math.floor((Math.random() * max) + 1);
		};
		var rmin = function(min, max){
			return r(max-min) + min;
		};


		this.init = function(is_client){
			$("#play").hide();
			console.log("Inicializando como", isClient?"Cliente":"Servidor");
			isClient = is_client;
			if (isClient){
				TogetherJS.hub.on("numero", function (msg) {
					console.warn("Numero a marcar:", msg.numero);
					self.marcarNumero(msg.numero);
				});
				TogetherJS.hub.on("start", function () {
					console.info("EMPEZANDO JUEGO");
					self.generateCard();
				});
				TogetherJS.hub.on("togetherjs.hello", function(){
					console.warn("HELLO")
				});

			} else {
				$("#init").show();

				TogetherJS.hub.on("stats", function(msg){
					$STATS[msg.client] = msg.qty;
					console.warn("STATS:", $STATS);
				});

			}
			TogetherJS.hub.on("win", function(data){
				console.info("ALGUIEN GANÓ EL JUEGO");
				self.win(data.winner);
			});

			initialized = true;
		}

		this.start = function(){
			if (!initialized) return false;

			if (!isClient){
				TogetherJS.send({type: "start"});
				console.log("INICIANDO JUEGO")
				setTimeout(function () {
					console.log("RANDOMS")
					bingoInterval = window.setInterval(bingofn, 1500)
				}, 1000);
			} else {}
			self.generateCard();
			$('#init').hide();
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
			$("#peers").hide();
			$("#tarjeta_container").show();
		};

		this.marcarNumero = function(num){
			$("#bolillas").prepend("<li>"+num+"</li>");
			var celdas = $("#numeros td");
			var nums = jQuery.map(celdas, function(elm){ return parseInt($(elm).text())});
			console.warn("CELDAS TOTALES", nums.length);

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
				if ($('#numeros td.warning').length >= 24){
					var winner = {
						name : peers.Self.name || peers.Self.defaultName
					};
					TogetherJS.send({type: "win", winner : winner.name})
					self.self_win();
				} else {
					var me = peers.Self.name || peers.Self.defaultName;
					var qty = $("#numeros td.warning").length;
					TogetherJS.send({type: "stats", client: me, qty : qty})
				}
			}
		};
		this.self_win = function(){
			clearInterval(bingoInterval);
			alert("Felicidades! eres el ganador :3");
		};
		this.win = function(winner){
			clearInterval(bingoInterval);
			alert("El ganador es "+ winner)
		};
	};

	var game = new Game();

	$("#init").click(function(){
		game.start();
	});

	$("#play").click(function(){
		$('html').css({'cursor' : 'wait !important'});
		TogetherJS(this)

	});

	// var template = '<div class="col-sm-3 col-md-3">
	// 					<div class="thumbnail">
	// 						<img src="__img__">
	// 						<div class="caption">
	// 							<h3>__name__</h3>
	// 						</div>
	// 					</div>
	// 				</div>'

	TogetherJS.on("ready", function () {
		$('html').css({'cursor' : 'default'});
		session = TogetherJS.require("session");
		peers = TogetherJS.require("peers");


		console.log(session.isClient?"CLIENTE":"SERVIDOR")
		game.init(session.isClient);
	});

	TogetherJS.on("close", function () {
		// close
	});

})

