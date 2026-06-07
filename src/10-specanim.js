/*
 * specanim — Home page. Furniture Specification illustration: scroll-linked
 * TRIM-PATH line draw. Drawing STARTS as soon as the path's start point enters
 * the bottom of the viewport (BEFORE the section becomes sticky), and COMPLETES
 * at 80% of the sticky length; the final 20% of the sticky length is a
 * fully-drawn pause to read the rest of the text. All trigger geometry is
 * measured at runtime (responsive). Home-gated. (Merge of old specsetup4+specdraw4.)
 */
(function(){if(location.pathname.length>1)return;var ill=document.querySelector('.pf-ill-spec');if(!ill)return;var row=ill.closest('.pf-svc-row');fetch('https://cdn.prod.website-files.com/6a18656c49b2496b48cfeaba/6a2343ca6f0fa76a0d373de9_illus-spec.svg').then(function(r){return r.text()}).then(function(t){
  var tk=document.createElement('div');tk.style.height='250vh';row.parentNode.insertBefore(tk,row);tk.appendChild(row);
  row.style.cssText+=';position:sticky;top:0;min-height:100vh;align-items:center';
  var media=row.querySelector('.pf-media');media.style.cssText+=';display:flex;align-items:center;justify-content:center';
  ill.style.cssText+=';background:none;width:auto;height:auto;aspect-ratio:auto;max-width:100%';
  ill.innerHTML=t;
  var sv=ill.querySelector('svg');sv.style.cssText='display:block;height:min(67vh,50vw);max-width:100%;width:auto';
  var p=sv.querySelector('path');p.style.fill='none';p.style.stroke='#1A1A1A';p.style.strokeWidth='1.3';p.setAttribute('vector-effect','non-scaling-stroke');
  var L=p.getTotalLength();p.style.strokeDashoffset=0;
  var DRAW=0.80;            // draw finishes at 80% of sticky; last 20% = pause
  var S={n:1,g0:-0.4};
  function measure(){
    S.n=tk.offsetHeight-innerHeight;                       // sticky travel distance
    var illH=ill.getBoundingClientRect().height;
    var within=0;                                          // start point's offset from the illustration's top
    try{var sp=p.getPointAtLength(0),pt=sv.createSVGPoint();pt.x=sp.x;pt.y=sp.y;within=pt.matrixTransform(sv.getScreenCTM()).y-sv.getBoundingClientRect().top;}catch(e){}
    var spOff=(row.offsetHeight-illH)/2+within;            // start point's offset from the track top (in-flow)
    // g (sticky progress, 0 at pin start) at which the start point reaches the viewport bottom:
    S.g0=S.n>0?(spOff-innerHeight)/S.n:-0.4;
    if(!(S.g0<DRAW))S.g0=-0.2;                             // safety
  }
  function R(){
    var g=S.n>0?-tk.getBoundingClientRect().top/S.n:0;
    var d=(g-S.g0)/(DRAW-S.g0);
    d=d<0?0:d>1?1:d;
    p.style.strokeDasharray=(d*L)+' '+((1-d)*L);
  }
  measure();R();
  addEventListener('scroll',R,{passive:1});
  addEventListener('resize',function(){measure();R()});
})})();
