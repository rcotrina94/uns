<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="utf-8">
	<title>PHP - Gestión del Conocimiento</title>
	<link rel="stylesheet" type="text/css" href="/assets/css/bootstrap_paper.css">
	<style type="text/css">
		.form-control{
			background-color: white;
		}
		.big-text{
			font-size: 18px;
		}
	</style>
	<?php
		require('db.php');
		$clientes = new DB_mysql ;
		$clientes->conectar();
		$clientes->consulta("SELECT * FROM cliente");

		$distritos = new DB_mysql ;
		$distritos->conectar();
		$distritos->consulta("SELECT `cod_dis`, `nom_dis` FROM distrito");
		$distritos_array = $distritos->fetch_array();

		if (isset($_POST['datos_cliente'])){
			echo "CLIENTE!!";

			$cliente_nombre = $_POST['nombre'];
			   $cliente_dir = $_POST['direccion'];
			$cliente_id_dis = $_POST['distrito_id'];
			  $cliente_sexo = $_POST['sexo'];
			   $cliente_dni = $_POST['dni'];
			   $cliente_ruc = $_POST['ruc'];
			   $cliente_tel = $_POST['tel'];
			   $cliente_cel = $_POST['cel'];

			$sql = "INSERT INTO `cliente` (`nom_cli`, `dir_clil`, `cod_dis`, `sexo`, `DNI`, `RUC`, `tel_cliente`, `cel_cliente`) ";
			$sql .= "VALUES (".$cliente_nombre.", ".$cliente_dir.", ".$cliente_id_dis.", ".$cliente_sexo.", ".$cliente_dni.", ".$cliente_ruc.", ".$cliente_tel.", ".$cliente_ruc." );";

		$clientes->consulta($sql);

		}
	?>
</head>
<body class="container">
	<h3>INTERFAZ CRUD (CREATE-READ-UPDATE-DELETE)</h3>
	<form class="jumbotron col-lg-offset-2 col-lg-8 form form-horizontal" method="POST">
		<fieldset>
			<input type="hidden" name="datos_cliente" value="1">
			<legend><h3>Nuevo Cliente</h3></legend>
			<div class="form-group">
				<label for="inputEmail" class="col-lg-2 control-label">DNI</label>
				<div class="col-lg-5">
					<input autofocus required type="text" class="form-control" id="dni" name="dni" placeholder="76086783">
				</div>
				<div class="col-lg-5">
					<input required type="text" class="form-control" id="ruc" name="ruc" placeholder="1760867839">
				</div>
			</div>
			<div class="form-group">
				<label for="nombre" class="col-lg-2 control-label">Nombres</label>
				<div class="col-lg-10">
					<input required type="text" class="form-control" id="nombre" name="nombre" placeholder="Nombres">
				</div>
			</div>
			<div class="form-group">
				<label for="direccion" class="col-lg-2 control-label">Dirección</label>
				<div class="col-lg-10">
					<textarea class="form-control" rows="3" id="direccion" name="direccion"></textarea>
					<span class="help-block">Ingrese las líneas de su dirección postal.</span>
				</div>
			</div>
			<div class="form-group">
				<label for="distrito_id" class="col-lg-2 control-label">Distrito</label>
				<div class="col-lg-10">
					<select class="form-control" id="distrito_id" name="distrito_id">
						<option>Distrito 0</option>
						<option>Distrito 1</option>
					</select>
				</div>
			</div>
			<div class="form-group">
				<label for="select" class="col-lg-2 control-label">Sexo</label>
				<div class="col-lg-10">
					<select class="form-control" id="sexo" name="sexo">
						<option value="0">Mujer</option>
						<option selected="selected" value="1">Hombre</option>
					</select>
				</div>
			</div>
			<div class="form-group">
				<label for="inputEmail" class="col-lg-2 control-label">Teléfono</label>
				<div class="col-lg-4">
					<input type="text" class="form-control" id="tel" name="tel" placeholder="+51 043 310000">
				</div>
				<label for="inputEmail" class="col-lg-2 control-label">Celular</label>
				<div class="col-lg-4">
					<input type="text" class="form-control" id="cel" name="cel" placeholder="+51 943 010 010">
				</div>
			</div>

			<div class="form-group">
				<div class="col-lg-10 col-lg-offset-2">
					<button type="reset" class="btn btn-default">Cancelar</button>
					<button type="submit" class="btn btn-primary">Enviar</button>
				</div>
			</div>
		</fieldset>
	</form>
	<br />

	<?php $clientes->verconsulta(); ?>
	<br />
	<?php $distritos->verconsulta(); ?>
</body>
</html>
