app.filter('startFrom', function() {
	return function(input, start) {
		start = +start; //parse to int
		return input.slice(start);
	}
});

app.filter('safe', function($sce){
	return function(input){
		return $sce.trustAsHtml(input+"");
	}
})

app.filter('bold', function($sce){
	return function(input){
		return $sce.trustAsHtml(addClass(input,"text-bold text-black"));
	}
})

app.filter('black', function($sce){
	return function(input){
		return $sce.trustAsHtml(addClass(input,"text-black"));
	}
})
