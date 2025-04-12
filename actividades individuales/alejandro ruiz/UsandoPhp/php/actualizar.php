<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include ("config.php");

$response = array();

// ? Verificar si se reciben los parámetros necesarios.
if (isset($_POST['id']) && isset($_POST['nombre']) && isset($_POST['email'])) {
    $id = $conn->real_escape_string($_POST['id']);
    $nombre = $conn->real_escape_string($_POST['nombre']);
    $email = $conn->real_escape_string($_POST['email']);

    // Validar email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['success'] = false;
        $response['error'] = "Email inválido";
        echo json_encode($response);
        exit();
    }

    // Usar prepared statements
    $stmt = $conn->prepare("UPDATE usuarios SET nombre=?, email=? WHERE id=?");
    $stmt->bind_param("ssi", $nombre, $email, $id);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = "Registro actualizado correctamente";
    } else {
        $response['success'] = false;
        $response['error'] = "Error: " . $conn->error;
    }

    $stmt->close();
} else {
    $response['success'] = false;
    $response['error'] = "Faltan datos requeridos";
}

echo json_encode($response);
$conn->close();