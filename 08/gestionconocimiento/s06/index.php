<html>
<head>
	<meta charset="utf-8">
	<title>Inicio de sesión</title>
	<link rel="stylesheet" type="text/css" href="/assets/css/bootstrap_paper.css">
	<style type="text/css">
		input.form-control{
			background-color: rgba(255,255,255,.5);
		}
		.big-text{
			font-size: 18px;
		}
	</style>
	<?php
		session_start();
		$NINTENTOS = $_SESSION['intentos'];
	?>
</head>
<body class="container big-text">
	<div class="jumbotron col-md-6 col-md-offset-3">
		<h1>Inicio de sesión</h1>

		<div class="col-md-8 col-md-offset-2">
			<form class="form-horizontal" action="control.php" method="POST" id="form">
				<div class="form-group">
					<label class="control-label col-sm-3" for="usuario">Usuario</label>
					<div class="col-sm-9">
						<input autofocus required class="form-control" type="text" name="usuario" id="usuario" />
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-sm-3" for="clave">Clave</label>
					<div class="col-sm-9">
						<input class="form-control" type="password" name="clave" id="clave" />
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-9 col-sm-offset-3">
						<input required class="btn btn-lg btn-primary" type="submit" value="Entrar">
					</div>
				</div>
			</form>
		</div>
	</div>
</body>
</html>
