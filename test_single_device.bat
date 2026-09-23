@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo ========================================
echo   NeonEdge - Тестирование на одном устройстве
Echo ========================================
echo.
echo Доступные устройства:
echo 1. iPhone SE (320x568)
echo 2. iPhone 12/13 (390x844)
echo 3. iPad (768x1024)
echo 4. Desktop Medium (1440x900)
echo 5. Desktop Large (1920x1080)
echo.
set /p device="Выберите номер устройства (1-5): "

if "%device%"=="1" (
    set name=iPhone_SE
    set width=320
    set height=568
) else if "%device%"=="2" (
    set name=iPhone_12_13
    set width=390
    set height=844
) else if "%device%"=="3" (
    set name=iPad
    set width=768
    set height=1024
) else if "%device%"=="4" (
    set name=Desktop_Medium
    set width=1440
    set height=900
) else if "%device%"=="5" (
    set name=Desktop_Large
    set width=1920
    set height=1080
) else (
    echo Неверный выбор
    pause
    exit /b
)

echo.
echo Тестирование на %name% (%width%x%height%)...
echo.

cd /d %~dp0
node -e "
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: chromePath,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--start-maximized']
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: %width%, height: %height%, deviceScaleFactor: 1 });
    await page.goto('file:///' + path.resolve(__dirname, 'index.html').replace(/\\\\/g, '/'));
    
    console.log('Страница загружена. Тестируйте вручную.');
    console.log('Для выхода закройте браузер.');
    
    // Ждем пока пользователь закроет браузер
    while (true) {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
})();
"

pause
