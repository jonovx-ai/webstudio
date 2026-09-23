/**
 * Скрипт для автоматического создания скриншотов сайта на разных устройствах
 * Использует Puppeteer для генерации скриншотов
 * 
 * Установка: npm install puppeteer
 * Запуск: node screenshot_script.js
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Конфигурация устройств
const DEVICES = [
  {
    name: 'iPhone_SE',
    width: 320,
    height: 568,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  },
  {
    name: 'iPhone_12_13',
    width: 390,
    height: 844,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true
  },
  {
    name: 'iPhone_12_Pro_Max',
    width: 428,
    height: 926,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true
  },
  {
    name: 'iPad',
    width: 768,
    height: 1024,
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  },
  {
    name: 'iPad_Pro',
    width: 1024,
    height: 1366,
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  },
  {
    name: 'Samsung_Galaxy_S21',
    width: 384,
    height: 854,
    userAgent: 'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true
  },
  {
    name: 'Samsung_Galaxy_Tab',
    width: 800,
    height: 1280,
    userAgent: 'Mozilla/5.0 (Linux; Android 11; SM-T860) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Safari/537.36',
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  },
  {
    name: 'Desktop_Small',
    width: 1280,
    height: 720,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false
  },
  {
    name: 'Desktop_Medium',
    width: 1440,
    height: 900,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false
  },
  {
    name: 'Desktop_Large',
    width: 1920,
    height: 1080,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false
  },
  {
    name: 'Desktop_4K',
    width: 2560,
    height: 1440,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    deviceScaleFactor: 2,
    isMobile: false,
    hasTouch: false
  }
];

// Конфигурация скриншотов
const CONFIG = {
  url: 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/'), // или 'http://localhost:3000' для сервера
  outputDir: './screenshots',
  fullPage: true,
  omitBackground: true, // Для прозрачного фона (если нужно)
  type: 'png', // или 'jpeg'
  delay: 2000, // Задержка для загрузки анимаций (мс)
  
  // Секции для скриншотов (опционально)
  sections: [
    { name: 'hero', selector: '.hero' },
    { name: 'solutions', selector: '#solutions' },
    { name: 'process', selector: '#process' },
    { name: 'cases', selector: '#case' },
    { name: 'contact', selector: '#contact' }
  ]
};

// Создать директорию для скриншотов
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Основная функция создания скриншотов
async function takeScreenshots() {
  console.log('📸 Запуск создания скриншотов...\n');
  
  ensureDirectoryExists(CONFIG.outputDir);
  
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: chromePath,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu'
    ]
  });
  
  const results = [];
  
  try {
    for (const device of DEVICES) {
      console.log(`📱 Создаю скриншоты для ${device.name} (${device.width}x${device.height})...`);
      
      const page = await browser.newPage();
      
      // Настроить вьюпорт
      await page.setViewport({
        width: device.width,
        height: device.height,
        deviceScaleFactor: device.deviceScaleFactor,
        isMobile: device.isMobile,
        hasTouch: device.hasTouch,
        isLandscape: false
      });
      
      // Установить user-agent
      await page.setUserAgent(device.userAgent);
      
      // Открыть страницу
      await page.goto(CONFIG.url, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });
      
      // Подождать загрузку анимаций
      await new Promise(resolve => setTimeout(resolve, CONFIG.delay));
      
      // Создать полный скриншот страницы
      const fullScreenshotPath = path.join(
        CONFIG.outputDir,
        `full_${device.name}_${device.width}x${device.height}.${CONFIG.type}`
      );
      await page.screenshot({
        path: fullScreenshotPath,
        fullPage: CONFIG.fullPage,
        omitBackground: CONFIG.omitBackground,
        type: CONFIG.type
      });
      
      results.push({
        device: device.name,
        resolution: `${device.width}x${device.height}`,
        fullPage: fullScreenshotPath
      });
      
      // Создать скриншоты отдельных секций (опционально)
      if (CONFIG.sections && CONFIG.sections.length > 0) {
        for (const section of CONFIG.sections) {
          try {
            const element = await page.$(section.selector);
            if (element) {
              const sectionScreenshotPath = path.join(
                CONFIG.outputDir,
                `${device.name}_${section.name}.${CONFIG.type}`
              );
              await element.screenshot({
                path: sectionScreenshotPath,
                omitBackground: CONFIG.omitBackground,
                type: CONFIG.type
              });
              
              results.push({
                device: device.name,
                section: section.name,
                path: sectionScreenshotPath
              });
            }
          } catch (error) {
            console.warn(`⚠️  Не удалось создать скриншот секции ${section.name} для ${device.name}`);
          }
        }
      }
      
      await page.close();
      console.log(`✅ Готово для ${device.name}\n`);
    }
    
    // Создать отчет
    const report = {
      timestamp: new Date().toISOString(),
      url: CONFIG.url,
      devices: DEVICES.map(d => `${d.name} (${d.width}x${d.height})`),
      results: results,
      totalScreenshots: results.length
    };
    
    const reportPath = path.join(CONFIG.outputDir, 'report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log('📋 Отчет сохранен в:', reportPath);
    console.log('\n🎉 Все скриншоты созданы!');
    console.log(`📁 Папка: ${CONFIG.outputDir}`);
    console.log(`📊 Всего скриншотов: ${results.length}`);
    
  } catch (error) {
    console.error('❌ Ошибка:', error);
  } finally {
    await browser.close();
  }
}

// Функция для создания HTML-отчета
function createHTMLReport(results) {
  const html = `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Отчет по скриншотам - NeonEdge</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background: #0a0a0a;
      color: #e5e5e5;
    }
    h1 { color: #b8ff6a; margin-bottom: 20px; }
    h2 { color: #8b5cf6; margin-top: 30px; }
    .device-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .device-card {
      background: #1a1a1a;
      border-radius: 12px;
      padding: 15px;
      border: 1px solid #333;
    }
    .device-card h3 { margin: 0 0 10px 0; color: #fff; }
    .device-card img {
      width: 100%;
      border-radius: 8px;
      margin-bottom: 10px;
    }
    .meta {
      font-size: 12px;
      color: #888;
      display: flex;
      gap: 15px;
    }
    .download-btn {
      display: inline-block;
      background: #6366f1;
      color: white;
      padding: 8px 16px;
      border-radius: 6px;
      text-decoration: none;
      margin-top: 10px;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <h1>📸 Отчет по скриншотам - NeonEdge</h1>
  <p>Сгенерировано: ${new Date().toLocaleString('ru-RU')}</p>
  
  <h2>Все скриншоты</h2>
  <div class="device-grid">
    ${results.map(result => `
      <div class="device-card">
        <h3>${result.device} ${result.resolution ? `(${result.resolution})` : ''}</h3>
        ${result.fullPage ? `<img src="${path.relative(CONFIG.outputDir, result.fullPage)}" alt="${result.device}">` : ''}
        <div class="meta">
          <span>📱 ${result.resolution || 'Full page'}</span>
        </div>
        <a href="${result.fullPage}" class="download-btn" download>Скачать</a>
      </div>
    `).join('')}
  </div>
</body>
</html>
  `;
  
  const htmlPath = path.join(CONFIG.outputDir, 'report.html');
  fs.writeFileSync(htmlPath, html);
  console.log('📄 HTML-отчет создан:', htmlPath);
}

// Запуск
(async () => {
  try {
    await takeScreenshots();
    
    // Подождать немного перед созданием отчета
    setTimeout(() => {
      const reportPath = path.join(CONFIG.outputDir, 'report.json');
      if (fs.existsSync(reportPath)) {
        const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
        createHTMLReport(report.results);
      }
    }, 1000);
    
  } catch (error) {
    console.error('Ошибка при выполнении:', error);
    process.exit(1);
  }
})();

// Экспорт для использования в других скриптах
module.exports = {
  DEVICES,
  CONFIG,
  takeScreenshots,
  createHTMLReport
};
