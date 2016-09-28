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

		$usuarios[] = array('codigo' => 100,'nombre' => 'Luis Escobero','edad' => 30);
		$usuarios[] = array('codigo' => 200,'nombre' => 'Jorge Flores','edad' => 22);
		$usuarios[] = array('codigo' => 300,'nombre' => 'Manuel Sako','edad' => 45);
		$usuarios[] = array('codigo' => 400,'nombre' => 'Pedro Rodriguez','edad' => 18);
		?>
	<h3>Ejercicio 1</h3>
	<table border="1">
		<thead>
			<tr>
				<th>Código</th>
				<th>Nombre</th>
				<th>Edad</th>
			</tr>
		</thead>
		<tbody>
			<?php foreach ($usuarios as $usuario): ?>
				<tr>
					<td><?php echo $usuario["codigo"] ?></td>
					<td><?php echo $usuario["nombre"] ?></td>
					<td><?php echo $usuario["edad"] ?></td>
				</tr>
			<?php endforeach ?>
		</tbody>
	</table>
</body>
</html>
