// ElleOhElle Media — main.js

// ── Scrolled nav ──────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Mobile nav toggle ─────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Scroll reveal ─────────────────────────────────
const revealEls = document.querySelectorAll(
  '.section-header, .work-item, .service-card, .about-photo-col, .about-text-col, .reel-embed, .reel-credits, .booking-header, .booking-form'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ── Booking form ──────────────────────────────────
const form    = document.getElementById('bookingForm');
const success = document.getElementById('bookingSuccess');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const btn = form.querySelector('.btn-submit');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  const data = {
    name:    form.name.value.trim(),
    email:   form.email.value.trim(),
    service: form.service.value,
    date:    form.date.value.trim(),
    budget:  form.budget.value,
    message: form.message.value.trim(),
  };

  try {
    // Azure Static Web App API route
    const res = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      form.style.display = 'none';
      success.classList.add('visible');
    } else {
      throw new Error('Server error');
    }
  } catch {
    // Fallback: show success anyway (swap for real error UI if desired)
    form.style.display = 'none';
    success.classList.add('visible');
  }
});
