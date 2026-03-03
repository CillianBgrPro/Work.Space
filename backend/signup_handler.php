<?php
header('Content-Type: application/json');

require_once 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'Données invalides']);
    exit;
}

$name = strip_tags($data['name']);
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$password = $data['password'];

try {
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);

    if ($stmt->fetch()) {
        echo json_encode(['success' => false, 'message' => 'Cet email est déjà utilisé']);
        exit;
    }

    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");

    if ($stmt->execute([$name, $email, $hashedPassword])) {
        $newId = $pdo->lastInsertId();

        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $_SESSION['user_id'] = $newId;
        $_SESSION['user_name'] = $name;

        echo json_encode([
            'success' => true,
            'user' => [
                'name' => $name,
                'id' => $newId
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => "Erreur lors de l'enregistrement"]);
    }

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => "Erreur technique : " . $e->getMessage()]);
}