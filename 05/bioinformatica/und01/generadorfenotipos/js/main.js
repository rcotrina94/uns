var app = angular.module('rasgos', ['ngMaterial']);

app.controller('controlador', function($scope, $sce){
	$scope.padre = JSON.parse(JSON.stringify(caracteres));
	$scope.madre = JSON.parse(JSON.stringify(caracteres));
	$scope.hijo = JSON.parse(JSON.stringify(caracteres));
	
	angular.forEach($scope.padre, function(caracter, indice){
		caracter.seleccionado = 1;
	});
	
	angular.forEach($scope.madre, function(caracter, indice){
		caracter.seleccionado = 1;
	});
	
	$scope.indicePadre = 0;
	$scope.indiceMadre = 0;
	
	$scope.caracterPadre = function(){
		return $scope.padre[$scope.indicePadre];
	}

	$scope.caracterMadre = function(){
		return $scope.madre[$scope.indiceMadre];
	}
	
	$scope.anteriorPadre = function(){
		if ($scope.indicePadre > 0){
			$scope.indicePadre--;
		}
	};
	
	$scope.siguientePadre = function(){
		if ($scope.indicePadre < $scope.padre.length - 1) {
			$scope.indicePadre++;
		}
	};	
	
	$scope.anteriorMadre = function(){
		if ($scope.indiceMadre > 0){
			$scope.indiceMadre--;
		}
	};
	
	$scope.siguienteMadre = function(){
		if ($scope.indiceMadre < $scope.madre.length - 1) {
			$scope.indiceMadre++;
		}
	};
	

	
	function format(numero){ return ceros(numero,maxchar); }
	function binario(numero){ return format(numero.toString(2)); }
	
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
//			console.log(gen);
			$scope.hijo[index].seleccionado = $scope.hijo[index].opciones.map(op_codes).indexOf(gen) + 1;
		}
	}
	getHijo();
	
	$scope.getHijo = function(){
		return $sce.trustAsHtml( Object.keys($scope.hijo).map(function(caracter){
			return "<strong>" + $scope.hijo[caracter].nombre + ":</strong> <i>" + ($scope.hijo[caracter].opciones[$scope.hijo[caracter].seleccionado - 1].nombre || 'Intermedio') +"</i>";
		}).join("<br />"));
	};
	
	/* Listener para los cambios en Padre o Madre */
	$scope.$watch('[padre,madre]', getHijo, true);
});