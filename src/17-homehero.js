/*
 * homehero — HOME page, ALL breakpoints. Nav starts below the full-screen hero
 * and sticks to the top on scroll; one PLATFFORM logo starts big & white
 * bottom-right and scrubs up-left, scaling down into the nav's logo slot.
 *
 * TWO-TONE via Z-ORDER (not clip on the white): the WHITE logo sits BEHIND the
 * nav bar (z 999) so the opaque bar hides it + its drop-shadow over the nav
 * (shadow stays full & unclipped over the hero); the BLACK logo sits ABOVE the
 * nav (z 1001), clipped to the nav band. Result: white keeps an un-boxed
 * shadow over the hero, and the black/docked logo never has a shadow.
 * GPU transform, rAF-throttled. Big size + dock derived per breakpoint.
 */
(function () {
  if (location.pathname.length > 1) return;
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
  var navLogo = nav.querySelector('.pf-logo'); if (navLogo) navLogo.style.visibility = 'hidden';
  var links = nav.querySelector('.pf-nav-links');

  function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
  function glideTo(targetY, dur) {
    var sY = scrollY, d = targetY - sY, t0 = null;
    function st(ts) { if (t0 === null) t0 = ts; var pp = Math.min(1, (ts - t0) / dur); scrollTo(0, sY + d * easeInOut(pp)); if (pp < 1) requestAnimationFrame(st); }
    requestAnimationFrame(st);
  }
  function mk(z, color, shadow, clickable) {
    var w = document.createElement('div');
    w.style.cssText = 'position:fixed;left:0;top:0;z-index:' + z + ';transform-origin:0 0;will-change:transform;' + (clickable ? 'cursor:pointer' : 'pointer-events:none');
    var s = src.cloneNode(true); s.removeAttribute('class');
    s.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:auto;display:block;color:' + color + ';fill:' + color + (shadow ? ';filter:drop-shadow(0 1px 14px rgba(0,0,0,.35))' : '');
    w.appendChild(s); document.body.appendChild(w);
    return w;
  }
  var Wwhite = mk(999, '#fff', true, true);   // behind the nav bar; shadow intact over hero
  Wwhite.id = 'hh-logo';
  var Wblack = mk(1001, '#1A1A1A', false, false);  // above the nav; clipped to the nav band; no shadow
  Wwhite.addEventListener('click', function () {
    var t = nav.nextElementSibling || hero.nextElementSibling; if (!t) return;
    var nh = nav.getBoundingClientRect().height;
    glideTo(scrollY + t.getBoundingClientRect().top - nh, 600);
  });

  var ASPECT = 1610.4 / 177.6, S = {};
  function lerp(a, b, t) { return a + (b - a) * t; }
  function layout() {
    var vw = innerWidth, vh = innerHeight, mob = vw <= 767;
    S.mob = mob;
    S.bigW = mob ? vw * 0.74 : Math.min(vw * 0.46, 620);
    S.bigH = S.bigW / ASPECT;
    var margin = mob ? 24 : 48;
    S.x0 = vw - S.bigW - margin; S.y0 = vh - S.bigH - margin;
    var padX = mob ? 24 : 40, padTop = mob ? 24 : 26;
    S.dockX = Math.max(padX, (vw - 1720) / 2 + padX); S.dockY = padTop; S.dockW = (mob ? 16 : 22) * ASPECT;
    S.heroH = hero.getBoundingClientRect().height || vh;
    Wwhite.style.width = S.bigW + 'px'; Wblack.style.width = S.bigW + 'px';
  }
  function R() {
    var p = scrollY / S.heroH; p = p < 0 ? 0 : p > 1 ? 1 : p;
    var w = lerp(S.bigW, S.dockW, p), scale = w / S.bigW;
    var tx = lerp(S.x0, S.dockX, p), ty = lerp(S.y0, S.dockY, p);
    var tf = 'translate(' + tx + 'px,' + ty + 'px) scale(' + scale + ')';
    Wwhite.style.transform = tf; Wblack.style.transform = tf;
    // black shows only within the nav band (local pre-scale coords)
    var nr = nav.getBoundingClientRect();
    var topL = Math.min(Math.max((nr.top - ty) / scale, 0), S.bigH);
    var botL = Math.min(Math.max(S.bigH - (nr.bottom - ty) / scale, 0), S.bigH);
    Wblack.style.clipPath = 'inset(' + topL + 'px 0px ' + botL + 'px 0px)';
    if (!S.mob && links) links.style.opacity = p < 0.5 ? 0 : (p - 0.5) / 0.5;
  }
  var ticking = false;
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(function () { R(); ticking = false; }); } }
  layout(); R();
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', function () { layout(); R(); });
})();
