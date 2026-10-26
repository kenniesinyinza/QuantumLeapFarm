@echo off
setlocal
cd /d "%~dp0"
set "PHP=C:\xampp\php\php.exe"

if not exist "%PHP%" (
    where php >nul 2>nul
    if errorlevel 1 (
        echo PHP was not found. Install PHP or update the PHP path in start-local.bat.
        pause
        exit /b 1
    )
    set "PHP=php"
)

start "" /b powershell -NoProfile -Command "Start-Sleep -Seconds 2; Start-Process 'http://127.0.0.1:8000'"
"%PHP%" -S 127.0.0.1:8000 router.php
