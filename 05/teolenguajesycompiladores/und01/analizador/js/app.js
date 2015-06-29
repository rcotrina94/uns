/**
 * 	CLASES PARA EL ANALIZADOR
 */

var Caracter = function(c){
	this.valor = c;
	this.tipo = UTILS.FN.TIPO_CARACTER(c);
	// this.token = UTILS.FN.TIPO_TOKEN(c);
};

var Token = function(token, tipo){
	this.valor = Array.isArray(token)?token.join(""):token;
	this.tipo = tipo?tipo:UTILS.FN.TIPO_TOKEN(token);
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
	this.getTokens = function(){
		self.actualizar();
		var memoria = "";
		// var mem_obj = [];
		var mem_add = function(char){
			memoria += char;
		};
		var add_tkn = function(str, tipo){
			self.tokens.push(new Token(str, tipo?tipo:false));
		};
			
		for (var linea = 0; linea < self.lineas.length; linea++) {
			for (var index = 0; index < self.lineas[linea].length; index++) {
				var c = new Caracter(self.lineas[linea][index]);
				if (c.tipo == UTILS.CONSTANTS.TIPO_CARACTER.DELIMITADOR) {
					if (memoria.length > 0){
						add_tkn(memoria);
						memoria = "";
					}
					if (!UTILS.CHECKER.VACIO(c.valor)){
						add_tkn(c.valor);
					}
				} else {
					mem_add(c.valor);
				}
			}
			if (memoria.length){
				add_tkn(memoria);
				memoria = "";
			}
			if (linea == self.lineas.length-1) {
				add_tkn("EOF", UTILS.CONSTANTS.TIPO_TOKEN.EOF);
			} else {
				add_tkn("↵", UTILS.CONSTANTS.TIPO_TOKEN.SALTO_LINEA);
			}
		}
		if (memoria.length){
			add_tkn(memoria);
		}
		
		// Combinar tokens compuestos
		var siguientes_token = function(i, num){
			var _siguientes = self.tokens.slice(i, i+num);
			return _siguientes.length==num?_siguientes:false;
		};
		for (var index = 0; index < self.tokens.length; index++) {
			var token = self.tokens[index];
			if (token.tipo == UTILS.CONSTANTS.TIPO_TOKEN.ENTERO){
				var tokens = siguientes_token(index, 3);
				if(tokens !== false){
					var tipos_token = tokens.map(UTILS.FN.MAP_TIPO_TOKEN);
					if (UTILS.CHECKER.REAL(tipos_token)){
						self.tokens.splice(index, 3 ,new Token(tokens.map(UTILS.FN.MAP_TOKEN).join(""), UTILS.CONSTANTS.TIPO_TOKEN.REAL));
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
					self.tokens.splice(index,2,new Token(UTILS.FN.EXTRACT_TOKEN_VALUES(_tokens), new_tkn_tipo));
					console.log(index);
					console.log(JSON.stringify(self.tokens, null, 2));
					index-=2;
					
				}
			}
			/*if (token.tipo == UTILS.CONSTANTS.TIPO_TOKEN.ENTERO){
				if (siguiente?(siguiente.tipo == UTILS.CONSTANTS.TIPO_TOKEN.PUNTO):siguiente){
					var siguiente2 = siguiente_token(index + 1); 
					if (siguiente2?(siguiente2.tipo == UTILS.CONSTANTS.TIPO_TOKEN.ENTERO):siguiente2){
						
					}
				} else {
					continue;
				}
			} */
		}
		
		/*self.tokens.forEach(function(e, i){
			console.dir(e);
		}); */
	};
	
	this.analizar = function(){
		self.getTokens();
		self.output();
	};
	
	this.set = function(str) {
		if (str) {
			
		} else {
			setCodigo(UTILS.CONSTANTS.CODIGO_EJEMPLO);
		}
	};
	
	this.output = function(){
		/*
		var temp = UTILS.FN.MAP_CODIGO_TIPO_TOKEN(self.tokens);
		output.value = JSON.stringify(temp, null, 4);
		*/
		
		output.value = JSON.stringify(self.tokens, null, 2);
	};
};