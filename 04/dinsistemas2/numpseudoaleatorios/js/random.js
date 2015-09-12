app.factory('Random', function(){

	// https://github.com/peterolson/BigInteger.js

	var extraer_digitos_centrales = function(number, digits){
		number = number.toString();
		if ((number.length-digits)%2!=0){
			number="0"+number;
		}
		var aux = (number.length-digits)/2
		return {
			prev : number.slice(0,aux),
			center : number.slice(aux,-aux),
			post : number.slice(-aux)
		}
	}

	var cuadrados_centrales = function(sem, index, digits){
		var square = bigInt(sem).square();

		var ex_digits = extraer_digitos_centrales(square,digits);
		// console.log(ex_digits);
		var nueva_semilla = ex_digits.center

		// aplicar estilo:
		var cuadrado_formateado = ex_digits.prev +
			addClass(ex_digits.center,'text-danger text-bold') + ex_digits.post

		var aleatorio = float("0."+ex_digits.center)

		return {
			id : index,
			semilla : sem,
			cuadrado : cuadrado_formateado,
			aleatorio : aleatorio,
			nueva_semilla : nueva_semilla
		}
	}


	var producto_medio = function(s1, s2, index, digits){
		var producto = bigInt(s1).multiply(s2);
		var ex_digits = extraer_digitos_centrales(producto, digits);
		var nueva_semilla = ex_digits.center;

		var producto_formateado = ex_digits.prev+addClass(nueva_semilla,'text-danger text-bold')+ex_digits.post;

		return {
			id : index,
			s1 : s1,
			s2 : s2,
			producto : producto_formateado,
			aleatorio : float("0."+nueva_semilla),
			nueva_semilla : int(nueva_semilla)
		}
	};


	var producto_medio_modificado = function(seed, k, index, digits){
		var producto = bigInt(seed).multiply(k);
		var ex_digits = extraer_digitos_centrales(producto, digits);
		var nueva_semilla = ex_digits.center;

		var producto_formateado = ex_digits.prev+addClass(nueva_semilla,'text-danger text-bold')+ex_digits.post;
		return {
			id : index,
			seed : seed,
			k : k,
			producto : producto_formateado,
			aleatorio : float("0."+nueva_semilla),
			nueva_semilla : int(nueva_semilla)
		}
	};

	var bbs = function(seed, p, q, index, digits){
		var M = bigInt(p).multiply(q);
		var cuadrado = bigInt(seed).square();
		var mod = cuadrado.mod(M);

		return {
			id : index,
			seed : seed,
			cuadrado : cuadrado + addClass(" mod ", "text-blue")+M + " = "+mod,
			aleatorio : float("0."+mod.toString()).toFixed(M.toString().length),
			nueva_semilla : mod
		}
	}

	var Math_random = function(index){
		return {
			id : index,
			aleatorio : Math.random()
		}
	}

	return {
		0 : function(qty, opts){ // Cuadrados centrales
			var digits = (opts.seed+"").length;
			var index = 1, states = [];
			var seed = opts.seed;
			while (qty--){
				var r = cuadrados_centrales(seed, index++, digits)
				states.push({
					0 : addClass("#"+r.id, "text-muted"),
					1 : r.semilla,
					2 : r.cuadrado,
					3 : r.aleatorio.toFixed(digits)
				})
				seed = r.nueva_semilla;
				if (!seed){
					alert("La semilla generó una semilla nula (0), en la iteración: "+index);
					qty = index;
					break;
				}
			}
			return states;
		},
		1 : function(qty, opts){ // Producto Medio
			var index = 1, states = [], digits = opts.digits;
			var s1 = opts.seed1, s2 = opts.seed2;

			while (qty--){
				var r = producto_medio(s1, s2, index++, digits);
				states.push({
					0 : addClass("#"+r.id, "text-muted"),
					1 : r.s1,
					2 : r.s2,
					3 : r.producto,
					4 : r.aleatorio.toFixed(digits)
				});
				s1 = s2;
				s2 = r.nueva_semilla;
				if (!s1 || !s2){
					alert("Las semillas generaron una semilla nula (0), en la iteración: "+index);
					qty = index;
					break;
				}
			}
			return states;
		},
		2 : function(qty, opts){ // Producto Medio Modificado
			var index = 1, states = [], digits = opts.seed.toString().length;
			var seed = opts.seed, k = opts.k;

			while (qty--){
				var r = producto_medio_modificado(seed, k, index++, digits);
				states.push({
					0 : addClass("#"+r.id, "text-muted"),
					1 : r.seed,
					2 : r.producto,
					3 : r.aleatorio.toFixed(digits)
				});
				seed = r.nueva_semilla;
				if (!seed){
					alert("La semilla generó una semilla nula (0), en la iteración: "+index);
					qty = index;
					break;
				}
			}
			return states;
		},
		3 : function(qty, opts){ // Blum Blum Shub
			var index = 1, states = [], digits = opts.seed.toString().length;
			var seed = opts.seed, p = opts.p, q = opts.q;

			while (qty--){
				var r = bbs(seed,p, q, index++, digits);
				states.push({
					0 : addClass("#"+r.id, "text-muted"),
					1 : r.seed,
					2 : r.cuadrado,
					3 : r.aleatorio
				});
				seed = r.nueva_semilla;
				if (!seed){
					alert("La semilla generó una semilla nula (0), en la iteración: "+index);
					qty = index;
					break;
				}
			}
			return states;
		},
		4 : function(qty){ //
			var index = 1, states = [];
			var max = 0;
			while (qty--){
				var r = Math_random(index++);
				states.push({
					0 : addClass("#"+r.id, "text-muted"),
					1 : r.aleatorio.toFixed(20)
				});

			}
			console.log(max);
			return states;
		},
	}
});
