<?php
// Enable error logging but hide from client
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__.'/php_errors.log');

// CORS
$allowedOrigin = 'http://localhost:5173';
header("Access-Control-Allow-Origin: $allowedOrigin");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

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
    http_response_code(500);
    exit("DB connection failed");
}

try {
    if (!isset($_GET['file_id']) || !isset($_GET['user_id'])) {
        throw new Exception("file_id or user_id missing");
    }

    $file_id = intval($_GET['file_id']);
    $user_id = $_GET['user_id'];

    // Fetch file metadata
    $sql = "SELECT Filename, OriginalName FROM files WHERE id = ? AND UserID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("is", $file_id, $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        throw new Exception("File not found or access denied");
    }

    $file = $result->fetch_assoc();
    $filePath = __DIR__ . "/uploads/" . $file['Filename'];

    if (!file_exists($filePath)) {
        throw new Exception("File missing on server");
    }

    // Send download headers
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="' . basename($file['OriginalName']) . '"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($filePath));

    readfile($filePath);
    exit();

} catch (Exception $e) {
    http_response_code(404);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}

$conn->close();
