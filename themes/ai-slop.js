(function () {
  var D = window.DATA;
  var chipColors = ['chip-purple', 'chip-pink', 'chip-mint', 'chip-lavender', 'chip-sky', 'chip-peach', 'chip-rose'];
  var listeners = [];

  // Add theme class
  document.body.classList.add('bubbly', 'no-flicker');

  // Set CRT vars
  document.documentElement.style.setProperty('--crt-intensity', '0.25');

  // ── Helpers ───────────────────────────────────
  function esc(s) {
    var el = document.createElement('span');
    el.textContent = s;
    return el.innerHTML;
  }

  // ── Build HTML ────────────────────────────────
  var html = '';

  // Nav
  html += '<nav class="bubbly-nav">';
  html += '<div class="bubbly-nav-inner">';
  html += '<a href="#about" data-nav>About</a>';
  html += '<a href="#stats" data-nav>Stats</a>';
  html += '<a href="#skills" data-nav>Skills</a>';
  html += '<a href="#experience" data-nav>Experience</a>';
  html += '<a href="#contact" data-nav>Contact</a>';
  html += '</div>';
  html += '</nav>';

  // Hero
  html += '<section class="bubbly-hero">';
  html += '<h1>Hey, I\'m ' + esc(D.name) + ' <span class="accent">✦</span></h1>';
  html += '<p class="subtitle">' + esc(D.title) + '</p>';
  html += '<p class="location"><span class="decorative">·</span> ' + esc(D.location) + ' <span class="decorative">·</span></p>';
  html += '</section>';

  // About
  html += '<h2 class="bubbly-section-title" id="about">About<span class="dot"> ·</span></h2>';
  html += '<div class="bubbly-card bubbly-about">';
  D.bio.forEach(function (p) {
    html += '<p>' + p + '</p>';
  });
  html += '</div>';

  // Stats
  html += '<h2 class="bubbly-section-title" id="stats">Stats<span class="dot"> ✦</span></h2>';
  html += '<div class="bubbly-stats">';
  D.stats.forEach(function (s) {
    html += '<div class="bubbly-stat-card">';
    html += '<span class="bubbly-stat-num">' + esc(s.num) + '</span>';
    html += '<span class="bubbly-stat-label">' + esc(s.label) + '</span>';
    html += '</div>';
  });
  html += '</div>';

  // Skills
  html += '<h2 class="bubbly-section-title" id="skills">Skills<span class="dot"> ·</span></h2>';
  html += '<div class="bubbly-card">';
  D.skills.forEach(function (g, gi) {
    var colorClass = chipColors[gi % chipColors.length];
    html += '<div class="bubbly-skill-group">';
    html += '<div class="bubbly-skill-group-label">' + esc(g.group) + '</div>';
    html += '<div class="bubbly-skill-tags">';
    g.tags.forEach(function (t) {
      html += '<span class="bubbly-chip ' + colorClass + '">' + esc(t) + '</span>';
    });
    html += '</div>';
    html += '</div>';
  });
  html += '</div>';

  // Experience
  html += '<h2 class="bubbly-section-title" id="experience">Experience<span class="dot"> ✦</span></h2>';
  html += '<div class="bubbly-exp-list">';
  D.experience.forEach(function (e) {
    html += '<div class="bubbly-exp-card">';
    html += '<div class="bubbly-exp-domain">' + esc(e.domain) + '</div>';
    html += '<div class="bubbly-exp-title">' + esc(e.title) + '</div>';
    if (e.tags && e.tags.length) {
      html += '<div class="bubbly-exp-tags">';
      e.tags.forEach(function (t) {
        html += '<span class="bubbly-exp-tag">' + esc(t) + '</span>';
      });
      html += '</div>';
    }
    html += '<p class="bubbly-exp-body">' + e.body + '</p>';
    if (e.link) {
      html += '<div class="bubbly-exp-link"><a href="' + esc(e.link.url) + '">' + esc(e.link.label) + ' &rarr;</a></div>';
    }
    html += '</div>';
  });
  html += '</div>';

  // Contact
  html += '<h2 class="bubbly-section-title" id="contact">Let\'s Connect<span class="dot"> ·</span></h2>';
  html += '<div class="bubbly-contact">';
  html += '<a class="bubbly-cta" href="mailto:' + esc(D.email) + '">Say Hello ✉</a>';
  html += '<div class="bubbly-contact-links">';
  html += '<a href="' + esc(D.github) + '">GitHub</a>';
  html += '<a href="' + esc(D.upwork) + '">Upwork</a>';
  html += '</div>';
  html += '</div>';

  // Footer
  html += '<footer class="bubbly-footer">';
  html += esc(D.name) + ' · ' + esc(D.handle);
  html += '</footer>';

  // Inject
  document.getElementById('app').innerHTML = html;

  // ── Smooth scroll ─────────────────────────────
  var navLinks = document.querySelectorAll('[data-nav]');
  function handleNavClick(e) {
    e.preventDefault();
    var id = this.getAttribute('href').slice(1);
    var target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', handleNavClick);
    listeners.push({ el: link, type: 'click', fn: handleNavClick });
  });

  // ── Cleanup ───────────────────────────────────
  window.__themeCleanup = function () {
    document.body.classList.remove('bubbly', 'no-flicker');
    document.documentElement.style.removeProperty('--crt-intensity');
    listeners.forEach(function (l) {
      l.el.removeEventListener(l.type, l.fn);
    });
    listeners = [];
  };
})();
