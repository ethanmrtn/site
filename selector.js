(function () {
  const THEMES = ["terminal", "plain", "ai-slop", "corporate", "retro"];
  const LABELS = ["TERMINAL", "PLAIN", "AI_SLOP", "CORPORATE", "RETRO"];
  const STORAGE_KEY = "portfolio-theme";

  const selector = document.getElementById("selector");
  const app = document.getElementById("app");
  const switchBtn = document.getElementById("theme-switch");
  const themeCssLink = document.getElementById("theme-css");

  let activeIndex = 0;
  let pickerReady = false;
  let optionEls = [];

  // Always show boot sequence on load
  runBoot();

  // Boot sequence
  function runBoot() {
    const lines = [
      'BIOS v3.1.4 ... <span class="ok">[OK]</span>',
      'Loading kernel ............. <span class="ok">[OK]</span>',
      'Mounting /dev/portfolio ..... <span class="ok">[OK]</span>',
      'Initializing display driver . <span class="ok">[OK]</span>',
      'Scanning skill modules ...... <span class="ok">[OK]</span>',
      'Compiling experience ........ <span class="ok">[OK]</span>',
      "GLASSARMS.EXE ready.",
    ];

    let html = "";
    lines.forEach(function (l, i) {
      html += '<div class="boot-line" id="bl' + i + '">' + l + "</div>";
    });
    html +=
      '<div class="boot-bar-wrap" id="bar-wrap"><div class="boot-bar" id="bar"></div></div>';
    html += buildPicker();

    selector.innerHTML = html;
    optionEls = selector.querySelectorAll(".picker-option");
    bindPickerEvents();

    // Timing
    var delays = [100, 400, 700, 1000, 1300, 1500, 1700];
    delays.forEach(function (d, i) {
      setTimeout(function () {
        var el = document.getElementById("bl" + i);
        if (el) el.classList.add("show");
      }, d);
    });

    setTimeout(function () {
      var wrap = document.getElementById("bar-wrap");
      if (wrap) wrap.classList.add("show");
      setTimeout(function () {
        var bar = document.getElementById("bar");
        if (bar) bar.classList.add("fill");
      }, 100);
    }, 1900);

    setTimeout(function () {
      var picker = selector.querySelector(".picker");
      if (picker) {
        picker.classList.add("show");
        pickerReady = true;
        highlightOption(0);
      }
    }, 3600);
  }

  function buildPicker() {
    var h = '<div class="picker">';
    h +=
      '<div class="picker-title">SELECT INTERFACE:<span class="boot-cursor"></span></div>';
    LABELS.forEach(function (label, i) {
      h += '<button class="picker-option" data-index="' + i + '">';
      h += '<span class="key">[' + (i + 1) + "]</span> " + label;
      h += "</button>";
    });
    h +=
      '<div class="picker-hint">Use 1-' + LABELS.length + ', arrow keys + enter, or click to select</div>';
    h += "</div>";
    return h;
  }

  function bindPickerEvents() {
    optionEls.forEach(function (el) {
      el.addEventListener("click", function () {
        selectTheme(parseInt(el.dataset.index));
      });
      el.addEventListener("mouseenter", function () {
        if (pickerReady) highlightOption(parseInt(el.dataset.index));
      });
    });
  }

  function highlightOption(idx) {
    activeIndex = idx;
    optionEls.forEach(function (el, i) {
      el.classList.toggle("active", i === idx);
    });
  }

  // Keyboard
  document.addEventListener("keydown", function (e) {
    if (!pickerReady) return;
    if (selector.classList.contains("hidden")) return;
    if (selector.style.display === "none") return;

    var num = parseInt(e.key);
    if (num >= 1 && num <= THEMES.length) {
      selectTheme(num - 1);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      highlightOption((activeIndex + 1) % THEMES.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      highlightOption((activeIndex + THEMES.length - 1) % THEMES.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      selectTheme(activeIndex);
    }
  });

  function selectTheme(idx) {
    if (idx < 0 || idx >= THEMES.length) return;
    pickerReady = false;
    loadTheme(THEMES[idx]);
  }

  var currentTheme = null;

  function loadTheme(id) {
    localStorage.setItem(STORAGE_KEY, id);
    currentTheme = id;

    // Clean up old theme
    if (window.__themeCleanup) {
      window.__themeCleanup();
      window.__themeCleanup = null;
    }
    app.innerHTML = "";
    app.className = "";
    document.body.classList.remove("no-flicker");

    // Remove old theme script
    var oldScript = document.getElementById("theme-script");
    if (oldScript) oldScript.remove();

    // Set theme CSS
    themeCssLink.href = "themes/" + id + ".css";

    // Load theme JS
    var script = document.createElement("script");
    script.src = "themes/" + id + ".js";
    script.id = "theme-script";
    document.body.appendChild(script);

    // Fade out selector
    selector.classList.add("hidden");
    setTimeout(function () {
      selector.style.display = "none";
    }, 600);

    // Show theme switcher + populate options
    switchBtn.style.display = "flex";
    switchBtn.classList.remove("open");
    buildSwitchOptions();
  }

  // Build the inline theme options
  var optionsContainer = switchBtn.querySelector(".theme-switch-options");
  var tabEl = switchBtn.querySelector(".theme-switch-tab");

  function buildSwitchOptions() {
    var h = "";
    THEMES.forEach(function (id, i) {
      var cls = id === currentTheme ? ' class="active-theme"' : "";
      h += "<button data-theme=\"" + id + "\"" + cls + ">" + LABELS[i] + "</button>";
    });
    optionsContainer.innerHTML = h;

    // Bind click handlers
    optionsContainer.querySelectorAll("button").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var themeId = btn.dataset.theme;
        if (themeId === currentTheme) {
          switchBtn.classList.remove("open");
          return;
        }
        switchBtn.classList.remove("open");
        loadTheme(themeId);
      });
    });
  }

  // Toggle options panel
  tabEl.addEventListener("click", function (e) {
    e.stopPropagation();
    switchBtn.classList.toggle("open");
  });

  // Close when clicking outside
  document.addEventListener("click", function () {
    switchBtn.classList.remove("open");
  });

  switchBtn.addEventListener("click", function (e) {
    e.stopPropagation();
  });
})();
