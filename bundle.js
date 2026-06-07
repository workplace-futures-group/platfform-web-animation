/* platfform-web-animation — bundled custom code for the Platfform Webflow site.
   Source of truth: this repo. Served to Webflow via jsDelivr + a single loader script.
   Each module is an IIFE that self-gates (by pathname and/or element presence).
   Concatenated from src/ in footer order. Do not edit bundle.js by hand — edit src/ and rebuild. */

/* ===== 00-config.js ===== */
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


/* ===== 01-mobilenav.js ===== */
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


/* ===== 02-aboutgalleryaccordion.js ===== */
/*
 * aboutgalleryaccordion — About page. Click-to-expand accordion for the
 * About/sustainability gallery (.pf-sus-gallery).
 */
(function(){var c=".pf-sus-gallery{display:flex}.pf-sus-gallery>.pf-ph{flex:1 1 0%!important;min-width:0;overflow:hidden;position:relative;transition:flex-grow .55s cubic-bezier(.22,1,.36,1)}.pf-sus-gallery>.pf-ph::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);height:100%;width:50vw;background-image:inherit;background-size:cover;background-position:center}.pf-sus-gallery>.pf-ph.pf-sa{flex-grow:4!important}.pf-sus-gallery>.pf-ph:not(.pf-sa){flex-grow:1!important}@media(max-width:991px){.pf-sus-gallery{flex-wrap:nowrap!important;column-gap:8px!important;margin-left:-16px!important;margin-right:-16px!important}.pf-sus-gallery>.pf-ph{height:285px!important}}@media(max-width:767px){.pf-sus-gallery{margin-left:-10px!important;margin-right:-10px!important}}";var s=document.createElement('style');s.textContent=c;document.head.appendChild(s);function init(){var g=document.querySelector('.pf-sus-gallery');if(!g)return;var it=[].slice.call(g.querySelectorAll('.pf-ph'));if(!it.length)return;function mob(){return matchMedia('(max-width:991px)').matches}function set(i){it.forEach(function(e,x){e.classList.toggle('pf-sa',x===i)})}it.forEach(function(e,x){e.addEventListener('mouseenter',function(){if(!mob())set(x)})});function sc(){if(!mob())return;var r=g.getBoundingClientRect(),vh=innerHeight,t=r.height+vh,p=Math.min(1,Math.max(0,(vh-r.top)/t)),i=Math.min(it.length-1,Math.floor(p*it.length));set(i)}addEventListener('scroll',sc,{passive:true});addEventListener('resize',sc);set(0);sc()}function go(){setTimeout(init,300)}if(document.readyState!=='loading')go();else document.addEventListener('DOMContentLoaded',go)})();

/* ===== 03-homegalleryaccordion.js ===== */
/*
 * homegalleryaccordion — Home page. Click-to-expand accordion for the
 * home gallery (.pf-gallery).
 */
(function(){var c=".pf-gallery{display:flex;align-items:flex-start;gap:16px;height:600px}.pf-gallery>.pf-ph{flex:1 1 0%!important;height:480px!important;min-width:0;overflow:hidden;position:relative;transition:flex-grow .55s cubic-bezier(.22,1,.36,1),height .55s cubic-bezier(.22,1,.36,1)}.pf-gallery>.pf-ph::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:50vw;height:600px;background-image:inherit;background-size:cover;background-position:center}.pf-gallery>.pf-ph.pf-ga{flex-grow:3!important;height:600px!important}.pf-gallery>.pf-ph:not(.pf-ga){flex-grow:1!important}@media(max-width:991px){.pf-gallery{flex-wrap:nowrap!important;column-gap:8px!important;margin-left:-16px!important;margin-right:-16px!important;height:356px}.pf-gallery>.pf-ph{height:285px!important}.pf-gallery>.pf-ph::before{height:356px}.pf-gallery>.pf-ph.pf-ga{height:356px!important}}@media(max-width:767px){.pf-gallery{margin-left:-10px!important;margin-right:-10px!important}}";var s=document.createElement('style');s.textContent=c;document.head.appendChild(s);function init(){var g=document.querySelector('.pf-gallery');if(!g)return;var it=[].slice.call(g.querySelectorAll('.pf-ph'));if(!it.length)return;function mob(){return matchMedia('(max-width:991px)').matches}function set(i){it.forEach(function(e,x){e.classList.toggle('pf-ga',x===i)})}it.forEach(function(e,x){e.addEventListener('mouseenter',function(){if(!mob())set(x)})});function sc(){if(!mob())return;var r=g.getBoundingClientRect(),vh=innerHeight,t=r.height+vh,p=Math.min(1,Math.max(0,(vh-r.top)/t)),i=Math.min(it.length-1,Math.floor(p*it.length));set(i)}addEventListener('scroll',sc,{passive:true});addEventListener('resize',sc);set(0);sc()}function go(){setTimeout(init,300)}if(document.readyState!=='loading')go();else document.addEventListener('DOMContentLoaded',go)})();

/* ===== 04-introrevealv9.js ===== */
/*
 * introrevealv9 — Grey->black scroll-driven "ink reveal" of intro text.
 * Runs on Home (.pf-intro), About (.pf-about-intro), Contact (.pf-contact).
 * Splits target text into per-line spans; each line inks as it crosses the
 * reading line. Height-normalized so it feels the same on desktop & mobile.
 * Tunables: R=0.78 (reading line; higher = inks lower/sooner),
 *           K=0.08 (easing; lower = slower/gentler), feather=22.
 */
(function(){var IC=document.querySelector('.pf-intro, .pf-about-intro, .pf-contact');if(!IC)return;var G='#d4d4d4',B='#1A1A1A';var T=[].slice.call(IC.querySelectorAll('.pf-display,.pf-lead,.pf-stmt-lead,.pf-stmt-p,.pf-stmt-fade,.pf-contact-h,.pf-contact-body,.pf-contact-phone,.pf-contact-email'));if(!T.length)return;var c0=IC.querySelector('.pf-cta');if(c0){c0.style.color=B;c0.style.webkitTextFillColor=B;}var S=[];function ST(s){var y=s.style;y.color='transparent';y.webkitTextFillColor='transparent';y.backgroundClip='text';y.webkitBackgroundClip='text';}function P(e){var ns=[].slice.call(e.childNodes);ns.forEach(function(n){if(n.nodeType===3){var a=n.nodeValue.split(/(\s+)/),fr=document.createDocumentFragment();a.forEach(function(p){if(!p)return;if(/^\s+$/.test(p)){fr.appendChild(document.createTextNode(p));return;}var s=document.createElement('span');s.textContent=p;ST(s);fr.appendChild(s);S.push(s);});e.replaceChild(fr,n);}else if(n.nodeName!=='BR'){P(n);}});}T.forEach(P);var L=1;function M(){S.forEach(function(s){var r=s.getBoundingClientRect();s.t=Math.round(r.top);s.l=r.left;s.w=r.width||1;});var o=[];S.forEach(function(s){if(o.indexOf(s.t)<0)o.push(s.t);});o.sort(function(a,b){return a-b;});L=o.length;var g={};S.forEach(function(s){var i=o.indexOf(s.t);s.i=i;var x=g[i]||(g[i]={a:1e9,b:-1e9});if(s.l<x.a)x.a=s.l;if(s.l+s.w>x.b)x.b=s.l+s.w;});S.forEach(function(s){var x=g[s.i];s.q=s.l-x.a;s.lw=(x.b-x.a)||1;});}function BB(){var tp=1e9,bt=-1e9;for(var i=0;i<T.length;i++){var r=T[i].getBoundingClientRect();if(r.top<tp)tp=r.top;if(r.bottom>bt)bt=r.bottom;}return[tp,bt];}var fit=false;function CF(){fit=BB()[1]<=innerHeight;}M();CF();if(document.fonts)document.fonts.ready.then(function(){M();CF();});addEventListener('resize',function(){M();CF();});var t=0,m=0,R=0.78,K=0.08;function F(){var v=innerHeight,bb=BB(),top=bb[0],h=(bb[1]-bb[0])||1,sp=fit?1:(R*v-top)/h;if(sp<0)sp=0;if(sp>1)sp=1;t+=(sp-t)*K;m=Math.max(m,t);if(m>0.997)m=1;for(var i=0;i<S.length;i++){var s=S[i],f=(m-s.i/L)*L;if(f<0)f=0;else if(f>1)f=1;var rx=f*(s.lw+60)-30,b=(rx-s.q)/s.w*100,e=22/s.w*100;if(e>60)e=60;s.style.backgroundImage='linear-gradient(90deg,'+B+' 0%,'+B+' '+(b-e)+'%,'+G+' '+(b+e)+'%,'+G+' 100%)';}if(m<1)requestAnimationFrame(F);}requestAnimationFrame(F);})();

/* ===== 05-citymarquee.js ===== */
/*
 * citymarquee — Contact page. Turns the .pf-locations city list into a
 * seamless endless left-scrolling marquee (ALL CAPS). Tunable: SPD=55 px/s.
 */
(function(){var el=document.querySelector('.pf-locations');if(!el)return;var base=el.textContent.replace(/\s+/g,' ').replace(/[\s—-]+$/,'').trim()+' — ';el.style.overflow='hidden';el.style.whiteSpace='nowrap';el.style.textTransform='uppercase';var track=document.createElement('div');track.style.cssText='display:inline-block;white-space:nowrap;will-change:transform;';el.textContent='';el.appendChild(track);var bw=0;function build(){track.innerHTML='<span>'+base+'</span>';bw=track.firstChild.getBoundingClientRect().width;var vw=el.getBoundingClientRect().width||innerWidth;var c=Math.ceil(vw/bw)+2,h='';for(var i=0;i<c;i++)h+='<span>'+base+'</span>';track.innerHTML=h;}build();addEventListener('resize',build);var x=0,last=performance.now(),SPD=55;function tick(now){var dt=(now-last)/1000;last=now;if(dt>0.1)dt=0.016;x-=SPD*dt;if(x<=-bw)x+=bw;track.style.transform='translateX('+x+'px)';requestAnimationFrame(tick);}requestAnimationFrame(tick);})();

/* ===== 06-portfolioscrollanim2.js ===== */
/*
 * portfolioscrollanim2 — Portfolio page. Scroll-driven animation of the
 * portfolio grid/items.
 */
(function(){function init(){var g=document.querySelector('.pf-cms-grid'),c=document.querySelector('.pf-cms-clip');if(!g||!c)return;var k=[].slice.call(g.children);if(k.length){var n=0;while(g.children.length<56&&n<400){k.forEach(function(e){g.appendChild(e.cloneNode(true))});n++}}[].slice.call(g.querySelectorAll('.pf-ctile')).forEach(function(t){t.style.height=(170+Math.floor(Math.random()*250))+'px';var im=t.querySelector('img');if(im){var f=function(){if(im.naturalWidth>0)t.style.height='auto'};im.complete&&f();im.addEventListener('load',f)}});var tx=0,ty=0,cx=0,cy=0;function b(){return c.getBoundingClientRect()}function ow(){return g.scrollWidth-b().width}function oh(){return g.scrollHeight-b().height}function ctr(){tx=-ow()/2;ty=-oh()/2}var coarse=matchMedia('(pointer:coarse)').matches;if(coarse){var t0=Date.now();(function drift(){var t=(Date.now()-t0)/1000;tx=-(0.5+0.45*Math.sin(t*0.16))*ow();ty=-(0.5+0.45*Math.sin(t*0.11))*oh();requestAnimationFrame(drift)})()}else{var hint=document.createElement('div');hint.textContent='Move to explore';hint.style.cssText='position:absolute;left:50%;bottom:24px;transform:translateX(-50%);font:500 11px/1 Gotham,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#1A1A1A;opacity:.5;pointer-events:none;transition:opacity .6s ease;z-index:5';c.appendChild(hint);c.addEventListener('mousemove',function(e){var r=b(),x=Math.min(1,Math.max(0,(e.clientX-r.left)/r.width)),y=Math.min(1,Math.max(0,(e.clientY-r.top)/r.height));tx=-x*ow();ty=-y*oh();hint.style.opacity='0'})}ctr();cx=tx;cy=ty;function loop(){cx+=(tx-cx)*0.07;cy+=(ty-cy)*0.07;g.style.transform='translate('+cx.toFixed(1)+'px,'+cy.toFixed(1)+'px)';requestAnimationFrame(loop)}requestAnimationFrame(loop)}function go(){setTimeout(init,400)}if(document.readyState!=='loading')go();else document.addEventListener('DOMContentLoaded',go)})();

/* ===== 07-ffeorbit5.js ===== */
/*
 * ffeorbit5 — Home page. FF&E illustration "orbit": furniture line-vectors
 * circle a ring inside .pf-ill-ffe; click one to bring it to centre.
 * Home-gated.
 */
(function(){if(location.pathname.length>1)return;var stage=document.querySelector('.pf-ill-ffe');if(!stage)return;var A=requestAnimationFrame,P='https://cdn.prod.website-files.com/6a18656c49b2496b48cfeaba/';var O=[['6a23db05ba7cf91521376eb1_ffe2-chair.svg',268,308],['6a23db0512027d60988801e0_ffe2-tablelamp2.svg',65,116],['6a23db05b51623a67323a40e_ffe2-pendant.svg',106,143],['6a23db05359c0b160f92aa3a_ffe2-chair2.svg',136,181],['6a23db05359c0b160f92aa4c_ffe2-taskchair.svg',123,186],['6a23db06b51623a67323a478_ffe2-table.svg',176,152],['6a23db06359c0b160f92aa64_ffe2-tablelamp.svg',163,178],['6a23db06b51623a67323a4a0_ffe2-stool.svg',126,171]];stage.style.cssText+=';background:none;position:relative';var objs=[],sel=null,ga=0;function F(){var R=stage.getBoundingClientRect(),S=Math.min(R.width,R.height),cx=R.width/2,cy=R.height/2,rad=S*.34,cnt=sel?objs.length-1:objs.length,r=0;ga+=.003;objs.forEach(o=>{var tw,cX,cY,m=Math.max(o.fw,o.fh);if(o===sel){tw=S*.336*o.fw/m;cX=cx;cY=cy;}else{tw=S*.16*o.fw/m;var a=r++*6.283/cnt+ga;cX=cx+rad*Math.cos(a);cY=cy+rad*Math.sin(a);}var th=tw*o.fh/o.fw;o.cw+=(tw-o.cw)*.12;o.ch+=(th-o.ch)*.12;o.cx+=(cX-o.cx)*.12;o.cy+=(cY-o.cy)*.12;o.sv.style.width=o.cw+'px';o.sv.style.height=o.ch+'px';o.w.style.transform='translate('+(o.cx-o.cw/2)+'px,'+(o.cy-o.ch/2)+'px)';o.w.style.zIndex=o===sel?9:1;});A(F);}Promise.all(O.map(d=>fetch(P+d[0]).then(r=>r.text()))).then(svgs=>{O.forEach((d,i)=>{var w=document.createElement('div');w.style.cssText='position:absolute;left:0;top:0';w.innerHTML=svgs[i];var sv=w.querySelector('svg');sv.querySelector('path').setAttribute('vector-effect','non-scaling-stroke');stage.appendChild(w);var o={w:w,sv:sv,fw:d[1],fh:d[2],cx:0,cy:0,cw:0,ch:0};w.addEventListener('click',e=>{e.stopPropagation();sel=sel===o?null:o;});objs.push(o);});stage.addEventListener('click',()=>{sel=null;});new IntersectionObserver((es,io)=>{if(es[0].isIntersecting){sel=objs[Math.random()*8|0];io.disconnect();}},{threshold:.6}).observe(stage);A(F);});})();

/* ===== 08-wcsetup5.js ===== */
/*
 * wcsetup5 — Home page. Workplace Consultancy gallery, "deal off the top".
 * SETUP half: wraps the row in a 200vh sticky track, pins the card box
 * centred, moves heading/paragraph out below it, stores window.__WC, then
 * polls for window.__WCGO. Home-gated.
 * Pair: 08-wcsetup5 (setup) + 09-wcdeal4 (scrub engine).
 */
(function(){if(location.pathname.length>1)return;var hi=document.querySelector('.pf-himg-5');if(!hi)return;var row=hi.closest('.pf-svc-row'),T=row.querySelector('.pf-text'),h=T.querySelector('.pf-h2'),pa=T.querySelector('.pf-body'),B='https://cdn.prod.website-files.com/6a18656c49b2496b48cfeaba/',U=['6a23e465907f9f5dbccfe88d_wc-17.jpg','6a23e465173e32f22f3c03cd_wc-19.jpg','6a23e4650d9a413b2d954d7b_wc-20.jpg','6a23e46559f901679d665dc1_wc-24.jpg','6a23e46610480490e41f0af4_wc-25.jpg','6a23e46564a9341b4547769d_wc-18.jpg'].map(s=>B+s);var tk=document.createElement('div');tk.style.height='200vh';row.parentNode.insertBefore(tk,row);var pin=document.createElement('div');pin.style.cssText='position:sticky;top:0;height:100vh;display:flex;align-items:center;justify-content:center';tk.appendChild(pin);var st=document.createElement('div');st.style.cssText='position:relative;width:100%;max-width:750px;margin:0 auto;overflow:hidden';pin.appendChild(st);tk.parentNode.insertBefore(T,tk.nextSibling);T.style.cssText+=';max-width:720px;width:100%;margin:48px auto 0;text-align:center';h.style.cssText+=';margin:0 0 16px';pa.style.cssText+=';margin:0 auto;max-width:34em';row.style.display='none';var C=U.map(function(u){var c=document.createElement('div');c.style.cssText='position:absolute;left:50%;transform:translateX(-50%);overflow:hidden;background:#eee 50%/cover;background-image:url('+u+')';st.appendChild(c);return c});window.__WC={st:st,tk:tk,C:C,N:U.length,P:.052,S:.05};(function w(){window.__WCGO?__WCGO():setTimeout(w,30)})();})();

/* ===== 09-wcdeal4.js ===== */
/*
 * wcdeal4 — Home page. Defines window.__WCGO: the SCROLL-SCRUBBED deal
 * engine for the Workplace Consultancy gallery (front card deals off the
 * top, deck shifts forward; motion is 1:1 with scroll, freezes when you stop).
 * Pair: 08-wcsetup5 (setup) + 09-wcdeal4 (this).
 */
window.__WCGO=function(){var W=window.__WC,st=W.st,tk=W.tk,C=W.C,N=W.N,P=W.P,S=W.S;st.style.overflow='hidden';C.forEach(function(c){c.style.transition='none'});function R(){var r=tk.getBoundingClientRect(),ih=innerHeight;st.style.maxWidth=Math.min(750,ih*.96)+'px';var sw=st.clientWidth,pk=sw*P,sh=(N-1)*pk+sw*.625;st.style.height=sh+'px';var p=((ih-sh)-r.top)/(tk.offsetHeight-sh);p=p<0?0:p>1?1:p;var f=p*(N-1),k=f|0,t=f-k;C.forEach(function(c,i){var d=(i-k+N)%N,w,tp,op,z;if(d==0){w=sw;tp=(N-1)*pk+(sh-(N-1)*pk)*t;op=1-t/.6;if(op<0)op=0;z=200}else{var e=d-1,w0=sw*(1-S*d),w1=sw*(1-S*e),a=(N-1-d)*pk,b=(N-1-e)*pk;w=w0+(w1-w0)*t;tp=a+(b-a)*t;op=(d==N-1&&k>0)?(t/.3>1?1:t/.3):1;z=100-d}c.style.width=w+'px';c.style.height=w*.625+'px';c.style.top=tp+'px';c.style.opacity=op;c.style.zIndex=z})}R();onscroll=R;onresize=R};

/* ===== 10-specanim.js ===== */
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


/* ===== 11-physdropengine4.js ===== */
/*
 * physdropengine4 — Home page. Defines window.__PHI: the Matter.js physics
 * world for the combined Design + FF&E section.
 *
 * Choreography (driven by scroll progress p, 0..1 over the track):
 *   - p 0.0       : only the text is visible (read it).
 *   - p 0.1 -> 0.3: the Design chair fades in, held in place (top-left).
 *   - p 0.4 -> 0.55: the text scrolls up and away (fades out).
 *   - p > 0.5     : gravity is applied to the chair -> it drops, meets the
 *                   pre-settled FF&E pile and (being heavier) shifts them.
 *
 * All objects (FF&E + chair) use non-scaling-stroke at a uniform 1.3px so the
 * line weight is identical regardless of each object's size.
 * Pair: 11-physdropengine4 (engine) + 12-physdroploader4 (loader/DOM).
 */
window.__PHI=function(){
  var M=window.Matter,PH=window.__PH,scene=PH.scene,tk=PH.tk,O=PH.O,svgs=PH.svgs;
  var B=M.Bodies,C=M.Composite,R=Math.random,WW=scene.clientWidth,HH=scene.clientHeight;
  var en=M.Engine.create();en.gravity.y=.9;
  var wd=en.world,o={isStatic:true};
  // floor + side walls (floor top edge sits exactly at the scene bottom = HH)
  C.add(wd,[B.rectangle(WW/2,HH+30,WW+600,60,o),B.rectangle(-30,HH/2,60,HH*4,o),B.rectangle(WW+30,HH/2,60,HH*4,o)]);
  var SC=WW/6;                       // every object's larger dimension = SC
  var STROKE='1.3px';
  function paint(sv){               // uniform, scale-independent line weight
    sv.querySelectorAll('path').forEach(function(p){
      p.setAttribute('vector-effect','non-scaling-stroke');
      p.style.strokeWidth=STROKE;
    });
  }
  var EL=[];
  // 8 FF&E pieces — settle on load, spread across the full width
  svgs.forEach(function(svg,i){
    var d=O[i],m=Math.max(d[1],d[2]),k=SC/m,w=d[1]*k,h=d[2]*k;
    var wr=document.createElement('div');
    wr.style.cssText='position:absolute;left:0;top:0;width:'+w+'px;height:'+h+'px';
    wr.innerHTML=svg;
    var sv=wr.querySelector('svg');sv.style.cssText='width:100%;height:100%;display:block';paint(sv);
    scene.appendChild(wr);
    var b=B.rectangle(SC*.5+R()*(WW-SC),-40-R()*500,w*.8,h*.8,{restitution:.4,friction:.3,angle:R()-.5});
    EL.push([wr,w,h,b]);C.add(wd,b);
  });
  // the Design chair — held as a plain div (fades in), then becomes a body
  var dk=SC/660,cw=575*dk,ch=660*dk,hx=WW*.27,hy=HH*.27;
  var dw=document.createElement('div');
  dw.style.cssText='position:absolute;left:0;top:0;width:'+cw+'px;height:'+ch+'px;opacity:0;transform:translate('+(hx-cw/2)+'px,'+(hy-ch/2)+'px)';
  dw.innerHTML=PH.dsvg;
  var ds=dw.querySelector('svg');ds.style.cssText='width:100%;height:100%;display:block';
  ds.querySelectorAll('path').forEach(function(p){p.style.fill='none';p.style.stroke='#1A1A1A';p.setAttribute('vector-effect','non-scaling-stroke');p.style.strokeWidth=STROKE;});
  scene.appendChild(dw);
  var chair=null;
  function syn(wr,w,h,b){wr.style.transform='translate('+(b.position.x-w/2)+'px,'+(b.position.y-h/2)+'px) rotate('+b.angle+'rad)'}
  (function L(){M.Engine.update(en,16.7);EL.forEach(function(a){syn(a[0],a[1],a[2],a[3])});if(chair)syn(dw,cw,ch,chair);requestAnimationFrame(L)})();
  function ss(){
    var r=tk.getBoundingClientRect(),n=tk.offsetHeight-innerHeight,p=n>0?-r.top/n:0;p=p<0?0:p>1?1:p;
    // chair fade-in (held) until it becomes a body
    if(!chair)dw.style.opacity=Math.max(0,Math.min(1,(p-.1)/.2));
    // text scrolls up and away
    var T=PH.txt;if(T){var q=(p-.4)/.15;q=q<0?0:q>1?1:q;T.style.opacity=1-q;T.style.transform='translateY(-50%) translateY('+(-q*innerHeight*.7)+'px)';}
    // gravity applied -> chair drops into the pile (heavier, so it shifts them)
    if(p>.5&&!chair){dw.style.opacity=1;chair=B.rectangle(hx,hy,cw*.8,ch*.8,{restitution:.4,friction:.3,density:.003});C.add(wd,chair);}
  }
  ss();addEventListener('scroll',ss,{passive:1});
};


/* ===== 12-physdroploader4.js ===== */
/*
 * physdroploader4 — Home page. Builds the combined "Design & Technical
 * Support" section and inserts it BETWEEN the FF&E section and Project
 * Management. Creates a 300vh sticky track + scene, moves the Design
 * heading/paragraph into it (right side), REMOVES the original (now empty)
 * Design section, fetches the 8 FF&E svgs + the Design chair svg, injects
 * Matter.js, then polls for window.__PHI. Home-gated.
 * Pair: 11-physdropengine4 (engine) + 12 (this).
 */
(function(){if(location.pathname.length>1)return;var foot=document.querySelector('.pf-foot');if(!foot)return;var ill=document.querySelector('.pf-ill-design');if(!ill)return;var drow=ill.closest('.pf-svc-row');var P='https://cdn.prod.website-files.com/6a18656c49b2496b48cfeaba/',O=[['6a23db05ba7cf91521376eb1_ffe2-chair.svg',268,308],['6a23db0512027d60988801e0_ffe2-tablelamp2.svg',65,116],['6a23db05b51623a67323a40e_ffe2-pendant.svg',106,143],['6a23db05359c0b160f92aa3a_ffe2-chair2.svg',136,181],['6a23db05359c0b160f92aa4c_ffe2-taskchair.svg',123,186],['6a23db06b51623a67323a478_ffe2-table.svg',176,152],['6a23db06359c0b160f92aa64_ffe2-tablelamp.svg',163,178],['6a23db06b51623a67323a4a0_ffe2-stool.svg',126,171]],D='6a2343ca44b4d0523d9a2b39_illus-design.svg';var tk=document.createElement('div');tk.style.cssText='height:300vh;position:relative;background:#fff';var ffe=document.querySelector('.pf-ill-ffe'),ffeSec=ffe?ffe.closest('.pf-section'):null;if(ffeSec&&ffeSec.parentNode){ffeSec.parentNode.insertBefore(tk,ffeSec.nextElementSibling);}else{foot.parentNode.insertBefore(tk,foot);}var pin=document.createElement('div');pin.style.cssText='position:sticky;top:0;height:100vh;overflow:hidden';tk.appendChild(pin);var scene=document.createElement('div');scene.style.cssText='position:absolute;inset:0';pin.appendChild(scene);var txt=document.createElement('div');txt.style.cssText='position:absolute;top:50%;transform:translateY(-50%);z-index:60;font-family:Gotham,sans-serif';function dpos(){var e='clamp(24px,3.5vw,64px)';if(innerWidth<=991){txt.style.left=e;txt.style.right=e;txt.style.width='auto'}else{txt.style.left='auto';txt.style.right=e;txt.style.width='calc(.44*(100% - 2*'+e+'))'}}dpos();addEventListener('resize',dpos);var h2=drow.querySelector('.pf-h2'),bd=drow.querySelector('.pf-body');if(h2)txt.appendChild(h2);if(bd)txt.appendChild(bd);scene.appendChild(txt);var dsec=drow.closest('.pf-section');if(dsec){dsec.remove();}else{drow.remove();}window.__PH={tk:tk,scene:scene,O:O,txt:txt};Promise.all(O.map(function(d){return fetch(P+d[0]).then(function(r){return r.text()})}).concat(fetch(P+D).then(function(r){return r.text()}))).then(function(a){window.__PH.dsvg=a.pop();window.__PH.svgs=a;var s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/matter-js@0.19.0/build/matter.min.js';s.onload=function(){var t=setInterval(function(){if(window.__PHI){clearInterval(t);__PHI()}},30)};document.head.appendChild(s)})})();

/* ===== 13-svcpin7.js ===== */
/*
 * svcpin7 — Home page. Generic scroll-pinning for service rows (.pf-svc-row):
 * wraps each in a track and pins it centred while scrolling, with a subtle
 * rise+fade reveal on illustration rows. SKIPS rows owned by dedicated
 * scripts: consultancy (.pf-himg-5), spec (.pf-ill-spec), design
 * (.pf-ill-design), and any already-sticky row. Home-gated. Runs last.
 */
(function(){if(location.pathname.length>1)return;[...document.querySelectorAll('.pf-svc-row')].forEach(function(row){if(getComputedStyle(row).position==='sticky'||row.querySelector('.pf-himg-5')||row.querySelector('.pf-ill-spec')||row.querySelector('.pf-ill-design'))return;var media=row.querySelector('.pf-media'),ffe=row.querySelector('.pf-ill-ffe'),mv=media&&!ffe;var track=document.createElement('div');track.style.height='160vh';row.parentNode.insertBefore(track,row);track.appendChild(row);row.style.cssText+=';position:sticky;top:0;min-height:100vh;align-items:center';if(mv){media.style.cssText+=';display:flex;align-items:center;justify-content:center';var il=media.firstElementChild;if(il)il.style.maxWidth='68vh';}function upd(){var r=track.getBoundingClientRect(),rng=track.offsetHeight-innerHeight,p=rng>0?-r.top/rng:0;p=p<0?0:p>1?1:p;if(mv){var q=p/.35;q=q>1?1:q;media.style.opacity=.3+.7*q;media.style.transform='translateY('+(24-24*q)+'px)';}}upd();addEventListener('scroll',upd,{passive:1});addEventListener('resize',upd);});})();

/* ===== 14-leasinggallery.js ===== */
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

  // MOBILE: native touch-swipe carousel (no pin) — 2 visible, snap-scroll the 8.
  // Revert to the pinned scrub on phones via window.PF_MOBILE_FULL = true.
  if (window.PF_MOBILE && window.PF_MOBILE()) {
    row.style.cssText = 'display:flex;flex-wrap:nowrap;gap:' + GAP + 'px;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;margin:0';
    [].slice.call(row.children).forEach(function (t) {
      t.style.flex = '0 0 calc((100% - ' + GAP + 'px) / 2)';
      t.style.width = 'calc((100% - ' + GAP + 'px) / 2)';
      t.style.aspectRatio = '1 / 1'; t.style.height = 'auto';
      t.style.scrollSnapAlign = 'start';
    });
    return;
  }

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


/* ===== 16-stickynav.js ===== */
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


/* ===== 17-homehero.js ===== */
/*
 * homehero — HOME page, ALL breakpoints. Nav starts as a strip below the
 * full-screen hero and sticks to the top on scroll; one PLATFFORM logo starts
 * big & white bottom-right and scrubs up-left, scaling down + flipping
 * white->black (two-tone clip at the bar edge) into the nav's logo slot.
 *
 * PERF: animates via GPU `transform` (translate+scale, never left/top/width),
 * throttled to one update per animation frame; the drop-shadow is static and
 * the white layer just fades its opacity out as it docks (cheap) instead of
 * recomputing a filter every scroll event. Big size + dock target are derived
 * per-breakpoint so it reads LARGE->small everywhere.
 */
(function () {
  if (location.pathname.length > 1) return;
  var hero = document.querySelector('.pf-hero');
  var nav = document.querySelector('.pf-nav');
  if (!hero || !nav || nav.dataset.hh) return;
  var src = nav.querySelector('.pf-lsvg') || nav.querySelector('svg');
  if (!src) return;
  nav.dataset.hh = '1';

  if (hero.nextElementSibling !== nav) hero.parentNode.insertBefore(nav, hero.nextSibling);
  nav.style.setProperty('position', 'sticky', 'important');
  nav.style.setProperty('top', '0', 'important');
  nav.style.setProperty('z-index', '1000', 'important');
  nav.style.fontFamily = 'Gotham, sans-serif';
  var navLogo = nav.querySelector('.pf-logo'); if (navLogo) navLogo.style.visibility = 'hidden';
  var links = nav.querySelector('.pf-nav-links');

  function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
  function glideTo(targetY, dur) {
    var sY = scrollY, d = targetY - sY, t0 = null;
    function st(ts) { if (t0 === null) t0 = ts; var pp = Math.min(1, (ts - t0) / dur); scrollTo(0, sY + d * easeInOut(pp)); if (pp < 1) requestAnimationFrame(st); }
    requestAnimationFrame(st);
  }

  var W = document.createElement('div'); W.id = 'hh-logo';
  W.style.cssText = 'position:fixed;left:0;top:0;z-index:1001;cursor:pointer;transform-origin:0 0;will-change:transform';
  W.addEventListener('click', function () {
    var t = nav.nextElementSibling || hero.nextElementSibling; if (!t) return;
    var nh = nav.getBoundingClientRect().height;
    glideTo(scrollY + t.getBoundingClientRect().top - nh, 600);
  });
  var white = src.cloneNode(true); white.removeAttribute('class');
  white.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:auto;display:block;color:#fff;fill:#fff;filter:drop-shadow(0 1px 14px rgba(0,0,0,.35))';
  var black = src.cloneNode(true); black.removeAttribute('class');
  black.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:auto;display:block;color:#1A1A1A;fill:#1A1A1A';
  W.appendChild(white); W.appendChild(black); document.body.appendChild(W);

  var ASPECT = 1610.4 / 177.6, S = {};
  function lerp(a, b, t) { return a + (b - a) * t; }
  function layout() {
    var vw = innerWidth, vh = innerHeight, mob = vw <= 767;
    S.mob = mob;
    S.bigW = mob ? vw * 0.74 : Math.min(vw * 0.46, 620);
    S.bigH = S.bigW / ASPECT;
    var margin = mob ? 24 : 48;
    S.x0 = vw - S.bigW - margin; S.y0 = vh - S.bigH - margin;
    var padX = mob ? 24 : 40, padTop = mob ? 24 : 26;
    S.dockX = Math.max(padX, (vw - 1720) / 2 + padX); S.dockY = padTop; S.dockW = (mob ? 16 : 22) * ASPECT;
    S.heroH = hero.getBoundingClientRect().height || vh;
    W.style.width = S.bigW + 'px';
  }
  function R() {
    var p = scrollY / S.heroH; p = p < 0 ? 0 : p > 1 ? 1 : p;
    var w = lerp(S.bigW, S.dockW, p), scale = w / S.bigW;
    var tx = lerp(S.x0, S.dockX, p), ty = lerp(S.y0, S.dockY, p);
    W.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + scale + ')';
    white.style.opacity = p < 0.8 ? 1 : Math.max(0, 1 - (p - 0.8) / 0.2);   // fade out at dock (kills shadow bleed)
    var nr = nav.getBoundingClientRect();   // two-tone clip in the logo's local (pre-scale) coords
    var topL = Math.min(Math.max((nr.top - ty) / scale, 0), S.bigH);
    var botL = Math.min(Math.max(S.bigH - (nr.bottom - ty) / scale, 0), S.bigH);
    black.style.clipPath = 'inset(' + topL + 'px 0px ' + botL + 'px 0px)';
    if (!S.mob && links) links.style.opacity = p < 0.5 ? 0 : (p - 0.5) / 0.5;
  }
  var ticking = false;
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(function () { R(); ticking = false; }); } }
  layout(); R();
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', function () { layout(); R(); });
})();

