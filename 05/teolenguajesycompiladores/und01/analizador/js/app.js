/**
 * 	CLASES PARA EL ANALIZADOR
 */
var Caracter = function(c){
	this.valor = c;
	this.tipo = UTILS.FN.TIPO_CARACTER(c);
};

var Token = function(token, tipo, fila){
	this.valor = Array.isArray(token)?token.join(""):token;
	this.tipo = tipo?tipo:UTILS.FN.TIPO_TOKEN(token);
	this.fila = fila;
};

var Codigo = function(){
	var self = this;
	this.plano = "";
	this.lineas = [];
	this.tokens = [];
	this.actualizar = function(){
		self.tokens = [];
		self.lineas = getCodigo();
		self.plano = self.lineas.join("\n");
	};
	var getTokens = function(){
		self.actualizar(); // resetear y analizar
		tokenize(); // Separar tokens
		combinarTokens(); // Unir tokens compuestos
		checkSyntax(); // Análisis sintáctico
		
	};
	var tokenize = function(){
		var memoria = "";
		// var mem_obj = [];
		var mem_add = function(char){
			memoria += char;
		};
		var add_tkn = function(str, fila, tipo ){
			self.tokens.push(new Token(str, tipo?tipo:false, fila));
		};
			
		for (var linea = 0; linea < self.lineas.length; linea++) {
			for (var index = 0; index < self.lineas[linea].length; index++) {
				var c = new Caracter(self.lineas[linea][index]);
				if (c.tipo == UTILS.CONSTANTS.TIPO_CARACTER.DELIMITADOR) {
					if (memoria.length > 0){
						add_tkn(memoria, linea);
						memoria = "";
					}
					if (!UTILS.CHECKER.VACIO(c.valor)){
						add_tkn(c.valor, linea);
					}
				} else {
					mem_add(c.valor);
				}
			}
			if (memoria.length){
				add_tkn(memoria, linea);
				memoria = "";
			}
			if (linea == self.lineas.length-1) {
				add_tkn("EOF", linea, UTILS.CONSTANTS.TIPO_TOKEN.EOF);
			} else {
				add_tkn("↵", linea, UTILS.CONSTANTS.TIPO_TOKEN.SALTO_LINEA);
			}
		}
		if (memoria.length){
			add_tkn(memoria);
		}
	};
	
	var siguientes_token = function(i, num){
		var _siguientes = self.tokens.slice(i, i+(num?num:1));
		return (_siguientes.length==(num||1))?(num?_siguientes:_siguientes[0]):false;
	};
		
	var combinarTokens = function(){
		// Combinar tokens compuestos
		
		for (var index = 0; index < self.tokens.length; index++) {
			var token = self.tokens[index];
			if (token.tipo == UTILS.CONSTANTS.TIPO_TOKEN.ENTERO){
				var tokens = siguientes_token(index, 3);
				if(tokens !== false){
					var tipos_token = tokens.map(UTILS.FN.MAP_TIPO_TOKEN);
					if (UTILS.CHECKER.REAL(tipos_token)){
						self.tokens.splice(index, 3 ,new Token(tokens.map(UTILS.FN.MAP_TOKEN).join(""), UTILS.CONSTANTS.TIPO_TOKEN.REAL, tokens[0].fila));
						index-=3;
						continue;
					} else {
						continue;
					}
				} else {
					continue;
				}
			}
			var _tokens = siguientes_token(index, 2);
			if(_tokens == false) {
				continue;
			} else {
				var new_tkn_tipo = false;
				var tipo0 = _tokens[0].tipo;
				var tipo1 = _tokens[1].tipo;
				
				if (tipo0 == UTILS.CONSTANTS.TIPO_TOKEN.MENOR){
					switch (tipo1) {
						case UTILS.CONSTANTS.TIPO_TOKEN.MAYOR:
							new_tkn_tipo = UTILS.CONSTANTS.TIPO_TOKEN.DISTINTO;
							break;
						case UTILS.CONSTANTS.TIPO_TOKEN.IGUAL:
							new_tkn_tipo = UTILS.CONSTANTS.TIPO_TOKEN.MENOR_IGUAL;
							break;						
						default:
							continue;
					}
				} else if(tipo0 == UTILS.CONSTANTS.TIPO_TOKEN.MAYOR && tipo1 == UTILS.CONSTANTS.TIPO_TOKEN.IGUAL){
					new_tkn_tipo = UTILS.CONSTANTS.TIPO_TOKEN.MAYOR_IGUAL;
				} else if(tipo0 == UTILS.CONSTANTS.TIPO_TOKEN.DOS_PUNTOS && tipo1 == UTILS.CONSTANTS.TIPO_TOKEN.IGUAL){
					new_tkn_tipo = UTILS.CONSTANTS.TIPO_TOKEN.ASIGNACION;
				}
				if (new_tkn_tipo){
					self.tokens.splice(index,2,new Token(UTILS.FN.EXTRACT_TOKEN_VALUES(_tokens), new_tkn_tipo, _tokens[0].fila));
					index-=2;
				}
			}
		}
	};
	var ID_TYPES = [UTILS.CONSTANTS.TIPO_TOKEN.PROGRAMA]
	var checkSyntax = function(){
		var check_index = 0;
		if (self.tokens[0].tipo != UTILS.CONSTANTS.TIPO_TOKEN.PROGRAMA){
			UTILS.ERRORS.ADD(self.tokens[0],0,"Se esperaba PROGRAMA, se encontró '%s'.");
			
			if (self.tokens[0].tipo != UTILS.CONSTANTS.TIPO_TOKEN.IDENTIFICADOR){
				UTILS.ERRORS.ADD(self.tokens[1],0,"Se esperaba IDENTIFICADOR, se encontró '%s'.");
			} else {
				check_index++;
			}
		} else {
			if (self.tokens[1].tipo != UTILS.CONSTANTS.TIPO_TOKEN.IDENTIFICADOR){
				UTILS.ERRORS.ADD(self.tokens[1],0,"Se esperaba IDENTIFICADOR, se encontró '%s'.");
			} else {
				check_index+=2;
			}
		}
		
		if (check_index) {
			// console.log(check_index); // FIXME: Algo iba a hacer...
		}
		
		for (check_index; check_index < self.tokens.length; check_index++) {
			var _token = self.tokens[check_index]; 
			var _siguiente = siguientes_token(check_index+1);
			if(UTILS.CONSTANTS.BLOQUES_START.indexOf(_token.tipo) != -1){
				if(UTILS.CONSTANTS.BLOQUES_START_NOMBRE.indexOf(_token.tipo) != -1){
					if(_siguiente?(_siguiente.tipo != UTILS.CONSTANTS.TIPO_TOKEN.IDENTIFICADOR):false){
						UTILS.ERRORS.ADD(self.tokens[check_index+1],0,"Se esperaba IDENTIFICADOR, se encontró '%s'.");
					} else {
						// UTILS.SIMBOLOS.DEF(self.token)
					}
				} else if (UTILS.CONSTANTS.BLOQUES_START_NL.indexOf(_token.tipo) != -1){
					if(_siguiente?(_siguiente.tipo != UTILS.CONSTANTS.TIPO_TOKEN.SALTO_LINEA):false){
						UTILS.ERRORS.ADD(self.tokens[check_index+1],0,"Se esperaba ↵, se encontró '%s'.");
					} else {
						if (_siguiente.tipo == UTILS.CONSTANTS.TIPO_TOKEN.VARIABLES || _siguiente.tipo == UTILS.CONSTANTS.TIPO_TOKEN.CONTANTES){
							/*
							while (siguiente) */
						}
					}
				} else {
					switch(_token.tipo){
						case UTILS.CONSTANTS.TIPO_TOKEN.REPETIR: break;
						case UTILS.CONSTANTS.TIPO_TOKEN.HACER: break;
						case UTILS.CONSTANTS.TIPO_TOKEN.MIENTRAS: break;
						case UTILS.CONSTANTS.TIPO_TOKEN.SI: break;
					}
				}
			} else {
				
			}
		}
	};
	
	this.buildSimbolos = function(){
		var ids = self.tokens.filter(function(e){ return e.tipo == UTILS.CONSTANTS.TIPO_TOKEN.IDENTIFICADOR; });
	};
	
	this.analizar = function(){
		UTILS.ERRORS.RESET();
		console.time("Analizando tokens")
		getTokens();
		console.timeEnd("Analizando tokens");
		// self.buildSimbolos();
		console.time("Mostrando resultados")		
		self.output();
		console.timeEnd("Mostrando resultados");
		console.timeEnd("TOTAL");
		
	};
	
	this.set = function(str) {
		if (str) {
			
		} else {
			setCodigo(UTILS.CONSTANTS.CODIGO_EJEMPLO);
		}
	};
	
	this.output = function(){
		output.value = JSON.stringify(self.tokens.map(function(e){ return /* e.tipo; */ { valor: e.valor, tipo : e.tipo };}), null, 2);
		tokens = self.tokens;
	};
};