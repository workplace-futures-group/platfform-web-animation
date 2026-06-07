/*
 * mobilenav — toggle for the (now NATIVE) hamburger. ALL pages.
 * The burger BUTTON + its bars + show/hide are real Webflow elements/styles
 * (.pf-burger / .pf-burger-bar, editable in the Designer). This script only
 * (a) injects the mobile menu OVERLAY + open-state CSS (the .pf-nav-links
 * overlay is a component-internal class the API can't reliably style), and
 * (b) wires the click to toggle .pf-open. No element creation.
 */
(function () {
  var css = '@media(max-width:767px){'
    + '.pf-nav-links{position:fixed;top:0;left:0;width:100%;height:100vh;background:#1A1A1A;flex-direction:column;align-items:center;justify-content:center;gap:36px;transform:translateY(-100%);transition:transform .4s ease;z-index:60;margin:0}'
    + '.pf-nav-links.pf-open{transform:translateY(0)}'
    + '.pf-nav-links .pf-nav-link{color:#fff;font-size:24px;opacity:1}'
    + '.pf-burger.pf-open{position:fixed;top:34px;right:24px;color:#fff;z-index:70}'
    + '.pf-burger.pf-open .pf-burger-bar:nth-child(1){transform:translateY(8px) rotate(45deg)}'
    + '.pf-burger.pf-open .pf-burger-bar:nth-child(2){opacity:0}'
    + '.pf-burger.pf-open .pf-burger-bar:nth-child(3){transform:translateY(-8px) rotate(-45deg)}'
    + '}'
    + '.pf-burger-bar{transition:transform .3s ease,opacity .3s ease}';
  var s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
  function init() {
    [].forEach.call(document.querySelectorAll('.pf-nav-inner'), function (inner) {
      var b = inner.querySelector('.pf-burger'), links = inner.querySelector('.pf-nav-links');
      if (!b || !links || b.dataset.mn) return; b.dataset.mn = '1';
      function hh(v) { var l = document.getElementById('hh-logo'); if (l) l.style.display = v; }
      function close() { b.classList.remove('pf-open'); links.classList.remove('pf-open'); document.body.style.overflow = ''; hh(''); }
      b.addEventListener('click', function (e) {
        e.preventDefault();
        var open = links.classList.toggle('pf-open');
        b.classList.toggle('pf-open', open);
        document.body.style.overflow = open ? 'hidden' : '';
        hh(open ? 'none' : '');   // hide the morphing hero logo while the menu is open
      });
      [].forEach.call(links.querySelectorAll('a'), function (a) { a.addEventListener('click', close); });
    });
  }
  if (document.readyState !== 'loading') init(); else document.addEventListener('DOMContentLoaded', init);
})();
