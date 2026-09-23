# 🚀 Инструкция по запуску и использованию

## ✅ Что уже настроено

### Установленные инструменты:
- **Node.js v24.21.0** - JavaScript runtime
- **npm 11.19.0** - Package manager
- **Puppeteer** - Для автоматических скриншотов
- **http-server** - Локальный веб-сервер

### Созданные файлы:
- `screenshots/` - папка с 66 скриншотами для 10 устройств
- `screenshot_script.js` - скрипт для создания скриншотов
- `responsively_config.json` - конфигурация для Responsively App
- `start_server.bat` - запуск локального сервера
- `make_screenshots.bat` - запуск создания скриншотов
- `test_single_device.bat` - тестирование на одном устройстве

---

## 📋 Быстрый старт

### 1. Запуск локального сервера

```cmd
# Двойной клик по файлу:
start_server.bat
```

Или из командной строки:
```cmd
cd C:\Apple
http-server -p 8080
```

**Сервер будет доступен по адресу:** http://localhost:8080

### 2. Создание скриншотов

```cmd
# Двойной клик по файлу:
make_screenshots.bat
```

Или из командной строки:
```cmd
cd C:\Apple
node screenshot_script.js
```

**Результаты:**
- Скриншоты сохраняются в `screenshots/`
- Создается HTML-отчет `screenshots/report.html`
- Создается JSON-отчет `screenshots/report.json`

### 3. Тестирование на одном устройстве

```cmd
# Двойной клик по файлу:
test_single_device.bat
```

Затем выберите устройство из списка и браузер откроется в нужном разрешении.

---

## 📱 Использование Chrome DevTools (встроенный эмулятор)

### Быстрый способ:
1. Откройте Chrome
2. Нажмите **F12** или **Ctrl+Shift+I**
3. Нажмите **Ctrl+Shift+M** (Toggle Device Toolbar)
4. Выберите устройство из списка
5. Откройте **http://localhost:8080** или **file:///C:/Apple/index.html**

### Поддерживаемые устройства в Chrome DevTools:
- iPhone SE, iPhone 8, iPhone 8 Plus
- iPhone X, iPhone 11, iPhone 12
- iPad, iPad Pro
- Samsung Galaxy S5, S8, S20
- Google Pixel 2, 3, 4, 5
- И viele другие

### Кастомные устройства:
1. Откройте Device Toolbar (Ctrl+Shift+M)
2. Нажмите **Edit** (карандаш)
3. Добавьте новое устройство
4. Задайте Width, Height, Device Pixel Ratio

---

## 🎨 Использование Responsively App

### Установка:
1. Скачайте с сайта: https://responsively.app/
2. Установите приложение
3. Запустите Responsively App

### Использование:
1. Импортируйте конфигурацию из `responsively_config.json`
2. Откройте URL: **http://localhost:8080** или **file:///C:/Apple/index.html**
3. Выберите нужные устройства из пресетов
4. Включите **Sync Mode** для синхронизированного тестирования

### Пресеты устройств:
- **Mobile Only:** iPhone SE, iPhone 12/13, iPhone 14 Pro Max, Samsung Galaxy S21
- **Tablets:** iPad, iPad Pro, Samsung Galaxy Tab
- **Desktop Only:** Desktop Small, Medium, Large
- **All Devices:** Комбинация устройств
- **Quick Test:** iPhone 12/13, iPad, Desktop Medium

---

## 📊 Созданные скриншоты

### Устройства (10 шт.):
1. **iPhone SE** - 320×568
2. **iPhone 12/13** - 390×844
3. **iPhone 14 Pro Max** - 428×926
4. **Samsung Galaxy S21** - 384×854
5. **iPad** - 768×1024
6. **iPad Pro** - 1024×1366
7. **Samsung Galaxy Tab** - 800×1280
8. **Desktop Small** - 1280×720
9. **Desktop Medium** - 1440×900
10. **Desktop Large** - 1920×1080
11. **Desktop 4K** - 2560×1440

### Типы скриншотов:
- **Full page** - полная страница для каждого устройства (11 файлов)
- **Sections** - отдельные секции (Hero, Solutions, Process, Cases, Contact) для каждого устройства (55 файлов)

**Всего: 66 скриншотов**

---

## 🔧 Настройка скрипта

### Изменение конфигурации
Откройте файл `screenshot_script.js` и измените:

```javascript
const CONFIG = {
  url: 'file:///' + path.resolve(__dirname, 'index.html').replace(/\\/g, '/'),
  outputDir: './screenshots',
  fullPage: true,
  omitBackground: true,
  type: 'png',
  delay: 2000,
  sections: [
    { name: 'hero', selector: '.hero' },
    { name: 'solutions', selector: '#solutions' },
    // ...
  ]
}
```

### Добавление новых устройств
Редактируйте массив `DEVICES` в начале файла:

```javascript
const DEVICES = [
  {
    name: 'My_Device',
    width: 1234,
    height: 5678,
    userAgent: '...',
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  },
  // ...
]
```

---

## 📁 Структура проекта

```
C:\Apple\
├── index.html              # Основная HTML
├── style.css               # Стили
├── script.js               # JavaScript
├── assets/                 # Изображения и ресурсы
│   ├── img/
│   ├── icons/
│   └── fonts/
├── package.json            # Node.js зависимости
├── screenshot_script.js    # Скрипт скриншотов
├── responsively_config.json # Конфигурация Responsively
├── start_server.bat        # Запуск сервера
├── make_screenshots.bat    # Создание скриншотов
├── test_single_device.bat  # Тестирование на одном устройстве
├── INSTRUKCIYA_PO_ZAPUSKU.md # Эта инструкция
└── screenshots/            # Скриншоты
    ├── full_*.png           # Полные страницы
    ├── *hero.png            # Секция Hero
    ├── *solutions.png       # Секция Решения
    ├── *process.png         # Секция Процесс
    ├── *cases.png           # Секция Кейсы
    ├── *contact.png         # Секция Контакты
    ├── report.html          # HTML-отчет
    └── report.json          # JSON-отчет
```

---

## 🎯 Рекомендации по тестированию

### 1. Регулярное тестирование
- Запускайте `make_screenshots.bat` после каждого значительного изменения
- Сравнивайте новые скриншоты со старыми для выявления регрессий

### 2. Ручное тестирование
- Используйте `test_single_device.bat` для визуального тестирования
- Используйте Chrome DevTools для детального анализа

### 3. Автоматизация
- Добавьте запуск скрипта в CI/CD (если используется)
- Настройте периодическое тестирование

---

## 🐛 Решение проблем

### Проблема: Chrome не найден
```bash
npx puppeteer browsers install chrome
```

### Проблема: Ошибка выполнения скриптов в PowerShell
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```

### Проблема: Порт 8080 занят
```cmd
http-server -p 8081
```

### Проблема: Скриншоты не создаются
- Проверьте, что Chrome установлен
- Проверьте, что путь к Chrome правильный в `screenshot_script.js`
- Проверьте, что файл index.html доступен

---

## 📚 Дополнительные ресурсы

### Документация:
- **Puppeteer:** https://pptr.dev/
- **Chrome DevTools:** https://developer.chrome.com/docs/devtools/
- **Responsively App:** https://responsively.app/
- **http-server:** https://www.npmjs.com/package/http-server

### Полезные команды:

```cmd
# Проверка версии Node.js
node --version

# Проверка версии npm
npm --version

# Обновление зависимостей
npm update

# Просмотр установленных пакетов
npm list

# Удаление пакетов
npm uninstall <package>

# Очистка кэша
npm cache clean --force
```

---

## ✨ Советы по адаптивности

### быстрые проверки:
1. **Chrome DevTools** - быстрое тестирование на разных устройствах
2. **Responsively App** - одновременное отображение на нескольких устройствах
3. **Puppeteer** - автоматические скриншоты для регрессионного тестирования

### Что проверять:
- [ ] Отображение на мобильных устройствах (< 768px)
- [ ] Отображение на планшетах (768px - 1024px)
- [ ] Отображение на десктопах (> 1024px)
- [ ] Работа форм на всех устройствах
- [ ] Работа навигации на мобильных
- [ ] Touch-оптимизация
- [ ] Производительность на слабых устройствах

---

**Дата создания:** 2026-09-23  
**Версия:** 1.0  
**Подготовлено для:** Проекта NeonEdge
