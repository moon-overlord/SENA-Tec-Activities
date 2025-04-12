<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include 'config.php';

$response = array();

// ? Verificar si se reciben los parámetros necesarios.
if (isset($_POST['nombre']) && isset($_POST['email'])) {
  $nombre = $conn->real_escape_string($_POST['nombre']);
  $email = $conn->real_escape_string($_POST['email']);

  // Validar email
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response['error'] = "Email inválido";
    echo json_encode($response);
    exit();
  }

  // ? Preparar la consulta SQL usando prepared statements
  $stmt = $conn->prepare("INSERT INTO usuarios (nombre, email) VALUES (?, ?)");
  $stmt->bind_param("ss", $nombre, $email);

  // ? Ejecutar la consulta y manejar resultados.
  if ($stmt->execute()) {
    $response['success'] = true;
    $response['message'] = "Nuevo registro creado correctamente";
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