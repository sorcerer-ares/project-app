<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$allowedOrigin = 'http://localhost:5173'; // React dev server
header("Access-Control-Allow-Origin: $allowedOrigin");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight requests

// Allow cross-origin requests from React dev server
$allowedOrigin = 'http://localhost:5173';
header("Access-Control-Allow-Origin: $allowedOrigin");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

/ Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cloud-drive";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "DB connection failed"]);
    exit();
}


$data = json_decode(file_get_contents("php://input"), true);

$fileId = $data["fileId"];
$newName = $data["newName"];

if (!$fileId || !$newName) {
    http_response_code(400);
    echo json_encode(["message" => "File ID and new name are required"]);
    exit;
}

$sql = "UPDATE files SET name = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $newName, $fileId);

if ($stmt->execute()) {
    echo json_encode(["message" => "File renamed successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Failed to rename file"]);
}

$stmt->close();
$conn->close();
?>
