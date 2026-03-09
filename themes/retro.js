(function () {
  var D = window.DATA;

  document.body.classList.add('retro', 'no-flicker');
  document.documentElement.style.setProperty('--crt-intensity', '0.6');

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  // Fake hit counter — random-ish but seeded from date
  var today = new Date();
  var hitCount = 13749 + today.getDate() * 7 + today.getMonth() * 83;
  var hitDigits = String(hitCount).padStart(6, '0').split('');

  var html = '';

  // ── Under Construction Banner ──
  html += '<div class="retro-construction">';
  html += '<span class="construction-stripe"></span>';
  html += ' !! UNDER CONSTRUCTION !! ';
  html += '<span class="construction-stripe"></span>';
  html += '</div>';

  // ── Marquee ──
  html += '<div class="retro-marquee">';
  html += '<div class="retro-marquee-inner">';
  html += '<span class="marquee-star">*~*~*</span>';
  html += ' WeLcOmE tO ' + esc(D.name) + '\'s HoMePaGe!!! ';
  html += '<span class="marquee-star">*~*~*</span>';
  html += ' ' + esc(D.title) + ' ';
  html += '<span class="marquee-star">*~*~*</span>';
  html += ' CLICK AROUND AND EXPLORE! ';
  html += '<span class="marquee-star">*~*~*</span>';
  html += '</div>';
  html += '</div>';

  // ── Table Layout (sidebar + main) ──
  html += '<table class="retro-table"><tr>';

  // == Sidebar ==
  html += '<td class="retro-sidebar">';
  html += '<div class="retro-sidebar-title">:: NAVIGATION ::</div>';
  html += '<ul class="retro-sidebar-nav">';
  html += '<li><a href="#about">About Me</a></li>';
  html += '<li><a href="#skills">My Skills</a></li>';
  html += '<li><a href="#experience">Experience</a></li>';
  html += '<li><a href="#guestbook">Guestbook</a></li>';
  html += '</ul>';

  // Visitor counter
  html += '<div class="retro-sidebar-info">';
  html += '<p>You are visitor #</p>';
  html += '<div class="retro-counter">';
  hitDigits.forEach(function (d) {
    html += '<span class="retro-counter-digit">' + d + '</span>';
  });
  html += '</div>';
  html += '<p>Since Jan 1999</p>';
  html += '</div>';

  // Webring
  html += '<div class="retro-webring">';
  html += '<div class="retro-webring-title">~ Dev WebRing ~</div>';
  html += '<a href="#">&laquo; Prev</a>';
  html += '<a href="#">Random</a>';
  html += '<a href="#">Next &raquo;</a>';
  html += '</div>';

  // Best viewed in
  html += '<div class="retro-sidebar-info" style="margin-top:12px;font-size:9px;color:#666;">';
  html += 'Best viewed in<br>Netscape Navigator<br>800x600<br>16-bit color';
  html += '</div>';

  html += '</td>';

  // == Main Content ==
  html += '<td class="retro-main">';

  // Welcome
  html += '<div class="retro-welcome">';
  html += '<h1>';
  html += '<span class="sparkle">&#10026;</span> ';
  html += esc(D.name) + '\'s Homepage';
  html += ' <span class="sparkle">&#10026;</span>';
  html += '</h1>';
  html += '<div class="subtitle">&lt;&lt; ' + esc(D.title) + ' &gt;&gt;</div>';
  html += '<div class="location">&sim; ' + esc(D.location) + ' &sim;</div>';
  html += '</div>';

  html += '<hr class="rainbow-hr">';

  // About
  html += '<div class="retro-section-header" id="about">';
  html += '&#9733; About Me &#9733;';
  html += '<span class="new-gif">NEW!</span>';
  html += '</div>';

  html += '<div class="retro-about">';
  D.bio.forEach(function (p) {
    html += '<p>' + p + '</p>';
  });
  html += '</div>';

  // Stats
  html += '<div class="retro-stats">';
  D.stats.forEach(function (s) {
    html += '<div class="retro-stat">';
    html += '<span class="retro-stat-num">' + esc(s.num) + '</span>';
    html += '<span class="retro-stat-label">' + esc(s.label) + '</span>';
    html += '</div>';
  });
  html += '</div>';

  html += '<hr class="rainbow-hr">';

  // Skills
  html += '<div class="retro-section-header" id="skills">';
  html += '&#9733; My Skillz &#9733;';
  html += '</div>';

  html += '<table class="retro-skills-table">';
  D.skills.forEach(function (g) {
    html += '<tr>';
    html += '<th>' + esc(g.group) + '</th>';
    html += '<td>';
    g.tags.forEach(function (t) {
      html += '<span class="retro-skill-tag">' + esc(t) + '</span>';
    });
    html += '</td>';
    html += '</tr>';
  });
  html += '</table>';

  html += '<hr class="rainbow-hr">';

  // Experience
  html += '<div class="retro-section-header" id="experience">';
  html += '&#9733; Experience &#9733;';
  html += '<span class="new-gif">HOT!</span>';
  html += '</div>';

  D.experience.forEach(function (e) {
    html += '<div class="retro-exp-entry">';
    html += '<div class="retro-exp-domain">' + esc(e.domain) + '</div>';
    html += '<div class="retro-exp-title">' + esc(e.title) + '</div>';
    if (e.tags && e.tags.length) {
      html += '<div class="retro-exp-tags">[' + e.tags.map(esc).join(' | ') + ']</div>';
    }
    html += '<div class="retro-exp-body">' + e.body + '</div>';
    if (e.link) {
      html += '<div class="retro-exp-link"><a href="' + esc(e.link.url) + '">&gt;&gt; ' + esc(e.link.label) + '</a></div>';
    }
    html += '</div>';
  });

  html += '<hr class="rainbow-hr">';

  // Guestbook / Contact
  html += '<div class="retro-section-header" id="guestbook">';
  html += '<span class="spin-icon">&#9993;</span> Sign My Guestbook! <span class="spin-icon">&#9993;</span>';
  html += '</div>';

  html += '<div class="retro-guestbook">';
  html += '<div class="retro-guestbook-title">~*~ Leave a Message ~*~</div>';
  html += '<div class="retro-guestbook-msg">';
  html += 'Want to work together? Drop me a line! ';
  html += '<span class="retro-email-blink">' + esc(D.email) + '</span>';
  html += '</div>';
  html += '<div class="retro-contact-links">';
  html += '<a class="retro-contact-btn primary" href="mailto:' + esc(D.email) + '">';
  html += '<span class="spin-icon">&#9993;</span> EMAIL ME!</a>';
  html += '<a class="retro-contact-btn" href="' + esc(D.github) + '" target="_blank" rel="noopener">GITHUB</a>';
  html += '<a class="retro-contact-btn" href="' + esc(D.upwork) + '" target="_blank" rel="noopener">UPWORK</a>';
  html += '</div>';
  html += '</div>';

  html += '<hr class="rainbow-hr">';

  // Footer
  html += '<div class="retro-footer">';
  html += '&copy; 1999-' + new Date().getFullYear() + ' ' + esc(D.name) + ' | ' + esc(D.handle);
  html += '<br>Made with &lt;table&gt; tags and love';
  html += '<div class="retro-footer-netscape">Best viewed in Netscape Navigator 4.0 at 800x600</div>';
  html += '</div>';

  html += '</td>';
  html += '</tr></table>';

  document.getElementById('app').innerHTML = html;

  // ── Smooth scroll ──
  var listeners = [];
  var navLinks = document.querySelectorAll('.retro-sidebar-nav a');
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

  // ── Cleanup ──
  window.__themeCleanup = function () {
    document.body.classList.remove('retro', 'no-flicker');
    document.documentElement.style.removeProperty('--crt-intensity');
    listeners.forEach(function (l) {
      l.el.removeEventListener(l.type, l.fn);
    });
    listeners = [];
  };
})();
