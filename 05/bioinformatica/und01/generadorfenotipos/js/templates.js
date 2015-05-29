var img = function(src){
	var elm = document.createElement('img');
	elm.setAttribute('src','img/'+src);
	elm.setAttribute('style','height:100%; width:100%;');
	return elm;
};

var color = function(style){
	var elm = document.createElement('div');
	elm.setAttribute('style','height:100%; width:100%;background-color:'+style);
	return elm;
};