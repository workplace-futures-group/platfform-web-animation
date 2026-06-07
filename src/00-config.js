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
