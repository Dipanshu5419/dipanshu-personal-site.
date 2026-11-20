const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const themeLabel = themeToggle.querySelector('.theme-label');

function setTheme(theme) {
  root.dataset.theme = theme;
  const isDark = theme === 'dark';
  themeIcon.textContent = isDark ? '☼' : '☾';
  themeLabel.textContent = isDark ? 'Light mode' : 'Dark mode';
  document.querySelector('meta[name="theme-color"]').setAttribute('content', isDark ? '#101010' : '#f3f3ef');
  try { localStorage.setItem('dipanshu-theme', theme); } catch (_) {}
}

let savedTheme = 'dark';
try { savedTheme = localStorage.getItem('dipanshu-theme') || 'dark'; } catch (_) {}
setTheme(savedTheme);
themeToggle.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

document.getElementById('year').textContent = new Date().getFullYear();

// Add your public profile URLs here. Leave a value empty until you're ready.
// Example: instagram: 'https://instagram.com/yourusername'
const socialLinks = {
  instagram: '',
  github: '',
  discord: '',
  spotify: '',
  reddit: '',
  x: ''
};

// When a URL is added, the matching social tile becomes a clickable link.
const socialNames = ['instagram', 'github', 'discord', 'spotify', 'reddit', 'x'];
document.querySelectorAll('.social-item').forEach((tile, index) => {
  const url = socialLinks[socialNames[index]];
  if (url) {
    const link = document.createElement('a');
    link.className = 'social-item';
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.innerHTML = tile.innerHTML;
    tile.replaceWith(link);
  }
});

// Gentle reveal-on-scroll. Content remains visible if reduced motion is preferred.
const revealTargets = document.querySelectorAll('.section-heading, .about-grid, .currently-grid, .poster, .music-layout, .connect-section');
revealTargets.forEach(el => el.classList.add('reveal'));
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(el => observer.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('visible'));
}
