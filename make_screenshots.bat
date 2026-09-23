@echo off
chcp 65001 >nul
echo ========================================
echo   NeonEdge - Создание скриншотов
Echo ========================================
echo.
echo Создание скриншотов для всех устройств...
echo.
cd /d %~dp0
node screenshot_script.js
pause
