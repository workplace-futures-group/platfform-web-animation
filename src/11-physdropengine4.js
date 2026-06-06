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
