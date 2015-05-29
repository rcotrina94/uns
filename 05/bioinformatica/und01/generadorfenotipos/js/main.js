var app = angular.module('rasgos', ['ngMaterial']);

app.controller('controlador', function($scope){
	$scope.padre = JSON.parse( JSON.stringify(caracteres) );
	$scope.madre = JSON.parse( JSON.stringify(caracteres) );
	
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
});