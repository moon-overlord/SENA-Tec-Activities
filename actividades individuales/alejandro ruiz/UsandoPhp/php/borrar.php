<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include 'config.php';

$response = array();

if (isset($_POST['id'])) {
    $id = $conn->real_escape_string($_POST['id']);
    
    // Usar prepared statement para mayor seguridad
    $stmt = $conn->prepare("DELETE FROM usuarios WHERE id=?");
    $stmt->bind_param("i", $id);
    
    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = "Registro eliminado correctamente";
    } else {
        $response['success'] = false;
        $response['error'] = "Error: " . $conn->error;
    }
    
    $stmt->close();
} else {
    $response['success'] = false;
    $response['error'] = "ID no proporcionado";
}

echo json_encode($response);
$conn->close();
?>
