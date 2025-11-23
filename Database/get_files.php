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
    // Expect user_id as GET parameter
    $user_id = $_GET['user_id'] ?? null;
    if (!$user_id) throw new Exception("No user_id provided");

    $stmt = $conn->prepare("SELECT * FROM files WHERE UserID = ?");
    $stmt->bind_param("s", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $files = [];
    while ($row = $result->fetch_assoc()) {
        $files[] = $row;
    }

    echo json_encode(["status" => "success", "files" => $files]);

} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}

$conn->close();
