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

if(isset($_GET["insert_masa"])){
    $data = json_decode(file_get_contents("php://input"));
    $masa=$data->masa;
    $edad=$data->edad;
    if (empty($masa) || empty($edad)) {
        echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
    } else {
        $insert_sql = "INSERT INTO datos (masa,
                edad) VALUES ('$masa',
        '$edad')";
        if ($conexionBD->query($insert_sql) === TRUE) {
                echo json_encode(["success" => 1, "message" => "dato Insertado Correctamente"]);
        } else {
            echo json_encode(["error" => "Error al insertar nuevo dato: " . $conexionBD->error]);
        }
    }
}

// Cerrar conexión
$conexionBD->close();

?>