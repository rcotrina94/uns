app.factory('Test', function(){
	var getIntervalos = function(num_intervalos, states){
		var intervals = {};

		for (var index = 0; index < num_intervalos; index++ ){
			var _inter = (index+1)/num_intervalos;
			intervals[index] = {
				value : _inter,
				count : 0
			};
		}

		for (var index = 0; index < states.length; index++){

			var number = float(states[index]);

			for (var interval in intervals){

				if (number <= intervals[interval].value){
					intervals[interval].count++;
					break;
				}
			}
		}
		return intervals;
	}

	var ChiSquare_test = function(opts){
		var qty = float(opts.qty),
			states = opts.states,
			precision = opts.precision;
			decimals = -precision;

		var $K, $E;

		$K = qty>100?Math.round(Math.sqrt(qty)):10;
		// console.log($K)
		var intervalos = getIntervalos($K, states);

		$E = float(qty/$K);

		var tabla = [];
		var chisum = float(0);

		for (intervalo in intervalos){
			var $O = intervalos[intervalo].count;
			var dif = float($O-$E);
			var chi = float(Math.pow(dif,2)/$E);
			chisum += float(chi);
			tabla.push({
				0 : Math.round10(intervalos[intervalo].value, decimals-2).toFixed(precision+1),
				1 : $O,
				2 : Math.round10($E, decimals).toFixed(precision),
				3 : Math.round10(dif, decimals).toFixed(precision),
				4 : Math.round10(chi, decimals).toFixed(precision)
			})
		}
		return {
			"table" : tabla,
			"result": Math.round10(chisum, decimals).toFixed(precision)
		}
	}


	var KS_test = function(opts){
		var _data = [];
		var qty = float(opts.qty),
			states = opts.states,
			precision = opts.precision;
			decimals = -precision;

		var abs1 = [], abs2 = [];
		console.time(times.ordering);
		var fx = ordenar(states.slice(0));
		console.timeEnd(times.ordering);

		for (var i = 0; i < states.length; i++) {
			var x = states[i];
			var a1,a2,b1,b2;
			var fxi = fx[i];

			a1 = i/qty;
			b1 = (i-1)/qty;
			a2 = a1 - fxi;
			b2 = fxi - b1;
			var _abs1 = abs(a2),
				_abs2 = abs(b2);

			_data.push({
				0 : (i+1),
				1 : states[i].toFixed(precision),
				2 : fxi.toFixed(precision),
				3 : Math.round10(a1, decimals).toFixed(precision),
				4 : Math.round10(b1, decimals).toFixed(precision),
				5 : Math.round10(a2, decimals).toFixed(precision),
				6 : Math.round10(b2, decimals).toFixed(precision),
				7 : Math.round10(_abs1, decimals).toFixed(precision),
				8 : Math.round10(_abs2, decimals).toFixed(precision)
			})

			abs1.push(_abs1);
			abs2.push(_abs2);
		}

		console.time(times.max_abs);
		// if (n>MAX_LIMIT){
			console.time(times.max_abs);
			abs1 = ordenar_desc(abs1)[0];
			abs2 = ordenar_desc(abs2)[0];
			console.timeEnd(times.max_abs);
		/*} else {

			xd = abs1;
			console.log(abs1, abs2);
			abs1 = max(abs1);
			abs2 = max(abs2);
		}*/
		// console.log(abs1, abs2)

		console.timeEnd(times.max_abs);

		var _abs, _ks;

		_abs = Math.max(abs1,abs2);
		_ks = KS(qty,0.05)
		// console.log(_abs, _ks);
		var r = "";
		if (_abs < _ks){
			r = "ABS: "+Math.round10(_abs, decimals).toFixed(precision)+" es MENOR que "+Math.round10(_ks, decimals).toFixed(precision)+" -> Hipótesis verdadera";
		} else {
			r = "ABS: "+Math.round10(_abs, decimals).toFixed(precision)+" es MAYOR que "+Math.round10(_ks, decimals).toFixed(precision)+" -> Hipótesis se rechaza";
		}

		return {
			abs : _abs,
			ks : _ks,
			"table" : _data,
			"result" : r
		}
	}

	return {
		0 : ChiSquare_test,
		1 : KS_test
	}
});
