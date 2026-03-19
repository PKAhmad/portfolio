// ═══════════════════════════════════════════════════════
//  LANGUAGE SYSTEM
// ═══════════════════════════════════════════════════════

var currentLang = localStorage.getItem('lang') || null;

// Apply chosen language to all data-de / data-en elements
function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);

  // swap all text content
  document.querySelectorAll('[data-de]').forEach(function(el) {
    var text = lang === 'de' ? el.getAttribute('data-de') : el.getAttribute('data-en');
    if (text !== null) el.innerHTML = text;
  });

  // swap placeholders
  document.querySelectorAll('[data-de-placeholder]').forEach(function(el) {
    el.placeholder = lang === 'de'
      ? el.getAttribute('data-de-placeholder')
      : el.getAttribute('data-en-placeholder');
  });

  // update floating switcher button
  var floatBtn = document.getElementById('float-lang-btn');
  if (floatBtn) {
    floatBtn.textContent = lang === 'de' ? '🌐 EN' : '🌐 DE';
    floatBtn.title = lang === 'de' ? 'Switch to English' : 'Zur deutschen Version';
  }

  // update html lang attribute
  document.documentElement.lang = lang;

  // hide popup if visible
  var popup = document.getElementById('lang-popup');
  if (popup) popup.style.display = 'none';
}

// Toggle between DE and EN from the floating button
function toggleLang() {
  setLang(currentLang === 'de' ? 'en' : 'de');
}

// Show the language selection popup
function showLangPopup() {
  var popup = document.getElementById('lang-popup');
  if (popup) popup.style.display = 'flex';
}

// ═══════════════════════════════════════════════════════
//  CREATE POPUP + FLOATING BUTTON (injected into every page)
// ═══════════════════════════════════════════════════════

function buildLangUI() {

  // ── Language selection popup ──
  var popup = document.createElement('div');
  popup.id = 'lang-popup';
  popup.style.cssText = [
    'position:fixed', 'inset:0', 'z-index:9999',
    'display:flex', 'align-items:center', 'justify-content:center',
    'background:rgba(0,0,0,0.85)', 'backdrop-filter:blur(8px)'
  ].join(';');

  popup.innerHTML = [
    '<div style="',
      'background:#13131a;',
      'border:1px solid #25253a;',
      'border-radius:16px;',
      'padding:48px 40px;',
      'text-align:center;',
      'max-width:420px;',
      'width:90%;',
      'box-shadow:0 24px 60px rgba(0,0,0,0.6)',
    '">',
      '<div style="font-family:\'IBM Plex Mono\',monospace;font-size:12px;color:#6c63ff;letter-spacing:3px;text-transform:uppercase;margin-bottom:12px">Language / Sprache</div>',
      '<h2 style="font-family:\'Syne\',sans-serif;font-size:26px;font-weight:800;color:#e8e8f2;margin-bottom:8px;letter-spacing:-0.5px">Willkommen / Welcome</h2>',
      '<p style="font-size:14px;color:#7070a0;margin-bottom:36px;line-height:1.6">',
        'Bitte wählen Sie Ihre Sprache.<br>Please select your language.',
      '</p>',
      '<div style="display:flex;gap:14px;justify-content:center">',

        // DE button
        '<button onclick="setLang(\'de\')" style="',
          'flex:1;max-width:160px;',
          'background:#13131a;',
          'border:2px solid #00d4aa;',
          'border-radius:10px;',
          'color:#e8e8f2;',
          'font-family:\'Syne\',sans-serif;',
          'font-size:15px;font-weight:700;',
          'padding:18px 20px;',
          'cursor:pointer;',
          'transition:all .2s;',
        '"',
        ' onmouseover="this.style.background=\'rgba(0,212,170,0.1)\'"',
        ' onmouseout="this.style.background=\'#13131a\'"',
        '>',
          '<div style="font-size:28px;margin-bottom:8px">🇩🇪</div>',
          'Deutsch',
        '</button>',

        // EN button
        '<button onclick="setLang(\'en\')" style="',
          'flex:1;max-width:160px;',
          'background:#13131a;',
          'border:2px solid #6c63ff;',
          'border-radius:10px;',
          'color:#e8e8f2;',
          'font-family:\'Syne\',sans-serif;',
          'font-size:15px;font-weight:700;',
          'padding:18px 20px;',
          'cursor:pointer;',
          'transition:all .2s;',
        '"',
        ' onmouseover="this.style.background=\'rgba(108,99,255,0.1)\'"',
        ' onmouseout="this.style.background=\'#13131a\'"',
        '>',
          '<div style="font-size:28px;margin-bottom:8px">🇬🇧</div>',
          'English',
        '</button>',

      '</div>',
    '</div>'
  ].join('');

  document.body.appendChild(popup);

  // ── Floating language switcher button (always visible) ──
  var floatBtn = document.createElement('button');
  floatBtn.id = 'float-lang-btn';
  floatBtn.textContent = '🌐 EN';
  floatBtn.title = 'Switch to English';
  floatBtn.onclick = toggleLang;
  floatBtn.style.cssText = [
    'position:fixed',
    'bottom:28px',
    'right:28px',
    'z-index:8888',
    'background:#13131a',
    'border:1px solid #25253a',
    'border-radius:50px',
    'color:#e8e8f2',
    'font-family:\'Syne\',sans-serif',
    'font-size:13px',
    'font-weight:700',
    'padding:10px 18px',
    'cursor:pointer',
    'box-shadow:0 4px 20px rgba(0,0,0,0.4)',
    'transition:all .2s',
    'display:flex',
    'align-items:center',
    'gap:6px'
  ].join(';');

  floatBtn.onmouseover = function() {
    this.style.borderColor = 'var(--accent2)';
    this.style.color = 'var(--accent2)';
    this.style.transform = 'translateY(-2px)';
  };
  floatBtn.onmouseout = function() {
    this.style.borderColor = '#25253a';
    this.style.color = '#e8e8f2';
    this.style.transform = 'translateY(0)';
  };

  document.body.appendChild(floatBtn);
}

// ═══════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {

  // Build popup and float button on every page
  buildLangUI();

  // If no language chosen yet → show popup
  // If already chosen → apply it directly, no popup
  if (!currentLang) {
    showLangPopup();
  } else {
    setLang(currentLang);
  }

  // ── Fade-in on scroll ───────────────────────────────
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(function(el) { observer.observe(el); });

  // ── Skill bars ──────────────────────────────────────
  var barObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var bar = entry.target.querySelector('.skill-bar-inner');
        if (bar) bar.style.width = bar.getAttribute('data-width');
        barObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skill-bar-wrap').forEach(function(el) { barObs.observe(el); });

  // ── Active nav link ─────────────────────────────────
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function(link) {
    if (link.getAttribute('href') === page) link.classList.add('active');
  });

  // ── Contact form ────────────────────────────────────
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var n = document.getElementById('fname').value.trim();
      var m = document.getElementById('femail').value.trim();
      var t = document.getElementById('fmessage').value.trim();
      if (!n || !m || !t) {
        showFormMsg(currentLang === 'de' ? 'Bitte alle Felder ausfüllen.' : 'Please fill in all fields.', 'error');
        return;
      }
      if (!m.includes('@')) {
        showFormMsg(currentLang === 'de' ? 'Bitte eine gültige E-Mail eingeben.' : 'Please enter a valid email.', 'error');
        return;
      }
      showFormMsg(currentLang === 'de' ? 'Nachricht gesendet! Ich melde mich bald.' : 'Message sent! I will get back to you soon.', 'success');
      form.reset();
    });
  }

  function showFormMsg(text, type) {
    var old = document.getElementById('formMsg');
    if (old) old.remove();
    var msg = document.createElement('div');
    msg.id = 'formMsg';
    msg.textContent = text;
    msg.style.cssText = 'padding:12px 18px;border-radius:8px;font-size:14px;margin-top:12px;'
      + (type === 'success'
        ? 'background:rgba(0,212,170,0.12);color:#00d4aa;border:1px solid rgba(0,212,170,0.3);'
        : 'background:rgba(255,80,80,0.12);color:#ff6b6b;border:1px solid rgba(255,80,80,0.3);');
    document.getElementById('contactForm').appendChild(msg);
    setTimeout(function() { msg.remove(); }, 4000);
  }

  // ── Typing effect ───────────────────────────────────
  var typingEl = document.getElementById('typingText');
  if (typingEl) {
    var words = ['Anwendungsentwicklung', 'Systemintegration', 'Web Development', 'IT Solutions'];
    var wi = 0, ci = 0, del = false;
    function type() {
      var w = words[wi];
      if (!del) {
        typingEl.textContent = w.substring(0, ci + 1);
        ci++;
        if (ci === w.length) { del = true; setTimeout(type, 1800); return; }
      } else {
        typingEl.textContent = w.substring(0, ci - 1);
        ci--;
        if (ci === 0) { del = false; wi = (wi + 1) % words.length; }
      }
      setTimeout(type, del ? 60 : 100);
    }
    type();
  }

});
