(function () {
  var D = window.DATA;

  document.body.classList.add("corporate", "no-flicker");
  document.documentElement.style.setProperty("--crt-intensity", "0.4");

  /* ── Helpers ── */

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function countWords() {
    var text = "";
    if (D.bio) text += D.bio.join(" ") + " ";
    if (D.skills)
      D.skills.forEach(function (g) {
        text += g.group + " " + g.tags.join(" ") + " ";
      });
    if (D.experience)
      D.experience.forEach(function (e) {
        text += e.title + " " + e.body + " ";
      });
    text += (D.name || "") + " " + (D.title || "") + " " + (D.location || "");
    return text
      .trim()
      .split(/\s+/)
      .filter(function (w) {
        return w.length > 0;
      }).length;
  }

  var wordCount = countWords();

  /* ── Ribbon tab data ── */

  var ribbonTabs = ["Home", "Insert", "Layout", "Review", "View"];

  function buildRibbonContent(tab) {
    if (tab === "Home") {
      return (
        "" +
        '<div class="word-ribbon-group">' +
        '<div class="word-ribbon-group-buttons">' +
        '<button class="ribbon-btn bold-btn" title="Bold">B</button>' +
        '<button class="ribbon-btn italic-btn" title="Italic">I</button>' +
        '<button class="ribbon-btn underline-btn" title="Underline">U</button>' +
        "</div>" +
        '<div class="word-ribbon-group-label">Font</div>' +
        "</div>" +
        '<div class="word-ribbon-group">' +
        '<div class="word-ribbon-group-buttons">' +
        '<button class="ribbon-btn" title="Align Left">\u2261</button>' +
        '<button class="ribbon-btn" title="Center">\u2263</button>' +
        '<button class="ribbon-btn" title="Align Right">\u2261</button>' +
        '<button class="ribbon-btn" title="Justify">\u2630</button>' +
        "</div>" +
        '<div class="word-ribbon-group-label">Paragraph</div>' +
        "</div>" +
        '<div class="word-ribbon-group">' +
        '<div class="word-ribbon-group-buttons">' +
        '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">Aa</span>Normal</button>' +
        '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">Aa</span>Heading 1</button>' +
        '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">Aa</span>Heading 2</button>' +
        '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">Aa</span>Title</button>' +
        "</div>" +
        '<div class="word-ribbon-group-label">Styles</div>' +
        "</div>"
      );
    }
    if (tab === "Insert") {
      return (
        "" +
        '<div class="word-ribbon-group">' +
        '<div class="word-ribbon-group-buttons">' +
        '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u25A3</span>Table</button>' +
        '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u25BC</span>Picture</button>' +
        '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u2197</span>Shapes</button>' +
        "</div>" +
        '<div class="word-ribbon-group-label">Tables &amp; Illustrations</div>' +
        "</div>" +
        '<div class="word-ribbon-group">' +
        '<div class="word-ribbon-group-buttons">' +
        '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">#</span>Header</button>' +
        '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">_</span>Footer</button>' +
        '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u2116</span>Page No.</button>' +
        "</div>" +
        '<div class="word-ribbon-group-label">Header &amp; Footer</div>' +
        "</div>"
      );
    }
    if (tab === "Layout") {
      return (
        "" +
        '<div class="word-ribbon-group">' +
        '<div class="word-ribbon-group-buttons">' +
        '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u25EF</span>Margins</button>' +
        '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u2B1C</span>Orientation</button>' +
        '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u25A1</span>Size</button>' +
        "</div>" +
        '<div class="word-ribbon-group-label">Page Setup</div>' +
        "</div>" +
        '<div class="word-ribbon-group">' +
        '<div class="word-ribbon-group-buttons">' +
        '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u2195</span>Spacing</button>' +
        '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u2194</span>Indent</button>' +
        "</div>" +
        '<div class="word-ribbon-group-label">Paragraph</div>' +
        "</div>"
      );
    }
    if (tab === "Review") {
      return (
        "" +
        '<div class="word-ribbon-group">' +
        '<div class="word-ribbon-group-buttons">' +
        '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">ABC</span>Spelling</button>' +
        '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u{1F4D6}</span>Thesaurus</button>' +
        "</div>" +
        '<div class="word-ribbon-group-label">Proofing</div>' +
        "</div>" +
        '<div class="word-ribbon-group">' +
        '<div class="word-ribbon-group-buttons">' +
        '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u270E</span>Track</button>' +
        '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u{1F4AC}</span>Comment</button>' +
        "</div>" +
        '<div class="word-ribbon-group-label">Tracking</div>' +
        "</div>"
      );
    }
    if (tab === "View") {
      return (
        "" +
        '<div class="word-ribbon-group">' +
        '<div class="word-ribbon-group-buttons">' +
        '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u25A1</span>Print</button>' +
        '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u2398</span>Web</button>' +
        '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u2637</span>Outline</button>' +
        "</div>" +
        '<div class="word-ribbon-group-label">Views</div>' +
        "</div>" +
        '<div class="word-ribbon-group">' +
        '<div class="word-ribbon-group-buttons">' +
        '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u2316</span>Ruler</button>' +
        '<button class="ribbon-btn ribbon-btn-large"><span class="ribbon-btn-icon">\u2588</span>Gridlines</button>' +
        "</div>" +
        '<div class="word-ribbon-group-label">Show</div>' +
        "</div>"
      );
    }
    return "";
  }

  /* ── Build ruler ticks ── */

  function buildRuler() {
    // Page is 816px = 8.5 inches at 96dpi
    // Margins are 72px (0.75in) each side
    // Ruler spans full page width, numbers at each inch
    var ticks = "";
    // Margin indicators
    ticks +=
      '<span class="word-ruler-margin" style="left:0;width:72px"></span>';
    ticks +=
      '<span class="word-ruler-margin" style="right:0;width:72px"></span>';
    // Inch numbers (0-8, but we only label inside the content area)
    for (var i = 0; i <= 7; i++) {
      var pos = 72 + i * 96; // start from left margin
      ticks +=
        '<span class="word-ruler-number" style="left:' +
        pos +
        'px">' +
        i +
        "</span>";
    }
    // Half-inch and quarter-inch ticks
    for (var q = 0; q < 34; q++) {
      var x = 72 + q * 24; // quarter-inch = 24px
      if (x > 744) break; // stop at right margin
      var h = 4;
      if (q % 4 === 0) continue; // skip full inches (have numbers)
      if (q % 2 === 0) h = 8; // half-inch ticks are taller
      ticks +=
        '<span class="word-ruler-tick" style="left:' +
        x +
        "px;height:" +
        h +
        'px"></span>';
    }
    return ticks;
  }

  /* ── Build CV content ── */

  function buildCV() {
    var h = "";

    // Name
    h += '<h1 class="cv-name">' + esc(D.name) + "</h1>";
    h += '<p class="cv-handle">' + esc(D.handle) + "</p>";

    // Contact line
    var contactParts = [];
    if (D.location) contactParts.push(esc(D.location));
    if (D.email)
      contactParts.push(
        '<a href="mailto:' + esc(D.email) + '">' + esc(D.email) + "</a>",
      );
    if (D.github)
      contactParts.push(
        '<a href="' + esc(D.github) + '">github.com/ethanmrtn</a>',
      );
    h += '<p class="cv-contact">' + contactParts.join(" | ") + "</p>";

    h += '<hr class="cv-hr">';

    // Opener
    h += '<p class="cv-opener">To Whom It May Concern,</p>';

    // Professional Summary
    h += '<h2 class="cv-section-heading">Professional Summary</h2>';
    h += '<div class="cv-bio">';
    if (D.bio && D.bio.length) {
      D.bio.forEach(function (p) {
        h += "<p>" + p + "</p>";
      });
    }
    h += "</div>";

    // Stats
    if (D.stats && D.stats.length) {
      h += '<div class="cv-stats-row">';
      D.stats.forEach(function (s) {
        h +=
          '<div class="cv-stat">' +
          '<div class="cv-stat-num">' +
          esc(s.num) +
          "</div>" +
          '<div class="cv-stat-label">' +
          esc(s.label) +
          "</div>" +
          "</div>";
      });
      h += "</div>";
    }

    // Technical Skills
    h += '<h2 class="cv-section-heading">Technical Skills</h2>';
    h += '<table class="cv-skills-table">';
    h += "<thead><tr><th>Category</th><th>Technologies</th></tr></thead>";
    h += "<tbody>";
    if (D.skills && D.skills.length) {
      D.skills.forEach(function (g) {
        h +=
          "<tr><th>" +
          esc(g.group) +
          "</th><td>" +
          g.tags.map(esc).join(", ") +
          "</td></tr>";
      });
    }
    h += "</tbody></table>";

    // Professional Experience
    h += '<h2 class="cv-section-heading">Professional Experience</h2>';
    if (D.experience && D.experience.length) {
      D.experience.forEach(function (e) {
        h += '<div class="cv-exp-entry">';
        h += '<p class="cv-exp-title">' + esc(e.title) + "</p>";
        h += '<p class="cv-exp-domain">' + esc(e.domain);
        if (e.tags && e.tags.length) {
          h += " \u2014 " + e.tags.map(esc).join(", ");
        }
        h += "</p>";
        h += '<p class="cv-exp-body">' + e.body + "</p>";
        if (e.link) {
          h +=
            '<p class="cv-exp-link"><a href="' +
            esc(e.link.url) +
            '">' +
            esc(e.link.label) +
            "</a></p>";
        }
        h += "</div>";
      });
    }

    // Contact & Availability
    h +=
      '<br/><br/><br/><br/><br/><br/><h2 class="cv-section-heading">Contact &amp; Availability</h2>';
    h +=
      "<p>For inquiries regarding availability, project proposals, or collaboration opportunities, ";
    h += "please do not hesitate to reach out via the following channels:</p>";
    h += "<p>";
    if (D.email)
      h +=
        'Email: <a href="mailto:' +
        esc(D.email) +
        '">' +
        esc(D.email) +
        "</a><br>";
    if (D.github)
      h +=
        'GitHub: <a href="' + esc(D.github) + '">' + esc(D.github) + "</a><br>";
    if (D.upwork)
      h +=
        'Upwork: <a href="' +
        esc(D.upwork) +
        '">' +
        esc(D.handle) +
        " on Upwork</a>";
    h += "</p>";

    h += '<hr class="cv-hr">';

    // Signature
    h += '<p class="cv-closing">Yours sincerely,</p>';
    h += '<div class="cv-signature">';
    h += '<p class="cv-signature-name">' + esc(D.name) + "</p>";
    h += "<p>" + esc(D.title) + "</p>";
    h += "</div>";

    return h;
  }

  /* ── Assemble full UI ── */

  var html = "";

  // Title bar
  html += '<div class="word-titlebar">';
  html += '  <div class="word-titlebar-left">';
  html += '    <span class="word-titlebar-icon">W</span>';
  html +=
    '    <span class="word-titlebar-title">Document1 - Microsoft Word</span>';
  html += "  </div>";
  html += '  <div class="word-titlebar-right">';
  html +=
    '    <span class="word-titlebar-btn minimize" title="Minimize">\u2014</span>';
  html +=
    '    <span class="word-titlebar-btn maximize" title="Maximize">\u25A1</span>';
  html +=
    '    <span class="word-titlebar-btn close" title="Close">\u2715</span>';
  html += "  </div>";
  html += "</div>";

  // Ribbon
  html += '<div class="word-ribbon">';
  html += '  <div class="word-ribbon-tabs">';
  ribbonTabs.forEach(function (t, i) {
    html +=
      '<span class="word-ribbon-tab' +
      (i === 0 ? " active" : "") +
      '" data-tab="' +
      t +
      '">' +
      t +
      "</span>";
  });
  html += "  </div>";
  html +=
    '  <div class="word-ribbon-content">' +
    buildRibbonContent("Home") +
    "</div>";
  html += "</div>";

  // Ruler
  html +=
    '<div class="word-ruler"><div class="word-ruler-inner">' +
    buildRuler() +
    "</div></div>";

  // Page area — static pages
  html += '<div class="word-page-area" id="word-page-area">';
  html += '<div class="word-page" id="word-page">' + buildCV() + "</div>";
  html += "</div>";

  // Status bar
  html += '<div class="word-statusbar">';
  html +=
    '  <div class="word-statusbar-left"><span id="word-page-indicator">Page 1 of 1</span></div>';
  html +=
    '  <div class="word-statusbar-center"><span>Words: ' +
    wordCount +
    "</span></div>";
  html += '  <div class="word-statusbar-right">';
  html += "    <span>English (Australia)</span>";
  html += "    <span>100%</span>";
  html += "  </div>";
  html += "</div>";

  document.getElementById("app").innerHTML = html;

  /* ── Multi-page layout ── */

  var pageArea = document.getElementById("word-page-area");
  var thePage = document.getElementById("word-page");
  var indicator = document.getElementById("word-page-indicator");
  var PAGE_H = 1250;
  var PAD_T = 96;
  var PAD_B = 96;
  var USABLE = PAGE_H - PAD_T - PAD_B; // 864px usable per page

  function splitPages() {
    if (!thePage || !pageArea) return;

    // Collect all top-level children from the initial page
    var children = Array.prototype.slice.call(thePage.childNodes);
    var pages = [];
    var currentPage = document.createElement("div");
    currentPage.className = "word-page";
    var usedHeight = 0;

    // Use a hidden measurer to get element heights in page context
    var measurer = document.createElement("div");
    measurer.className = "word-page";
    measurer.style.position = "absolute";
    measurer.style.visibility = "hidden";
    measurer.style.left = "-9999px";
    measurer.style.padding = "0 72px"; // keep horizontal padding for width, zero vertical
    pageArea.appendChild(measurer);

    children.forEach(function (child) {
      // Clone and measure
      var clone = child.cloneNode(true);
      measurer.innerHTML = "";
      measurer.appendChild(clone);
      var h = clone.offsetHeight;
      // Include margins
      var style = window.getComputedStyle(clone);
      h += parseInt(style.marginTop) + parseInt(style.marginBottom);

      if (usedHeight + h > USABLE && usedHeight > 0) {
        // Start a new page
        pages.push(currentPage);
        currentPage = document.createElement("div");
        currentPage.className = "word-page";
        usedHeight = 0;
      }

      currentPage.appendChild(child);
      usedHeight += h;
    });

    // Push last page
    if (currentPage.childNodes.length > 0) {
      pages.push(currentPage);
    }

    measurer.remove();

    // Replace page area contents
    pageArea.innerHTML = "";
    pages.forEach(function (p) {
      p.setAttribute("contenteditable", "true");
      p.setAttribute("spellcheck", "false");
      // Allow select + format but block typing/pasting/deleting
      p.addEventListener("keydown", function (e) {
        if (e.ctrlKey || e.metaKey) return; // allow Ctrl/Cmd shortcuts
        e.preventDefault();
      });
      p.addEventListener("paste", function (e) {
        e.preventDefault();
      });
      p.addEventListener("cut", function (e) {
        e.preventDefault();
      });
      p.addEventListener("drop", function (e) {
        e.preventDefault();
      });
      pageArea.appendChild(p);
    });

    // Update indicator
    if (indicator) {
      indicator.textContent = "Page 1 of " + pages.length;
    }

    // Scroll-based page indicator
    pageArea.addEventListener("scroll", function () {
      var scrollTop = pageArea.scrollTop;
      var currentIdx = Math.min(
        Math.floor(scrollTop / (PAGE_H + 24)) + 1,
        pages.length,
      );
      if (indicator) {
        indicator.textContent = "Page " + currentIdx + " of " + pages.length;
      }
    });
  }

  splitPages();

  /* ── Tab switching ── */

  function handleTabClick(e) {
    var tab = e.target.getAttribute("data-tab");
    if (!tab) return;

    var allTabs = document.querySelectorAll(".word-ribbon-tab");
    allTabs.forEach(function (t) {
      t.classList.remove("active");
    });
    e.target.classList.add("active");

    var content = document.querySelector(".word-ribbon-content");
    if (content) {
      content.innerHTML = buildRibbonContent(tab);
      bindRibbonButtons();
    }
  }

  var tabContainer = document.querySelector(".word-ribbon-tabs");
  if (tabContainer) {
    tabContainer.addEventListener("click", handleTabClick);
  }

  /* ── Ribbon formatting buttons ── */

  function bindRibbonButtons() {
    var ribbon = document.querySelector(".word-ribbon-content");
    if (!ribbon) return;

    ribbon.addEventListener("mousedown", function (e) {
      if (
        e.target.classList.contains("ribbon-btn") ||
        e.target.closest(".ribbon-btn")
      ) {
        e.preventDefault();
      }
    });

    ribbon.addEventListener("click", function (e) {
      var btn = e.target.closest(".ribbon-btn");
      if (!btn) return;
      var title = btn.getAttribute("title");
      if (!title) return;

      switch (title) {
        case "Bold":
          document.execCommand("bold");
          break;
        case "Italic":
          document.execCommand("italic");
          break;
        case "Underline":
          document.execCommand("underline");
          break;
        case "Align Left":
          document.execCommand("justifyLeft");
          break;
        case "Center":
          document.execCommand("justifyCenter");
          break;
        case "Align Right":
          document.execCommand("justifyRight");
          break;
        case "Justify":
          document.execCommand("justifyFull");
          break;
      }
    });
  }

  bindRibbonButtons();

  /* ── Ribbon buttons are decorative (no contenteditable) ── */

  /* ── Keyboard shortcuts (Ctrl/Cmd + B/I) ── */

  function handleKeydown(e) {
    if (!e.ctrlKey && !e.metaKey) return;
    var key = e.key.toLowerCase();
    if (key === "b") {
      e.preventDefault();
      document.execCommand("bold");
    }
    if (key === "i") {
      e.preventDefault();
      document.execCommand("italic");
    }
  }

  document.addEventListener("keydown", handleKeydown);

  /* ── Cleanup ── */

  window.__themeCleanup = function () {
    document.body.classList.remove("corporate", "no-flicker");
    document.documentElement.style.removeProperty("--crt-intensity");
    if (tabContainer) {
      tabContainer.removeEventListener("click", handleTabClick);
    }
    document.removeEventListener("keydown", handleKeydown);
  };
})();
