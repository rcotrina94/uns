// Soporte para la API de ficheros.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Todas las APIS disponibles
} else {
  var loadFileAsText = function (){
	alert('Tu navegador no soporta cargar archivos. Te recomiendo actualizar tu navegador.');
  	$('msg').innerHTML = "Tu navegador no soporta cargar archivos.\
	  Te recomiendo actualizar tu navegador. <a href='https://browser-update.org/update.html'>Click aquí.</a>";
  }
}

//function saveTextAsFile()
//{
//	var textToWrite = document.getElementById("inputTextToSave").value;
//	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
//	var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;
//
//	var downloadLink = document.createElement("a");
//	downloadLink.download = fileNameToSaveAs;
//	downloadLink.innerHTML = "Download File";
//	if (window.webkitURL != null)
//	{
//		// Chrome allows the link to be clicked
//		// without actually adding it to the DOM.
//		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
//	}
//	else
//	{
//		// Firefox requires the link to be added to the DOM
//		// before it can be clicked.
//		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
//		downloadLink.onclick = destroyClickedElement;
//		downloadLink.style.display = "none";
//		document.body.appendChild(downloadLink);
//	}
//
//	downloadLink.click();
//}
//
//function destroyClickedElement(event)
//{
//	document.body.removeChild(event.target);
//}

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
}

var generarArchivo = function(){
	var text = $('code').value;
	var txturi = "data:text/plain;,";
	return txturi+encodeURI(text);
};

var download = function(){
	var text = $('code').value;
	var link = document.createElement('a');
	link.download = "codigo.pas";
	link.href = generarArchivo(text);
	link.click();
};