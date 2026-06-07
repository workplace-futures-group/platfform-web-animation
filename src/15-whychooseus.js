/*
 * whychooseus — About page. "WHY CHOOSE US" pinned scrollytelling accordion.
 * Layout: heading sticky on the LEFT, the 5 reason items on the RIGHT. The
 * section PINS and, as you scroll, each item expands its paragraph ONE AT A
 * TIME (the previous collapses) — pure scroll, all start collapsed.
 * Paragraphs use the existing .pf-list-sub style. Item 1 keeps its native
 * (editable) paragraph; items 2-5 get placeholder copy (swap COPY[] later, or
 * promote to native Webflow elements). About-gated.
 */
(function(){
  if(!/^\/about(\/|$)/.test(location.pathname))return;
  var hs=[].slice.call(document.querySelectorAll('h2.pf-h2'));
  var h=hs.filter(function(e){return /why choose/i.test(e.textContent)})[0];
  if(!h)return;
  var split=h.closest('.pf-split');
  if(!split||split.dataset.wc)return; split.dataset.wc='1';
  var cont=split.closest('.pf-container');
  var titleCol=h.closest('.pf-split-title');
  var bodyCol=split.querySelector('.pf-split-body');
  var items=[].slice.call(bodyCol.querySelectorAll('.pf-list-item'));
  if(!items.length)return;
  // item 1 keeps its own paragraph (null); placeholders for the rest
  var COPY=[null,
    'Seamless management from first brief to final installation.',
    'Aesthetic insight that turns specification into atmosphere.',
    'Clear, prompt answers at every stage of the project.',
    'Rigorous checks that protect your investment and your timeline.'];
  var subs=items.map(function(it,i){
    var s=it.querySelector('.pf-list-sub');
    if(!s){s=document.createElement('p');s.className='pf-list-sub';s.textContent=COPY[i]||'';it.appendChild(s);}
    return s;
  });

  // --- two-column layout, scoped to this instance (overrides the global rail) ---
  split.style.cssText+=';display:flex;flex-direction:row;flex-wrap:nowrap;align-items:flex-start;justify-content:space-between;gap:0;width:100%';
  titleCol.style.cssText+=';flex:0 0 34%;width:34%;max-width:34%;text-align:left;align-items:flex-start';
  bodyCol.style.cssText+=';flex:0 0 54%;width:54%;max-width:54%';

  // --- collapse every paragraph + prep the expand/collapse transition ---
  subs.forEach(function(s){
    s.style.cssText+=';overflow:hidden;height:0;opacity:0;margin-top:0;transition:height .45s ease,opacity .4s ease,margin-top .45s ease;will-change:height';
  });

  // --- pin: wrap the container in a tall track with a 100vh sticky pin ---
  var STEP=40;                 // vh of scroll budget per item
  var N=items.length, MAXH=0, cur=-2;
  var track=document.createElement('div'); track.style.cssText='position:relative';
  cont.parentNode.insertBefore(track,cont);
  var pin=document.createElement('div'); pin.style.cssText='position:sticky;top:0;height:100vh;display:flex;align-items:center';
  track.appendChild(pin); pin.appendChild(cont);
  cont.style.cssText+=';width:100%';

  function measure(){                      // uniform open height => no layout jiggle
    MAXH=0; subs.forEach(function(s){var hh=s.scrollHeight; if(hh>MAXH)MAXH=hh;});
  }
  function layout(){
    if(innerWidth<=991){                   // stack on mobile/tablet
      split.style.flexDirection='column'; split.style.alignItems='flex-end';
      titleCol.style.flex='none'; titleCol.style.width='100%'; titleCol.style.maxWidth='100%';
      bodyCol.style.flex='none'; bodyCol.style.width='100%'; bodyCol.style.maxWidth='100%';
    }else{
      split.style.flexDirection='row'; split.style.alignItems='flex-start';
      titleCol.style.flex='0 0 34%'; titleCol.style.width='34%'; titleCol.style.maxWidth='34%';
      bodyCol.style.flex='0 0 54%'; bodyCol.style.width='54%'; bodyCol.style.maxWidth='54%';
    }
    measure();
    track.style.height='calc(100vh + '+(N*STEP)+'vh)';
  }
  function open(i){
    if(i===cur)return; cur=i;
    subs.forEach(function(s,j){
      var on=j===i;
      s.style.height=on?MAXH+'px':'0';
      s.style.opacity=on?'1':'0';
      s.style.marginTop=on?'10px':'0';
    });
  }
  function R(){
    var travel=track.offsetHeight-innerHeight;
    var p=travel>0?-track.getBoundingClientRect().top/travel:0;
    if(p<0){open(-1);return;}             // before the pin: all collapsed
    if(p>1)p=1;
    var idx=Math.floor(p*N); if(idx>N-1)idx=N-1;
    open(idx);
  }
  layout(); R();
  addEventListener('scroll',R,{passive:1});
  addEventListener('resize',function(){var c=cur;cur=-2;layout();open(c);R();});
})();
