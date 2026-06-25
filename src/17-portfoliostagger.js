(function () {
  if (!location.pathname.includes('/portfolio')) return;

  var s = document.createElement('style');
  s.textContent = [
    '.pf-cms-grid .pf-ctile:nth-child(even){transform:translateY(80px);margin-top:0}',
    '.pf-logo-img{object-fit:contain!important;object-position:center center}'
  ].join('');
  (document.head || document.documentElement).appendChild(s);
})();
