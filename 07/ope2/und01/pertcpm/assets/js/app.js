/// <reference path="../../typings/angularjs/angular.d.ts"/>

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

var $GO = go.GraphObject.make;
var diagrama = $GO(go.Diagram, "diagrama", {
	initialAutoScale: go.Diagram.Uniform,
	initialContentAlignment: go.Spot.Center,
	layout: $GO(go.LayeredDigraphLayout)
});

var modelo = $GO(go.Model);


var app = angular.module('pertcpm', ['ngMaterial']);

var controlador = function($scope){
	$scope.ABCD = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	
	$scope.req_text = null;
	$scope.req_selected = null;
//	$scope.actividades = [];
	$scope.actividades = {
	    "A" :{
	        "precedencia":[
	
	        ],
	        "duracion":3,
	        "$$hashKey":"object:5"
	    },
	    "B":{
	        "nombre":"B",
	        "precedencia":[
	
	        ],
	        "duracion":5,
	        "$$hashKey":"object:13"
	    },
	    "C" : {
	        "precedencia":["A"],
	        "duracion":6,
	        "$$hashKey":"object:21"
	    },
	    "D" : {
	        "precedencia":["A"],
	        "duracion":9,
	        "$$hashKey":"object:29"
	    },
	    "E" : {
	        "precedencia":["B"],
	        "duracion":8,
	        "$$hashKey":"object:37"
	    },
	    "F" : {
	        "precedencia":["B"],
	        "duracion":10,
	        "$$hashKey":"object:45"
	    },
	    "G": {
	        "precedencia":["E"],
	        "duracion":12,
	        "$$hashKey":"object:53"
	    },
	    "H" : {
	        "precedencia":["E","F"],
	        "duracion":5,
	        "$$hashKey":"object:61"
	    },
	    "I" : {
	        "nombre":"I",
	        "precedencia":["F"],
	        "duracion":7,
	        "$$hashKey":"object:69"
	    },
	    "J" : {
	        "nombre":"J",
	        "precedencia":["G","H","I"],
	        "duracion":4,
	        "$$hashKey":"object:77"
	    }
	}
	var nabcd = Object.keys($scope.actividades).length;
	
//	function querySearch(query) {
//		var results = query ? $scope.actividades.filter(createFilterFor(query)) : [];
//		return results;
//	}
//	
//    function createFilterFor(query) {
//		var lowercaseQuery = angular.lowercase(query);
//		return function filterFn(vegetable) {
//			return (vegetable._lowername.indexOf(lowercaseQuery) === 0) ||
//			(vegetable._lowertype.indexOf(lowercaseQuery) === 0);
//		};
//    }
	
	var Actividad = function(){
		var nombre = $scope.ABCD[nabcd++];
		var precedencia = [];
		var duracion = 1;
		return [nombre, {
			"precedencia" : precedencia,
			"duración" : duracion
		}];
	}
	
	$scope.agregarActividad = function(){
		if(nabcd==26){
			alert("Ya no se puede agregar más");
			return;
		}
		var arrAct = Actividad();
		
		$scope.actividades[arrAct[0]] = arrAct[1];
	}
	
	$scope.eliminarActividad = function(){
		if(nabcd==0){
			return;
		}
		delete $scope.actividades[$scope.ABCD[nabcd-1]];
		nabcd--;
	}
	
	setInterval(function(){ console.dir($scope.actividades) }, 3000);
	
	
	$scope.crearModeloRed = function(){

		var nodos = [];
		var ev_contador = 0;
		var Nodo = function(ip, fl){
			this.evento = ++ev_contador;
			this.inicio_proximo = ip;
			this.final_lejano = fl;
		};
		
		nodos.push(new Nodo(0,0));
		
		var aux_actividades = JSON.parse(JSON.stringify($scope.actividades));
		
		
		angular.forEach(aux_actividades,function(actividad, nombre){
		    if (!actividad.precedencia.length){
		        actividad.inicio_proximo = 0;
		    } else {   
		        actividad.inicio_proximo = actividad.precedencia.map(function(act){ return Number.parseInt(aux_actividades[act].duracion) + Number.parseInt(aux_actividades[act].inicio_proximo); }).max();
		    }
		});
		console.log("Inicios próximos:")
		console.dir(Object.keys(aux_actividades).map(function(act){ return aux_actividades[act].inicio_proximo; }));
//		var no_precedencia = [];
//		
//		for (var index = 0; index < aux_actividades.length; index++) {
//			var actividad = aux_actividades[index];
//			if(!actividad.precedencia.length){
//				no_precedencia.push(aux_actividades.splice(index, 1));
//				index--;
//			}
//		}
//		
//		angular.forEach(aux_actividades, function(actividad, index){
//			no_precedencia.forEach(function(act, indice){
//				var existe = actividad.precedencia.indexOf(act);
//				if(existe + 1){
//					nodos.push(new Nodo(act.duracion, 0));
//				}
//			});
////			if(actividad.precedencia.length){
////				var tiempos_precedencia = actividad.precedencia.map(function(act){ return act.duracion; }); 
////				nodos.push(new Nodo(nodos.length+1, tiempos_precedencia.max(), 0));
////			}
//		});
		
//		console.log(nodos);
	}
	$scope.crearModeloRed();
};

app.controller('controlador', controlador);

app.filter('reqs', function(){
	return function(lista_act, actual){
		var lista = Object.keys(lista_act);
		lista.splice(lista.indexOf(actual));
		return lista;
	}
});

app.config(function($mdThemingProvider, $mdIconProvider){	
	$mdThemingProvider.theme('default')
		.primaryPalette('indigo')
    	.accentPalette('blue');
});