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
	if (this.tipo == UTILS.CONSTANTS.TIPO_TOKEN.DESCONOCIDO){
		UTILS.ERRORS.ADD(this, 0, "Token desconocido, valor: '%s'.");
	}
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
		if(self.plano.trim().length == 0){
			return;
		}
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

	var checkSyntax = function(){
		UTILS.SIMBOLOS.RESET();
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
				UTILS.SIMBOLOS.DEF_BLOCK(self.tokens[1], UTILS.CONSTANTS.TIPO_TOKEN.PROGRAMA)
			}
		}
		
		if (check_index) {
			// console.log(check_index); /// FIXME: Algo iba a hacer...
		}
		
		for (check_index; check_index < self.tokens.length; check_index++) {
			var _token = self.tokens[check_index]; 
			var _siguiente = siguientes_token(check_index+1);
			if (!_siguiente){continue;}
			 
			if(UTILS.CONSTANTS.BLOQUES_START.indexOf(_token.tipo) != -1){
				if (UTILS.CONSTANTS.BLOQUES_START_NOMBRE.indexOf(_token.tipo) != -1){
					if(_siguiente.tipo != UTILS.CONSTANTS.TIPO_TOKEN.IDENTIFICADOR){
						UTILS.ERRORS.ADD(self.tokens[check_index+1],0,"Se esperaba IDENTIFICADOR, se encontró '%s'.");
					} else {
						UTILS.SIMBOLOS.DEF_BLOCK(_siguiente, _token.tipo);
						if (siguientes_token(check_index+2).tipo == UTILS.CONSTANTS.TIPO_TOKEN.PARENTESIS_A){
							var _mem = [];
							var cierre = false;
							var _tipo = null;
							var _tipo_id = false;
							for (var i = check_index+3; i < self.tokens.length; i++){
								var _tkn = self.tokens[i];
								
								if (_tkn.tipo == UTILS.CONSTANTS.TIPO_TOKEN.IDENTIFICADOR){
									_mem.push(_tkn);
								} else if (_tkn.tipo == UTILS.CONSTANTS.TIPO_TOKEN.PARENTESIS_C){
									cierre = true;
									break;
								} else if (_tkn.tipo == UTILS.CONSTANTS.TIPO_TOKEN.SALTO_LINEA) {
									break;
								} else if (_tkn.tipo != UTILS.CONSTANTS.TIPO_TOKEN.COMA && _tkn.tipo != UTILS.CONSTANTS.TIPO_TOKEN.DOS_PUNTOS && UTILS.CONSTANTS.TIPOS_VAR.indexOf(_tkn.tipo) == -1){
									break;
								} else if (_tkn.tipo == UTILS.CONSTANTS.TIPO_TOKEN.DOS_PUNTOS){
									_tipo = self.tokens[i+1];							
									if (UTILS.CONSTANTS.TIPOS_VAR.indexOf(_tipo.tipo) == -1) {
										UTILS.ERRORS.ADD( _tipo, 0, "Se esperaba TIPO se encontró '%s'.");
									} else {
										_tipo_id = _tipo.tipo;
										i++;
									}
								}
								if (_tipo_id){
									if (self.tokens[i+1].tipo == UTILS.CONSTANTS.TIPO_TOKEN.PARENTESIS_C){
										
										cierre = true;
									} else {
										console.log(self.tokens[i+1].tipo)
									}
									break;
								}
							}
							
							if (!cierre) {
								UTILS.ERRORS.ADD(self.tokens[i+1], 0, "Se esperaba ')', se encontró '%s'.");
							}
							if (_tipo_id) {
								for (var k = 0; k < _mem.length; k++) {
									UTILS.SIMBOLOS.DEF(_mem[k], _tipo_id);
								}
							}
						} else {
							UTILS.ERRORS.ADD( self.tokens[check_index+2], 0, "Se esperaba '(', se encontró '%s'.");
						}
						
					}
				} else if (UTILS.CONSTANTS.BLOQUES_START_NL.indexOf(_token.tipo) != -1){
					if(_siguiente.tipo != UTILS.CONSTANTS.TIPO_TOKEN.SALTO_LINEA){
						UTILS.ERRORS.ADD(self.tokens[check_index+1],0,"Se esperaba ↵, se encontró '%s'.");
					} else {
						if (_token.tipo == UTILS.CONSTANTS.TIPO_TOKEN.VARIABLES || _token.tipo == UTILS.CONSTANTS.TIPO_TOKEN.CONSTANTES){
							var _bloque = UTILS.FN.EXTRACT_BLOCK(_token, self.tokens, check_index);
							// console.log(_bloque)
							if (_bloque){
								for (var ln = 0; ln < _bloque.length; ln++) {
									var _mem = [];
									var _tipo = null;
									for (var i = 0; i < _bloque[ln].length; i++){
										if ( _bloque[ln][i].tipo == UTILS.CONSTANTS.TIPO_TOKEN.IDENTIFICADOR ){
											_mem.push( _bloque[ln][i]);
										} else if( _bloque[ln][i].tipo == UTILS.CONSTANTS.TIPO_TOKEN.DOS_PUNTOS) {
											_tipo = _bloque[ln][i+1].tipo;
											break;
										}
									}
									if (!_bloque[ln].length){ continue; }
									if (_bloque[ln].slice(-1)[0].tipo != UTILS.CONSTANTS.TIPO_TOKEN.PUNTO_COMA){
										UTILS.ERRORS.ADD(_bloque[ln].slice(-1)[0], 0, "Se esperaba ';'");
									}
									for (var j = 0; j < _mem.length; j++) {
										if (UTILS.CONSTANTS.TIPOS_VAR.indexOf(_tipo) == -1){
											UTILS.ERRORS.ADD(_mem[j], 0, "Se esperaba tipo de variable.");
										} else {
											UTILS.SIMBOLOS.DEF(_mem[j], _tipo);
										}
									}
								}
							}
							
						} else if (_token.tipo == UTILS.CONSTANTS.TIPO_TOKEN.INICIO){
							var _b = UTILS.FN.EXTRACT_BLOCK(_token, self.tokens, check_index);
							if (!_b){
								continue;
							}
							var IF_ESTRUCT = [
								UTILS.CONSTANTS.TIPO_TOKEN.SI,
								UTILS.CONSTANTS.TIPO_TOKEN.ENTONCES,
								UTILS.CONSTANTS.TIPO_TOKEN.PARA,
								UTILS.CONSTANTS.TIPO_TOKEN.CASOCONTRARIO,
								UTILS.CONSTANTS.TIPO_TOKEN.RESTODIVIDIR
							]
							for (var ln = 0; ln < _b.length; ln++) {
								var _linea = _b[ln];
								if (!_linea.length) continue;
								if (IF_ESTRUCT.indexOf(_linea[0].tipo) == -1){
									if (_linea.slice(-1)[0].tipo != UTILS.CONSTANTS.TIPO_TOKEN.PUNTO_COMA) {
										UTILS.ERRORS.ADD(_linea.slice(-1)[0], 0, "Se esperaba ';'");
									}
								}
								var ids = _linea.filter(UTILS.FN.FILTRAR_IDENTIFICADORES);
								for (var j = 0; j < ids.length; j++) {
									UTILS.SIMBOLOS.REF(ids[j]);
								}
							}
						}
					}  
				} else {
					switch(_token.tipo){
						case UTILS.CONSTANTS.TIPO_TOKEN.REPETIR: break;
						case UTILS.CONSTANTS.TIPO_TOKEN.HACER: break;
						case UTILS.CONSTANTS.TIPO_TOKEN.MIENTRAS: break;
						case UTILS.CONSTANTS.TIPO_TOKEN.SI:
							var IF_SENTENCE = {
								"CONDICION" : [],
								"ENTONCES" : [],
								"CASOCONTRARIO" : []
							};
							var SECCION_IF = "CONDICION";
							
							var ix = check_index + 1;
							var if_tkn = self.tokens[ix];
							for (ix; ix < self.tokens.length; ix++) { // CONDICION
								if_tkn = self.tokens[ix];
								if (if_tkn.tipo != UTILS.CONSTANTS.TIPO_TOKEN.ENTONCES){
									if (if_tkn.tipo != UTILS.CONSTANTS.TIPO_TOKEN.SALTO_LINEA){
										IF_SENTENCE[SECCION_IF].push(if_tkn);
									}
								} else {
									ix++;
									SECCION_IF = "ENTONCES";
									break;
								}
							}
							if (SECCION_IF == "ENTONCES" ){
								
								if(UTILS.CHECKER.EXPR.LOGICA(IF_SENTENCE.CONDICION)){
									console.log("Es condición!");
								} else {
									UTILS.ERRORS.ADD(self.tokens[ix-3], 0, "Token inesperado '%s'.")
								}
								
								for (ix; ix < self.tokens.length; ix++) { // ENTONCES
									if_tkn = self.tokens[ix];
									if (if_tkn.tipo == UTILS.CONSTANTS.TIPO_TOKEN.CASOCONTRARIO){
										ix++;
										SECCION_IF = "CASOCONTRARIO";
										break;
									} else if (if_tkn.tipo == UTILS.CONSTANTS.TIPO_TOKEN.FIN){
										break;
									} else {
										if (if_tkn.tipo != UTILS.CONSTANTS.TIPO_TOKEN.SALTO_LINEA){
											IF_SENTENCE[SECCION_IF].push(if_tkn);
										}
									}
								}
								if (SECCION_IF == "CASOCONTRARIO"){
									for (ix; ix < self.tokens.length; ix++) { // CASO CONTRARIO
										if_tkn = self.tokens[ix];
										if (if_tkn.tipo == UTILS.CONSTANTS.TIPO_TOKEN.SALTO_LINEA || if_tkn.tipo == UTILS.CONSTANTS.TIPO_TOKEN.FIN){
											break;
										} else {
											if (if_tkn.tipo != UTILS.CONSTANTS.TIPO_TOKEN.SALTO_LINEA){
												IF_SENTENCE[SECCION_IF].push(if_tkn);
											}
										}
									}
								} else {
									// UTILS.ERRORS.ADD(_token, 0, "Se esperaba 'CASO CONTRARIO'.");
									break;
								}
							} else {
								UTILS.ERRORS.ADD(_token, 0, "Se esperaba 'ENTONCES'.");
								break;
							}
							
							if (IF_SENTENCE.CONDICION.length > 0){
								var ids = IF_SENTENCE.CONDICION.filter(UTILS.FN.FILTRAR_IDENTIFICADORES);
								for (var j = 0; j < ids.length; j++) {
									UTILS.SIMBOLOS.REF(ids[j]);
								}
							}
							
							// console.log(IF_SENTENCE)
							
							break;
					}
				}
			} else if(_token.tipo == UTILS.CONSTANTS.TIPO_TOKEN.FIN) {
				UTILS.SIMBOLOS.POP();
			} else {
				
			}
		}
	};
	
	/*this.buildSimbolos = function(){
		var ids = self.tokens.filter(function(e){ return e.tipo == UTILS.CONSTANTS.TIPO_TOKEN.IDENTIFICADOR; });
	};*/
	
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
		// output.value = JSON.stringify(self.tokens.map(function(e){ return /* e.tipo; */ { valor: e.valor, tipo : e.tipo };}), null, 2);
		output.value = JSON.stringify(UTILS.SIMBOLOS.GET(), null, 2);
		// tokens = self.tokens;
	};
};