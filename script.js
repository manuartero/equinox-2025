(function () {
  "use strict";

  /* ---------- Menú hamburguesa accesible ---------- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");

  function closeMenu() {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú de navegación");
  }

  function openMenu() {
    menu.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Cerrar menú de navegación");
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      if (toggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Cierra al pulsar un enlace del menú
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });

    // Cierra con Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    // Cierra al hacer clic fuera
    document.addEventListener("click", function (e) {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) closeMenu();
    });
  }

  /* ---------- Reveal al hacer scroll (IntersectionObserver) ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Resaltado de la sección activa en el nav ---------- */
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav__menu a[href^="#"]')
  );

  function linkFor(id) {
    return navLinks.filter(function (a) {
      return a.getAttribute("href") === "#" + id;
    })[0];
  }

  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = linkFor(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(function (a) {
            a.classList.remove("is-active");
            a.removeAttribute("aria-current");
          });
          link.classList.add("is-active");
          link.setAttribute("aria-current", "location");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Header oculto en el hero (solo escritorio) ---------- */
  var header = document.querySelector(".site-header");
  var heroEl = document.getElementById("hero");
  if (header && heroEl && "IntersectionObserver" in window) {
    var desktop = window.matchMedia("(min-width: 901px)");
    var heroVisible = true;

    function applyHeaderState() {
      if (desktop.matches && heroVisible) {
        header.classList.add("is-hidden");
      } else {
        header.classList.remove("is-hidden");
      }
    }

    var headerIO = new IntersectionObserver(function (entries) {
      heroVisible = entries[0].isIntersecting;
      applyHeaderState();
    }, { threshold: 0 });

    applyHeaderState();
    headerIO.observe(heroEl);

    if (desktop.addEventListener) {
      desktop.addEventListener("change", applyHeaderState);
    } else if (desktop.addListener) {
      desktop.addListener(applyHeaderState);
    }
  }

  /* ---------- Cuenta atrás hasta el cierre de inscripciones ---------- */
  var countdown = document.getElementById("countdown");
  if (countdown) {
    // Cierre de inscripciones: 23 de junio de 2026, 23:00 (hora peninsular, CEST = UTC+2)
    var deadline = new Date("2026-06-23T23:00:00+02:00").getTime();
    var fields = {
      days: countdown.querySelector('[data-cd="days"]'),
      hours: countdown.querySelector('[data-cd="hours"]'),
      mins: countdown.querySelector('[data-cd="mins"]'),
      secs: countdown.querySelector('[data-cd="secs"]')
    };
    var label = countdown.querySelector(".countdown__label");

    function pad(n) { return n < 10 ? "0" + n : "" + n; }

    function tick() {
      var diff = deadline - Date.now();
      if (diff <= 0) {
        countdown.classList.add("is-closed");
        if (label) label.textContent = "El plazo de inscripción se ha cerrado";
        return false;
      }
      var s = Math.floor(diff / 1000);
      fields.days.textContent = Math.floor(s / 86400);
      fields.hours.textContent = pad(Math.floor((s % 86400) / 3600));
      fields.mins.textContent = pad(Math.floor((s % 3600) / 60));
      fields.secs.textContent = pad(s % 60);
      return true;
    }

    if (tick()) {
      var timer = setInterval(function () {
        if (!tick()) clearInterval(timer);
      }, 1000);
    }
  }

  /* ---------- Parallax de los números gigantes de sección ---------- */
  if (!prefersReduced && "requestAnimationFrame" in window) {
    var pxEls = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
    if (pxEls.length) {
      var pxTicking = false;
      function pxUpdate() {
        var vh = window.innerHeight;
        pxEls.forEach(function (el) {
          var speed = parseFloat(el.getAttribute("data-parallax")) || 0.15;
          var rect = el.getBoundingClientRect();
          var center = rect.top + rect.height / 2;
          var offset = (center - vh / 2) * speed;
          el.style.transform = "translate3d(0," + (-offset).toFixed(1) + "px,0)";
        });
        pxTicking = false;
      }
      function pxScroll() {
        if (!pxTicking) { pxTicking = true; requestAnimationFrame(pxUpdate); }
      }
      window.addEventListener("scroll", pxScroll, { passive: true });
      window.addEventListener("resize", pxScroll);
      pxUpdate();
    }
  }

  /* ---------- FAQ: índice lateral que ilumina la categoría visible ---------- */
  var faqLayout = document.querySelector(".faq-layout");
  if (faqLayout) {
    var faqGroups = Array.prototype.slice.call(faqLayout.querySelectorAll(".faq-group[id]"));
    var faqItems = Array.prototype.slice.call(faqLayout.querySelectorAll(".faq-nav__item"));
    if (faqGroups.length && faqItems.length) {
      var faqCurrent = null;
      function faqActivate(id) {
        if (id === faqCurrent) return;
        faqCurrent = id;
        faqItems.forEach(function (a) {
          var on = a.getAttribute("href") === "#" + id;
          a.classList.toggle("is-active", on);
          if (on) {
            a.setAttribute("aria-current", "true");
          } else {
            a.removeAttribute("aria-current");
          }
        });
      }
      function faqUpdate() {
        var lineY = window.innerHeight * 0.38;
        var act = faqGroups[0];
        faqGroups.forEach(function (g) {
          if (g.getBoundingClientRect().top - lineY <= 0) act = g;
        });
        faqActivate(act.id);
      }
      var faqTicking = false;
      function faqScroll() {
        if (!faqTicking) { faqTicking = true; requestAnimationFrame(function () { faqUpdate(); faqTicking = false; }); }
      }
      window.addEventListener("scroll", faqScroll, { passive: true });
      window.addEventListener("resize", faqScroll);
      faqUpdate();
    }
  }
})();
