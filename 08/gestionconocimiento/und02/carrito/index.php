<!DOCTYPE html>
<html>
<head>
	<title>Carrito de compras</title>
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="/assets/css/bootstrap_paper.css">
	<style type="text/css">
		.form-control{
			background-color: rgba(255,255,255,.4);
		}
	</style>
</head>

<body>
	<?php
		require('db.php');
		// session_start();

		// function limpia_sql($texto) {
		// 	if (get_magic_quotes_gpc()) {
		// 		$texto = stripslashes($texto); // quita barras \ de un string
		// 	}
		// 	if (!is_numeric($texto)) {  // quita secuencias de escape peligrosas
		// 		$texto = "'" . mysql_real_escape_string($texto) . "'";
		// 	}
		// 	return $texto;
		// }

		// if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		// 	$uname = limpia_sql(htmlspecialchars($_POST['usuario']));
		// 	$pword = limpia_sql(htmlspecialchars($_POST['password']));

		// 	// Comprueba si el registro (usuario,password) está en la BD:
		// 	$query = "SELECT * FROM login WHERE login_user = $uname AND login_password =md5($pword)";
		// 	$resultado = $bd‐>query($query);
		// 	$numregistros = $resultado‐>count;
		// 	if ($resultado) {
		// 		if ($numregistros == 1) {
		// 			// El registro del usuario y password en la BD
		// 			$_SESSION["login"] = true;
		// 			$_SESSION["usuario"] = $uname;
		// 			// Mira en la BD cual es el nombre del usuario que se ha logeado
		// 			// $resultado‐>free();
		// 			$query = "SELECT * FROM clientes WHERE usuario_dni = $uname";
		// 			$resultado = $bd‐>query($query);

		// 			// $registro = $resultado‐>fetch_assoc();
		// 			// $_SESSION["nombreusuario"] = $registro["nombre"];
		// 			// // Crea un carrito para este usuario en la sesión
		// 			// $_SESSION["carrito"] = new carrito($usuario);
		// 		}
		// 	}
		// 	// $bd‐>close();
		// }



		// $db->orderBy("empleadonombre","asc");
		$productos = $db->get('producto');

	?>
	<div class="container">
		<h3>Productos</h3>
		<?php if ($productos): ?>
		<table class="table table-bordered table-hover table-striped">
			<thead>
				<tr>
					<th>Nombre</th>
					<th>Descripción</th>
					<th>Precio</th>
					<th>Opciones</th>
				</tr>
			</thead>
			<tbody>
				<?php foreach ($productos as $index => $producto): ?>
					<tr>
						<td><?php echo $producto['producto_nombre'] ?></td>
						<td><?php echo $producto['producto_descripcion'] ?></td>
						<td><?php echo $producto['producto_precio'] ?></td>
						<td>
							<!-- Split button -->
							<div class="btn-group">
							<button type="button" class="btn btn-sm btn-primary">Añadir al carrito</button>
								<button type="button" class="btn btn-sm btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<span class="caret"></span>
									<span class="sr-only">Más opciones</span>
								</button>
								<ul class="dropdown-menu">
									<li><a href="#">Añadir al carrito</a></li>
									<li><a href="#">Another action</a></li>
									<li><a href="#">Something else here</a></li>
									<li role="separator" class="divider"></li>
									<li><a href="#">Separated link</a></li>
								</ul>
							</div>
						</td>
					</tr>
				<?php endforeach ?>
			</tbody>
		</table>
		<ul class="list">

		</ul>
		<?php else: ?>
			<h6>No hay productos</h6>
		<?php endif ?>
		<script type="text/javascript" src="/assets/js/jquery.min.js"></script>
		<script type="text/javascript" src="/assets/js/bootstrap.min.js"></script>
	</div>
</body>
</html>
