/* QuantumLeap Farm - Read Aloud
   Adds a floating "Read aloud" button + small control panel to any page.
   Uses the browser's built-in text-to-speech (no libraries, no internet needed).
   Follows the page language set by i18n.js (en / ny / bem).
   Save as: Home/js/screenreader.js */
(function () {
  'use strict';

  if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') return;

  var synth = window.speechSynthesis;
  var ROOT_ID = 'ql-reader';

  /* ---------- Button/panel wording (edit freely) ----------
     Bemba (bem) falls back to English until you add words.
     Please have a Chinyanja / Icibemba speaker check these. */
  var EN = {
    toggle: 'Read aloud',
    region: 'Read aloud controls',
    play: 'Read page',
    pause: 'Pause',
    resume: 'Resume',
    stop: 'Stop',
    speed: 'Speed',
    volume: 'Volume',
    reading: 'Reading…',
    paused: 'Paused.',
    stopped: 'Stopped.',
    done: 'Finished reading.',
    nothing: 'There is no text to read on this page.',
    fallback: 'No voice for this language was found on this device, so an English voice is being used.'
  };
  var LABELS = {
    en: EN,
    ny: {
      toggle: 'Werengani mokweza',
      region: 'Zowongolera kuwerenga mokweza',
      play: 'Werengani tsamba',
      pause: 'Imani kaye',
      resume: 'Pitirizani',
      stop: 'Imani',
      speed: 'Liwiro',
      volume: 'Phokoso',
      reading: 'Ikuwerenga…',
      paused: 'Yayima kaye.',
      stopped: 'Yayima.',
      done: 'Yatha kuwerenga.',
      nothing: 'Palibe zolemba zoti ziwerengedwe patsamba lino.',
      fallback: EN.fallback
    },
    bem: EN
  };

  /* ---------- State ---------- */
  var chunks = [];
  var index = 0;
  var session = 0;            // bumps on every start/pause/stop so stale callbacks are ignored
  var state = 'idle';         // idle | playing | paused
  var rate = 1;
  var volume = 1;
  var ui = {};

  try {
    var r = parseFloat(localStorage.getItem('ql-read-rate')); if (r >= 0.6 && r <= 2) rate = r;
    var v = parseFloat(localStorage.getItem('ql-read-volume')); if (v >= 0.1 && v <= 1) volume = v;
  } catch (e) {}

  function lang() {
    var l = (document.documentElement.lang || 'en').toLowerCase();
    return l.split('-')[0];
  }
  function t(key) {
    var set = LABELS[lang()] || EN;
    return set[key] || EN[key];
  }

  /* ---------- Collect the readable text ---------- */
  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, SVG: 1, IFRAME: 1, VIDEO: 1, AUDIO: 1, CANVAS: 1, SELECT: 1, TEXTAREA: 1, INPUT: 1, TEMPLATE: 1 };
  var BLOCK = /^(ADDRESS|ARTICLE|ASIDE|BLOCKQUOTE|BUTTON|DD|DIV|DL|DT|FIELDSET|FIGCAPTION|FIGURE|FOOTER|FORM|H[1-6]|HEADER|LI|MAIN|NAV|OL|P|SECTION|TABLE|TR|TD|TH|UL|LABEL|BR)$/;

  function isVisible(el) {
    if (el.hidden || el.getAttribute('aria-hidden') === 'true') return false;
    var cs = window.getComputedStyle(el);
    return cs.display !== 'none' && cs.visibility !== 'hidden';
  }

  function collect() {
    var parts = [];
    var buf = '';

    function flush() {
      var s = buf.replace(/\s+/g, ' ').trim();
      buf = '';
      if (!s) return;
      if (!/[.!?:;,]$/.test(s)) s += '.';
      parts.push(s);
    }

    function walk(node) {
      if (node.nodeType === 3) { buf += node.nodeValue; return; }
      if (node.nodeType !== 1) return;
      if (SKIP[node.tagName.toUpperCase()] || node.id === ROOT_ID || !isVisible(node)) return;

      if (node.tagName === 'IMG') {
        var alt = (node.getAttribute('alt') || '').trim();
        if (alt) { flush(); buf = alt; flush(); }
        return;
      }

      var block = BLOCK.test(node.tagName);
      if (block) flush();
      for (var c = node.firstChild; c; c = c.nextSibling) walk(c);
      if (block) flush();
    }

    var roots = document.querySelectorAll('main, footer');
    if (!roots.length) roots = [document.body];
    Array.prototype.forEach.call(roots, walk);
    flush();
    return parts;
  }

  /* Split into short pieces: long utterances get cut off in Chrome/Android. */
  function toChunks(parts) {
    var out = [];
    var MAX = 200;
    parts.forEach(function (p) {
      var sentences = p.match(/[^.!?]+[.!?]*\s*/g) || [p];
      var cur = '';
      sentences.forEach(function (s) {
        s = s.trim();
        if (!s) return;
        if (s.length > MAX) {
          if (cur) { out.push(cur); cur = ''; }
          var words = s.split(' '), line = '';
          words.forEach(function (w) {
            if ((line + ' ' + w).length > MAX && line) { out.push(line); line = w; }
            else line = line ? line + ' ' + w : w;
          });
          if (line) out.push(line);
        } else if ((cur + ' ' + s).length > MAX && cur) {
          out.push(cur); cur = s;
        } else {
          cur = cur ? cur + ' ' + s : s;
        }
      });
      if (cur) out.push(cur);
    });
    return out;
  }

  /* ---------- Voices ---------- */
  function pickVoice(code) {
    var voices = synth.getVoices() || [];
    var i;
    for (i = 0; i < voices.length; i++) {
      if ((voices[i].lang || '').toLowerCase().indexOf(code) === 0) return { voice: voices[i], exact: true };
    }
    if (code !== 'en') {
      for (i = 0; i < voices.length; i++) {
        if (/^en(-|_)(gb|za|zw|ke|ng)/i.test(voices[i].lang)) return { voice: voices[i], exact: false };
      }
      for (i = 0; i < voices.length; i++) {
        if (/^en/i.test(voices[i].lang)) return { voice: voices[i], exact: false };
      }
    }
    return { voice: null, exact: code === 'en' };
  }

  /* ---------- Playback ---------- */
  function speakCurrent() {
    var my = session;
    if (index >= chunks.length) {
      state = 'idle'; index = 0; session++;
      render(); status(t('done'));
      return;
    }
    var u = new SpeechSynthesisUtterance(chunks[index]);
    var pick = pickVoice(lang());
    if (pick.voice) { u.voice = pick.voice; u.lang = pick.voice.lang; }
    else u.lang = 'en-GB';
    u.rate = rate;
    u.volume = volume;
    u.onend = function () {
      if (my !== session || state !== 'playing') return;
      index++;
      speakCurrent();
    };
    u.onerror = function (e) {
      if (my !== session) return;
      if (e && (e.error === 'canceled' || e.error === 'interrupted')) return;
      index++;
      speakCurrent();
    };
    synth.speak(u);
  }

  function start() {
    synth.cancel();
    session++;
    chunks = toChunks(collect());
    index = 0;
    if (!chunks.length) { state = 'idle'; render(); status(t('nothing')); return; }
    state = 'playing';
    render();
    var pick = pickVoice(lang());
    status(pick.exact ? t('reading') : t('fallback'));
    speakCurrent();
  }

  function pause() {
    if (state !== 'playing') return;
    session++;            // ignore the cancel callback
    synth.cancel();
    state = 'paused';
    render(); status(t('paused'));
  }

  function resume() {
    if (state !== 'paused') return;
    state = 'playing';
    session++;
    render(); status(t('reading'));
    speakCurrent();
  }

  function stop(silent) {
    session++;
    synth.cancel();
    var was = state;
    state = 'idle'; index = 0;
    render();
    if (!silent && was !== 'idle') status(t('stopped'));
  }

  /* ---------- Interface ---------- */
  function status(msg) { if (ui.status) ui.status.textContent = msg; }

  function render() {
    if (!ui.root) return;
    ui.toggleText.textContent = t('toggle');
    ui.root.setAttribute('aria-label', t('region'));
    ui.play.textContent = t('play');
    ui.pause.textContent = state === 'paused' ? t('resume') : t('pause');
    ui.stop.textContent = t('stop');
    ui.speedLabel.textContent = t('speed');
    ui.volumeLabel.textContent = t('volume');
    ui.pause.disabled = state === 'idle';
    ui.stop.disabled = state === 'idle';
  }

  function injectStyles() {
    var css =
      '#ql-reader{position:fixed;left:14px;bottom:14px;z-index:9999;font-family:Roboto,Arial,Helvetica,sans-serif;font-size:15px;line-height:1.3;color:#1b1b1b}' +
      '#ql-reader *{box-sizing:border-box}' +
      '#ql-reader button{font:inherit;cursor:pointer;border:2px solid #1b5e20;border-radius:8px;padding:9px 14px;background:#2e7d32;color:#fff}' +
      '#ql-reader button:hover:not(:disabled){background:#1b5e20}' +
      '#ql-reader button:disabled{opacity:.5;cursor:not-allowed}' +
      '#ql-reader button:focus-visible,#ql-reader input:focus-visible{outline:3px solid #ffb300;outline-offset:2px}' +
      '#ql-reader .ql-toggle{border-radius:999px;box-shadow:0 2px 8px rgba(0,0,0,.3)}' +
      '#ql-reader .ql-panel{margin-bottom:10px;padding:12px;background:#fff;border:2px solid #2e7d32;border-radius:12px;box-shadow:0 4px 14px rgba(0,0,0,.25);width:min(290px,calc(100vw - 28px))}' +
      '#ql-reader .ql-panel[hidden]{display:none}' +
      '#ql-reader .ql-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px}' +
      '#ql-reader .ql-row button{flex:1 1 auto}' +
      '#ql-reader .ql-speed{display:flex;align-items:center;gap:10px}' +
      '#ql-reader .ql-speed label{min-width:56px}#ql-reader .ql-speed input{flex:1;min-width:0}' +
      '#ql-reader .ql-status{margin:10px 0 0;min-height:1.3em;font-size:13px;color:#333}' +
      '@media print{#ql-reader{display:none}}';
    var s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
  }

  function build() {
    injectStyles();

    var root = document.createElement('div');
    root.id = ROOT_ID;
    root.setAttribute('role', 'region');

    root.innerHTML =
      '<div class="ql-panel" id="ql-panel" hidden>' +
        '<div class="ql-row">' +
          '<button type="button" data-act="play"></button>' +
          '<button type="button" data-act="pause"></button>' +
          '<button type="button" data-act="stop"></button>' +
        '</div>' +
        '<div class="ql-speed">' +
          '<label for="ql-rate"></label>' +
          '<input id="ql-rate" type="range" min="0.6" max="2" step="0.1">' +
        '</div>' +
        '<div class="ql-speed" style="margin-top:8px">' +
          '<label for="ql-volume"></label>' +
          '<input id="ql-volume" type="range" min="0.1" max="1" step="0.1">' +
        '</div>' +
        '<p class="ql-status" role="status" aria-live="polite"></p>' +
      '</div>' +
      '<button type="button" class="ql-toggle" aria-expanded="false" aria-controls="ql-panel">' +
        '<span aria-hidden="true">\uD83D\uDD0A </span><span class="ql-toggle-text"></span>' +
      '</button>';

    document.body.appendChild(root);

    ui.root = root;
    ui.panel = root.querySelector('.ql-panel');
    ui.toggle = root.querySelector('.ql-toggle');
    ui.toggleText = root.querySelector('.ql-toggle-text');
    ui.play = root.querySelector('[data-act="play"]');
    ui.pause = root.querySelector('[data-act="pause"]');
    ui.stop = root.querySelector('[data-act="stop"]');
    ui.speedLabel = root.querySelector('label[for="ql-rate"]');
    ui.rate = root.querySelector('#ql-rate');
    ui.volumeLabel = root.querySelector('label[for="ql-volume"]');
    ui.volume = root.querySelector('#ql-volume');
    ui.status = root.querySelector('.ql-status');

    ui.rate.value = rate;
    ui.volume.value = volume;

    ui.toggle.addEventListener('click', function () {
      var open = ui.panel.hidden;
      ui.panel.hidden = !open;
      ui.toggle.setAttribute('aria-expanded', String(open));
      if (open) ui.play.focus();
    });
    ui.play.addEventListener('click', start);
    ui.pause.addEventListener('click', function () { state === 'paused' ? resume() : pause(); });
    ui.stop.addEventListener('click', function () { stop(false); });
    ui.rate.addEventListener('input', function () {
      rate = parseFloat(ui.rate.value) || 1;
      try { localStorage.setItem('ql-read-rate', String(rate)); } catch (e) {}
      ui.rate.setAttribute('aria-valuetext', rate + 'x');
    });

    ui.volume.addEventListener('input', function () {
      volume = parseFloat(ui.volume.value) || 1;
      try { localStorage.setItem('ql-read-volume', String(volume)); } catch (e) {}
      ui.volume.setAttribute('aria-valuetext', Math.round(volume * 100) + '%');
    });

    /* Esc closes the panel and stops speech */
    root.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        stop(true);
        ui.panel.hidden = true;
        ui.toggle.setAttribute('aria-expanded', 'false');
        ui.toggle.focus();
      }
    });

    render();
  }

  function init() {
    build();

    /* If the visitor switches language (i18n.js changes <html lang>), stop and re-label */
    new MutationObserver(function () { stop(true); status(''); render(); })
      .observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

    window.addEventListener('pagehide', function () { synth.cancel(); });
    synth.getVoices(); // warm up the voice list
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();