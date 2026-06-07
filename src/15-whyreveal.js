/*
 * whyreveal — About page. Light scroll-reveal for the (native) Why Choose Us
 * items: each fades + slides up as it enters the viewport, with a small stagger.
 * Content stays native/editable — this only animates it. About-gated.
 * Uses a live-rect scroll check armed at full `load` (after images settle) so
 * below-fold items are never revealed by an unsettled/short early layout.
 */
(function () {
  if (!/^\/about(\/|$)/.test(location.pathname)) return;
  if (!window.requestAnimationFrame) return;
  var items = [].slice.call(document.querySelectorAll('.pf-list-item'));
  if (!items.length) return;
  items.forEach(function (it, i) {
    it.style.opacity = '0';
    it.style.transform = 'translateY(24px)';
    it.style.transition = 'opacity .6s ease ' + (i * 0.08) + 's, transform .6s ease ' + (i * 0.08) + 's';
    it.style.willChange = 'opacity, transform';
  });
  function check() {
    items.forEach(function (it) {
      if (it.dataset.shown) return;
      if (it.getBoundingClientRect().top < innerHeight * 0.85) {
        it.style.opacity = '1'; it.style.transform = 'none'; it.dataset.shown = '1';
      }
    });
  }
  var ticking = false;
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(function () { check(); ticking = false; }); } }
  function init() { check(); addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); }
  if (document.readyState === 'complete') init(); else addEventListener('load', init);
})();
