/*
 * config — global runtime flags shared across bundle modules (loads first).
 *
 * PF_MOBILE_FULL — REVERT SWITCH. Set to `true` to keep the FULL desktop
 * scrollytelling on phones too (i.e. undo the mobile simplifications in one
 * place, so you don't lose the joy). Default `false` = lighter, touch-friendly
 * mobile variants for the pinned sections (currently: leasing gallery +
 * "Why Choose Us"). Desktop/tablet are never affected either way.
 */
window.PF_MOBILE_FULL = false;
window.PF_MOBILE = function () { return innerWidth <= 767 && !window.PF_MOBILE_FULL; };

/* Spacing design tokens (CSS variables) used by the pinned/animated modules so
 * spacing stays consistent. --nav-h is the sticky nav height (pins offset by it
 * so illustrations aren't clipped). NOTE: native Webflow Variables are the
 * source of truth for the Designer; these mirror them for the JS layer. */
(function () {
  var s = document.createElement('style');
  s.textContent = ':root{--nav-h:74px;--space-xs:16px;--space-sm:24px;--space-md:40px;--space-lg:64px;--space-xl:100px}'
    + '@media(max-width:767px){:root{--nav-h:64px;--space-lg:48px;--space-xl:56px}}';
  (document.head || document.documentElement).appendChild(s);
})();
