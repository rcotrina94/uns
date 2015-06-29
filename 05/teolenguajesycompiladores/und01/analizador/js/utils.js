/** 
 *	INICIALIZACIÓN DE CÓDIGO BASE
 */

/* global editor */
// editor.getSession().setMode("ace/mode/pascal");
var Enum=function(){var v=arguments;var s={all:[],keys:v};for(var i=v.length;i--;)s[v[i]]=s.all[i]=i;return s;};
var Session = editor.getSession();
var Doc = Session.getDocument();
var getCodigo = function(){
	return Doc.getAllLines();
};
var setCodigo = function(cod){
	Doc.setValue(cod);
};

var output = document.getElementById('output');

editor.on('change', function(){});

/**
 *	UTILIDADES: CONSTANTES Y FUNCIONES DE TIPO
 */
var UTILS = (function(){
	var TIPOS_CARACTER = Object.freeze(
		Enum("DELIMITADOR", "LETRA", "DIGITO")
	);
	var TIPOS_TOKEN = Object.freeze(
		Enum(/** TOKENS PALABRAS RESERVADAS */
			"PROGRAMA", "VARIABLES", "CONSTANTES", "TIPO_ARREGLO", "TIPO_ENTERO", "TIPO_REAL", "TIPO_LOGICO",
			"LEER", "ESCRIBIR", "ENTRADA", "SALIDA",
			"FUNCION", "PROCEDIMIENTO", "INICIO", "FIN",
			"REPETIR", "HASTA", "PARA", "HACER", "MIENTRAS",
			"SI", "NO", "Y", "O", "ENTONCES", "CASOCONTRARIO",
			"DIVISIONENTERA", "RESTODIVIDIR", "DE", "E",
			/** TOKENS BÁSICOS */
			"EOF", "DESCONOCIDO", "LETRA", "DIGITO", "ESPACIO",
			"SUMA", "RESTA", "DIVISION", "MULTIPLICACION",
			"PARENTESIS_A", "PARENTESIS_C", "CORCHETE_A", "CORCHETE_C", "LLAVES_A", "LLAVES_C",
			"TABULADOR", "SALTO_LINEA",
			"COMA", "PUNTO", "PUNTO_COMA", "DOS_PUNTOS", "GUION_BAJO",
			"MENOR", "MAYOR", "IGUAL",
			"COMILLA", "COMILLA_DOBLE",
			/** TOKENS COMPUESTOS */
			"IDENTIFICADOR", "ENTERO", "REAL", "MAYOR_IGUAL", "MENOR_IGUAL", "DISTINTO", "ASIGNACION")
	);
	var PALABRAS_RESERVADAS = {
		'PROGRAMA': {
			tipo: TIPOS_TOKEN.PROGRAMA,
			nombre: "Definición Programa"
		},
		'VARIABLE' : {
			tipo: TIPOS_TOKEN.VARIABLES,
			nombre: "Variable"
		},
		'VARIABLES': {
			tipo: TIPOS_TOKEN.VARIABLES,
			nombre: "Variables"
		},
		'CONSTANTE': {
			tipo: TIPOS_TOKEN.CONSTANTES,
			nombre: "Constante"
		},
		'CONSTANTES': {
			tipo: TIPOS_TOKEN.CONSTANTES,
			nombre: "Constantes"
		},
		'TIPO_ARREGLO': {
			tipo: TIPOS_TOKEN.TIPO_ARREGLO,
			nombre: "Arreglo"
		},
		'TIPO_ENTERO': {
			tipo: TIPOS_TOKEN.TIPO_ENTERO,
			nombre: "Entero"
		},
		'TIPO_REAL': {
			tipo: TIPOS_TOKEN.TIPO_REAL,
			nombre: "Real"
		},
		'TIPO_LOGICO': {
			tipo: TIPOS_TOKEN.LOGICO,
			nombre: "Lógico"
		},
		'LEER': {
			tipo: TIPOS_TOKEN.LEER,
			nombre: "Leer"
		},
		'ESCRIBIR': {
			tipo: TIPOS_TOKEN.ESCRIBIR,
			nombre: "Escribir"
		},
		'ENTRADA': {
			tipo: TIPOS_TOKEN.ENTRADA,
			nombre: "Entrada"
		},
		'SALIDA': {
			tipo: TIPOS_TOKEN.SALIDA,
			nombre: "Salida"
		},
		'FUNCION' : {
			tipo: TIPOS_TOKEN.FUNCION,
			nombre: "Inicio de Función"
		},
		'PROCEDIMIENTO': {
			tipo: TIPOS_TOKEN.PROCEDIMIENTO,
			nombre: "Procedimiento"	
		},
		'INICIO': {
			tipo: TIPOS_TOKEN.INICIO,
			nombre: "Inicio de programa"
		},
		'FIN': {
			tipo: TIPOS_TOKEN.FIN,
			nombre: "Fin de programa"
		},
		'REPETIR' : {
			tipo: TIPOS_TOKEN.REPETIR,
			nombre: "Repetir"
		},
		'HASTA': {
			tipo: TIPOS_TOKEN.HASTA,
			nombre: "Hasta"
		},
		'PARA': {
			tipo: TIPOS_TOKEN.PARA,
			nombre: "Para"
		},
		'HACER': {
			tipo: TIPOS_TOKEN.HACER,
			nombre: "Hacer"
		},
		'MIENTRAS': {
			tipo: TIPOS_TOKEN.MIENTRAS,
			nombre: "Mientras"
		},
		'SI': {
			tipo: TIPOS_TOKEN.SI,
			nombre: "Condicional"
		},
		'NO':{
			tipo: TIPOS_TOKEN.NO,
			nombre: "Negacion"
		},
		'Y':{
			tipo: TIPOS_TOKEN.Y,
			nombre: 'Conjunción'
		},
		'O':{
			tipo: TIPOS_TOKEN.O,
			nombre: 'Disyunción'
		},
		'ENTONCES': {
			tipo: TIPOS_TOKEN.ENTONCES,
			nombre: "Condicional si verdad"
		},
		'CASOCONTRARIO': {
			tipo: TIPOS_TOKEN.CASOCONTRARIO,
			nombre: "Condicional si falso"
		},
		'DIVISIONENTERA': {
			tipo: TIPOS_TOKEN.DIVISIONENTERA,
			nombre: "División"
		},
		'RESTODIVIDIR': {
			tipo: TIPOS_TOKEN.RESTODIVIDIR,
			nombre: "Residuo"
		},
		'DE': {
			tipo: TIPOS_TOKEN.DE,
			nombre: "de"
		},
		'E': {
			tipo: TIPOS_TOKEN.E,				
			nombre: "Exponente"
		}
	};
	
	var DELIMITADORES = {
		"	": {
			token: TIPOS_TOKEN.TABULADOR,
			nombre: "TABULADOR"
		},
		" ": {
			token: TIPOS_TOKEN.ESPACIO,
			nombre: "ESPACIO"
		},
		"\n": {
			token: TIPOS_TOKEN.SALTO_LINEA,
			nombre: "SALTO DE LÍNEA"
		},
		"(": {
			token: TIPOS_TOKEN.PARENTESIS_A,
			nombre: "ABRE PARÉNTESIS"
		},
		")": {
			token: TIPOS_TOKEN.PARENTESIS_C,
			nombre: "CIERRA PARÉNTESIS"
		},
		"[": {
			token: TIPOS_TOKEN.CORCHETE_A,
			nombre: "ABRE CORCHETES"
		},
		"]": {
			token: TIPOS_TOKEN.CORCHETE_C,
			nombre: "ABRE CORCHETES"
		},
		"{": {
			token: TIPOS_TOKEN.LLAVES_A,
			nombre: "ABRE LLAVES"
		},
		"}": {
			token: TIPOS_TOKEN.LLAVES_C,
			nombre: "CIERRA LLAVES"
		},
		'.': {
			token: TIPOS_TOKEN.PUNTO,
			nombre: "PUNTO"
		},
		",": {
			token: TIPOS_TOKEN.COMA,
			nombre: "COMA"
		},
		";": {
			token: TIPOS_TOKEN.PUNTO_COMA,
			nombre: "PUNTO Y COMA"
		},
		":": {
			token: TIPOS_TOKEN.DOS_PUNTOS,
			nombre: "DOS PUNTOS"
		},
		"+": {
			token: TIPOS_TOKEN.SUMA,
			nombre: "SUMA"
		},
		"-": {
			token: TIPOS_TOKEN.RESTA,
			nombre: "RESTA"	
		},
		"*": {
			token: TIPOS_TOKEN.MULTIPLICACION,
			nombre: "MULTIPLICACIÓN"
		},
		"/": {
			token: TIPOS_TOKEN.DIVISION,
			nombre: "DIVISIÓN"
		},
		"=": {
			token: TIPOS_TOKEN.IGUAL,
			nombre: "IGUALDAD"
		},
		"<": {
			token: TIPOS_TOKEN.MENOR,
			nombre: "MENOR QUE"
		},
		">": {
			token: TIPOS_TOKEN.MAYOR,
			nombre: "MAYOR QUE"
		},
		">=": {
			token: TIPOS_TOKEN.MAYOR_IGUAL,
			nombre: "MAYOR O IGUAL"
		},
		"<=": {
			token: TIPOS_TOKEN.MENOR_IGUAL,
			nombre: "MENOR O IGUAL"	
		},
		"<>": {
			token: TIPOS_TOKEN.DISTINTO,
			nombre: "DISTINTO"
		},
		":=": {
			token: TIPOS_TOKEN.ASIGNACION,
			nombre: "ASIGNACIÓN"
		},
		"'" : {
			token: TIPOS_TOKEN.COMILLA,
			nombre: "COMILLA"
		},
		"\"" : {
			token: TIPOS_TOKEN.COMILLA_DOBLE,
			nombre: "COMILLA DOBLE"
		},
		"_" : {
			token: TIPOS_TOKEN.GUION_BAJO, 
			nombre: "GUIÓN BAJO"
		}
	};
	var TOKENS_COMPUESTOS = {
		"REAL" : [TIPOS_TOKEN.ENTERO, TIPOS_TOKEN.PUNTO, TIPOS_TOKEN.ENTERO],
		"MAYOR_IGUAL": [TIPOS_TOKEN.MAYOR, TIPOS_TOKEN.IGUAL],
		"MENOR_IGUAL": [TIPOS_TOKEN.MENOR, TIPOS_TOKEN.IGUAL],
		"ASIGNACION" : [TIPOS_TOKEN.DOS_PUNTOS, TIPOS_TOKEN.IGUAL],
		"DISTINTO": [TIPOS_TOKEN.MENOR, TIPOS_TOKEN.MAYOR]
	}
	var CONSTANTS = {
		"PALABRAS_RESERVADAS" : PALABRAS_RESERVADAS,
		"DELIMITADORES" : DELIMITADORES,
		"ALFABETO": ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","r","s","t","u","v","w","x","y","z"],
		"CODIGO_EJEMPLO" : "PROGRAMA ejemplo(ENTRADA,SALIDA);\n"
			+ "VARIABLES\n"
			+ "    x, y : ENTERO;\n"
			+ "FUNCION mcd(a,b : ENTERO) : ENTERO;\n"
			+ "    VARIABLES\n"
			+ "        x : ENTERO;\n"
			+ "        n : ENTERO;\n"
			+ "    INICIO\n"
			+ "        x := a;\n"
			+ "        n := b;\n"
			+ "        SI n = 0 ENTONCES  mcd:=x\n"
			+ "        CASOCONTRARIO  mcd := mcd(n, x RESTODIVIDIR n)\n"
			+ "    FIN;\n"
			+ "INICIO\n"
			+ "    LEER(x,y);\n"
			+ "    x := x + 2;\n"
			+ "    y := y * x ;\n"
			+ "    ESCRIBIR(x,y);\n"
			+ "FIN.",
		"TIPO_TOKEN" : TIPOS_TOKEN,
		"TIPO_CARACTER" : TIPOS_CARACTER,
		"COMP_TOKEN" : TOKENS_COMPUESTOS
	};
	
	var es_ValorVacio = function(s){
		return s.trim().length?false:true;
	};
	
	var es_Delimitador = function(s){
		if (typeof s != "string") return false;
		var indice = Object.keys(CONSTANTS.DELIMITADORES).indexOf(s);
		return (indice + 1);
	};
	
	var es_Letra = function(s){
		if (typeof s != "string") return false;		
		return CONSTANTS.ALFABETO.indexOf(s.toLowerCase()) != -1;
	};
	
	var es_Digito = function(s){
		if (typeof s != "string") return false;		
		return (!Number.isNaN(Number(s))) && s.length==1;
	};
	
	var es_Identificador = function(s){
		if (typeof s != "string") return false;
		if (es_Letra(s[0])) {
			var validar_Identificador = function(str){
				var caracter = str[0];
				if (es_Letra(caracter) || es_Digito(caracter) || caracter == "_"){
					if (str.length == 1) {
						return true;
					} else {
						return validar_Identificador(str.substr(1));
					}
				} else {
					return false;
				}
			};
			return validar_Identificador(s);
		} else {
			return false;
		}
	};
	
	var es_Entero = function(s){
		if (typeof s != "string") return false;
		return Number.isInteger(Number(s));
	}
	
	var es_Real = function(tipos){
		if(!Array.isArray(tipos)){
			return false;
		} else {
			return (tipos.every(function(e, i){ return e == TOKENS_COMPUESTOS.REAL[i]; }));
		}
	};
	
	var CHECKER = {
		"DELIM": es_Delimitador,
		"LETRA": es_Letra,
		"DIGITO": es_Digito ,
		"IDENTIFICADOR": es_Identificador,
		"ENTERO": es_Entero,
		"REAL": es_Real,
		"VACIO": es_ValorVacio
	};
	
	var FN = {
		"TIPO_CARACTER" : function(c){
			if (CHECKER.DELIM(c)){
				return CONSTANTS.TIPO_CARACTER.DELIMITADOR;
			} else if (CHECKER.LETRA(c)) {
				return CONSTANTS.TIPO_CARACTER.LETRA;
			} else if (CHECKER.DIGITO(c)){
				return CONSTANTS.TIPO_CARACTER.DIGITO;			
			}
		},
		"TIPO_TOKEN" : function(w){
			if(typeof w != "string"){
				w = w.toString();
			}
			if(Object.keys(PALABRAS_RESERVADAS).indexOf(w) != -1){
				// console.log("PALABRA RESERVADA");
				return PALABRAS_RESERVADAS[w].tipo;
			} else if(CHECKER.IDENTIFICADOR(w)) {
				// console.log("IDENTIFICADOR");
				return CONSTANTS.TIPO_TOKEN.IDENTIFICADOR;
			} else if(CHECKER.DELIM(w)){
				// console.log("DELIM");
				return DELIMITADORES[w].token;
			} else if(CHECKER.ENTERO(w)){
				// console.log("ENTERO");
				return CONSTANTS.TIPO_TOKEN.ENTERO;
			} else {
				return CONSTANTS.TIPO_TOKEN.DESCONOCIDO;
			}
		},
		"MAP_TIPO_TOKEN" : function(e,i){
			return e.tipo;
		},
		"EXTRACT_TOKEN_VALUES" : function(token_list){
			return token_list.map(function(e,i){
				return e.valor;
			}).join("");	
		},
		"MAP_TOKEN" : function(e,i){
			return e.valor;
		},
		"MAP_CODIGO_TIPO_TOKEN": function(tokens){
			return Object.keys(tokens).map(function(e){ return tokens[e].tipo;});
		}
	};

	

	return {
		"CONSTANTS" : Object.freeze(CONSTANTS),
		"CHECKER" : Object.freeze(CHECKER),
		"FN" : Object.freeze(FN),
		"TS" : {},
		
	};
})();