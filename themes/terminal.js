(function () {
  var D = window.DATA;
  var intervals = [];
  var listeners = [];
  var cursorEl = null;
  var startTime = Date.now();

  // 1. Add terminal class, hide cursor
  document.body.classList.add("terminal");
  document.body.style.cursor = "none";

  // 2. Set CRT properties
  document.documentElement.style.setProperty("--crt-intensity", "1");
  document.documentElement.style.setProperty("--crt-flicker", "1");

  // 3. Build HTML
  var app = document.getElementById("app");
  var html = "";

  // Nav
  html += '<nav class="arc-nav">';
  html += '<div class="arc-nav-inner">';
  html += '<span class="arc-nav-brand">' + esc(D.handle) + "</span>";
  html += '<div class="arc-nav-links">';
  html += '<a href="#about">ABOUT</a>';
  html += '<a href="#skills">SKILLS</a>';
  html += '<a href="#experience">EXPERIENCE</a>';
  html += '<a href="#contact">CONTACT</a>';
  html += "</div>";
  html += "</div>";
  html += "</nav>";

  // Hero
  html += '<section class="arc-hero" id="hero">';
  html += '<div class="arc-hero-inner">';
  html += '<div class="arc-hud arc-hud-tl">';
  html += '<div id="arc-clock">00:00:00</div>';
  html += '<div class="arc-hud-status online">ONLINE</div>';
  html += "</div>";
  html += '<div class="arc-hud arc-hud-tr">';
  html += '<div>UPTIME: <span id="arc-uptime">00:00</span></div>';
  html += '<div class="arc-hud-status online">FREELANCE: OPEN</div>';
  html += "</div>";
  html += '<div style="padding: 60px 0;">';
  html += '<div class="arc-hero-title">' + esc(D.name).toUpperCase() + "</div>";
  html += '<div class="arc-hero-subtitle">' + esc(D.title) + "</div>";
  html += '<div class="arc-hero-location">' + esc(D.location) + "</div>";
  html += "</div>";
  html += '<div class="arc-hud arc-hud-bl"><div>SYS: NOMINAL</div></div>';
  html +=
    '<div class="arc-hud arc-hud-br"><div>' + esc(D.handle) + "</div></div>";
  html += "</div>";
  html += "</section>";

  // About (01//)
  html += '<section class="arc-about" id="about">';
  html += '<div class="arc-container">';
  html +=
    '<div class="arc-section-header reveal"><span class="arc-section-num">01//</span>ABOUT</div>';
  html += '<div class="arc-bio reveal">';
  for (var i = 0; i < D.bio.length; i++) {
    html += "<p>" + esc(D.bio[i]) + "</p>";
  }
  html += "</div>";
  html += '<div class="arc-stats reveal">';
  for (var i = 0; i < D.stats.length; i++) {
    html += '<div class="arc-stat">';
    html += '<div class="arc-stat-num">' + esc(D.stats[i].num) + "</div>";
    html += '<div class="arc-stat-label">' + esc(D.stats[i].label) + "</div>";
    html += "</div>";
  }
  html += "</div>";
  html += "</div>";
  html += "</section>";

  // Skills (02//)
  html += '<section class="arc-skills" id="skills">';
  html += '<div class="arc-container">';
  html +=
    '<div class="arc-section-header reveal"><span class="arc-section-num">02//</span>SKILLS</div>';
  html += '<div class="arc-skills-grid">';
  for (var i = 0; i < D.skills.length; i++) {
    html += '<div class="arc-skill-cell reveal">';
    html += '<div class="arc-skill-group">' + esc(D.skills[i].group) + "</div>";
    html += '<div class="arc-skill-tags">';
    for (var j = 0; j < D.skills[i].tags.length; j++) {
      html +=
        '<span class="arc-skill-tag">' + esc(D.skills[i].tags[j]) + "</span>";
    }
    html += "</div>";
    html += "</div>";
  }
  html += "</div>";
  html += "</div>";
  html += "</section>";

  // Experience (03//)
  html += '<section class="arc-experience" id="experience">';
  html += '<div class="arc-container">';
  html +=
    '<div class="arc-section-header reveal"><span class="arc-section-num">03//</span>EXPERIENCE</div>';
  html += '<ul class="arc-exp-list">';
  for (var i = 0; i < D.experience.length; i++) {
    var exp = D.experience[i];
    html += '<li class="arc-exp-item reveal">';
    html += '<div class="arc-exp-top">';
    html += '<span class="arc-exp-domain">' + esc(exp.domain) + "</span>";
    html += '<span class="arc-exp-title">' + esc(exp.title) + "</span>";
    html += "</div>";
    html += '<div class="arc-exp-tags">';
    for (var j = 0; j < exp.tags.length; j++) {
      html += '<span class="arc-exp-tag">' + esc(exp.tags[j]) + "</span>";
    }
    html += "</div>";
    html += '<div class="arc-exp-body">' + esc(exp.body) + "</div>";
    if (exp.link) {
      html +=
        '<a class="arc-exp-link" href="' +
        esc(exp.link.url) +
        '" target="_blank" rel="noopener">' +
        esc(exp.link.label) +
        " &rarr;</a>";
    }
    html += "</li>";
  }
  html += "</ul>";
  html += "</div>";
  html += "</section>";

  // Contact (04//)
  html += '<section class="arc-contact" id="contact">';
  html += '<div class="arc-container">';
  html += '<div class="arc-contact-heading reveal">READY PLAYER ONE?</div>';
  html += '<div class="arc-contact-links reveal">';
  html +=
    '<a class="arc-contact-btn primary" href="mailto:' +
    esc(D.email) +
    '">EMAIL</a>';
  html +=
    '<a class="arc-contact-btn" href="' +
    esc(D.github) +
    '" target="_blank" rel="noopener">GITHUB</a>';
  html +=
    '<a class="arc-contact-btn" href="' +
    esc(D.upwork) +
    '" target="_blank" rel="noopener">UPWORK</a>';
  html += "</div>";
  html += "</div>";
  html += "</section>";

  // Footer
  html += '<footer class="arc-footer">';
  html +=
    "&copy; " +
    new Date().getFullYear() +
    " " +
    esc(D.name) +
    " &mdash; " +
    esc(D.handle);
  html += "</footer>";

  app.innerHTML = html;

  // 4. Custom block cursor
  cursorEl = document.createElement("div");
  cursorEl.className = "cursor-block";
  document.body.appendChild(cursorEl);

  function onMouseMove(e) {
    cursorEl.style.left = e.clientX + "px";
    cursorEl.style.top = e.clientY + "px";
  }
  document.addEventListener("mousemove", onMouseMove);
  listeners.push({ target: document, type: "mousemove", fn: onMouseMove });

  // 5. Live clock
  var clockEl = document.getElementById("arc-clock");
  function updateClock() {
    var now = new Date();
    var h = String(now.getHours()).padStart(2, "0");
    var m = String(now.getMinutes()).padStart(2, "0");
    var s = String(now.getSeconds()).padStart(2, "0");
    if (clockEl) clockEl.textContent = h + ":" + m + ":" + s;
  }
  updateClock();
  intervals.push(setInterval(updateClock, 1000));

  // 6. Uptime counter
  var uptimeEl = document.getElementById("arc-uptime");
  function updateUptime() {
    var elapsed = Math.floor((Date.now() - startTime) / 1000);
    var mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
    var ss = String(elapsed % 60).padStart(2, "0");
    if (uptimeEl) uptimeEl.textContent = mm + ":" + ss;
  }
  updateUptime();
  intervals.push(setInterval(updateUptime, 1000));

  // 7. IntersectionObserver for .reveal
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    observer.observe(reveals[i]);
  }

  // 8. Smooth scroll for nav links
  function onNavClick(e) {
    var href = e.target.getAttribute("href");
    if (href && href.charAt(0) === "#") {
      e.preventDefault();
      var target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
  var navLinks = document.querySelectorAll(".arc-nav-links a");
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", onNavClick);
    listeners.push({ target: navLinks[i], type: "click", fn: onNavClick });
  }

  // 9. Cleanup
  window.__themeCleanup = function () {
    // Clear intervals
    for (var i = 0; i < intervals.length; i++) {
      clearInterval(intervals[i]);
    }
    intervals = [];

    // Remove cursor
    if (cursorEl && cursorEl.parentNode) {
      cursorEl.parentNode.removeChild(cursorEl);
    }
    cursorEl = null;

    // Remove event listeners
    for (var i = 0; i < listeners.length; i++) {
      var l = listeners[i];
      l.target.removeEventListener(l.type, l.fn);
    }
    listeners = [];

    // Disconnect observer
    if (observer) {
      observer.disconnect();
    }

    // Remove terminal class and reset cursor
    document.body.classList.remove("terminal");
    document.body.style.cursor = "";

    // Reset CRT properties
    document.documentElement.style.removeProperty("--crt-intensity");
    document.documentElement.style.removeProperty("--crt-flicker");
  };

  // Escape helper
  function esc(str) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
})();
