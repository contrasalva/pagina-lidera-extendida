// ========== NAV ==========
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav__links');
const navAnchors = document.querySelectorAll('.nav__link:not(.nav__link--cta)');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navAnchors.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Scroll shadow
window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 50);
});

// Active link
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    const top = s.offsetTop - 140;
    if (window.scrollY >= top) current = s.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// ========== TESTIMONIOS SLIDER ==========
const dots = document.querySelectorAll('.testimonios__dot');
const slides = document.querySelectorAll('.testimonio-card');
let currentSlide = 0;

function showSlide(idx) {
  slides.forEach((s, i) => {
    s.classList.toggle('active', i === idx);
  });
  dots.forEach((d, i) => {
    d.classList.toggle('active', i === idx);
  });
  currentSlide = idx;
}

dots.forEach(d => {
  d.addEventListener('click', () => showSlide(parseInt(d.dataset.slide)));
});

setInterval(() => {
  showSlide((currentSlide + 1) % slides.length);
}, 6000);

// ========== IMPACTO COUNTER ==========
const counterEls = document.querySelectorAll('.impacto__number');
let countersStarted = false;

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function animateCounter(el, delay) {
  setTimeout(() => {
    el.classList.add('visible');
    const target = parseInt(el.dataset.count);
    const duration = 1600;
    const startTime = performance.now();
    let lastTick = -1;

    // Crear barra de progreso
    const bar = document.createElement('span');
    bar.className = 'impacto__bar';
    el.parentElement.appendChild(bar);

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.round(eased * target);
      const suffix = target === 95 ? '%' : '+';

      if (current !== lastTick) {
        el.textContent = current + suffix;
        el.style.transform = 'scale(1.12)';
        setTimeout(() => el.style.transform = '', 100);
        lastTick = current;
      }

      bar.style.transform = `scaleX(${eased})`;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target + suffix;
        bar.style.transform = 'scaleX(1)';
      }
    }
    requestAnimationFrame(tick);
  }, delay);
}

function startCounters() {
  if (countersStarted) return;
  countersStarted = true;
  counterEls.forEach((el, i) => {
    animateCounter(el, i * 250);
  });
}

const impactoSection = document.getElementById('impacto');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { startCounters(); observer.disconnect(); } });
}, { threshold: .3 });
observer.observe(impactoSection);


