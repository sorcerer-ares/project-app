<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// --- CORS Headers ---
$allowedOrigin = 'http://localhost:5173';
header("Access-Control-Allow-Origin: $allowedOrigin");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- Database Connection ---
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cloud-drive";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "DB Connection failed"]));
}

// --- Read JSON body ---
$input = json_decode(file_get_contents("php://input"), true);
$file_id = $input['file_id'] ?? null;
$user_id = $input['user_id'] ?? null;

if (!$file_id || !$user_id) {
    echo json_encode(["status" => "error", "message" => "Missing file_id or user_id"]);
    exit();
}

// --- Fetch file info (to delete from disk) ---
$sql = "SELECT Filename FROM files WHERE ID = ? AND UserID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $file_id, $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["status" => "error", "message" => "File not found"]);
    $stmt->close();
    $conn->close();
    exit();
}

$file = $result->fetch_assoc();
$stmt->close();

$targetPath = __DIR__ . "/uploads/" . $file['Filename'];

// --- Delete from DB ---
$delete_sql = "DELETE FROM files WHERE ID = ? AND UserID = ?";
$delete_stmt = $conn->prepare($delete_sql);
$delete_stmt->bind_param("ii", $file_id, $user_id);

if ($delete_stmt->execute()) {
    // Delete physical file
    if (file_exists($targetPath)) {
        unlink($targetPath);
    }

    echo json_encode([
        "status" => "success",
        "message" => "File deleted successfully",
        "file_id" => $file_id
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Database delete failed: " . $conn->error
    ]);
}

$delete_stmt->close();
$conn->close();
?>
