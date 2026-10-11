// Sachi's portfolio interactions — no libraries required.
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '×' : '☰';
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

// Rotating role text with a typewriter effect.
const roleEl = document.getElementById('typedRole');
const roles = ['thoughtful digital experiences', 'AI-powered applications', 'full-stack web projects', 'ideas into working products'];
let roleIndex = 0, charIndex = roles[0].length, deleting = false;
function typeRole() {
  const current = roles[roleIndex];
  if (!deleting) {
    charIndex++;
    roleEl.textContent = current.slice(0, charIndex);
    if (charIndex >= current.length) { deleting = true; setTimeout(typeRole, 1500); return; }
  } else {
    charIndex--;
    roleEl.textContent = current.slice(0, charIndex);
    if (charIndex <= 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; }
  }
  setTimeout(typeRole, deleting ? 32 : 58);
}
setTimeout(typeRole, 1600);

// Reveal sections only as they enter the viewport.
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el, index) => {
  el.style.transitionDelay = `${Math.min((index % 4) * 70, 210)}ms`;
  revealObserver.observe(el);
});

// Project category filters.
const filterButtons = document.querySelectorAll('.filter');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(item => item.classList.toggle('active', item === button));
  const filter = button.dataset.filter;
  projectCards.forEach(card => {
    const show = filter === 'all' || card.dataset.category === filter;
    card.classList.toggle('hidden', !show);
    if (show) {
      card.classList.remove('visible');
      requestAnimationFrame(() => card.classList.add('visible'));
    }
  });
}));

// Subtle pointer glow, disabled on touch-first devices.
const glow = document.querySelector('.cursor-glow');
if (window.matchMedia('(pointer:fine)').matches) {
  window.addEventListener('pointermove', event => {
    glow.style.left = `${event.clientX - 180}px`;
    glow.style.top = `${event.clientY - 180}px`;
  }, { passive: true });
}

// Copy email action.
document.getElementById('copyEmail').addEventListener('click', async () => {
  const feedback = document.getElementById('copyFeedback');
  try {
    await navigator.clipboard.writeText('sachimit2305@gmail.com');
    feedback.textContent = 'Email copied — talk soon ✨';
  } catch {
    feedback.textContent = 'Email: sachimit2305@gmail.com';
  }
});
document.getElementById('year').textContent = new Date().getFullYear();

// Gentle tilt on project cards for pointer devices.
if (window.matchMedia('(pointer:fine) and (prefers-reduced-motion: no-preference)').matches) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      if (!card.classList.contains('project-featured')) {
        card.style.transform = `translateY(-5px) rotateX(${-y * 2}deg) rotateY(${x * 2}deg)`;
      }
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}
