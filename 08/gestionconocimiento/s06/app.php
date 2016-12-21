<?php include("seguridad.php"); ?>
<html>
<head>
	<title>App</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="/assets/css/bootstrap_paper.css">
	<style type="text/css">
		input.form-control{
			background-color: rgba(255,255,255,.5);
		}
		.big-text{
			font-size: 18px;
		}
	</style>
</head>
<body class="container big-text">
	<h1>¡Bienvenido al sistema!</h1>
	<h3>Usuario: <?php echo $_SESSION["usuarioactual"]; ?> </h3>
	<p class="alert alert-success">Entró correctamente al sistema.</p>

	<div class="">
		<?php
			$link = mysql_connect("localhost","pytel","pytel");
			mysql_select_db("gc_sem06", $link);
			$USER = $_SESSION["usuarioactual"];
			$QUERY_RECIBIDOS = "SELECT * FROM usuario_mensaje WHERE idusuario_recibe = '".$USER."'";
			$mensajes_recibidos = mysql_query($QUERY_RECIBIDOS, $link);
			$n_mensajes_recibidos = mysql_num_rows($mensajes_recibidos);
			print $QUERY_RECIBIDOS;
			print var_dump($mensajes_recibidos);

			function get_message($msg_id){
				$query = "SELECT * FROM mensaje WHERE idmensaje = '".$msg_id."'";
				$message = mysql_query($query, $link);
				return mysql_result($message,0,0);
			}
		?>

		<h4>Mensajes recibidos</h4>
		<table class="table table-hover table-stripped">
			<thead>
				<tr>
					<th>Usuario</th>
					<th>Mensaje</th>
				</tr>
			</thead>
			<tbody>
				<?php while ( $msg = mysql_fetch_array($mensajes_recibidos)) : ?>
					<tr>
						<td>
						<?php print $msg['idusuario_envia']; ?></td>
						<td><?php print var_dump(get_message($msg['idmensaje'])['mensaje']); ?> </td>
					</tr>
				<?php endwhile ?>
			</tbody>
		</table>
	</div>

	<a href="salir.php">Salir</a>
</body>
</html>
