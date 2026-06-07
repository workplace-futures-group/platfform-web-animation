/*
 * homehero — HOME page only. Nav starts as a strip just below the full-screen
 * hero and slides up to stick at the top on scroll. A single PLATFFORM logo
 * starts big & white in the hero's bottom-right and, scrubbed by scroll,
 * travels up-left + scales down + flips white->black via a TWO-TONE clip at the
 * nav bar's edge (white over the hero, black on the white bar), docking into
 * the nav's logo slot. Nav links fade in as it docks. Other pages keep the
 * site-wide fixed white nav (16-stickynav). Home-gated; scroll-scrubbed.
 */
(function () {
  if (location.pathname.length > 1) return;              // home only
  var hero = document.querySelector('.pf-hero');
  var nav = document.querySelector('.pf-nav');
  if (!hero || !nav || nav.dataset.hh) return;
  var src = nav.querySelector('.pf-lsvg') || nav.querySelector('svg');
  if (!src) return;
  nav.dataset.hh = '1';

  // nav -> sticky strip directly after the hero (overrides the site-wide fixed rule)
  if (hero.nextElementSibling !== nav) hero.parentNode.insertBefore(nav, hero.nextSibling);
  nav.style.setProperty('position', 'sticky', 'important');
  nav.style.setProperty('top', '0', 'important');
  nav.style.setProperty('z-index', '1000', 'important');
  nav.style.fontFamily = 'Gotham, sans-serif';   // moving the nav out to body-level drops the inherited Gotham -> set it back
  var navLogo = nav.querySelector('.pf-logo');
  if (navLogo) navLogo.style.visibility = 'hidden';       // the traveling logo replaces it
  var links = nav.querySelector('.pf-nav-links');

  // traveling logo: white base + black overlay (black clipped to the nav bar band)
  var W = document.createElement('div');
  W.id = 'hh-logo';
  W.style.cssText = 'position:fixed;z-index:1001;cursor:pointer;will-change:left,top,width';
  // click the logo -> eased scroll (600ms, ease-in-out) to the first section after the hero
  function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
  function glideTo(targetY, dur) {
    var startY = scrollY, dist = targetY - startY, t0 = null;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      scrollTo(0, startY + dist * easeInOut(p));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  W.addEventListener('click', function () {
    var t = nav.nextElementSibling || hero.nextElementSibling;
    if (!t) return;
    var navH = nav.getBoundingClientRect().height;
    glideTo(scrollY + t.getBoundingClientRect().top - navH, 600);
  });
  var white = src.cloneNode(true);
  white.removeAttribute('class');
  white.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:auto;display:block;color:#fff;fill:#fff';
  var black = src.cloneNode(true);
  black.removeAttribute('class');
  black.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:auto;display:block;color:#1A1A1A;fill:#1A1A1A';
  W.appendChild(white);
  W.appendChild(black);
  document.body.appendChild(W);

  var ASPECT = 1610.4 / 177.6;          // logo wordmark aspect ratio
  var DOCK = { x: 40, y: 26, w: 199 };  // docked logo slot (matches the nav logo)
  function lerp(a, b, t) { return a + (b - a) * t; }

  function R() {
    var vh = innerHeight, vw = innerWidth;
    var heroH = hero.getBoundingClientRect().height || vh;
    var p = scrollY / heroH; p = p < 0 ? 0 : p > 1 ? 1 : p;
    var bigW = Math.min(vw * 0.46, 620);
    var w = lerp(bigW, DOCK.w, p);
    var h = w / ASPECT;
    var bigH = bigW / ASPECT;
    var x = lerp(vw - bigW - 48, DOCK.x, p);
    var y = lerp(vh - bigH - 48, DOCK.y, p);
    W.style.width = w + 'px'; W.style.left = x + 'px'; W.style.top = y + 'px';
    white.style.filter = 'drop-shadow(0 1px 14px rgba(0,0,0,' + (0.35 * (1 - p)) + '))';  // shadow on the white hero logo, gone by the time it docks black
    // two-tone: show the black layer only where the logo overlaps the nav bar band
    var nr = nav.getBoundingClientRect();
    var topIn = Math.min(Math.max(nr.top - y, 0), h);
    var botIn = Math.min(Math.max((y + h) - nr.bottom, 0), h);
    black.style.clipPath = 'inset(' + topIn + 'px 0px ' + botIn + 'px 0px)';
    if (links) links.style.opacity = p < 0.5 ? 0 : (p - 0.5) / 0.5;
  }
  R();
  addEventListener('scroll', R, { passive: true });
  addEventListener('resize', R);
})();
