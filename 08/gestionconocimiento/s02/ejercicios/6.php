<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="utf-8">
	<title>PHP - Gestión del Conocimiento</title>
	<link rel="stylesheet" type="text/css" href="/assets/css/bootstrap_paper.css">
</head>
<body class="container">
	<?php
		require("../index_header.php");

	?>
	<h3>Ejercicio 5</h3>
	<form class="form-horizontal col-md-8 col-md-offset-2" method="POST">
		<fieldset>
			<legend>Crear cuenta</legend>
			<div class="form-group">
				<label for="inputEmail" class="col-lg-2 control-label">Nombres</label>
				<div class="col-lg-5">
					<input required type="text" class="form-control" id="firstName" placeholder="Nombres">
				</div>
				<div class="col-lg-5">
					<input required type="text" class="form-control" id="lastName" placeholder="Apellidos">
				</div>
			</div>
			<div class="form-group">
				<label for="inputEmail" class="col-lg-2 control-label">Nombre de usuario</label>
				<div class="col-lg-10">
					<input required type="text" class="form-control" id="username" placeholder="Nombre de usuario">
				</div>
			</div>
			<div class="form-group">
				<label for="inputPassword" class="col-lg-2 control-label">Contraseña</label>
				<div class="col-lg-5">
					<input required type="password" class="form-control" id="inputPassword" placeholder="Contraseña">
				</div>
				<div class="col-lg-5">
					<input required type="password" class="form-control" id="inputPassword" placeholder="Repita la contraseña">
				</div>
			</div>
			<div class="form-group">
				<label for="textArea" class="col-lg-2 control-label">Dirección</label>
				<div class="col-lg-10">
					<textarea class="form-control" rows="3" id="textArea"></textarea>
					<span class="help-block">Ingrese las líneas de su dirección postal.</span>
				</div>
			</div>
			<div class="form-group">
				<label for="inputEmail" class="col-lg-2 control-label">Ciudad / CP</label>
				<div class="col-lg-5">
					<input type="text" class="form-control" id="city" placeholder="Lima">
				</div>
				<div class="col-lg-5">
					<input type="text" class="form-control" id="city" placeholder="Código Postal">
				</div>
			</div>
			<div class="form-group">
				<label for="select" class="col-lg-2 control-label">País</label>
				<div class="col-lg-10">
					<select class="form-control" id="select">
						<option>Perú</option>
						<option>Bolivia</option>
						<option>Ecuador</option>
						<option>Chile</option>
						<option>Argentina</option>
					</select>
				</div>
			</div>
			<div class="form-group">
				<label for="inputEmail" class="col-lg-2 control-label">Email</label>
				<div class="col-lg-4">
					<input type="email" class="form-control" id="inputEmail" placeholder="hola@correo.com">
				</div>
				<label for="inputEmail" class="col-lg-2 control-label">Teléfono</label>
				<div class="col-lg-4">
					<input type="text" class="form-control" id="number" placeholder="+51 943 010 010">
				</div>
			</div>

			<div class="form-group">
				<div class="col-lg-10 col-lg-offset-2">
					<button type="reset" class="btn btn-default">Cancelar</button>
					<button type="submit" class="btn btn-primary">Enviar</button>
				</div>
			</div>
		</fieldset>
		<br/><br/><br/><br/><br/><br/>
		nombre, apellidos, nombre de usuario, contraseña (pedirla dos veces), dirección, ciudad, Codigo Postal, País, teléfono
		y dirección de correo electrónico

		<pre><code><?php var_dump($_POST); ?></code></pre>
	</form>
</body>
</html>
