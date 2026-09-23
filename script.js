/* ===== CURSOR ===== */
(function () {
  "use strict";

  const cursor = document.getElementById("cursor");
  let cursorX = 0,
    cursorY = 0;
  let isMoving = false;

  function onMouseMove(e) {
    cursorX = e.clientX;
    cursorY = e.clientY;
    if (!isMoving) {
      isMoving = true;
      animateCursor();
    }
  }

  function animateCursor() {
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    isMoving = false;
  }

  document.addEventListener("mousemove", onMouseMove, { passive: true });

  const hoverElements = document.querySelectorAll(
    "a, button, .card, .funnel-option, .case"
  );
  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
    });
  });
})();

/* ===== MOBILE MENU TOGGLE ===== */
(function () {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");

  if (!toggle || !menu) return;

  function toggleMenu() {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", !expanded);
    menu.classList.toggle("open");
    document.body.style.overflow = expanded ? "" : "hidden";
  }

  toggle.addEventListener("click", toggleMenu);
  toggle.addEventListener("touchstart", (e) => {
    e.preventDefault();
    toggleMenu();
  }, { passive: false });

  document.querySelectorAll(".nav-link, .btn-mobile-cta").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });
})();

/* ===== NAVBAR SCROLL ===== */
(function () {
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }, { passive: true });
})();

/* ===== REVEAL ON SCROLL ===== */
(function () {
  const reveals = document.querySelectorAll(
    ".reveal, .card, .step, .case, .funnel-wrapper"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.dataset.delay || "0", 10);

          setTimeout(() => {
            el.classList.add("visible");
            observer.unobserve(el);
          }, delay);
        }
      });
    },
    { threshold: 0.1 }
  );

  reveals.forEach((el) => observer.observe(el));
})();

/* ===== FUNNEL STEP INTERACTION ===== */
(function () {
  const steps = document.querySelectorAll(".funnel-step");
  const options = document.querySelectorAll(".funnel-option");

  options.forEach((opt) => {
    opt.addEventListener("click", function () {
      const target = this.dataset.target;
      if (!target) return;

      this.classList.toggle("selected");
    });
  });

  steps.forEach((step, idx) => {
    step.addEventListener("mouseenter", function () {
      this.classList.add("active");
    });
    step.addEventListener("mouseleave", function () {
      this.classList.remove("active");
    });
  });
})();

/* ===== FORM SUBMISSION ===== */
(function () {
  const forms = document.querySelectorAll(
    "#funnel-form, #contact-form"
  );

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const btn = this.querySelector("button[type='submit']");

      if (btn.disabled) return;

      const originalHTML = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = "Отправка…";

      setTimeout(() => {
        btn.innerHTML = "✓ Готово!";
        form.reset();

        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.disabled = false;
        }, 1500);
      }, 1200);
    });
  });
})();

/* ===== BACK TO TOP ===== */
(function () {
  const backTop = document.getElementById("back-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backTop.classList.add("show");
    } else {
      backTop.classList.remove("show");
    }
  }, { passive: true });

  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

/* ===== PARALLAX HERO BG ===== */
(function () {
  const heroBg = document.querySelector(".hero-bg .grid");
  if (!heroBg) return;

  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const rate = scrolled * 0.4;
    heroBg.style.transform = `rotateX(15deg) rotateZ(35deg) translateY(${rate}px)`;
  }, { passive: true });
})();

/* ===== POINTER ATMOSPHERE ===== */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const hero = document.querySelector(".hero");
  const cards = document.querySelectorAll(".card");

  if (hero) {
    hero.addEventListener("pointermove", (event) => {
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty("--pointer-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
      hero.style.setProperty("--pointer-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
    });
  }

  cards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--card-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
      card.style.setProperty("--card-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
    });
  });
})();

/* ===== SMOOTH ANCHOR SCROLL ===== */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
})();
