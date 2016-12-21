<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="utf-8">
	<title>PHP - Gestión del Conocimiento</title>
	<link rel="stylesheet" type="text/css" href="/assets/css/bootstrap_paper.css">
	<style type="text/css">
		input.form-control{
			background-color: white;
		}
		.big-text{
			font-size: 18px;
		}
	</style>
</head>
<body class="container">
	<?php
		require("../index_header.php");
		$FORM = $_POST['form_id'];
		switch ($FORM) {
			case 1:
				$numero = $_POST['numero'];
				$potencia = $_POST['potencia'];
				break;
			case 2:
				$P = $_POST['P'];
				$Q = $_POST['Q'];
				$IMP = ($P == $Q)?"Falso":"Verdadero";
				break;
			case 3:
				$narray = array(92, 15, 64, 73, 25, 55, 53, 13, 15, 5);
				$suma = 0;
				$count = count($narray);
				for ($i=0; $i < $count; $i++) {
					$suma += $narray[$i];
				}
				$promedio = $suma/$count;
				break;
			case 4:
				$nimpares = $_POST['nimpares'];

				$sumaimpares = pow($nimpares,2);
				break;
			default:
				# code...
				break;
		}
	?>
	<h3>Ejercicio 1</h3>
	<ul>
		<li><a href="#FORM01">Función llamada a calcular la potencia de un número.</a></li>
		<li><a href="#FORM02">Función llamada implicación que calcule si la implicación lógica de sus dos operandos es verdadera o falsa, cumpliendo la función lógica XOR.</a></li>
		<li><a href="#FORM03">Función que devuelve la media aritmética de los números contenidos en un vector que se le pasa como argumento. (Nota: count($a) devolvería el número de elementos del vector $a).</a></li>
		<li><a href="#FORM04">Función que calcule la suma de los los N números impares.</a></li>
	</ul>
	<div class="big-text">
	<form class="from-horizontal jumbotron" id="FORM01" name="FORM01" method="POST">
		<fieldset>
			<legend>01. Función <code>Potencia</code></legend>
			<input type="hidden" name="form_id" value="1">

			<div class="form-group">
				<div class="col-sm-3">
					<label class="control-label col-sm-7" for="numero">Número:</label>
					<div class="col-sm-5">
						<input class="form-control" value="<?php print $numero ?>" type="number" name="numero" id="numero">
					</div>

				</div>
				<div class="col-sm-3">
					<label class="control-label col-sm-7"  for="potencia">Potencia:</label>
					<div class="col-sm-5">
						<input class="form-control"  value="<?php print $potencia ?>" type="number" name="potencia" id="potencia">
					</div>
				</div>

				<button type="submit">Enviar</button>
			</div>
		</fieldset>
		Resultado: <strong><?php print pow($numero, $potencia); ?></strong>
	</form>

	<form action="#FORM02" class="form-horizontal jumbotron" id="FORM02" name="FORM02" method="POST">
		<fieldset>
			<legend>02. Función <code>Implicación</code></legend>
			<input type="hidden" name="form_id" value="2">
			<div class="form-group">
				<div class="col-sm-1">
					<div class="checkbox">
						<label for="P">
							<input <?php if (isset($_POST["P"])): ?>checked<?php endif ?> name="P" id="P" type="checkbox"> P
						</label>
					</div>
				</div>
				<div class="col-sm-1">
					<div class="checkbox">
						<label for="Q">
							<input <?php if (isset($_POST["Q"])): ?>checked<?php endif ?> name="Q" id="Q" type="checkbox"> Q
						</label>
					</div>
				</div>
				<button type="submit">Enviar</button>
			</div>
		</fieldset>
		Resultado: <strong><?php print $IMP ?></strong>
	</form>
	<form class="jumbotron" action="#FORM03" id="FORM03" name="FORM03" method="POST">
		<legend>03.Función <code>Media aritmética</code></legend>
		<div class="form-group">
			<input type="hidden" name="form_id" value="3">
			Hallar la media arimética de los números: <code>92, 15, 64, 73, 25, 55, 53, 13, 15, 5</code>
			<button type="submit">Hallar</button>
		</div>
		Resultado: <strong><?php print $promedio ?></strong>

	</form>
	<form class="jumbotron" action="#FORM04" id="FORM04" name="FORM04" method="POST">
		<legend>04.Función <code>suma de N primeros impares</code></legend>
		<input type="hidden" name="form_id" value="4">
		<div class="form-group">
			<div class="col-sm-3">
				<label class="control-label col-sm-2" for="numero">N:</label>
				<div class="col-sm-10">
					<input class="form-control" value="<?php print $nimpares ?>" type="number" name="nimpares" id="nimpares">
				</div>

			</div>
			<button type="submit">Hallar</button>
		</div>
		Resultado: <strong><?php print $sumaimpares ?></strong>

	</form>
	</div>
</body>
</html>
