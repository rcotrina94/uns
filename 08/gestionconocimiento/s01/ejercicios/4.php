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
		$celsius = 40;
		$fahrenheit = 9/5*$celsius + 32;
	?>
	<h3>Ejercicio 4</h3>

	Celsius: <code><?php echo number_format($celsius, 2) ?> °C</code> <br/>
	Fahrenheit: <code>S/. <?php echo number_format($fahrenheit, 2) ?> °F</code>.
</body>
</html>
