(function () {
  var D = window.DATA;

  document.body.classList.add('plain', 'no-flicker');
  document.documentElement.style.setProperty('--crt-intensity', '0.08');

  var html = '';

  // Header
  html += '<h1>' + D.name + '</h1>';
  html += '<p>' + D.title + ' | ' + D.location + '</p>';
  html += '<hr>';

  // About
  html += '<h2>About</h2>';
  D.bio.forEach(function (p) {
    html += '<p>' + p + '</p>';
  });

  // Stats
  html += '<h2>Stats</h2>';
  html += '<ul>';
  D.stats.forEach(function (s) {
    html += '<li><b>' + s.num + '</b> ' + s.label + '</li>';
  });
  html += '</ul>';

  // Skills
  html += '<h2>Skills</h2>';
  html += '<ul>';
  D.skills.forEach(function (g) {
    html += '<li>' + g.group + ': ' + g.tags.join(', ') + '</li>';
  });
  html += '</ul>';

  // Experience
  html += '<h2>Experience</h2>';
  D.experience.forEach(function (e) {
    html += '<h3>' + e.title + '</h3>';
    html += '<p><i>' + e.domain + '</i>';
    if (e.tags && e.tags.length) {
      html += ' &mdash; ' + e.tags.join(', ');
    }
    html += '</p>';
    html += '<p>' + e.body + '</p>';
    if (e.link) {
      html += '<p><a href="' + e.link.url + '">' + e.link.label + '</a></p>';
    }
  });

  // Contact
  html += '<hr>';
  html += '<h2>Contact</h2>';
  html += '<p>';
  html += 'Email: <a href="mailto:' + D.email + '">' + D.email + '</a><br>';
  html += 'GitHub: <a href="' + D.github + '">' + D.github + '</a><br>';
  html += 'Upwork: <a href="' + D.upwork + '">' + D.handle + ' on Upwork</a>';
  html += '</p>';

  // Footer
  html += '<hr>';
  html += '<p><small>' + D.name + ' &mdash; ' + D.handle + '</small></p>';

  document.getElementById('app').innerHTML = html;

  // Cleanup hook
  window.__themeCleanup = function () {
    document.body.classList.remove('plain', 'no-flicker');
    document.documentElement.style.removeProperty('--crt-intensity');
  };
})();
