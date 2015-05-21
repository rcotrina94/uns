// Soporte para la API de ficheros.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Todas las APIS disponibles
	var loadFileAsText = function(){
		var fileToLoad;
		try {
			fileToLoad = $("fileToLoad").files[0];
			var fileReader = new FileReader();
			fileReader.onload = function(fileLoadedEvent){
				var textFromFileLoaded = fileLoadedEvent.target.result;
				$('code').value = textFromFileLoaded;
			};
			fileReader.readAsText(fileToLoad, "UTF-8");
		} catch (e){
				alert("No ha seleccionado ningún archivo");
		}
	};
} else {
	var loadFileAsText = function (){
		alert('Tu navegador no soporta cargar archivos. Te recomiendo actualizar tu navegador.');
		$('msg').innerHTML = "Tu navegador no soporta cargar archivos.\
		Te recomiendo actualizar tu navegador. <a href='https://browser-update.org/update.html'>Click aquí.</a>";
	};
}

var generarArchivo = function(){
	var text = getCodigo().join("\n")
	var txturi = "data:text/plain;,";
	return txturi+encodeURI(text);
};

var download = function(){
	var link = document.createElement('a');
	link.download = "codigo.pas";
	link.href = generarArchivo();
	link.click();
};