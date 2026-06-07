/*
 * leasinggallery — Home page. Furniture Leasing scrollytelling.
 * Pins the WHOLE block (image gallery + heading/body) vertically CENTRED in
 * the viewport, and scrubs the gallery strip horizontally (slides LEFT) as you
 * scroll, so you progress through the tiles left -> right. The 4 tiles are
 * duplicated to 8. The text is on-screen for the whole pin (it's part of the
 * pinned block). Everything is measured at runtime so it's fully responsive:
 *   - tile size = (gallery width - gaps) / visible-count (4 desktop, 2 mobile),
 *   - gallery<->text gap = the ORIGINAL rendered gap (kept identical),
 *   - block centred => equal space above the gallery and below the text.
 * Home-gated; scroll-scrubbed (frozen when you stop).
 */
(function () {
  if (location.pathname.length > 1) return;
  var row = document.querySelector('.pf-img-row');
  if (!row || row.dataset.lz) return;
  row.dataset.lz = '1';

  var text = row.nextElementSibling;            // .pf-split (heading + body)
  var parent = row.parentNode;                  // .pf-container
  var GAP = parseFloat(getComputedStyle(row).columnGap) || 24;
  // original vertical gap gallery -> text (measured before we move anything)
  var G = text ? Math.max(0, text.getBoundingClientRect().top - row.getBoundingClientRect().bottom) : 48;

  // 4 -> 8 (duplicate the tiles, keeping their bg-image classes)
  [].slice.call(row.children).forEach(function (t) { row.appendChild(t.cloneNode(true)); });

  // track (tall, drives scroll) > pin (sticky, centred) > [clip > strip], text
  var track = document.createElement('div');
  track.style.cssText = 'position:relative';
  parent.insertBefore(track, row);
  var pin = document.createElement('div');
  pin.style.cssText = 'position:sticky;display:flex;flex-direction:column';
  track.appendChild(pin);
  var clip = document.createElement('div');
  clip.style.cssText = 'overflow:hidden;width:100%';
  pin.appendChild(clip);
  clip.appendChild(row);
  if (text) { pin.appendChild(text); text.style.marginTop = '0'; }
  row.style.cssText = 'display:flex;flex-wrap:nowrap;gap:' + GAP + 'px;margin:0;will-change:transform';

  var S = {};
  function layout() {
    var vis = innerWidth >= 992 ? 4 : 2;
    var pinW = pin.clientWidth;
    var tileW = (pinW - (vis - 1) * GAP) / vis;   // `vis` tiles fill the gallery
    [].slice.call(row.children).forEach(function (t) {
      t.style.flex = '0 0 ' + tileW + 'px';
      t.style.width = tileW + 'px';
      t.style.aspectRatio = '1 / 1';
      t.style.height = 'auto';
    });
    clip.style.height = tileW + 'px';
    pin.style.rowGap = G + 'px';
    S.blockH = tileW + G + (text ? text.offsetHeight : 0);
    S.travel = row.scrollWidth - pinW;            // horizontal distance to scrub
    pin.style.top = ((innerHeight - S.blockH) / 2) + 'px';   // vertically centred
    track.style.height = (S.blockH + S.travel) + 'px';
  }
  function render() {
    var rect = track.getBoundingClientRect();
    var range = track.offsetHeight - S.blockH;    // == travel
    var p = range > 0 ? (((innerHeight - S.blockH) / 2) - rect.top) / range : 0;
    p = p < 0 ? 0 : p > 1 ? 1 : p;
    row.style.transform = 'translateX(' + (-p * S.travel) + 'px)';
  }
  layout();
  render();
  addEventListener('scroll', render, { passive: true });
  addEventListener('resize', function () { layout(); render(); });
})();
