/*
 * footerlegal — site-wide. Stacks the footer legal links onto separate lines
 * (replaces the " | " separators with line breaks). Tiny content transform —
 * the footer is a Webflow component whose internal text the API can't edit
 * reliably, so this does it at runtime. Idempotent.
 */
(function () {
  var el = document.querySelector('.pf-foot-links');
  if (!el || el.dataset.fl) return;
  el.dataset.fl = '1';
  if (el.innerHTML.indexOf('|') > -1) {
    el.innerHTML = el.innerHTML.replace(/\s*\|\s*/g, '<br>');
  }
})();
