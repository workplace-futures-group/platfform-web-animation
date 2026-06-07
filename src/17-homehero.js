/*
 * homehero — HOME page, ALL breakpoints. Nav starts as a strip below the
 * full-screen hero and sticks to the top on scroll; a single PLATFFORM logo
 * starts big & white bottom-right and scrubs up-left, scaling down + flipping
 * white->black (two-tone clip at the bar edge) into the nav's logo slot.
 * Big size, margins and the dock target are all derived per-breakpoint so the
 * morph always reads LARGE -> small (incl. mobile, where the nav logo is 16px).
 * On mobile the inline links are the burger menu, so links are NOT faded here.
 */
(function () {
  if (location.pathname.length > 1) return;              // home only
  var hero = document.querySelector('.pf-hero');
  var nav = document.querySelector('.pf-nav');
  if (!hero || !nav || nav.dataset.hh) return;
  var src = nav.querySelector('.pf-lsvg') || nav.querySelector('svg');
  if (!src) return;
  nav.dataset.hh = '1';

  if (hero.nextElementSibling !== nav) hero.parentNode.insertBefore(nav, hero.nextSibling);
  nav.style.setProperty('position', 'sticky', 'important');
  nav.style.setProperty('top', '0', 'important');
  nav.style.setProperty('z-index', '1000', 'important');
  nav.style.fontFamily = 'Gotham, sans-serif';
  var navLogo = nav.querySelector('.pf-logo');
  if (navLogo) navLogo.style.visibility = 'hidden';
  var links = nav.querySelector('.pf-nav-links');

  function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
  function glideTo(targetY, dur) {
    var startY = scrollY, dist = targetY - startY, t0 = null;
    function step(ts) { if (t0 === null) t0 = ts; var p = Math.min(1, (ts - t0) / dur); scrollTo(0, startY + dist * easeInOut(p)); if (p < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }
  var W = document.createElement('div');
  W.id = 'hh-logo';
  W.style.cssText = 'position:fixed;z-index:1001;cursor:pointer;will-change:left,top,width';
  W.addEventListener('click', function () {
    var t = nav.nextElementSibling || hero.nextElementSibling;
    if (!t) return;
    var navH = nav.getBoundingClientRect().height;
    glideTo(scrollY + t.getBoundingClientRect().top - navH, 600);
  });
  var white = src.cloneNode(true); white.removeAttribute('class');
  white.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:auto;display:block;color:#fff;fill:#fff';
  var black = src.cloneNode(true); black.removeAttribute('class');
  black.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:auto;display:block;color:#1A1A1A;fill:#1A1A1A';
  W.appendChild(white); W.appendChild(black);
  document.body.appendChild(W);

  var ASPECT = 1610.4 / 177.6;          // logo wordmark aspect ratio
  function lerp(a, b, t) { return a + (b - a) * t; }

  function R() {
    var vh = innerHeight, vw = innerWidth;
    var heroH = hero.getBoundingClientRect().height || vh;
    var p = scrollY / heroH; p = p < 0 ? 0 : p > 1 ? 1 : p;
    var mob = vw <= 767;
    // docked slot, derived from the native nav padding + logo height per breakpoint
    var padX = mob ? 24 : 40, padTop = mob ? 24 : 26;
    var dockX = Math.max(padX, (vw - 1720) / 2 + padX);   // nav-inner is centred at max-width 1720
    var dockY = padTop;
    var dockW = (mob ? 16 : 22) * ASPECT;
    // big start size + margin per breakpoint (always clearly larger than docked)
    var bigW = mob ? vw * 0.74 : Math.min(vw * 0.46, 620);
    var margin = mob ? 24 : 48;
    var bigH = bigW / ASPECT;
    var w = lerp(bigW, dockW, p), h = w / ASPECT;
    var x = lerp(vw - bigW - margin, dockX, p);
    var y = lerp(vh - bigH - margin, dockY, p);
    W.style.width = w + 'px'; W.style.left = x + 'px'; W.style.top = y + 'px';
    white.style.filter = 'drop-shadow(0 1px 14px rgba(0,0,0,' + (0.35 * (1 - p)) + '))';
    // two-tone: black layer only where the logo overlaps the nav bar band
    var nr = nav.getBoundingClientRect();
    var topIn = Math.min(Math.max(nr.top - y, 0), h);
    var botIn = Math.min(Math.max((y + h) - nr.bottom, 0), h);
    black.style.clipPath = 'inset(' + topIn + 'px 0px ' + botIn + 'px 0px)';
    if (!mob && links) links.style.opacity = p < 0.5 ? 0 : (p - 0.5) / 0.5;  // links are the burger menu on mobile
  }
  R();
  addEventListener('scroll', R, { passive: true });
  addEventListener('resize', R);
})();
