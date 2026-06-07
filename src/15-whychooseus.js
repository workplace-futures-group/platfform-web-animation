/*
 * whychooseus — About page. "WHY CHOOSE US" scrollytelling accordion.
 * DESKTOP/TABLET: heading sticky LEFT, items RIGHT; the section PINS and each
 * item expands ONE AT A TIME on scroll (two-tone). MOBILE (<=767): no pin, no
 * two-column — a simple TAP-to-expand accordion (revert to the pinned version
 * on phones via window.PF_MOBILE_FULL = true). Item 1 keeps its native
 * paragraph; items 2-5 use placeholder COPY (swap later). About-gated.
 */
(function () {
  if (!/^\/about(\/|$)/.test(location.pathname)) return;
  var hs = [].slice.call(document.querySelectorAll('h2.pf-h2'));
  var h = hs.filter(function (e) { return /why choose/i.test(e.textContent); })[0];
  if (!h) return;
  var split = h.closest('.pf-split');
  if (!split || split.dataset.wc) return; split.dataset.wc = '1';
  var cont = split.closest('.pf-container');
  var titleCol = h.closest('.pf-split-title');
  var bodyCol = split.querySelector('.pf-split-body');
  var items = [].slice.call(bodyCol.querySelectorAll('.pf-list-item'));
  if (!items.length) return;
  var COPY = [null,
    'Seamless management from first brief to final installation.',
    'Aesthetic insight that turns specification into atmosphere.',
    'Clear, prompt answers at every stage of the project.',
    'Rigorous checks that protect your investment and your timeline.'];
  var subs = items.map(function (it, i) {
    var s = it.querySelector('.pf-list-sub');
    if (!s) { s = document.createElement('p'); s.className = 'pf-list-sub'; s.textContent = COPY[i] || ''; it.appendChild(s); }
    return s;
  });
  // collapse every paragraph + prep the expand/collapse transition (shared)
  subs.forEach(function (s) {
    s.style.cssText += ';overflow:hidden;height:0;opacity:0;margin-top:0;transition:height .4s ease,opacity .35s ease,margin-top .4s ease;will-change:height';
  });

  // ---- MOBILE: tap-to-expand accordion (no pin, native stacked layout) ----
  if (window.PF_MOBILE && window.PF_MOBILE()) {
    var cur = -1;
    function setOpen(i) {
      subs.forEach(function (s, j) {
        var on = j === i;
        s.style.height = on ? s.scrollHeight + 'px' : '0';
        s.style.opacity = on ? '1' : '0';
        s.style.marginTop = on ? '10px' : '0';
      });
    }
    items.forEach(function (it, i) {
      var t = it.querySelector('.pf-list-title') || it;
      t.style.cursor = 'pointer';
      it.addEventListener('click', function () { cur = (cur === i) ? -1 : i; setOpen(cur); });
    });
    return;
  }

  // ---- DESKTOP/TABLET: two-column + pinned one-at-a-time scrub ----
  split.style.cssText += ';display:flex;flex-direction:row;flex-wrap:nowrap;align-items:flex-start;justify-content:space-between;gap:0;width:100%';
  titleCol.style.cssText += ';flex:0 0 34%;width:34%;max-width:34%;text-align:left;align-items:flex-start';
  bodyCol.style.cssText += ';flex:0 0 54%;width:54%;max-width:54%';

  var STEP = 40;
  var N = items.length, MAXH = 0, curD = -2;
  var track = document.createElement('div'); track.style.cssText = 'position:relative';
  cont.parentNode.insertBefore(track, cont);
  var pin = document.createElement('div'); pin.style.cssText = 'position:sticky;top:0;height:100vh;display:flex';
  pin.style.alignItems = 'center'; pin.style.alignItems = 'safe center';
  track.appendChild(pin); pin.appendChild(cont);
  cont.style.cssText += ';width:100%';

  function measure() { MAXH = 0; subs.forEach(function (s) { var hh = s.scrollHeight; if (hh > MAXH) MAXH = hh; }); }
  function layout() {
    var padTop = parseFloat(getComputedStyle(items[0]).paddingTop) || 0;
    if (innerWidth <= 991) {
      split.style.flexDirection = 'column'; split.style.alignItems = 'flex-end';
      titleCol.style.flex = 'none'; titleCol.style.width = '100%'; titleCol.style.maxWidth = '100%';
      bodyCol.style.flex = 'none'; bodyCol.style.width = '100%'; bodyCol.style.maxWidth = '100%';
      h.style.marginTop = '0';
    } else {
      split.style.flexDirection = 'row'; split.style.alignItems = 'flex-start';
      titleCol.style.flex = '0 0 34%'; titleCol.style.width = '34%'; titleCol.style.maxWidth = '34%';
      bodyCol.style.flex = '0 0 54%'; bodyCol.style.width = '54%'; bodyCol.style.maxWidth = '54%';
      h.style.marginTop = padTop + 'px';
    }
    measure();
    track.style.height = 'calc(100vh + ' + (N * STEP) + 'vh)';
  }
  function open(i) {
    if (i === curD) return; curD = i;
    subs.forEach(function (s, j) {
      var on = j === i;
      s.style.height = on ? MAXH + 'px' : '0';
      s.style.opacity = on ? '1' : '0';
      s.style.marginTop = on ? '10px' : '0';
    });
  }
  function render() {
    var travel = track.offsetHeight - innerHeight;
    var p = travel > 0 ? -track.getBoundingClientRect().top / travel : 0;
    if (p < 0) { open(-1); return; }
    if (p > 1) p = 1;
    var idx = Math.floor(p * N); if (idx > N - 1) idx = N - 1;
    open(idx);
  }
  layout(); render();
  addEventListener('scroll', render, { passive: true });
  addEventListener('resize', function () { var c = curD; curD = -2; layout(); open(c); render(); });
})();
