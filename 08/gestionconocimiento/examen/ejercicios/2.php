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
		$vector = array(92, 15, 64, 73, 25, 55, 53, 13, 15, 5);
		$ordenado = array(92, 15, 64, 73, 25, 55, 53, 13, 15, 5);
		sort($ordenado);
	?>
	<h3>Ejercicio 2</h3>
	<div class="big-text">
		Ordenar el vector: <code>92, 15, 64, 73, 25, 55, 53, 13, 15, 5</code> <br/>
		Vector ordenado: <code><?php print implode(", ",array_reverse($ordenado)) ?></code>
	</div>
</body>
</html>
