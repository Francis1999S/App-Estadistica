<?php
// Acceso sin restricción al backend-
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: GET,POST");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "c19511_backend"; $contrasenia = "NBK0y3fLTiZc"; $nombreBaseDatos = "c19511_trabajo";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

// Establecer la codificación de caracteres
mysqli_set_charset($conexionBD, "utf8mb4");

//Obtener_Todos_Reclamos
if (isset($_GET["obtener_masa"])) {
    $sqldatos = mysqli_query($conexionBD, "SELECT * FROM `datos`;");
    $datos = mysqli_fetch_all($sqldatos, MYSQLI_ASSOC);
    echo json_encode($datos);
    exit();
}

// Cerrar conexión
$conexionBD->close();

?>