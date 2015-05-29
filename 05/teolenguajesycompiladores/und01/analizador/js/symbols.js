var TS = {
	
}


var es_palabraReservada = function(palabra){
	var indice = Object.keys(palabras_reservadas).indexOf(palabra);
	if (indice + 1){
		return palabras_reservadas[palabra];
	} else {
		return false;
	}
};

var es_delimitador = function(palabra){
	var indice = Object.keys(delimitadores).indexOf(palabra);
	if (indice + 1){
		return delimitadores[palabra];
	} else {
		return false;
	}
};

var es_Numero = function(word){
	return (!Number.isNaN(Number(word)));
};

var es_Letra = function(caracter){
	return alfabeto.indexOf(caracter[0].toLowerCase()) != -1;
};

var es_Identificador = function(word){
	if (es_Letra(word[0])) {
		var validar_Identificador = function(word){
			var caracter = word[0];
			if (es_Letra(caracter) || es_Numero(caracter) || caracter == "_"){
				if (word.length == 1) {
					return true;
				} else {
					return validar_Identificador(word.substr(1));
				}
			} else {
				return false;
			}
		};
		return validar_Identificador(word);
	} else {
		return false;
	}
};