@echo off
chcp 65001 >nul
echo ========================================
echo   NeonEdge - Локальный сервер для тестирования
Echo ========================================
echo.
echo Запуск сервера на http://localhost:8080
echo.
echo Для остановки сервера: нажмите Ctrl+C
echo.
cd /d %~dp0
http-server -p 8080 -c-1 --cors .
