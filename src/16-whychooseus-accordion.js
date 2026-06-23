/*
 * whychooseus-accordion — About page. Click heading to expand/collapse
 * individual Why Choose Us items. Gate to About page only.
 * Tunables: ANIMATE_MS = 350 (duration of open/close animation)
 */
(function() {
  if (!/^\/about(\/|$)/.test(location.pathname)) return;

  var items = [].slice.call(document.querySelectorAll('.pf-list-item'));
  if (!items.length) return;

  var ANIMATE_MS = 350;
  var openIdx = -1; // Track which item is open (-1 = none)

  items.forEach(function(item, idx) {
    var title = item.querySelector('.pf-list-title');
    var sub = item.querySelector('.pf-list-sub');

    if (!title || !sub) return;

    // Set initial state (closed)
    sub.style.overflow = 'hidden';
    sub.style.height = '0';
    sub.style.opacity = '0';
    sub.style.transition = 'height ' + ANIMATE_MS + 'ms ease, opacity ' + ANIMATE_MS + 'ms ease';

    // Click handler
    title.style.cursor = 'pointer';
    title.addEventListener('click', function(e) {
      e.preventDefault();

      // Close any open item
      if (openIdx !== -1 && openIdx !== idx) {
        var prevSub = items[openIdx].querySelector('.pf-list-sub');
        if (prevSub) {
          prevSub.style.height = '0';
          prevSub.style.opacity = '0';
        }
      }

      // Toggle current item
      if (openIdx === idx) {
        // Close
        sub.style.height = '0';
        sub.style.opacity = '0';
        openIdx = -1;
      } else {
        // Measure and open
        sub.style.transition = 'none'; // Disable transition to measure
        sub.style.height = 'auto';
        var measuredH = sub.offsetHeight;
        sub.style.transition = 'height ' + ANIMATE_MS + 'ms ease, opacity ' + ANIMATE_MS + 'ms ease';
        sub.style.height = '0'; // Reset to 0
        sub.offsetHeight; // Force reflow
        sub.style.height = measuredH + 'px';
        sub.style.opacity = '1';
        openIdx = idx;
      }
    });
  });
})();
