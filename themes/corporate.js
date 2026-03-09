(function () {
  var D = window.DATA;

  document.body.classList.add('corporate', 'no-flicker');
  document.documentElement.style.setProperty('--crt-intensity', '0.4');

  /* ── Helpers ── */

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function countWords() {
    var text = '';
    if (D.bio) text += D.bio.join(' ') + ' ';
    if (D.skills) D.skills.forEach(function (g) { text += g.group + ' ' + g.tags.join(' ') + ' '; });
    if (D.experience) D.experience.forEach(function (e) { text += e.title + ' ' + e.body + ' '; });
    text += (D.name || '') + ' ' + (D.title || '') + ' ' + (D.location || '');
    return text.trim().split(/\s+/).filter(function (w) { return w.length > 0; }).length;
  }

  var wordCount = countWords();

  /* ── Ribbon tab data ── */

  var ribbonTabs = ['Home', 'Insert', 'Layout', 'Review', 'View'];

  function buildRibbonContent(tab) {
    if (tab === 'Home') {
      return '' +
        '<div class="word-ribbon-group">' +
          '<div class="word-ribbon-group-buttons">' +
            '<button class="ribbon-btn bold-btn" title="Bold">B</button>' +
            '<button class="ribbon-btn italic-btn" title="Italic">I</button>' +
            '<button class="ribbon-btn underline-btn" title="Underline">U</button>' +
          '</div>' +
          '<div class="word-ribbon-group-label">Font</div>' +
        '</div>' +
        '<div class="word-ribbon-group">' +
          '<div class="word-ribbon-group-buttons">' +
            '<button class="ribbon-btn" title="Align Left">\u2261</button>' +
            '<button class="ribbon-btn" title="Center">\u2263</button>' +
            '<button class="ribbon-btn" title="Align Right">\u2261</button>' +
            '<button class="ribbon-btn" title="Justify">\u2630</button>' +
          '</div>' +
          '<div class="word-ribbon-group-label">Paragraph</div>' +
        '</div>' +
        '<div class="word-ribbon-group">' +
          '<div class="word-ribbon-group-buttons">' +
            '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">Aa</span>Normal</button>' +
            '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">Aa</span>Heading 1</button>' +
            '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">Aa</span>Heading 2</button>' +
            '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">Aa</span>Title</button>' +
          '</div>' +
          '<div class="word-ribbon-group-label">Styles</div>' +
        '</div>';
    }
    if (tab === 'Insert') {
      return '' +
        '<div class="word-ribbon-group">' +
          '<div class="word-ribbon-group-buttons">' +
            '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u25A3</span>Table</button>' +
            '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u25BC</span>Picture</button>' +
            '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u2197</span>Shapes</button>' +
          '</div>' +
          '<div class="word-ribbon-group-label">Tables &amp; Illustrations</div>' +
        '</div>' +
        '<div class="word-ribbon-group">' +
          '<div class="word-ribbon-group-buttons">' +
            '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">#</span>Header</button>' +
            '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">_</span>Footer</button>' +
            '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u2116</span>Page No.</button>' +
          '</div>' +
          '<div class="word-ribbon-group-label">Header &amp; Footer</div>' +
        '</div>';
    }
    if (tab === 'Layout') {
      return '' +
        '<div class="word-ribbon-group">' +
          '<div class="word-ribbon-group-buttons">' +
            '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u25EF</span>Margins</button>' +
            '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u2B1C</span>Orientation</button>' +
            '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u25A1</span>Size</button>' +
          '</div>' +
          '<div class="word-ribbon-group-label">Page Setup</div>' +
        '</div>' +
        '<div class="word-ribbon-group">' +
          '<div class="word-ribbon-group-buttons">' +
            '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u2195</span>Spacing</button>' +
            '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u2194</span>Indent</button>' +
          '</div>' +
          '<div class="word-ribbon-group-label">Paragraph</div>' +
        '</div>';
    }
    if (tab === 'Review') {
      return '' +
        '<div class="word-ribbon-group">' +
          '<div class="word-ribbon-group-buttons">' +
            '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">ABC</span>Spelling</button>' +
            '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u{1F4D6}</span>Thesaurus</button>' +
          '</div>' +
          '<div class="word-ribbon-group-label">Proofing</div>' +
        '</div>' +
        '<div class="word-ribbon-group">' +
          '<div class="word-ribbon-group-buttons">' +
            '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u270E</span>Track</button>' +
            '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u{1F4AC}</span>Comment</button>' +
          '</div>' +
          '<div class="word-ribbon-group-label">Tracking</div>' +
        '</div>';
    }
    if (tab === 'View') {
      return '' +
        '<div class="word-ribbon-group">' +
          '<div class="word-ribbon-group-buttons">' +
            '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u25A1</span>Print</button>' +
            '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u2398</span>Web</button>' +
            '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u2637</span>Outline</button>' +
          '</div>' +
          '<div class="word-ribbon-group-label">Views</div>' +
        '</div>' +
        '<div class="word-ribbon-group">' +
          '<div class="word-ribbon-group-buttons">' +
            '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u2316</span>Ruler</button>' +
            '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u2588</span>Gridlines</button>' +
          '</div>' +
          '<div class="word-ribbon-group-label">Show</div>' +
        '</div>';
    }
    return '';
  }

  /* ── Build ruler ticks ── */

  function buildRuler() {
    var ticks = '';
    for (var i = 0; i <= 8; i++) {
      ticks += '<span class="word-ruler-number" style="left:' + (i * 96) + 'px">' + (i > 0 ? i : '') + '</span>';
    }
    for (var j = 1; j < 16; j++) {
      var h = (j % 2 === 0) ? 8 : 4;
      ticks += '<span class="word-ruler-tick" style="left:' + (j * 48) + 'px;height:' + h + 'px"></span>';
    }
    return ticks;
  }

  /* ── Build CV content ── */

  function buildCV() {
    var h = '';

    // Name
    h += '<h1 class="cv-name">' + esc(D.name) + '</h1>';
    h += '<p class="cv-handle">' + esc(D.handle) + '</p>';

    // Contact line
    var contactParts = [];
    if (D.location) contactParts.push(esc(D.location));
    if (D.email) contactParts.push('<a href="mailto:' + esc(D.email) + '">' + esc(D.email) + '</a>');
    if (D.github) contactParts.push('<a href="' + esc(D.github) + '">github.com/ethanmrtn</a>');
    h += '<p class="cv-contact">' + contactParts.join(' | ') + '</p>';

    h += '<hr class="cv-hr">';

    // Opener
    h += '<p class="cv-opener">To Whom It May Concern,</p>';

    // Professional Summary
    h += '<h2 class="cv-section-heading">Professional Summary</h2>';
    h += '<div class="cv-bio">';
    if (D.bio && D.bio.length) {
      D.bio.forEach(function (p) {
        h += '<p>' + p + '</p>';
      });
    }
    h += '</div>';

    // Stats
    if (D.stats && D.stats.length) {
      h += '<div class="cv-stats-row">';
      D.stats.forEach(function (s) {
        h += '<div class="cv-stat">' +
          '<div class="cv-stat-num">' + esc(s.num) + '</div>' +
          '<div class="cv-stat-label">' + esc(s.label) + '</div>' +
        '</div>';
      });
      h += '</div>';
    }

    // Technical Skills
    h += '<h2 class="cv-section-heading">Technical Skills</h2>';
    h += '<table class="cv-skills-table">';
    h += '<thead><tr><th>Category</th><th>Technologies</th></tr></thead>';
    h += '<tbody>';
    if (D.skills && D.skills.length) {
      D.skills.forEach(function (g) {
        h += '<tr><th>' + esc(g.group) + '</th><td>' + g.tags.map(esc).join(', ') + '</td></tr>';
      });
    }
    h += '</tbody></table>';

    // Professional Experience
    h += '<h2 class="cv-section-heading">Professional Experience</h2>';
    if (D.experience && D.experience.length) {
      D.experience.forEach(function (e) {
        h += '<div class="cv-exp-entry">';
        h += '<p class="cv-exp-title">' + esc(e.title) + '</p>';
        h += '<p class="cv-exp-domain">' + esc(e.domain);
        if (e.tags && e.tags.length) {
          h += ' \u2014 ' + e.tags.map(esc).join(', ');
        }
        h += '</p>';
        h += '<p class="cv-exp-body">' + e.body + '</p>';
        if (e.link) {
          h += '<p class="cv-exp-link"><a href="' + esc(e.link.url) + '">' + esc(e.link.label) + '</a></p>';
        }
        h += '</div>';
      });
    }

    // Contact & Availability
    h += '<h2 class="cv-section-heading">Contact &amp; Availability</h2>';
    h += '<p>For inquiries regarding availability, project proposals, or collaboration opportunities, ';
    h += 'please do not hesitate to reach out via the following channels:</p>';
    h += '<p>';
    if (D.email) h += 'Email: <a href="mailto:' + esc(D.email) + '">' + esc(D.email) + '</a><br>';
    if (D.github) h += 'GitHub: <a href="' + esc(D.github) + '">' + esc(D.github) + '</a><br>';
    if (D.upwork) h += 'Upwork: <a href="' + esc(D.upwork) + '">' + esc(D.handle) + ' on Upwork</a>';
    h += '</p>';

    h += '<hr class="cv-hr">';

    // Signature
    h += '<p class="cv-closing">Yours sincerely,</p>';
    h += '<div class="cv-signature">';
    h += '<p class="cv-signature-name">' + esc(D.name) + '</p>';
    h += '<p>' + esc(D.title) + '</p>';
    h += '</div>';

    return h;
  }

  /* ── Assemble full UI ── */

  var html = '';

  // Title bar
  html += '<div class="word-titlebar">';
  html += '  <div class="word-titlebar-left">';
  html += '    <span class="word-titlebar-icon">W</span>';
  html += '    <span class="word-titlebar-title">Document1 - Microsoft Word</span>';
  html += '  </div>';
  html += '  <div class="word-titlebar-right">';
  html += '    <span class="word-titlebar-btn minimize" title="Minimize">\u2014</span>';
  html += '    <span class="word-titlebar-btn maximize" title="Maximize">\u25A1</span>';
  html += '    <span class="word-titlebar-btn close" title="Close">\u2715</span>';
  html += '  </div>';
  html += '</div>';

  // Ribbon
  html += '<div class="word-ribbon">';
  html += '  <div class="word-ribbon-tabs">';
  ribbonTabs.forEach(function (t, i) {
    html += '<span class="word-ribbon-tab' + (i === 0 ? ' active' : '') + '" data-tab="' + t + '">' + t + '</span>';
  });
  html += '  </div>';
  html += '  <div class="word-ribbon-content">' + buildRibbonContent('Home') + '</div>';
  html += '</div>';

  // Ruler
  html += '<div class="word-ruler"><div class="word-ruler-inner">' + buildRuler() + '</div></div>';

  // Page area — content rendered into a hidden measurer, then split into pages
  html += '<div class="word-page-area">';
  html += '</div>';

  // Hidden measurer — full-width page with no height constraint to measure content
  html += '<div id="word-measurer" class="word-page" style="position:absolute;left:-9999px;top:0;height:auto;max-height:none;overflow:visible;visibility:hidden;">' + buildCV() + '</div>';

  // Status bar
  html += '<div class="word-statusbar">';
  html += '  <div class="word-statusbar-left"><span id="word-page-indicator">Page 1 of 1</span></div>';
  html += '  <div class="word-statusbar-center"><span>Words: ' + wordCount + '</span></div>';
  html += '  <div class="word-statusbar-right">';
  html += '    <span>English (Australia)</span>';
  html += '    <span>100%</span>';
  html += '  </div>';
  html += '</div>';

  document.getElementById('app').innerHTML = html;

  /* ── Pagination ── */

  (function paginate() {
    var PAGE_HEIGHT = 1056;
    var PAD_TOP = 96;
    var PAD_BOTTOM = 96;
    var CONTENT_HEIGHT = PAGE_HEIGHT - PAD_TOP - PAD_BOTTOM; // 864px usable

    var pageArea = document.querySelector('.word-page-area');
    var measurer = document.getElementById('word-measurer');
    if (!pageArea || !measurer) return;

    // Collect all direct children and their measured heights
    var children = Array.prototype.slice.call(measurer.children);
    var entries = [];
    children.forEach(function (child) {
      var style = window.getComputedStyle(child);
      var h = child.offsetHeight;
      h += parseInt(style.marginTop) || 0;
      h += parseInt(style.marginBottom) || 0;
      entries.push({ el: child, height: h });
    });

    // Distribute into pages
    var pages = [[]];
    var pageFill = [0];

    entries.forEach(function (entry) {
      var lastIdx = pages.length - 1;
      if (pageFill[lastIdx] > 0 && (pageFill[lastIdx] + entry.height) > CONTENT_HEIGHT) {
        pages.push([]);
        pageFill.push(0);
        lastIdx++;
      }
      pages[lastIdx].push(entry.el);
      pageFill[lastIdx] += entry.height;
    });

    // Build page elements
    pages.forEach(function (pageChildren) {
      var page = document.createElement('div');
      page.className = 'word-page';
      pageChildren.forEach(function (child) {
        page.appendChild(child);
      });
      pageArea.appendChild(page);
    });

    // Remove measurer
    measurer.remove();

    var pageCount = pages.length;
    var indicator = document.getElementById('word-page-indicator');
    if (indicator) {
      indicator.textContent = 'Page 1 of ' + pageCount;
    }

    // Update page indicator on scroll
    if (pageCount > 1) {
      pageArea.addEventListener('scroll', function () {
        var scrollTop = pageArea.scrollTop;
        var pageWithGap = PAGE_HEIGHT + 24;
        var idx = Math.min(Math.floor(scrollTop / pageWithGap) + 1, pageCount);
        if (indicator) {
          indicator.textContent = 'Page ' + idx + ' of ' + pageCount;
        }
      });
    }
  })();

  /* ── Tab switching ── */

  function handleTabClick(e) {
    var tab = e.target.getAttribute('data-tab');
    if (!tab) return;

    var allTabs = document.querySelectorAll('.word-ribbon-tab');
    allTabs.forEach(function (t) { t.classList.remove('active'); });
    e.target.classList.add('active');

    var content = document.querySelector('.word-ribbon-content');
    if (content) {
      content.innerHTML = buildRibbonContent(tab);
    }
  }

  var tabContainer = document.querySelector('.word-ribbon-tabs');
  if (tabContainer) {
    tabContainer.addEventListener('click', handleTabClick);
  }

  /* ── Cleanup ── */

  window.__themeCleanup = function () {
    document.body.classList.remove('corporate', 'no-flicker');
    document.documentElement.style.removeProperty('--crt-intensity');
    if (tabContainer) {
      tabContainer.removeEventListener('click', handleTabClick);
    }
  };
})();
