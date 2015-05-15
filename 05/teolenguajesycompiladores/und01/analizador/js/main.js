var analizar = function(){
	var codigo = $('code').value;
	var palabras = [];
	var lineas = [];
	
	// separar por líneas
	codigo.split("\n").forEach(function(linea, index){
		linea = linea.trim()
		if (linea) {
			lineas.push(linea);	
		}
	});
	
	// Método para analizar las columnas de las líneas
	var analizar_linea = function(linea, index_linea){
		var columnas = linea.split("");
		
		var palabras_linea = [];
		var memoria = "";
		
		var addW = function(word){
			palabras_linea.push(word);
		};
		
		// Método para analizar cada caracter
		for (var columna_index = 0; columna_index < columnas.length; columna_index++) {
			var caracter = columnas[columna_index].trim();
			var siguiente_caracter = "";
			if (columna_index <= columnas.length - 2){
				siguiente_caracter = columnas[columna_index+1].trim();
			}
			
			if (!caracter) {
				if (memoria){
					addW(memoria);
					memoria = "";
				}
				continue;
			}
			
			if(es_palabraReservada(memoria+caracter)){
				palabras_linea.push(memoria+caracter);
				memoria = "";
				continue;
			}

			var indice_delimitador = Object.keys(delimitadores).indexOf(caracter);
			
			if ( indice_delimitador + 1){
				if (memoria) {
					palabras_linea.push(memoria);
					memoria = "";
				}
				var delim_multiple = tiene_multiple(caracter, siguiente_caracter);
				if (delim_multiple){
					palabras_linea.push(delim_multiple);
				} else {
					palabras_linea.push(caracter);
				}
				
			} else {
				memoria += caracter;
			}
		}
		palabras_linea.push(memoria);
		if (index_linea < lineas.length - 1){
			palabras_linea.push("↵");	
		}
		
		palabras = palabras.concat(palabras_linea);
	};
	// Analizar lineas de cada columna
	lineas.forEach(analizar_linea);
	
	var resultado_analizador = [];
	
	// Analizar palabras encontradas
	palabras.forEach(function(palabra, index, lista){
		var cache_resultado = palabra;
		var reservada = es_palabraReservada(palabra);
		var delimitador = es_delimitador(palabra);
		if (reservada) {
			cache_resultado = tokenize(reservada, cache_resultado);;
		} else if (delimitador){
			cache_resultado = tokenize(delimitador, cache_resultado);
		} else if (es_Numero(palabra)){
			cache_resultado = tokenize("NUMERO REAL", cache_resultado);
		} else if (es_Identificador(palabra)){
			cache_resultado = tokenize("IDENTIFICADOR", cache_resultado);
		} else {
			cache_resultado = tokenize("? DESCONOCIDO", cache_resultado)
		}
		resultado_analizador.push(cache_resultado);
	});
	
	resultado_analizador.push("$$>EOF")
		
	$('analizer').value = resultado_analizador.join("\n");
	
	console.log(palabras);
};