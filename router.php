<?php
$requestPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
if (!is_string($requestPath)) {
    http_response_code(400);
    exit;
}

$requestPath = rawurldecode($requestPath);
$normalizedPath = strtolower($requestPath);
if (str_contains($requestPath, "\0") || preg_match('~(?:^|/)\.~', $requestPath)) {
    http_response_code(404);
    exit;
}

if ($requestPath === '/api/auth.php') {
    require __DIR__ . '/api/auth.php';
    exit;
}

if (
    $normalizedPath === '/storage'
    || str_starts_with($normalizedPath, '/storage/')
    || str_starts_with($normalizedPath, '/config/')
    || str_starts_with($normalizedPath, '/database/')
    || str_ends_with($normalizedPath, '.php')
) {
    http_response_code(404);
    exit;
}

return false;
