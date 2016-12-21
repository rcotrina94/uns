<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="utf-8">
	<title>PHP - Gestión del Conocimiento</title>
	<link rel="stylesheet" type="text/css" href="/assets/css/bootstrap_paper.css">
	<style type="text/css">
		.big-text{
			font-size: 20px;
		}
	</style>
</head>
<body class="container">
	<?php
		require("../index_header.php");

		function fileLineArray($filename='emails.txt'){
			$arr = array();
			$archivo = fopen($filename , "r");
			if ($archivo) {
				while (!feof($archivo)) {
					$linea = fgets($archivo);
					if($linea) array_push($arr, trim("$linea"));
				}
			}
			fclose ($archivo);
			return $arr;
		}
	?>
	<h3>Ejercicio 4</h3>
	<div class="big-text">
		<p>Leyendo el archivo <code>emails.txt</code></p>
		<pre><code><?php print implode("\n", fileLineArray()); ?></code></pre>
		<pre><code><?php var_dump(fileLineArray()); ?></code></pre>
	</div>


</body>
</html>
