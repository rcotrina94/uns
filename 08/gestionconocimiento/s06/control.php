<?php
     /* A continuación, realizamos la conexión con nuestra base de datos en MySQL */
     $link = mysql_connect("localhost","pytel","pytel");
     mysql_select_db("gc_sem06", $link);
     if ($_SERVER['REQUEST_METHOD'] != 'POST'){
          header ("Location: index.php");
     }

     /* El query valida si el usuario ingresado existe en la base de datos. Se utiliza la función
     htmlentities para evitar inyecciones SQL. */
     $USERNAME = $_POST["usuario"];
     $SQL_QUERY = "select idusuario from usuarios where idusuario = '".htmlentities($USERNAME)."'";

     $myusuario = mysql_query($SQL_QUERY, $link);
     $nmyusuario = mysql_num_rows($myusuario);

     //Si existe el usuario, validamos también la contraseña ingresada y el estado del usuario...
     if($nmyusuario != 0){

          $sql = "select idusuario
               from usuarios
               where estado = 1
               and idusuario = '".htmlentities($_POST["usuario"])."'
               and clave = '".htmlentities($_POST["clave"])."'";
          $myclave = mysql_query($sql,$link);
          $nmyclave = mysql_num_rows($myclave);

          //Si el usuario y clave ingresado son correctos (y el usuario está activo en la BD), creamos la sesión del mismo.
          session_start();
          if($nmyclave != 0){
               //Guardamos dos variables de sesión que nos auxiliará para saber si se está o no "logueado" un usuario
               $_SESSION["autentica"] = "SIP";
               $_SESSION["usuarioactual"] = mysql_result($myclave,0,0); //nombre del usuario logueado.
               //Direccionamos a nuestra página principal del sistema.
               header ("Location: app.php");
          }
          else{
               if (!isset($_SESSION["intentos_".$USERNAME])){
                    $_SESSION["intentos_".$USERNAME] = 0;
               }
               $_SESSION["intentos_".$USERNAME]++; //Suma un intento

               print "La contraseña del usuario no es correcta.";

               if ($_SESSION["intentos_".$USERNAME] > 3) {
                    print "\nUsted ha superado el número máximo de intentos.";
               } else {
                    print "\nIntentos: ".$_SESSION["intentos_".$USERNAME];
               }
          }

     }else{
          echo"<html><body>El usuario no existe.</body></html>";
     }
     mysql_close($link);
?>
