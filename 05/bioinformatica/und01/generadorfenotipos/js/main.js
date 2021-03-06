var app = angular.module('rasgos', ['ngMaterial']);

app.controller('controlador', function($scope, $sce){
	$scope.padre = JSON.parse(JSON.stringify(caracteres));
	$scope.madre = JSON.parse(JSON.stringify(caracteres));
	$scope.hijo = JSON.parse(JSON.stringify(caracteres));
	
	angular.forEach($scope.padre, function(caracter, indice){
		if (!caracter.hasOwnProperty('seleccionado')){
			caracter.seleccionado = 1;
		}
	});
	
	angular.forEach($scope.madre, function(caracter, indice){
		if (!caracter.hasOwnProperty('seleccionado')){
			caracter.seleccionado = 1;
		}
	});
	
	$scope.indice = 0;
	
	$scope.caracterPadre = function(){
		return $scope.padre[$scope.indice];
	}

	$scope.caracterMadre = function(){
		return $scope.madre[$scope.indice];
	}
	
	$scope.anterior = function(){
		if ($scope.indice > 0){
			$scope.indice--;
		}
	};
	
	$scope.siguiente = function(){
		if ($scope.indice < $scope.padre.length - 1) {
			$scope.indice++;
		}
	};	
		
	
	function range(start, stop, step){
	    if (typeof stop=='undefined'){
	        // one param defined
	        stop = start;
	        start = 0;
	    };
	    if (typeof step=='undefined'){
	        step = 1;
	    };
	    if ((step>0 && start>=stop) || (step<0 && start<=stop)){
	        return [];
	    };
	    var result = [];
	    for (var i=start; step>0 ? i<stop : i>stop; i+=step){
	        result.push(i);
	    };
	    return result;
	};

	/* Algoritmo para corte */
	function corte(cadena){
	    var cortes = [], posiciones;
		if (cadena.length > 2){
			posiciones = range(2,cadena.length-1,2);
		} else {
			posiciones = [1];
		}
	    var cantidad = posiciones.length;
	    var str = cadena.split("");
	    while (cantidad--) {
	        cortes.unshift(str.splice(posiciones[cantidad], cadena.length).join(""));
	    }
	    cortes.unshift(str.join(""));
	    return cortes;
	}
	
	/* Algoritmo para cruce */
	function cruce(genPadre, genMadre){
	    var padre = corte(genPadre);
	    var madre = corte(genMadre);
	
	    var ncortes = padre.length+1;
	    var cromosomas = {
	        "1" : padre,
	        "-1": madre
	    };
	
	    var hijo = []; //, hijo2 = [];
	
	    while(ncortes--){
	        hijo.unshift(cromosomas[Math.pow(-1, ncortes+1)][ncortes]);
	    }
		var hijo_str = hijo.sort().join("");
		return hijo_str;
	}
	
	var op_codes = function(op){ return op.codigo; }
	
	var getHijo = function(){
		var genesPadre = $scope.padre;
		var genesMadre = $scope.madre;
		
		for (var index = 0; index < 30; index++) {
			var genPadre = genesPadre[index].opciones[genesPadre[index].seleccionado - 1].codigo;
			var genMadre = genesMadre[index].opciones[genesMadre[index].seleccionado - 1].codigo;
			var gen = cruce(genPadre, genMadre);
			$scope.hijo[index].seleccionado = $scope.hijo[index].opciones.map(op_codes).indexOf(gen) + 1;
		}
	}
//	getHijo();
	
	$scope.getHijo = function(){
		return $sce.trustAsHtml( Object.keys($scope.hijo).map(function(caracter){
			return "<strong>" + $scope.hijo[caracter].nombre + ":</strong> <i>" + ($scope.hijo[caracter].opciones[$scope.hijo[caracter].seleccionado - 1].nombre || 'Intermedio') +"</i>";
		}).join("<br />"));
	};
	
	$scope.getFenotipo = function(caracter, indice){
		if(caracteres[indice].hasOwnProperty('fn')){
			var html;
			var fn = caracteres[indice].fn(caracter.seleccionado);
			if (fn.tipo == 'img'){
				html = img(fn.img);
			} else if (fn.tipo == 'color') {
				html = color(fn.color);
			}
			return {
				html : $sce.trustAsHtml(html.outerHTML),
				z: caracter.z
			}
		} else {
			return;
		}
	}
	
	$scope.fenStyle = function(z){
		return {
			"z-index" : z+1 || 999,
			"width" : "100%",
			"height": "100%"
		};
	};
	/* Listener para los cambios en Padre o Madre */
	$scope.$watch('[padre,madre]', getHijo, true);
});