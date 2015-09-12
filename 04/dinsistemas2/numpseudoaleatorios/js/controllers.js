app.controller('mainCtrl', function ($scope, $interval, Random, Test, $compile) {
	$scope.gen_time = 0;
	$scope.showControls = true;
	$scope.qty = 10000
	$scope.gen_methods = [
		{
			id : 0,
			name : "Cuadrados Centrales",
			headers: ["Semilla", "Cuadrado", "N° aleatorio"],
			opts : {
				seed : 8877
			}
		},
		{
			id : 1,
			name : "Producto Medio",
			headers: ["Sem1", "Sem2", "Sem1 × Sem2", "N° aleatorio"],
			opts : {
				digits : 4,
				seed1 : 3256,
				seed2 : 2689
			}
		},
		{
			id : 2,
			name : "Producto Medio Modificado",
			headers: ["Semilla", "Semilla × K", "N° aleatorio"],
			opts : {
				seed : 89765,
				k : 24591
			}
		},
		{
			id : 3,
			name : "Blum Blum Shub",
			headers: ["Xn", "(Xn)² mod M", "N° aleatorio"],
			opts : {
				seed : 3,
				p : 11,
				q : 19
			}
		},
		{
			id : 4,
			name : "Math.random()",
			headers: ["N° aleatorio"],
			opts : null
		}
	]
	$scope.gen_method = $scope.gen_methods[0];

	$scope.test_methods = [
		{
			id : 0,
			name : "Chi Cuadrado",
			headers : ["i", "O", "E", "O-E", "(O-E)² / E"],
			colspan : 4
		},
		{
			id : 1,
			name : "Kolgomorov-Smirnov",
			headers : ["i", "X", "F(xi)", "i/n", "(i-1)/n", "A = i/n - F(xi)", "B = F(xi)-(i-1)/n", "Abs(A)", "Abs(B)"],
			colspan : 7
		}
	]

	$scope.test_method = $scope.test_methods[0];

	$scope.currentPage = 0;
	$scope.testCurrentPage = 0;
	$scope.pageSize = 15;
	$scope.data = [];
	$scope.testData = {
		table: []
	};

	$scope.states = [];


	$scope.confidence_levels = [
		{
			percent : "90%",
			alpha : 0.1
		},
		{
			percent : "95%",
			alpha : 0.05
		},
		{
			percent : "99%",
			alpha : 0.001
		}
	]

	$scope.confidence_level = $scope.confidence_levels[1];

	$scope.gen_numbers = function(){
		timer("Generation");
		$scope.data = Random[$scope.gen_method.id]($scope.qty,$scope.gen_method.opts);

		$scope.states = (function(){
			var _states = [];
			var _index = Object.keys($scope.data[0]).length-1;
			console.log(_index);
			angular.forEach($scope.data, function(e,i){
				_states.push(float(e[_index]));
			});
			console.log(_states);
			return _states;
		})();
		$scope.gen_time = timerEnd("Generation");
		$scope.resetTestData();

	};

	$scope.searchQuery;
	$scope.filtered = [];

	$scope.testFiltered = [];

	var nOfPages = function(){
		return Math.ceil($scope.data.length/$scope.pageSize);
	};

	var test_nOfPages = function(){
		return Math.ceil($scope.testData.table.length/$scope.pageSize);
	};

	$scope.numberOfPages = nOfPages;
	$scope.testNumberOfPages = test_nOfPages;

	$scope.$watch('searchQuery', function (newVal, oldVal) {
		if ($scope.searchQuery?$scope.searchQuery.length:$scope.searchQuery){
			$scope.currentPage = 0;
			$scope.numberOfPages = function(){
				return Math.ceil($scope.filtered.length/$scope.pageSize);
			};
		} else {
			$scope.numberOfPages = nOfPages;
		}

	}, true);

	$scope.doTest = function(){
		timer("Test");
		var method = $scope.gen_method;
		var precision = 4;
		if (method.opts){
			precision = method.id==1?
						method.opts.digits:
						method.opts.seed.toString().length
		}

		$scope.testData = Test[$scope.test_method.id]({
			qty: $scope.qty,
			states: $scope.states,
			precision: precision
		});
		$scope.test_time = timerEnd("Test");
	}

	$scope.updatePZ = function(){
		$scope.pageSize = $scope.showControls?15:20;
	}

	$scope.resetTestData = function(){
		$scope.testData = {
			table : []
		};
	}

	$scope.resetAll = function(){
		$scope.states = [];
		$scope.data = [];
		$scope.resetTestData();
	}

	// $interval(function(){ /*$scope.pageSize+=10;*/ console.log($scope.data, $scope.testData.table) }, 5000);
});
