// editor.getSession().setMode("ace/mode/pascal");
var Doc = editor.getSession().getDocument()
var getCodigo = function(){
	return Doc.getAllLines();
};
var setCodigo = function(cod){
	Doc.setValue(cod);
}
setCodigo(default_code);
editor.on('change', function(){

});
			

var analizar = function(){
	TS = {};
	editor.getSession().setMode("ace/mode/pascal");
	
//	var codigo = $('code').value;
	var codigo = getCodigo();
	var palabras = [];
	var lineas = [];
	
	// separar por líneas
//	codigo.split("\n").forEach(function(linea, index){
	codigo.forEach(function(linea, index){
		linea = linea.trim()
		if (linea) {
			lineas.push(linea);	
		}
	});
	
	console.log(lineas);
	
	// Método para analizar las columnas de las líneas
	var memoria = "";
	var analizar_linea = function(linea, index_linea){
		var columnas = linea.split("");
		var palabras_linea = [];
		
		var addW = function(word){
			if (word == 'E'){
				console.trace('Agregando EEEEEEEEEEEEEEEE');
			}
			palabras_linea.push({ w: word, l: index_linea +1});
			memoria = "";
		};
		
		// Método para analizar cada caracter
		for (var columna_index = 0; columna_index < columnas.length; columna_index++) {
			var caracter = columnas[columna_index]
			var siguiente_caracter = "";
			if (columna_index < columnas.length - 1){
				siguiente_caracter = columnas[columna_index+1].trim();
			}
			
			if (es_palabraReservada(memoria) && es_delimitador(siguiente_caracter)){
				addW(memoria);
				continue;
			}
			
			caracter = caracter.trim();			
			if (!caracter) {
				if (memoria){
					addW(memoria);
				}
				continue;
			}
			
			if(es_palabraReservada(memoria+caracter) && es_delimitador(siguiente_caracter)){
				addW(memoria+caracter);
				continue;
			}
			
			var indice_delimitador = Object.keys(delimitadores).indexOf(caracter);
			
			if ( indice_delimitador + 1){
				if (memoria) {
					addW(memoria);
				}
				
				var delim_multiple = tiene_multiple(caracter, siguiente_caracter);
				if (delim_multiple){
					addW(delim_multiple);
				} else {
					addW(caracter);
				}
			} else {
				memoria += caracter;
			}
		}
		if (memoria){
			addW(memoria);
		}
		
		if (index_linea < lineas.length - 1){
			addW("↵");	
		}
		
		palabras = palabras.concat(palabras_linea);
	};
	// Analizar lineas de cada columna
	lineas.forEach(analizar_linea);
	
	var resultado_analizador = [];
	
	// Analizar palabras encontradas
//	palabras.forEach(function(obj, index, lista){
	
	var siguiente = function(lista,indice_lista){
		var max_indice = lista.length - 1;
		if (indice_lista + 1 < max_indice) {
			return lista[indice_lista + 1];
		} else {
			return false;
		}
	}

	var anterior = function(lista,indice_lista){
		if (indice_lista - 1 >= 0) {
			return lista[indice_lista - 1];
		} else {
			return false;
		}
	}

	for (var index = 0; index < palabras.length; index++){
		
		var obj = palabras[index];
		var palabra = obj.w;

		
		var cache_resultado = palabra;
		var reservada = es_palabraReservada(palabra);
		var delimitador = es_delimitador(palabra);
		if (reservada) {
			cache_resultado = tokenize(reservada, cache_resultado);
		} else if (delimitador){
			cache_resultado = tokenize(delimitador, cache_resultado);
		} else if (es_Numero(palabra)){
			cache_resultado = tokenize("NUMERO REAL", cache_resultado);
		} else if (es_Identificador(palabra)){
			cache_resultado = tokenize("IDENTIFICADOR", cache_resultado);
			if (!TS.hasOwnProperty(palabra)) {
				TS[palabra] = { declaracion: obj.l, ref : [] };
				TS[palabra]['tipo'] = "VARIABLE";
				var palabra_anterior = anterior(palabras, index);
				console.log("anterior", palabra_anterior)
				var palabra_siguiente = siguiente(palabras, index);
				if (palabra_anterior !== false) {
					if (palabra_anterior.w == 'PROCEDIMIENTO'){
						TS[palabra]['tipo'] = 'PROCEDIMIENTO';
					} else if (palabra_anterior.w == 'FUNCION'){
						TS[palabra]['tipo'] = 'FUNCION';						
					} else if (palabra_anterior.w == 'PROGRAMA'){
						TS[palabra]['tipo'] = 'PROGRAMA';
					}
				}
				if (palabra_siguiente !== false) {
					if (palabra_siguiente.w == ':'){
						TS[palabra]['tipo'] = siguiente(palabras, index +1).w;						
					} else if (palabra_siguiente.w == ','){
						var aux_index = index + 1;
						var aux_siguiente_palabra = siguiente(palabras, aux_index);
						while (aux_siguiente_palabra !== false && aux_siguiente_palabra.w != '↵'){
							if(siguiente(palabras, aux_index).w == ':'){
								TS[palabra]['tipo'] = siguiente(palabras, ++aux_index).w;
								break;						
							}
							aux_siguiente_palabra = siguiente(palabras, aux_index++);
						}	
					}
					
				}
			} else {
				
				TS[palabra].ref.push(obj.l);
			}
		} else {
			cache_resultado = tokenize("? DESCONOCIDO", cache_resultado)
		}
		resultado_analizador.push(cache_resultado);
	};
	
	resultado_analizador.push("$$>FIN_DE_ARCHIVO")
		
//	$('analizer').value = resultado_analizador.join("\n");
	$('analizer').value = JSON.stringify(TS,null,4)

};