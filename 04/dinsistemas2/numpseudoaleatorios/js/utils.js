/* COMMON */
function int(n){ return Number.parseInt(n); }

function float(n){ return Number.parseFloat(n); }

function max(arreglo) { return Math.max.apply(null, arreglo); }

var abs = function(numero){ return Math.abs(numero); }

var ordenar = function(arreglo){
	return arreglo.sort(Orden.asc);
}

var ordenar_desc = function(arreglo){
	return arreglo.sort(Orden.desc);
}

/* RENDERIZADO O PINTADO O DECORADORES */
var ceros = function(str, max){
	str = str.toString(); // por si no es cadena
	return str.length < max ? ceros("0" + str, max) : str;
}

var addClass = function(content, class_name){
	return "<span class='"+class_name+"'>"+content+"</span>";
}

var td = function(content, class_name){
	class_attr = class_name?("class='"+class_name+"'"):"";
	return "<td "+class_attr+">"+content+"</td>";
}

var tr = function(content){ return "<tr>"+content+"</tr>"; }

var rowRender = function(r,i){
	return tr(
		td("#"+(i+1), "text-muted") +
		td(r.semilla)+
		td(r.cuadrado)+
		td(r.nueva_semilla_formateada)+
		td(r.nueva_semilla,"text-center")+
		td(r.aleatorio.toFixed(digitos+1))
	);
}

var rowEmpyRender = function(i){
	return tr(td("---")+td("---")+td("---")+td("---")+td("---")+td("---"));
}

/* DEBUG */

function dlog(){
	Array.prototype.unshift.call(arguments, 'color:green;font-weight:bold;');
	Array.prototype.unshift.call(arguments, '%cDEBUG:');
	return console.debug(args, arguments)
}

function log(){ return console.log.apply(console,arguments ); }

var timers = {};

function timer(name) {
	timers[name + '_start'] = window.performance.now();
}

function timerEnd(name) {
	if (!timers[name + '_start']) return undefined;
	var time = window.performance.now() - timers[name + '_start'];
	var amount = timers[name + '_amount'] = timers[name + '_amount'] ? timers[name + '_amount'] + 1 : 1;
	var sum = timers[name + '_sum'] = timers[name + '_sum'] ? timers[name + '_sum'] + time : time;
	timers[name + '_avg'] = sum / amount;
	delete timers[name + '_start'];
	return time.toFixed(3);
}

(function(){

	/**
	 * Decimal adjustment of a number.
	 *
	 * @param   {String}    type    The type of adjustment.
	 * @param   {Number}    value   The number.
	 * @param   {Integer}   exp     The exponent (the 10 logarithm of the adjustment base).
	 * @returns {Number}            The adjusted value.
	 */
	function decimalAdjust(type, value, exp) {
		// If the exp is undefined or zero...
		if (typeof exp === 'undefined' || +exp === 0) {
			return Math[type](value);
		}
		value = +value;
		exp = +exp;
		// If the value is not a number or the exp is not an integer...
		if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
			return NaN;
		}
		// Shift
		value = value.toString().split('e');
		value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
		// Shift back
		value = value.toString().split('e');
		return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
	}

	// Decimal round
	if (!Math.round10) {
		Math.round10 = function(value, exp) {
			return decimalAdjust('round', value, exp);
		};
	}
	// Decimal floor
	if (!Math.floor10) {
		Math.floor10 = function(value, exp) {
			return decimalAdjust('floor', value, exp);
		};
	}
	// Decimal ceil
	if (!Math.ceil10) {
		Math.ceil10 = function(value, exp) {
			return decimalAdjust('ceil', value, exp);
		};
	}

})();

/* TRASH */
/*

var ordenar = function(arreglo){
	function partition(array, left, right) {
		var cmp = array[right - 1],
			minEnd = left,
			maxEnd;
		for (maxEnd = left; maxEnd < right - 1; maxEnd += 1) {
			if (array[maxEnd] <= cmp) {
				swap(array, maxEnd, minEnd);
				minEnd += 1;
			}
		}
		swap(array, minEnd, right - 1);
		return minEnd;
	}
	function swap(array, i, j) {
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
		return array;
	}
	function quickSort(array, left, right) {
		if (left < right) {
			var p = partition(array, left, right);
			quickSort(array, left, p);
			quickSort(array, p + 1, right);
		}
		return array;
	}
	return quickSort(arreglo, 0, arreglo.length);
}


*/
