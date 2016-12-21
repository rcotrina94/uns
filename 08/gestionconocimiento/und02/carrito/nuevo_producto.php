<!DOCTYPE html>
<html>
<head>
	<title>Carrito de compras</title>
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="/assets/css/bootstrap_paper.css">
	<style type="text/css">
		.form-control{
			background-color: rgba(255,255,255,.6);
		}
	</style>
</head>

<body>
	<?php
		require('db.php');

		function limpia_sql($texto) {
			return $texto;
		}

		function get_param($param){
			return limpia_sql(htmlspecialchars($_POST[$param]));
		}

		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
			$nombre = get_param('nombre');
			$descripcion = get_param('descripcion');
			$precio = get_param('precio');

			if (!($nombre && $descripcion && $precio)) {
				print "Error";
				return;
				# code...
			}

			$nuevo_producto = array(
				'producto_nombre' => $nombre,
				'producto_descripcion' => $descripcion,
				'producto_precio' => $precio
			);

			$guardado = $db->insert('producto', $nuevo_producto);
		}

	?>
	<div class="container">
		<h3>Nuevo Producto</h3>
		<?php if ($guardado): ?>
			<div class="alert alert-success">Se ha ingresado correctamente el producto <strong>'<?php echo $nombre ?>'<strong></div>
		<?php endif; ?>
		<form method="POST" action="" class="well form form-horizontal col-sm-6 col-sm-offset-3">
			<legend>Datos del Producto</legend>


			<div class="form-group">
				<label class="control-label col-sm-3">Nombre</label>
				<div class="col-sm-9">
					<input class="form-control" type="text" name="nombre">
				</div>
			</div>

			<div class="form-group">
				<label class="control-label col-sm-3">Descripción</label>
				<div class="col-sm-9">
					<textarea class="form-control" name="descripcion"></textarea>
				</div>
			</div>

			<div class="form-group">
				<label class="control-label col-sm-3">Precio</label>
				<div class="col-sm-9">
					<input class="form-control" type="number" step="0.01" name="precio">
				</div>
			</div>
			<div class="form-group">
				<div class="col-sm-9 col-sm-offset-3">
					<button class="btn btn-primary" type="submit">Guardar</button>
					&nbsp;
					<button class="btn btn-sm btn-danger" type="reset">Cancelar</button>
				</div>
			</div>
		</form>
	</div>

</body>
</html>
