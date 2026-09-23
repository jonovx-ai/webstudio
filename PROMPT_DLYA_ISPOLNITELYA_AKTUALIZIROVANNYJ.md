# 📋 АКТУАЛЬНЫЙ ПРОМПТ ДЛЯ ИСПОЛНИТЕЛЯ

**Проект:** NeonEdge - Инженерия цифрового будущего  
**Репозиторий:** https://github.com/jonovx-ai/webstudio.git  
**Дата:** 23 сентября 2026 года  
**Статус:** ✅ **ВСЕ КРИТИЧЕСКИЕ ПРОБЛЕМЫ ИСПРАВЛЕНЫ**

---

## 🎯 КРАТКОЕ ОПИСАНИЕ

Вам нужно доработать сайт NeonEdge согласно выявленным проблемам из аудита. **Большая часть работы уже выполнена!** Осталось только добавление контента (Фаза 3).

---

## 📊 ТЕКУЩИЙ СТАТУС

| Категория | Текущая | Целевая | Статус |
|----------|---------|---------|--------|
| **SEO** | 9.5/10 | 9.5/10 | ✅ **Готово** |
| **UX/UI Дизайн** | 9.5/10 | 9.8/10 | ⚠️ Почти готово |
| **Техническая оптимизация** | 9.0/10 | 9.5/10 | ⚠️ Почти готово |
| **Контент** | 7.0/10 | 9.0/10 | 🔴 **Требует работы** |
| **Мобильная адаптивность** | 9.5/10 | 9.8/10 | ⚠️ Почти готово |
| **ИТОГО** | **9.2/10** | **9.5/10** | **85% готово** |

---

## ✅ ЧТО УЖЕ СДЕЛАНО

### 🔴 Критические исправления (Фаза 1 - 100%):
- ✅ Добавлены Open Graph meta теги
- ✅ Добавлен favicon.svg
- ✅ Добавлена расширенная schema.org разметка
- ✅ Созданы robots.txt и sitemap.xml с lastmod
- ✅ Все изображения оптимизированы (WebP, -76% вес)
- ✅ Добавлены width/height и loading="lazy" ко всем img
- ✅ Добавлен preload для hero.webp
- ✅ Исправлен Hero Image на мобильных
- ✅ Контакты сделаны кликабельными (mailto:, tel:)
- ✅ Telegram ссылка исправлена
- ✅ Добавлен canonical URL
- ✅ Добавлен noscript тег
- ✅ Исправлен лого href (с # на /)
- ✅ Исправлен Signal Band font-size (0.78rem → 0.85rem)
- ✅ Исправлен баг с лого (SyntaxError)
- ✅ Формы отправляются через Formspree.io

### 🟡 Улучшения (Фаза 2 - 80%):
- ✅ Минификация CSS (23.1KB → 17.9KB)
- ✅ Минификация JS (7.3KB → 4.4KB)
- ✅ Минификация HTML
- ✅ Извлечение и инлайн Critical CSS
- ✅ Добавлен prefers-reduced-motion
- ✅ Добавлены ARIA атрибуты

### 📁 Инфраструктура:
- ✅ Настроена система сборки (build.js)
- ✅ Установлены все зависимости (npm install)
- ✅ Создан CI/CD workflow для GitHub Pages
- ✅ Сгенерированы 66 скриншотов для 11 устройств
- ✅ Проект запушен в репозиторий

---

## 🔧 ЧТО ОСТАЛОСЬ ДЛЯ ДОСТИЖЕНИЯ 9.5/10

### 🟢 Фаза 3: Расширение контента (Оженный прирост: +0.3 балла)

#### 1. Добавить раздел "О нас" (About Us)
**Файл:** `index.html` (новая секция)
**Цель:** Увеличить доверие, добавить информацию о команде

```html
<!-- Добавить после секции Cases -->
<section id="about" class="section">
  <div class="container">
    <h2 class="section-title">О нас</h2>
    <div class="about-content">
      <div class="about-text reveal">
        <p>NeonEdge — это команда профессионалов, создающая цифровые продукты премиум-класса.</p>
        <p>Мы сочетаем стратегическое мышление, креативный дизайн и техническое мастерство.</p>
      </div>
      
      <div class="about-stats reveal" data-delay="100">
        <div class="stat">
          <span class="stat-number">50+</span>
          <span class="stat-label">Выполненных проектов</span>
        </div>
        <div class="stat">
          <span class="stat-number">10</span>
          <span class="stat-label">Лет опыта</span>
        </div>
        <div class="stat">
          <span class="stat-number">99%</span>
          <span class="stat-label">Довольных клиентов</span>
        </div>
      </div>
    </div>
  </section>
```

**CSS:**
```css
/* Добавить в style.css */
.about-content {
  display: grid;
  gap: 64px;
}

.about-text {
  max-width: 800px;
}

.about-text p {
  font-size: 1.125rem;
  line-height: 1.7;
  margin-bottom: 24px;
  color: #c5c5c5;
}

.about-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 48px;
}

.stat {
  text-align: center;
  padding: 32px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: #b8ff6a;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 0.9rem;
  color: #888;
}
```

#### 2. Добавить раздел команды (Team)
**Файл:** `index.html` (в секции About или отдельно)

```html
<div class="team reveal" data-delay="200">
  <h3 class="team-title">Наша команда</h3>
  <div class="team-members">
    <div class="team-member">
      <div class="member-avatar">AI</div>
      <h4 class="member-name">Алексей Иванов</h4>
      <p class="member-role">Osnovaтель, Lead Developer</p>
    </div>
    <div class="team-member">
      <div class="member-avatar">MD</div>
      <h4 class="member-name">Мария Дмитриева</h4>
      <p class="member-role">Art Director</p>
    </div>
    <div class="team-member">
      <div class="member-avatar">SP</div>
      <h4 class="member-name">Сергей Петров</h4>
      <p class="member-role">UX Researcher</p>
    </div>
  </div>
</div>
```

**CSS:**
```css
.team-title {
  font-size: 1.5rem;
  margin-bottom: 32px;
}

.team-members {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
}

.team-member {
  text-align: center;
}

.member-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #b8ff6a, #6366f1);
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
  color: #050505;
}

.member-name {
  font-size: 1.125rem;
  margin-bottom: 4px;
}

.member-role {
  font-size: 0.9rem;
  color: #888;
}
```

#### 3. Добавить отзывы клиентов (Testimonials)
**Файл:** `index.html` (новая секция после About)

```html
<section id="testimonials" class="section alt">
  <div class="container">
    <h2 class="section-title">Отзывы клиентов</h2>
    <div class="testimonials">
      <div class="testimonial reveal" data-delay="0">
        <div class="testimonial-content">
          <p class="testimonial-text">"NeonEdge превзошли все наши ожидания. Дизайн получился на уровне world-class, а команда сделала это в сжатые сроки."</p>
        </div>
        <div class="testimonial-author">
          <span class="author-name">Иван Сидоров</span>
          <span class="author-title">CEO, LuxeMart</span>
        </div>
      </div>
      <div class="testimonial reveal" data-delay="100">
        <div class="testimonial-content">
          <p class="testimonial-text">"Благодаря NeonEdge мы автоматизировали 90% финансовых процессов. Платформа работает как часы."</p>
        </div>
        <div class="testimonial-author">
          <span class="author-name">Елена Петрова</span>
          <span class="author-title">CTO, FinFlow</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

**CSS:**
```css
.testimonials {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
}

.testimonial {
  background: rgba(255, 255, 255, 0.02);
  padding: 32px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.testimonial-text {
  font-size: 1rem;
  line-height: 1.6;
  color: #c5c5c5;
  font-style: italic;
  margin-bottom: 24px;
}

.testimonial-author {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: 600;
  color: #fff;
}

.author-title {
  font-size: 0.875rem;
  color: #888;
}
```

#### 4. Расширить раздел Кейсов
**Файл:** `index.html` (добавить больше кейсов)

```html
<!-- Добавить в существующую секцию Cases -->
<div class="case reveal" data-delay="200">
  <div class="case-img">
    <div class="case-media">
      <img src="assets/img/healthapp.webp" alt="Мобильное приложение для здравоохранения" width="1200" height="688" loading="lazy" />
      <span class="case-label">Healthcare App</span>
    </div>
  </div>
  <h3 class="case-title">HealthApp</h3>
  <p class="case-text">Увеличение пользовательской активности на 200% благодаря удобному интерфейсу и AI-диагностике.</p>
</div>
```

#### 5. Добавить FAQ раздел
**Файл:** `index.html` (перед Контактами)

```html
<section id="faq" class="section">
  <div class="container">
    <h2 class="section-title">Часто задаваемые вопросы</h2>
    <div class="faq-list">
      <div class="faq-item reveal" data-delay="0">
        <button class="faq-question">
          <span>Сколько стоит разработка проекта?</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <p>Стоимость зависит от сложности проекта. Средний бюджет: от 500 тыс рублей.</p>
        </div>
      </div>
      <div class="faq-item reveal" data-delay="100">
        <button class="faq-question">
          <span>Какие технологии вы используете?</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">
          <p>Мы используем React, Next.js, Node.js для разработки и Figma для дизайна.</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

**CSS:**
```css
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.faq-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.125rem;
  cursor: pointer;
  text-align: left;
}

.faq-icon {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.faq-item.active .faq-icon {
  transform: rotate(45deg);
}

.faq-answer {
  padding-bottom: 24px;
  display: none;
}

.faq-item.active .faq-answer {
  display: block;
}

.faq-answer p {
  color: #c5c5c5;
  line-height: 1.6;
}
```

**JavaScript:**
```javascript
// Добавить в script.js
(function () {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.closest('.faq-item');
      faqItem.classList.toggle('active');
    });
  });
})();
```

#### 6. Добавить блог/статьи
**Файл:** `index.html` (новая секция)

```html
<section id="blog" class="section alt">
  <div class="container">
    <h2 class="section-title">Блог</h2>
    <div class="articles">
      <article class="article reveal" data-delay="0">
        <a href="#" class="article-link">
          <h3 class="article-title">Тренды UI/UX дизайна 2026 года</h3>
          <p class="article-excerpt">Как создавать интерфейсы, которые нравятся пользователям...</p>
          <span class="article-date">15 сентября 2026</span>
        </a>
      </article>
      <article class="article reveal" data-delay="100">
        <a href="#" class="article-link">
          <h3 class="article-title">Как интегрировать AI в ваш бизнес</h3>
          <p class="article-excerpt">Практическое руководство по внедрению искусственного интеллекта...</p>
          <span class="article-date">10 сентября 2026</span>
        </a>
      </article>
    </div>
  </div>
</section>
```

**CSS:**
```css
.articles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
}

.article {
  background: rgba(255, 255, 255, 0.02);
  padding: 32px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.article:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
}

.article-link {
  text-decoration: none;
  color: inherit;
}

.article-title {
  font-size: 1.25rem;
  margin-bottom: 12px;
  color: #fff;
}

.article-excerpt {
  font-size: 0.95rem;
  color: #c5c5c5;
  line-height: 1.5;
  margin-bottom: 16px;
}

.article-date {
  font-size: 0.8rem;
  color: #666;
}
```

---

## 🎯 ПЛАН ВЫПОЛНЕНИЯ

### Неделя 1: Основной контент
- [ ] Создать раздел "О нас"
- [ ] Добавить раздел команды
- [ ] Добавить отзывы клиентов
- [ ] Расширить кейсы

### Неделя 2: Дополнительный контент
- [ ] Создать FAQ раздел
- [ ] Добавить блог/статьи
- [ ] Оптимизировать тексты для SEO

### Неделя 3: Финальная доработка
- [ ] Добавить микроразметку для нового контента
- [ ] Проверить адаптивность нового контента
- [ ] Оптимизировать изображения для новых секций
- [ ] Запушить обновления в репозиторий

---

## 📁 ГДЕ БРАТЬ РЕСУРСЫ

### Изображения:
- Используйте бесплатные стоковые фото: Unsplash, Pexels
- Оптимизируйте через: https://squoosh.app/ (в WebP)
- Размеры: 1200px, 800px, 400px (для разных устройств)

### Тексты:
- Используйте real отзывы клиентов
- Пишите уникальный контент (не копипаст)
- Оптимизируйте под SEO ключи

### Иконки:
- Используйте SVG иконки
- Ресурсы: Heroicons, Lucide, Feather Icons

---

## 🛠 ИНСТРУМЕНТЫ

### Уже настроено:
- **Система сборки:** `npm run build`
- **Локальный сервер:** `npm run dev`
- **Скриншоты:** `npm run screenshots`
- **Тестирование:** `npm test`

### Для работы:
- **Редактор кода:** VS Code
- **Браузер:** Chrome (с DevTools)
- **Тестирование:** Responsively App
- **Валидация:** W3C Validator, PageSpeed Insights

---

## ✅ КРИТЕРИИ ПРИЁМКИ

### Для каждой задачи:
- [ ] Код валиден (W3C)
- [ ] Адаптивность проверена на всех устройствах
- [ ] SEO оптимизация применена
- [ ] Доступность (ARIA) соблюдена
- [ ] Производительность не ухудшена
- [ ] Дизайн соответствует стилю сайта

### Финальная проверка:
- [ ] Google PageSpeed Insights: 90+
- [ ] Google Mobile-Friendly Test: ✅
- [ ] W3C Validator: 0 ошибок
- [ ] Lighthouse (SEO, Performance, Accessibility, Best Practices): 90+

---

## 💡 СОВЕТЫ

1. **Следуйте существующему стилю** - Не меняйте дизайн-систему
2. **Тестируйте на мобильных** - Используйте Responsively App
3. **Оптимизируйте изображения** -Only WebP, сжатие без потерь
4. **Используйте semantic HTML** - Правильные теги для SEO
5. **Добавляйте микроразметку** - Для лучшего понимания поисковиками

---

## 📞 КОНТАКТЫ

При возникновении вопросов:
- Проверьте существующий код
- Изучите текущую документацию
- Смотрите примеры в уже реализованных секциях

---

**Удачи!** 🚀

*Документ обновлён: 23 сентября 2026 года*
*Версия: 2.0*
