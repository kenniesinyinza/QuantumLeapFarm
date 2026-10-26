<?php
declare(strict_types=1);

ini_set('session.use_strict_mode', '1');
session_set_cookie_params([
    'httponly' => true,
    'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
    'samesite' => 'Lax',
    'path' => '/',
]);
session_start();

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

function database(): PDO
{
    $storagePath = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'storage';
    if (!is_dir($storagePath) && !mkdir($storagePath, 0700, true) && !is_dir($storagePath)) {
        throw new RuntimeException('Unable to create the database directory.');
    }

    $pdo = new PDO('sqlite:' . $storagePath . DIRECTORY_SEPARATOR . 'quantumleap.sqlite');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->exec(
        'CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL COLLATE NOCASE UNIQUE,
            password_hash TEXT NOT NULL,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )'
    );

    return $pdo;
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($method === 'GET') {
    respond(200, [
        'authenticated' => isset($_SESSION['user']),
        'user' => $_SESSION['user'] ?? null,
    ]);
}

if ($method !== 'POST') {
    header('Allow: GET, POST');
    respond(405, ['error' => 'Method not allowed.']);
}

$contentType = strtolower(trim(explode(';', $_SERVER['CONTENT_TYPE'] ?? '', 2)[0]));
$isJsonRequest = $contentType === 'application/json';
if ($isJsonRequest) {
    $input = json_decode((string) file_get_contents('php://input'), true);
} elseif ($contentType === 'application/x-www-form-urlencoded') {
    $input = $_POST;
} else {
    respond(415, ['error' => 'Unsupported content type.']);
}

if (!is_array($input) || !isset($input['action']) || !is_string($input['action'])) {
    respond(400, ['error' => 'Invalid request.']);
}

$action = $input['action'];
if ($action === 'signout') {
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $cookie = session_get_cookie_params();
        setcookie(session_name(), '', [
            'expires' => time() - 42000,
            'path' => $cookie['path'],
            'domain' => $cookie['domain'],
            'secure' => $cookie['secure'],
            'httponly' => $cookie['httponly'],
            'samesite' => $cookie['samesite'],
        ]);
    }
    session_destroy();
    respond(200, ['message' => 'Signed out.']);
}

if (!in_array($action, ['signup', 'signin'], true)) {
    respond(400, ['error' => 'Unknown action.']);
}

$email = isset($input['email']) && is_string($input['email'])
    ? trim(mb_strtolower($input['email'], 'UTF-8'))
    : '';
$password = isset($input['password']) && is_string($input['password'])
    ? $input['password']
    : '';

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254) {
    respond(422, ['error' => 'Enter a valid email address.']);
}
if (strlen($password) < 8 || strlen($password) > 72) {
    respond(422, ['error' => 'Password must be between 8 and 72 bytes.']);
}

try {
    $pdo = database();

    if ($action === 'signup') {
        $confirmation = isset($input['confirmPassword']) && is_string($input['confirmPassword'])
            ? $input['confirmPassword']
            : '';
        if (!hash_equals($password, $confirmation)) {
            respond(422, ['error' => 'Passwords do not match.']);
        }

        $statement = $pdo->prepare(
            'INSERT INTO users (email, password_hash) VALUES (:email, :password_hash)'
        );
        try {
            $statement->execute([
                ':email' => $email,
                ':password_hash' => password_hash($password, PASSWORD_DEFAULT),
            ]);
        } catch (PDOException $error) {
            if (($error->errorInfo[1] ?? null) === 19) {
                respond(409, ['error' => 'An account with that email already exists.']);
            }
            throw $error;
        }

        $userId = (int) $pdo->lastInsertId();
    } else {
        $statement = $pdo->prepare(
            'SELECT id, email, password_hash FROM users WHERE email = :email'
        );
        $statement->execute([':email' => $email]);
        $user = $statement->fetch(PDO::FETCH_ASSOC);
        if (!$user || !password_verify($password, $user['password_hash'])) {
            respond(401, ['error' => 'Email or password is incorrect.']);
        }
        $userId = (int) $user['id'];
    }

    session_regenerate_id(true);
    $_SESSION['user'] = ['id' => $userId, 'email' => $email];
    if (!$isJsonRequest) {
        header('Location: ../Home/index.html', true, 303);
        exit;
    }
    respond(200, ['message' => 'Signed in.', 'user' => $_SESSION['user']]);
} catch (PDOException | RuntimeException $error) {
    error_log('QuantumLeap authentication service error: ' . $error->getMessage());
    respond(500, ['error' => 'The authentication service is temporarily unavailable.']);
}
