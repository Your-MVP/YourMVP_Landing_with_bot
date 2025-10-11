// Particles.js config
particlesJS('particles-js', {
  particles: { number: { value: 80 }, color: { value: '#ffffff' }, shape: { type: 'circle' }, opacity: { value: 0.5 }, size: { value: 3 }, line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 }, move: { enable: true, speed: 6 } },
  interactivity: { detect_on: 'canvas', events: { onhover: { enable: true, mode: 'repulse' } } },
  retina_detect: true
});

// Language detection and switcher
const langSwitcher = document.getElementById('language-switcher');
const userLang = navigator.language || navigator.userLanguage;
let currentLang = 'en'; // Default
if (userLang.startsWith('ru')) currentLang = 'ru';
else if (userLang.startsWith('de')) currentLang = 'de';
langSwitcher.value = currentLang;
updateLanguage(currentLang);

langSwitcher.addEventListener('change', (e) => updateLanguage(e.target.value));

function updateLanguage(lang) {
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
    if (el.placeholder) el.placeholder = el.getAttribute(`data-placeholder-${lang}`);
  });
  document.documentElement.lang = lang;
}

// Form submission to Telegram bot
const form = document.getElementById('mvp-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const payload = {
    name: data.get('name'),
    email: data.get('email'),
    idea: data.get('idea')
  };
  try {
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (response.ok) {
      alert('Request sent! Expect tips soon.');
    } else {
      alert('Error sending request.');
    }
  } catch (error) {
    alert('Error: ' + error.message);
  }
});
