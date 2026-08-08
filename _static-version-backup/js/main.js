/* =========================================================
   Droplets of Mercy — interactions
   GSAP + ScrollTrigger. Degrades gracefully if CDN fails.
========================================================= */
(function () {
  "use strict";

  const hasGSAP = typeof window.gsap !== "undefined";
  if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Sticky header state ---------- */
  const header = $("#header");
  const fab = $(".fab");
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-stuck", y > 10);
    if (fab) fab.classList.toggle("is-visible", y > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  const burger = $("#burger");
  const nav = $("#nav");
  burger?.addEventListener("click", () => {
    nav.classList.toggle("is-open");
    burger.classList.toggle("is-active");
  });
  $$("#nav a").forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("is-open"))
  );

  /* ---------- Language toggle ---------- */
  $$(".lang__btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      $$(".lang__btn").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
    })
  );

  /* =========================================================
     HERO CAROUSEL
  ========================================================= */
  const slides = $$(".slide");
  const dotsWrap = $("#heroDots");
  let current = 0;
  let timer;
  const DURATION = 6000;

  // build dots
  slides.forEach((_, i) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", "Go to slide " + (i + 1));
    if (i === 0) b.classList.add("is-active");
    b.addEventListener("click", () => go(i, true));
    dotsWrap.appendChild(b);
  });
  const dots = $$("#heroDots button");

  function animateSlideIn(slide) {
    if (!hasGSAP || prefersReduced) {
      $$(".slide__eyebrow,.slide__title,.slide__text,.slide__cta", slide).forEach(
        (el) => ((el.style.opacity = 1), (el.style.transform = "none"))
      );
      return;
    }
    const els = $$(
      ".slide__eyebrow,.slide__title,.slide__text,.slide__cta",
      slide
    );
    gsap.fromTo(
      els,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out", delay: 0.25 }
    );
  }

  function go(index, user) {
    if (index === current) return;
    slides[current].classList.remove("is-active");
    dots[current].classList.remove("is-active");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("is-active");
    dots[current].classList.add("is-active");
    animateSlideIn(slides[current]);
    if (user) restart();
  }
  const next = () => go(current + 1);
  const prev = () => go(current - 1);

  function restart() {
    clearInterval(timer);
    timer = setInterval(next, DURATION);
  }

  $("#heroNext")?.addEventListener("click", () => go(current + 1, true));
  $("#heroPrev")?.addEventListener("click", () => go(current - 1, true));
  animateSlideIn(slides[current]);
  restart();

  // pause on hover
  const hero = $("#hero");
  hero?.addEventListener("mouseenter", () => clearInterval(timer));
  hero?.addEventListener("mouseleave", restart);

  // keyboard
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") go(current + 1, true);
    if (e.key === "ArrowLeft") go(current - 1, true);
  });

  /* =========================================================
     SCROLL ANIMATIONS (ScrollTrigger)
  ========================================================= */
  if (hasGSAP && window.ScrollTrigger && !prefersReduced) {
    // Reveal-on-scroll for everything with .reveal
    $$(".reveal").forEach((el) => {
      gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    });

    // Stagger the grids for a nicer cascade
    [".causes__grid", ".actions__grid", ".news__grid", ".stats__grid"].forEach(
      (sel) => {
        const grid = $(sel);
        if (!grid) return;
        const kids = $$(".reveal", grid);
        if (!kids.length) return;
        gsap.to(kids, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: grid, start: "top 80%" },
        });
      }
    );

    // Parallax on banner background
    const pbg = $("[data-parallax]");
    if (pbg) {
      gsap.to(pbg, {
        yPercent: 22,
        ease: "none",
        scrollTrigger: {
          trigger: ".banner",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Animated counters
    $$(".stat__num").forEach((el) => {
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || "";
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%" },
        onUpdate: () => {
          el.textContent = format(Math.floor(obj.v)) + suffix;
        },
      });
    });
  } else {
    // Fallback: just show everything
    $$(".reveal").forEach((el) => {
      el.style.opacity = 1;
      el.style.transform = "none";
    });
    $$(".stat__num").forEach((el) => {
      el.textContent = format(+el.dataset.count) + (el.dataset.suffix || "");
    });
  }

  function format(n) {
    return n >= 1000 ? n.toLocaleString("en-US") : String(n);
  }

  /* ---------- Smooth-scroll for in-page links ---------- */
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      const y = t.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });
})();
