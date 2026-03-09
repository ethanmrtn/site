(function () {
  var D = window.DATA;
  var chipColors = ['chip-purple', 'chip-pink', 'chip-mint', 'chip-lavender', 'chip-sky', 'chip-peach', 'chip-rose'];
  var listeners = [];
  var timers = [];

  // Add theme class
  document.body.classList.add('bubbly', 'no-flicker');

  // Set CRT vars
  document.documentElement.style.setProperty('--crt-intensity', '0');

  // ── Helpers ───────────────────────────────────
  function esc(s) {
    var el = document.createElement('span');
    el.textContent = s;
    return el.innerHTML;
  }

  // ── Build portfolio HTML ────────────────────────────────
  function buildPortfolio() {
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
    html += '<h1>Hey, I\'m ' + esc(D.name) + ' <span class="accent">\u2726</span></h1>';
    html += '<p class="subtitle">' + esc(D.title) + '</p>';
    html += '<p class="location"><span class="decorative">\u00b7</span> ' + esc(D.location) + ' <span class="decorative">\u00b7</span></p>';
    html += '</section>';

    // About
    html += '<h2 class="bubbly-section-title" id="about">About<span class="dot"> \u00b7</span></h2>';
    html += '<div class="bubbly-card bubbly-about">';
    D.bio.forEach(function (p) {
      html += '<p>' + p + '</p>';
    });
    html += '</div>';

    // Stats
    html += '<h2 class="bubbly-section-title" id="stats">Stats<span class="dot"> \u2726</span></h2>';
    html += '<div class="bubbly-stats">';
    D.stats.forEach(function (s) {
      html += '<div class="bubbly-stat-card">';
      html += '<span class="bubbly-stat-num">' + esc(s.num) + '</span>';
      html += '<span class="bubbly-stat-label">' + esc(s.label) + '</span>';
      html += '</div>';
    });
    html += '</div>';

    // Skills
    html += '<h2 class="bubbly-section-title" id="skills">Skills<span class="dot"> \u00b7</span></h2>';
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
    html += '<h2 class="bubbly-section-title" id="experience">Experience<span class="dot"> \u2726</span></h2>';
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
    html += '<h2 class="bubbly-section-title" id="contact">Let\'s Connect<span class="dot"> \u00b7</span></h2>';
    html += '<div class="bubbly-contact">';
    html += '<a class="bubbly-cta" href="mailto:' + esc(D.email) + '">Say Hello \u2709</a>';
    html += '<div class="bubbly-contact-links">';
    html += '<a href="' + esc(D.github) + '">GitHub</a>';
    html += '<a href="' + esc(D.upwork) + '">Upwork</a>';
    html += '</div>';
    html += '</div>';

    // Footer
    html += '<footer class="bubbly-footer">';
    html += esc(D.name) + ' \u00b7 ' + esc(D.handle);
    html += '</footer>';

    return html;
  }

  // ── ChatGPT prompt intro ────────────────────────────────

  var prompt = 'make me a developer portfolio site for ' + D.name + '. make it modern and clean with pastel colors, rounded cards, nice typography. include about, stats, skills, experience, and contact sections. make it look really professional and aesthetic';

  var introHtml = '';
  introHtml += '<div class="gpt-intro">';
  introHtml += '<div class="gpt-sidebar">';
  introHtml += '<div class="gpt-sidebar-top">';
  introHtml += '<div class="gpt-sidebar-brand">ChatGPT</div>';
  introHtml += '<div class="gpt-sidebar-item gpt-sidebar-new">+ New chat</div>';
  introHtml += '</div>';
  introHtml += '<div class="gpt-sidebar-history">';
  introHtml += '<div class="gpt-sidebar-label">Today</div>';
  introHtml += '<div class="gpt-sidebar-item active">Developer Portfolio Site</div>';
  introHtml += '<div class="gpt-sidebar-label">Yesterday</div>';
  introHtml += '<div class="gpt-sidebar-item">Fix React hydration error</div>';
  introHtml += '<div class="gpt-sidebar-item">Python webscraper help</div>';
  introHtml += '<div class="gpt-sidebar-item">Tailwind grid layout</div>';
  introHtml += '<div class="gpt-sidebar-label">Previous 7 days</div>';
  introHtml += '<div class="gpt-sidebar-item">API rate limiting strateg...</div>';
  introHtml += '<div class="gpt-sidebar-item">Docker compose debuggi...</div>';
  introHtml += '</div>';
  introHtml += '</div>';
  introHtml += '<div class="gpt-main">';
  introHtml += '<div class="gpt-header"><span class="gpt-model-pill">GPT-4o</span></div>';
  introHtml += '<div class="gpt-chat" id="gpt-chat">';
  introHtml += '<div class="gpt-msg gpt-msg-user" id="gpt-user-msg" style="display:none">';
  introHtml += '<div class="gpt-avatar gpt-avatar-user">E</div>';
  introHtml += '<div class="gpt-msg-content">';
  introHtml += '<div class="gpt-msg-text done" id="gpt-prompt-text"></div>';
  introHtml += '</div>';
  introHtml += '</div>';
  introHtml += '<div class="gpt-msg gpt-msg-ai" id="gpt-response" style="display:none">';
  introHtml += '<div class="gpt-avatar gpt-avatar-ai">\u2728</div>';
  introHtml += '<div class="gpt-msg-content">';
  introHtml += '<div class="gpt-thinking" id="gpt-thinking"><span></span><span></span><span></span></div>';
  introHtml += '<div class="gpt-msg-text" id="gpt-response-text" style="display:none"></div>';
  introHtml += '</div>';
  introHtml += '</div>';
  introHtml += '</div>';
  introHtml += '<div class="gpt-input-area">';
  introHtml += '<div class="gpt-input-box">';
  introHtml += '<span class="gpt-input-text" id="gpt-input-text"></span>';
  introHtml += '<span class="gpt-input-placeholder" id="gpt-input-ph">Message ChatGPT...</span>';
  introHtml += '<button class="gpt-send-btn" id="gpt-send-btn">\u2191</button>';
  introHtml += '</div>';
  introHtml += '</div>';
  introHtml += '</div>';
  introHtml += '</div>';

  document.getElementById('app').innerHTML = introHtml;

  // ── Type into the input bar, then send ─────────────────
  var inputTextEl = document.getElementById('gpt-input-text');
  var inputPhEl = document.getElementById('gpt-input-ph');
  var sendBtn = document.getElementById('gpt-send-btn');
  var promptEl = document.getElementById('gpt-prompt-text');
  var userMsgEl = document.getElementById('gpt-user-msg');
  var responseEl = document.getElementById('gpt-response');
  var thinkingEl = document.getElementById('gpt-thinking');
  var responseTextEl = document.getElementById('gpt-response-text');
  var charIndex = 0;

  function typePrompt() {
    if (charIndex < prompt.length) {
      if (charIndex === 0) inputPhEl.style.display = 'none';
      var chunk = Math.min(Math.floor(Math.random() * 3) + 1, prompt.length - charIndex);
      inputTextEl.textContent += prompt.slice(charIndex, charIndex + chunk);
      charIndex += chunk;
      var delay = 20 + Math.random() * 30;
      if (prompt[charIndex - 1] === ' ') delay += 30;
      timers.push(setTimeout(typePrompt, delay));
    } else {
      // Done typing — highlight send button, then "send"
      sendBtn.classList.add('ready');
      timers.push(setTimeout(sendMessage, 800));
    }
  }

  function sendMessage() {
    // Move text up to chat as user message
    promptEl.textContent = prompt;
    userMsgEl.style.display = '';
    // Clear input bar
    inputTextEl.textContent = '';
    inputPhEl.style.display = '';
    sendBtn.classList.remove('ready');
    // Show thinking
    timers.push(setTimeout(showThinking, 400));
  }

  function showThinking() {
    responseEl.style.display = '';
    // Think for a bit, then show the streaming response
    timers.push(setTimeout(showResponse, 2000));
  }

  function showResponse() {
    thinkingEl.style.display = 'none';
    responseTextEl.style.display = '';
    // Stream out a short response then show button
    var responseMsg = "Here's a clean, modern portfolio site for " + D.name + " with pastel colors and rounded cards. I've included all the sections you asked for:";
    var rIdx = 0;
    function typeResponse() {
      if (rIdx < responseMsg.length) {
        var chunk = Math.min(Math.floor(Math.random() * 4) + 2, responseMsg.length - rIdx);
        responseTextEl.textContent += responseMsg.slice(rIdx, rIdx + chunk);
        rIdx += chunk;
        timers.push(setTimeout(typeResponse, 15 + Math.random() * 20));
      } else {
        // Add the show output button
        timers.push(setTimeout(function () {
          var btn = document.createElement('button');
          btn.className = 'gpt-show-output';
          btn.textContent = '\u25b6 Show Output';
          btn.addEventListener('click', revealPortfolio);
          responseTextEl.parentNode.appendChild(btn);
        }, 400));
      }
    }
    typeResponse();
  }

  function revealPortfolio() {
    var app = document.getElementById('app');
    // Fade out the intro
    var intro = app.querySelector('.gpt-intro');
    intro.style.transition = 'opacity 0.4s ease';
    intro.style.opacity = '0';
    timers.push(setTimeout(function () {
      app.innerHTML = buildPortfolio();
      // Stream in each section
      var sections = app.querySelectorAll('.bubbly-nav, .bubbly-hero, .bubbly-section-title, .bubbly-card, .bubbly-stats, .bubbly-exp-list, .bubbly-contact, .bubbly-footer');
      sections.forEach(function (el, i) {
        el.classList.add('gpt-stream-in');
        el.style.animationDelay = (i * 120) + 'ms';
      });
      bindNav();
    }, 400));
  }

  // ── Nav binding ─────────────────────────────
  function bindNav() {
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
  }

  // Start typing after a brief pause
  timers.push(setTimeout(typePrompt, 800));

  // ── Cleanup ───────────────────────────────────
  window.__themeCleanup = function () {
    document.body.classList.remove('bubbly', 'no-flicker');
    document.documentElement.style.removeProperty('--crt-intensity');
    timers.forEach(function (t) { clearTimeout(t); });
    timers = [];
    listeners.forEach(function (l) {
      l.el.removeEventListener(l.type, l.fn);
    });
    listeners = [];
  };
})();
