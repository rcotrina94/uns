<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="utf-8">
	<title>PHP - Gestión del Conocimiento</title>
	<style type="text/css">a{color: #2c5d9e;} </style>
</head>
<body>
	<?php
		require("../index_header.php");
		$numero = 220;
		$texto = number_format($numero, 0);
		$numeros = array_reverse((array)$texto);
		print var_dump($numeros);
	?>
	<h3>Ejercicio 3</h3>

	Número: <strong>S/ <?php echo $numero ?></strong> <br/>
	Texto: <code><?php echo $texto; ?></code>.
</body>
</html>
