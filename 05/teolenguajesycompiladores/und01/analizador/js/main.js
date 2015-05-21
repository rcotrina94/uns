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
			palabras_linea.push(word);
			memoria = "";
		};
		
		// Método para analizar cada caracter
		for (var columna_index = 0; columna_index < columnas.length; columna_index++) {
			if (es_palabraReservada(memoria)){
				addW(memoria);
			}
			
			var caracter = columnas[columna_index].trim();			
			if (!caracter) {
				if (memoria){
					addW(memoria);
				}
				continue;
			}
			
			if(es_palabraReservada(memoria+caracter)){
				addW(memoria+caracter);
				continue;
			}
			
			var indice_delimitador = Object.keys(delimitadores).indexOf(caracter);
			
			if ( indice_delimitador + 1){
				if (memoria) {
					addW(memoria);
				}
				var siguiente_caracter = "";
				if (columna_index < columnas.length - 2){
					siguiente_caracter = columnas[columna_index+1].trim();
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
	
	resultado_analizador.push("$$>FIN_DE_ARCHIVO")
		
	$('analizer').value = resultado_analizador.join("\n");
	
	console.log(palabras);
};