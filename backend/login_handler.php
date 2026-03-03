<?php
header('Content-Type: application/json');
require_once 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$password = $data['password'];

$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    session_start();
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_name'] = $user['name'];

    echo json_encode([
        'success' => true,
        'user' => ['name' => $user['name']]
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Email ou mot de passe incorrect']);
}