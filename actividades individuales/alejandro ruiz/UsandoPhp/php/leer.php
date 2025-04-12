<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include ("config.php");

// ? Consulta SQL para obtener todos los usuarios.
$sql = "SELECT * FROM usuarios";
$result = $conn->query($sql);
$data = array();

// ? Verificar si hay registros obtenidos
if ($result->num_rows > 0) {
 while ($row = $result->fetch_assoc()) {
 $data[] = $row;
 }
}
echo json_encode($data);
$conn->close();