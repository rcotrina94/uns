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
		$numero = $_GET['numero'];
		$potencia = $_GET['potencia'];
	?>
	<h3>Ejercicio 5</h3>
	<form method="GET">
		<label for="numero">Número:</label>
		<input value="<?php print $numero ?>" type="number" name="numero" id="numero">

		<label for="potencia">Potencia:</label>
		<input value="<?php print $potencia ?>" type="number" name="potencia" id="potencia">

		<button type="submit">Enviar</button>
	</form>
	Resultado: <?php print pow($numero, $potencia); ?>
</body>
</html>
