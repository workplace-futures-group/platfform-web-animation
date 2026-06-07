/*
 * whyreveal — About page. Light scroll-reveal for the (native) Why Choose Us
 * items: each fades + slides up as it enters the viewport, with a small stagger.
 * Content stays native/editable — this only animates it. About-gated; degrades
 * gracefully. The observe is deferred until after layout settles (and guarded
 * by the live rect) so below-fold items aren't revealed by an early/unsettled
 * IntersectionObserver callback.
 */
(function () {
  if (!/^\/about(\/|$)/.test(location.pathname)) return;
  if (!('IntersectionObserver' in window) || !window.requestAnimationFrame) return;
  var items = [].slice.call(document.querySelectorAll('.pf-list-item'));
  if (!items.length) return;
  items.forEach(function (it, i) {
    it.style.opacity = '0';
    it.style.transform = 'translateY(24px)';
    it.style.transition = 'opacity .6s ease ' + (i * 0.08) + 's, transform .6s ease ' + (i * 0.08) + 's';
    it.style.willChange = 'opacity, transform';
  });
  function reveal(it) { it.style.opacity = '1'; it.style.transform = 'none'; }
  function arm() {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        // guard with the live rect so an unsettled-layout callback can't reveal a below-fold item
        if (e.isIntersecting && e.target.getBoundingClientRect().top < innerHeight * 0.95) {
          reveal(e.target); io.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    items.forEach(function (it) { io.observe(it); });
  }
  // wait two frames (layout/fonts/images settle) before observing
  requestAnimationFrame(function () { requestAnimationFrame(arm); });
})();
