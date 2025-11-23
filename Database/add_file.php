<?php
// Enable error logging but send only JSON
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__.'/php_errors.log');

// CORS
$allowedOrigin = 'http://localhost:5173';
header("Access-Control-Allow-Origin: $allowedOrigin");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cloud-drive";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "DB connection failed"]);
    exit();
}

try {
    if (!isset($_FILES['file']) || !isset($_POST['user_id'])) {
        throw new Exception("No file or user_id received");
    }

    $file = $_FILES['file'];
    $user_id = $_POST['user_id'];

    // Unique filename
    $filename = uniqid() . "_" . basename($file['name']);
    $targetDir = __DIR__ . "/uploads/";
    if (!is_dir($targetDir)) mkdir($targetDir, 0777, true);
    $targetPath = $targetDir . $filename;

    if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
        throw new Exception("Failed to move uploaded file");
    }

    // Insert metadata
    $sql = "INSERT INTO files (UserID, Filename, OriginalName, Size) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssi", $user_id, $filename, $file['name'], $file['size']);

    if (!$stmt->execute()) {
        // Handle duplicate key gracefully
        if ($conn->errno === 1062) { 
            throw new Exception("File already exists in DB");
        }
        throw new Exception($conn->error);
    }

    echo json_encode([
        "status" => "success",
        "message" => "File uploaded successfully",
        "file" => [
            "user_id" => $user_id,
            "filename" => $filename,
            "original_name" => $file['name'],
            "size" => $file['size']
        ]
    ]);

} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}

$conn->close();
