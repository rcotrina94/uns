/* global angular */

var app = angular.module('mochila', []);

app.controller('mainCtrl', function($scope){
	
	var Mochila = function(capacidad){
		var self = this;
		
		this.peso = 0;
		this.capacidad = capacidad;
		this.items = [];
		
		this.meterObjeto = function(objeto){
			self.items.push(objeto);
			self.peso += objeto.peso;
		};
		
		var ordenar = function(lista){
			return lista.sort(function(a,b){
				return b.valor_unitario - a.valor_unitario;
			});
		};  
	
		this.empacarMejores = function(opciones){
			var ordenados = ordenar(opciones.slice(0));
//			console.log(ordenados.map(function(x){ return x.nombre; }));
			var i = 0;
			
			while (self.peso < self.capacidad && i < opciones.length){
				var objeto = ordenados[i];
				if ((self.peso + objeto.peso) <= self.capacidad) {
					self.meterObjeto(objeto);
				}
				i++;
			}
			
			self.items = self.items.sort(function(a,b){
				return b.valor - a.valor;
			});
		};
	};
	
	var Objeto = function(id, nombre, peso, valor){
		this.id = id;
		this.nombre = nombre;
		this.peso = peso;
		this.valor = valor;
		this.valor_unitario = valor/peso;
	};        
	 
	$scope.mochila = new Mochila(400);
	
	var _opciones = [];
	 
	var data= [
	  {name: 'mapa',                    weight:  9, value:150, pieces:1},
	  {name: 'brújula',                weight: 13, value: 80, pieces:1},
	  {name: 'agua',                  weight:153, value:200, pieces:1},
	  {name: 'sandwich',               weight: 50, value: 60, pieces:1},
	  {name: 'glucose',                weight: 15, value: 60, pieces:1},
	  {name: 'botella',                    weight: 68, value: 45, pieces:1},
	  {name: 'plátano',                 weight: 27, value: 60, pieces:1},
	  {name: 'manzana',                  weight: 39, value: 40, pieces:1},
	  {name: 'queso',                 weight: 23, value: 30, pieces:1},
	  {name: 'gaseosa',                   weight: 52, value: 10, pieces:1},
	  {name: 'cámara',          weight: 11, value: 70, pieces:1},
	  {name: 'polo',                 weight: 32, value: 30, pieces:1},
	  {name: 'shorts',                weight: 24, value: 15, pieces:1},
	  {name: 'paraguas',               weight: 48, value: 10, pieces:1},
	  {name: 'libreta',               weight: 73, value: 40, pieces:1},
	  {name: 'waterproof, trousers',   weight: 42, value: 70, pieces:1},
	  {name: 'waterproof, overclothes',weight: 43, value: 75, pieces:1},
	  {name: 'note-case',              weight: 22, value: 80, pieces:1},
	  {name: 'sunglasses',             weight:  7, value: 20, pieces:1},
	  {name: 'towel',                  weight: 18, value: 12, pieces:1},
	  {name: 'socks',                  weight:  4, value: 50, pieces:1},
	  {name: 'book',                   weight: 30, value: 10, pieces:1}
	];
	
	$scope.llenarDatos = function(){
		_opciones = [];
		for (var i = 0; i < data.length; i++) {
			var obj = data[i];
			_opciones.push(new Objeto(i, obj.name, obj.weight, obj.value));
		}
		$scope.opciones = _opciones.slice(0);
	};
	$scope.llenarDatos();
	
	$scope.resolver = function(){
		$scope.mochila.empacarMejores(_opciones.slice(0));
		$scope.mochila.items.forEach(function(item){
			var index = $scope.opciones.indexOf(item);
			$scope.opciones[index].colored = "blue lighten-5";
		});
	};
	
	
	$scope.reiniciar = function(){
		$scope.llenarDatos();
		console.log($scope.opciones);

	}
//	console.log(mochila.items.map(function(x){ return x.nombre; }));

	

});
