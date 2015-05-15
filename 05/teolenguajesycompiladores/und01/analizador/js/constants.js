var palabras_reservadas = {
	'PROGRAMA': "Definición Programa",
	'FUNCION' : "Inicio de Función",
	'VARIABLES': "Sección de Variables",
	'INICIO': "Inicio de programa",
	'FIN': "Fin de programa",
	'SI': "Condiciona",
	'ENTONCES': "Condicional si verdad",
	'CASO CONTRARIO': "Condicional si falso",
	'RESTODIVIDIR': "Residuo"
};

var delimitadores = {
	"	": "TABULADOR",
	" ": "ESPACIO",
	"↵": "SALTO DE LÍNEA",
	"(": "ABRE PARÉNTESIS",
	")": "CIERRA PARÉNTESIS",
	"[": "ABRE CORCHETES",
	"]": "ABRE CORCHETES",
	",": "COMA",
	";": "PUNTO Y COMA",
	":": "DOS PUNTOS",
	"+": "SUMA",
	"-": "RESTA",
	"*": "MULTIPLICACIÓN",
	"/":"DIVISIÓN",
	"=": "IGUALDAD",
	"<": "MENOR QUE",
	">": "MAYOR QUE",
	">=": "MAYOR O IGUAL",
	"<=": "MENOR O IGUAL",
	"<>": "DISTINTO",
	":=": "ASIGNACIÓN"
};

var delim_opts = {
	">" : {
		"=" : ">=",
	},
	"<" : {
		">" : "<>",
		"=" : "<="
	},
	":" : {
		"=" : ":="
	}
}

var tiene_multiple = function(caracter, next){
	var _mult = Object.keys(delim_opts).indexOf(caracter); 
	var _next_mult = (_mult+1)?(Object.keys(delim_opts[caracter]).indexOf(next)):-1;
	if (_mult + 1 && _next_mult + 1) {
		return delim_opts[caracter][next];
	} else {
		return false;
	}
};

var default_code = "PROGRAMA ejemplo(ENTRADA,SALIDA);\n\
VARIABLES\n\
     x, y : ENTERO;\n\
FUNCION mcd(a,b : ENTERO) : ENTERO;\n\
VARIABLES\n\
     x : ENTERO;\n\
     n : ENTERO;\n\
INICIO\n\
   x := a;\n\
    n := b;\n\
   SI n = 0 ENTONCES  mcd:=x\n\
  CASOCONTRARIO  mcd := mcd(n, x RESTODIVIDIR n)\n\
FIN;\n\
INICIO\n\
   LEER(x,y);\n\
   x := x + 2;\n\
   y := y * x ;\n\
   ESCRIBIR(x,y);\n\
FIN.";

var $ = function(id_selector){
	var obj = document.getElementById(id_selector);
	
	obj.content = obj.value;

	return obj;
};

$('code').value = default_code;

var alfabeto = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","r","s","t","u","v","w","x","y","z"]