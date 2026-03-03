<?php
$envPath = __DIR__ . '/../.env';
if (!file_exists($envPath)) {
    die(json_encode(['success' => false, 'message' => 'Fichier .env manquant']));
}

$config = parse_ini_file($envPath);

try {
    $host = $config['DB_HOST'];
    $dbname = $config['DB_NAME'];
    $user = $config['DB_USER'];
    $pass = $config['DB_PASSWORD'];

    $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";

    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    header('Content-Type: application/json');
    die(json_encode(['success' => false, 'message' => "Erreur MySQL : " . $e->getMessage()]));
}