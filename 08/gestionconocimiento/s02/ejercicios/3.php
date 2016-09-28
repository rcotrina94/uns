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
		$fecha = $_POST['fecha'];
		$YMD = "Y-m-d";
		list($anio, $mes, $dia) = explode("-", $fecha);
		$fecha_hoy = date($YMD, time());
		$fecha_obj = date($YMD, mktime(0,0,0,$mes, $dia, $anio));
		$fecha_objmas = date($YMD, mktime(0,0,0,$mes, $dia+30, $anio));
		$fecha_objmenos = date($YMD, mktime(0,0,0,$mes, $dia-30, $anio));
	?>
	<h3>Ejercicio 3</h3>
	<div class="big-text">
		<form class="form" method="POST">
			<div class="form-group">
				<input value="<?php print $fecha; ?>" type="date" id="fecha" name="fecha">
				<button type="submit">Enviar fecha</button>
			</div>

		</form>
		<p>
			Fecha de hoy: <?php print $fecha_hoy; ?><br/>
			Fecha enviada: <?php print $fecha_obj; ?>
		</p>
		<p>
		La fecha enviada <?php if ($fecha_obj == $fecha_hoy): ?>
			<strong>SI</strong>
		<?php else: ?>
			<strong>NO</strong>
		<?php endif ?>
			es la fecha de hoy. <br />
			La fecha está en el rango:
			<?php
				if ($fecha_obj > $fecha_objmenos && $fecha_obj <= $fecha_hoy) {
					echo "$fecha_objmenos <--> $fecha_hoy";
				}
				if($fecha_obj < $fecha_objmas && $fecha_obj >= $fecha_hoy) {
					echo "$fecha_hoy <--> $fecha_objmenos";
				}
			?>

		</p>
	</div>
</body>
</html>
