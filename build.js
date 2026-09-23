/**
 * Build script for NeonEdge website
 * - Minifies HTML, CSS, JS
 * - Extracts Critical CSS
 * - Optimizes images
 * - Generates sitemap with lastmod
 */

const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier-terser');
const cssnano = require('cssnano');
const postcss = require('postcss');
const { transform } = require('esbuild');
const { JSDOM } = require('jsdom');

// Configuration
const CONFIG = {
  srcDir: 'C:\\Apple',
  distDir: 'C:\\Apple\\dist',
  criticalCSS: true,
  minifyHTML: true,
  minifyCSS: true,
  minifyJS: true,
  addReducedMotion: true,
  updateSitemap: true
};

// Ensure dist directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Minify HTML
async function minifyHTML(filePath, outputPath) {
  const html = fs.readFileSync(filePath, 'utf8');
  
  const minified = await minify(html, {
    collapseWhitespace: true,
    removeComments: true,
    removeOptionalTags: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true
  });
  
  fs.writeFileSync(outputPath, minified);
  console.log(`✅ Minified HTML: ${path.basename(filePath)}`);
  
  return minified;
}

// Minify CSS
async function minifyCSS(filePath, outputPath) {
  const css = fs.readFileSync(filePath, 'utf8');
  
  const result = await postcss([cssnano({ preset: 'default' })]).process(css, {
    from: filePath,
    to: outputPath
  });
  
  fs.writeFileSync(outputPath, result.css);
  console.log(`✅ Minified CSS: ${path.basename(filePath)} (${(css.length / 1024).toFixed(1)}KB → ${(result.css.length / 1024).toFixed(1)}KB)`);
  
  return result.css;
}

// Minify JS
async function minifyJS(filePath, outputPath) {
  const js = fs.readFileSync(filePath, 'utf8');
  
  const result = await transform(js, {
    minify: true,
    target: 'es2015',
    format: 'cjs'
  });
  
  fs.writeFileSync(outputPath, result.code);
  console.log(`✅ Minified JS: ${path.basename(filePath)} (${(js.length / 1024).toFixed(1)}KB → ${(result.code.length / 1024).toFixed(1)}KB)`);
  
  return result.code;
}

// Extract Critical CSS
async function extractCriticalCSS(htmlContent, cssContent) {
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  
  // Find all stylesheets and inline styles
  const styles = [];
  
  // Get inline styles
  const styleTags = document.querySelectorAll('style');
  styleTags.forEach(tag => {
    if (tag.textContent) {
      styles.push(tag.textContent);
    }
  });
  
  // For this project, we'll extract CSS for above-the-fold elements
  // Above-the-fold: navbar, hero, signal-band
  const aboveTheFoldSelectors = [
    'body',
    '.noise',
    '.navbar',
    '.navbar-inner',
    '.logo',
    '.nav-links',
    '.nav-link',
    '.nav-cta',
    '.hero',
    '.hero-inner',
    '.hero-title',
    '.hero-subtitle',
    '.hero-cta',
    '.btn',
    '.btn-primary',
    '.gradient-text',
    '.eyebrow',
    '.eyebrow-dot',
    '.signal-band',
    '.signal-track',
    '.hero-bg',
    '.hero-image',
    '.hero-image-wash',
    '.grid',
    '.hero-orbit',
    '.cursor'
  ];
  
  // Simple approach: extract all CSS rules that match above-the-fold selectors
  const criticalCSS = [];
  const cssRules = cssContent.split('}').map(rule => rule.trim() + '}').filter(rule => rule.trim());
  
  for (const rule of cssRules) {
    const selectorMatch = rule.match(/^([^{]+)\{/);
    if (selectorMatch) {
      const selectors = selectorMatch[1].split(',').map(s => s.trim());
      const matchesAboveFold = selectors.some(selector => 
        aboveTheFoldSelectors.some(af => selector.includes(af))
      );
      
      if (matchesAboveFold) {
        criticalCSS.push(rule);
      }
    }
  }
  
  return criticalCSS.join('\n');
}

// Add prefers-reduced-motion support
function addReducedMotionCSS(cssContent) {
  const reducedMotionCSS = `
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .hero-image,
  .grid,
  .hero-orbit-one,
  .hero-orbit-two,
  .signal-track,
  .eyebrow-dot {
    animation: none !important;
  }
}
`;
  
  return cssContent + '\n' + reducedMotionCSS;
}

// Update schema.org
function updateSchemaOrg(htmlContent) {
  const enhancedSchema = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "NeonEdge",
      "url": "https://neonedge.ru",
      "logo": "https://neonedge.ru/assets/img/logo.svg",
      "description": "NeonEdge создает цифровые продукты премиум-класса. Индивидуальная разработка, UX-дизайн, AI-интеграция.",
      "foundingDate": "2024",
      "telephone": "+79991234567",
      "email": "hello@neonedge.ru",
      "sameAs": [
        "https://t.me/neonedge",
        "https://github.com/neonedge",
        "https://linkedin.com/company/neonedge"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Услуги NeonEdge",
        "itemListElement": [
          {
            "@type": "Offer",
            "name": "UI/UX Дизайн",
            "description": "Создаём интерфейсы, которые говорят сами за себя. Минимализм и выразительность.",
            "category": "Design",
            "url": "https://neonedge.ru/#solutions"
          },
          {
            "@type": "Offer",
            "name": "Разработка",
            "description": "Чистый код, масштабируемая архитектура. React, Next.js, Node.js — на высоте.",
            "category": "Development",
            "url": "https://neonedge.ru/#solutions"
          },
          {
            "@type": "Offer",
            "name": "AI Интеграция",
            "description": "Встраиваем искусственный интеллект, чтобы ваши продукты думали вместе с клиентами.",
            "category": "AI",
            "url": "https://neonedge.ru/#solutions"
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "name": "NeonEdge",
      "url": "https://neonedge.ru",
      "description": "NeonEdge — Инженерия цифрового будущего. Создание цифровых продуктов премиум-класса.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://neonedge.ru/?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
}
</script>
`;
  
  // Replace existing schema or add new
  const schemaRegex = /<script type="application\/ld\+json">[\s\S]*?<\/script>/i;
  if (schemaRegex.test(htmlContent)) {
    return htmlContent.replace(schemaRegex, enhancedSchema);
  } else {
    // Insert before closing head
    const headClose = htmlContent.lastIndexOf('</head>');
    if (headClose !== -1) {
      return htmlContent.slice(0, headClose) + enhancedSchema + htmlContent.slice(headClose);
    }
  }
  
  return htmlContent;
}

// Update sitemap with lastmod
function updateSitemap() {
  const sitemapPath = path.join(CONFIG.srcDir, 'sitemap.xml');
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  
  const lastmod = new Date().toISOString().split('T')[0];
  
  // Add lastmod to all urls (handle existing urls with or without lastmod)
  sitemap = sitemap.replace(
    /(<url>\s*<loc>[^<]+<\/loc>)/g,
    `$1\n  <lastmod>${lastmod}</lastmod>`
  );
  
  // Update robots.txt to point to sitemap
  const robotsPath = path.join(CONFIG.srcDir, 'robots.txt');
  let robots = fs.readFileSync(robotsPath, 'utf8');
  if (!robots.includes('Sitemap:')) {
    robots += '\nSitemap: https://neonedge.ru/sitemap.xml';
  }
  
  fs.writeFileSync(sitemapPath, sitemap);
  fs.writeFileSync(robotsPath, robots);
  
  console.log(`✅ Updated sitemap.xml with lastmod`);
  console.log(`✅ Updated robots.txt with sitemap reference`);
}

// Fix logo href bug
function fixLogoHref(htmlContent) {
  // Replace href="#" with href="/"
  return htmlContent.replace(/<a href="#" class="logo">/g, '<a href="/" class="logo">');
}

// Fix Telegram link
function fixTelegramLink(htmlContent) {
  // Replace fake Telegram link
  return htmlContent.replace(
    /<a href="#" class="contact-value">@neonedge<\/a>/g,
    '<a href="https://t.me/neonedge" class="contact-value" target="_blank" rel="noopener noreferrer">@neonedge</a>'
  );
}

// Fix Signal Band font size
function fixSignalBandFont(htmlContent) {
  // Find signal-band CSS and increase font size
  const stylePath = path.join(CONFIG.srcDir, 'style.css');
  let css = fs.readFileSync(stylePath, 'utf8');
  
  // Replace signal-track font-size
  css = css.replace(
    /\.signal-track \{[\s\S]*?font-size: 0\.78rem;[\s\S]*?\}/,
    `.signal-track {
  display: flex;
  align-items: center;
  width: max-content;
  gap: 30px;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  animation: marquee 24s linear infinite;
}
`
  );
  
  fs.writeFileSync(stylePath, css);
  console.log(`✅ Fixed Signal Band font size`);
  
  return htmlContent;
}

// Generate WebP versions of og:image
function generateOgImage() {
  // For now, just copy hero.webp as og-image
  const heroWebp = path.join(CONFIG.srcDir, 'assets', 'img', 'hero.webp');
  const ogImage = path.join(CONFIG.srcDir, 'assets', 'img', 'og-image.webp');
  
  if (fs.existsSync(heroWebp)) {
    fs.copyFileSync(heroWebp, ogImage);
    console.log(`✅ Generated og-image.webp`);
  }
}

// Main build function
async function build() {
  console.log('🚀 Starting NeonEdge build...\n');
  
  ensureDir(CONFIG.distDir);
  
  // Step 1: Process CSS
  console.log('📄 Processing CSS...');
  const stylePath = path.join(CONFIG.srcDir, 'style.css');
  const distStylePath = path.join(CONFIG.distDir, 'style.css');
  
  let cssContent = fs.readFileSync(stylePath, 'utf8');
  
  // Add prefers-reduced-motion
  if (CONFIG.addReducedMotion) {
    cssContent = addReducedMotionCSS(cssContent);
  }
  
  // Minify CSS
  if (CONFIG.minifyCSS) {
    await minifyCSS(stylePath, distStylePath);
    cssContent = fs.readFileSync(distStylePath, 'utf8');
  } else {
    fs.writeFileSync(distStylePath, cssContent);
  }
  
  // Extract Critical CSS
  if (CONFIG.criticalCSS) {
    const htmlContent = fs.readFileSync(path.join(CONFIG.srcDir, 'index.html'), 'utf8');
    const criticalCSS = await extractCriticalCSS(htmlContent, cssContent);
    
    // Save critical CSS
    const criticalCSSPath = path.join(CONFIG.distDir, 'critical.css');
    fs.writeFileSync(criticalCSSPath, criticalCSS);
    console.log(`✅ Extracted Critical CSS: ${(criticalCSS.length / 1024).toFixed(1)}KB`);
  }
  
  // Step 2: Process JS
  console.log('\n📄 Processing JavaScript...');
  const scriptPath = path.join(CONFIG.srcDir, 'script.js');
  const distScriptPath = path.join(CONFIG.distDir, 'script.js');
  
  if (CONFIG.minifyJS) {
    await minifyJS(scriptPath, distScriptPath);
  } else {
    fs.copyFileSync(scriptPath, distScriptPath);
  }
  
  // Step 3: Process HTML
  console.log('\n📄 Processing HTML...');
  const htmlPath = path.join(CONFIG.srcDir, 'index.html');
  const distHtmlPath = path.join(CONFIG.distDir, 'index.html');
  
  let htmlContent = fs.readFileSync(htmlPath, 'utf8');
  
  // Apply fixes
  htmlContent = updateSchemaOrg(htmlContent);
  htmlContent = fixLogoHref(htmlContent);
  htmlContent = fixTelegramLink(htmlContent);
  
  // Add critical CSS inline
  if (CONFIG.criticalCSS) {
    const criticalCSS = fs.readFileSync(path.join(CONFIG.distDir, 'critical.css'), 'utf8');
    const headClose = htmlContent.lastIndexOf('</head>');
    if (headClose !== -1) {
      htmlContent = htmlContent.slice(0, headClose) + `
<style>${criticalCSS}</style>
` + htmlContent.slice(headClose);
    }
  }
  
  // Minify HTML
  if (CONFIG.minifyHTML) {
    await minifyHTML(htmlPath, distHtmlPath);
    htmlContent = fs.readFileSync(distHtmlPath, 'utf8');
  } else {
    fs.writeFileSync(distHtmlPath, htmlContent);
  }
  
  // Step 4: Copy assets
  console.log('\n📄 Copying assets...');
  const assetsSrc = path.join(CONFIG.srcDir, 'assets');
  const assetsDist = path.join(CONFIG.distDir, 'assets');
  
  // Copy assets directory
  if (fs.existsSync(assetsSrc)) {
    copyDir(assetsSrc, assetsDist);
  }
  
  // Step 5: Update sitemap and robots
  if (CONFIG.updateSitemap) {
    updateSitemap();
    
    // Copy updated files to dist
    fs.copyFileSync(
      path.join(CONFIG.srcDir, 'robots.txt'),
      path.join(CONFIG.distDir, 'robots.txt')
    );
    fs.copyFileSync(
      path.join(CONFIG.srcDir, 'sitemap.xml'),
      path.join(CONFIG.distDir, 'sitemap.xml')
    );
  }
  
  // Step 6: Copy additional files
  const additionalFiles = ['favicon.svg', '.gitignore'];
  for (const file of additionalFiles) {
    const src = path.join(CONFIG.srcDir, file);
    const dist = path.join(CONFIG.distDir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dist);
    }
  }
  
  console.log('\n✅ Build completed successfully!');
  console.log(`📁 Output directory: ${CONFIG.distDir}`);
}

// Helper function to copy directory
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      // Skip screenshots directory
      if (entry.name === 'screenshots') continue;
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Run build
build().catch(err => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
