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
		$numero1 = 567245;
		$par1 = $numero1%2==0;
		$numero2 = 1232134;
		$par2 = $numero2%2==0;
	?>
	<h3>Ejercicio 2</h3>
	<code>
	El número <?php echo $numero1 ?> es <strong><?php if ($par1): ?>par<?php else: ?>impar<?php endif ?></strong>. <br/>
	El número <?php echo $numero2 ?> es <strong><?php if ($par2): ?>par<?php else: ?>impar<?php endif ?></strong>.
	</code>
</body>
</html>
