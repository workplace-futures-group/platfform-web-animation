/*
 * leasinggallery — Home page. Turns the Furniture Leasing image strip
 * (.pf-img-row) into a PINNED horizontal scroll-through gallery:
 *   - duplicates the 4 tiles -> 8 (the 4 repeated),
 *   - wraps the row in a sticky pin inside a tall track,
 *   - on scroll the strip translates LEFT (you progress through the tiles
 *     left -> right), scrubbed 1:1 with scroll, frozen when you stop.
 * The gallery keeps its original height (each tile stays square); at rest
 * (scroll start) it looks identical to the original 4-up. Desktop shows 4
 * tiles at once, mobile/tablet shows 2. Home-gated.
 */
(function () {
  if (location.pathname.length > 1) return;
  var row = document.querySelector('.pf-img-row');
  if (!row || row.dataset.lz) return;
  row.dataset.lz = '1';
  var GAP = 24;

  // 4 -> 8 (duplicate the existing tiles, preserving their bg-image classes)
  [].slice.call(row.children).forEach(function (t) { row.appendChild(t.cloneNode(true)); });

  // track (tall, drives the scroll) > pin (sticky, clips) > row (the strip)
  var track = document.createElement('div');
  track.style.cssText = 'position:relative';
  row.parentNode.insertBefore(track, row);
  var pin = document.createElement('div');
  pin.style.cssText = 'position:sticky;overflow:hidden;width:100%';
  track.appendChild(pin);
  pin.appendChild(row);
  row.style.cssText = 'display:flex;flex-wrap:nowrap;gap:' + GAP + 'px;will-change:transform';

  var S = {};
  function layout() {
    var vis = innerWidth >= 992 ? 4 : 2;          // tiles visible at once
    var pinW = pin.clientWidth;
    var tileW = (pinW - (vis - 1) * GAP) / vis;   // so `vis` tiles fill the pin
    [].slice.call(row.children).forEach(function (t) {
      t.style.flex = '0 0 ' + tileW + 'px';
      t.style.width = tileW + 'px';
      t.style.aspectRatio = '1 / 1';
      t.style.height = 'auto';
    });
    S.H = tileW;
    pin.style.height = tileW + 'px';
    pin.style.top = Math.max(0, (innerHeight - tileW) / 2) + 'px';  // vertically centred
    S.travel = row.scrollWidth - pinW;            // horizontal distance to scrub
    track.style.height = (tileW + S.travel) + 'px';
  }
  function render() {
    var rect = track.getBoundingClientRect();
    var range = track.offsetHeight - S.H;
    var p = range > 0 ? ((innerHeight - S.H) / 2 - rect.top) / range : 0;
    p = p < 0 ? 0 : p > 1 ? 1 : p;
    row.style.transform = 'translateX(' + (-p * S.travel) + 'px)';
  }
  layout();
  render();
  addEventListener('scroll', render, { passive: true });
  addEventListener('resize', function () { layout(); render(); });
})();
