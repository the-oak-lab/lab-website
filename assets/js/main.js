// ── Theme toggle ──
const THEMES = ['auto', 'light', 'dark'];
const ICONS  = { auto: '⊙', light: '☀', dark: '☾' };

function applyTheme(theme) {
  if (theme === 'auto') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
  const btn = document.getElementById('themeToggle');
  if (btn) { btn.textContent = ICONS[theme]; btn.title = `Theme: ${theme}`; }
}

(function initTheme() {
  const saved = localStorage.getItem('theme') || 'auto';
  applyTheme(saved);
})();

document.getElementById('themeToggle')?.addEventListener('click', () => {
  const current = localStorage.getItem('theme') || 'auto';
  const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
  localStorage.setItem('theme', next);
  applyTheme(next);
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));
