/*
 * stickynav — site-wide. Pins the nav component (.pf-nav) to the top so it
 * stays visible on scroll across every page. Injected here because the nav is
 * a Webflow COMPONENT and the Designer/MCP would not persist a position change
 * on the component's root class (verified: writes report success but no-op).
 * No load flash: at scroll-top absolute and fixed render identically, and the
 * rule is in place well before any scroll. Can be moved to a native Webflow
 * style later if the Designer cooperates.
 */
(function () {
  var s = document.createElement('style');
  s.textContent = '.pf-nav{position:fixed !important;top:0;left:0;width:100%;z-index:1000 !important}';
  (document.head || document.documentElement).appendChild(s);
})();
