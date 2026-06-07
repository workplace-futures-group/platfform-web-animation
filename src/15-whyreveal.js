/*
 * whyreveal — About page. Light scroll-reveal for the (native) Why Choose Us
 * items: each fades + slides up as it enters the viewport, with a small stagger.
 * Content stays native/editable — this only animates it. IntersectionObserver
 * (no scroll listener). About-gated; degrades gracefully (if it can't run, the
 * items are simply visible).
 */
(function () {
  if (!/^\/about(\/|$)/.test(location.pathname)) return;
  if (!('IntersectionObserver' in window)) return;
  var items = [].slice.call(document.querySelectorAll('.pf-list-item'));
  if (!items.length) return;
  items.forEach(function (it, i) {
    it.style.opacity = '0';
    it.style.transform = 'translateY(24px)';
    it.style.transition = 'opacity .6s ease ' + (i * 0.08) + 's, transform .6s ease ' + (i * 0.08) + 's';
    it.style.willChange = 'opacity, transform';
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'none';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
  items.forEach(function (it) { io.observe(it); });
})();
