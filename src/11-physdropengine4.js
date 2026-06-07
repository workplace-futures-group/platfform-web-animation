/*
 * physdropengine4 — Home. window.__PHI: the Design + FF&E physics scene.
 *
 * Choreography (scroll progress p, 0..1 over the 300vh track):
 *   p 0    -> 0.12 : TEXT + CHAIR fade in TOGETHER (chair big, ~2x), held.
 *   p 0.12 -> 0.32 : hold (read it).
 *   p 0.32 -> 0.48 : text scrolls up & away; chair shrinks slightly (2x -> ~1.3x).
 *   p 0.50         : the FF&E PHYSICS objects drop in (only now, after the text).
 *   p 0.55 -> 1.0  : the chair descends into the pile, rotating 0 -> ~270deg,
 *                    all scroll-linked (kinematic), meeting the settled objects.
 *
 * FF&E are real Matter bodies (drop + settle, chaotic central pile, capped size
 * so big displays stay chaotic). Draggable on fine-pointer (desktop) devices
 * only, so touch/page scroll is never blocked. The chair is scroll-controlled
 * (so its 270deg tumble is exactly scroll-linked). Uniform 1.3px stroke.
 * Pair: 11 (engine) + 12 (loader/DOM).
 */
window.__PHI = function () {
  var M = window.Matter, PH = window.__PH, scene = PH.scene, tk = PH.tk, O = PH.O, svgs = PH.svgs;
  var B = M.Bodies, C = M.Composite, R = Math.random;
  var WW = scene.clientWidth, HH = scene.clientHeight;
  var en = M.Engine.create(); en.gravity.y = 0.9;
  var wd = en.world, st = { isStatic: true };
  C.add(wd, [B.rectangle(WW / 2, HH + 30, WW + 600, 60, st), B.rectangle(-30, HH / 2, 60, HH * 4, st), B.rectangle(WW + 30, HH / 2, 60, HH * 4, st)]);
  var SC = Math.min(WW / 6, 150);     // cap object size -> stays chaotic on big displays
  var STROKE = '1.3px';
  function paint(sv) { sv.querySelectorAll('path').forEach(function (p) { p.setAttribute('vector-effect', 'non-scaling-stroke'); p.style.strokeWidth = STROKE; }); }

  // FF&E: build wrappers (hidden) + bodies (added to the world only later)
  var EL = [], bodies = [], added = false;
  svgs.forEach(function (svg, i) {
    var d = O[i], m = Math.max(d[1], d[2]), k = SC / m, w = d[1] * k, h = d[2] * k;
    var wr = document.createElement('div');
    wr.style.cssText = 'position:absolute;left:0;top:0;width:' + w + 'px;height:' + h + 'px;opacity:0;pointer-events:none';
    wr.innerHTML = svg; var sv = wr.querySelector('svg'); sv.style.cssText = 'width:100%;height:100%;display:block'; paint(sv);
    scene.appendChild(wr);
    var x = WW * 0.5 + (R() - 0.5) * Math.min(WW * 0.6, 680);   // central band -> chaotic pile
    var b = B.rectangle(x, -60 - R() * 520, w * 0.8, h * 0.8, { restitution: 0.4, friction: 0.3, angle: R() - 0.5 });
    EL.push([wr, w, h, b]); bodies.push(b);
  });

  // Chair = scroll-controlled (kinematic) so the tumble is exactly scroll-linked. Base = 2x.
  var dk = SC * 2 / 660, cw = 575 * dk, ch = 660 * dk;
  var dw = document.createElement('div');
  dw.style.cssText = 'position:absolute;left:0;top:0;width:' + cw + 'px;height:' + ch + 'px;opacity:0;transform-origin:50% 50%;pointer-events:none;z-index:40';
  dw.innerHTML = PH.dsvg; var ds = dw.querySelector('svg'); ds.style.cssText = 'width:100%;height:100%;display:block';
  ds.querySelectorAll('path').forEach(function (p) { p.style.fill = 'none'; p.style.stroke = '#1A1A1A'; p.setAttribute('vector-effect', 'non-scaling-stroke'); p.style.strokeWidth = STROKE; });
  scene.appendChild(dw);

  // drag objects (desktop / fine-pointer only -> never blocks touch or page scroll)
  if (matchMedia('(pointer:fine)').matches) {
    scene.style.pointerEvents = 'auto';
    var mouse = M.Mouse.create(scene), mc = M.MouseConstraint.create(en, { mouse: mouse, constraint: { stiffness: 0.2, render: { visible: false } } });
    C.add(wd, mc);
    if (mouse.mousewheel) { scene.removeEventListener('mousewheel', mouse.mousewheel); scene.removeEventListener('DOMMouseScroll', mouse.mousewheel); }
  }

  function syn(wr, w, h, b) { wr.style.transform = 'translate(' + (b.position.x - w / 2) + 'px,' + (b.position.y - h / 2) + 'px) rotate(' + b.angle + 'rad)'; }
  (function L() { M.Engine.update(en, 16.7); if (added) EL.forEach(function (a) { syn(a[0], a[1], a[2], a[3]); }); requestAnimationFrame(L); })();
  function cl(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  function ss() {
    var r = tk.getBoundingClientRect(), n = tk.offsetHeight - innerHeight, p = n > 0 ? -r.top / n : 0; p = cl(p);
    var appear = cl(p / 0.12);
    var T = PH.txt; if (T) { var q = cl((p - 0.32) / 0.16); T.style.opacity = appear * (1 - q); T.style.transform = 'translateY(-50%) translateY(' + (-q * innerHeight * 0.7) + 'px)'; }
    var sc = 2 - 0.7 * cl((p - 0.32) / 0.2);            // chair scale 2x held -> ~1.3x
    var hx = WW * 0.30, hy = HH * 0.46;                 // held position
    var px = WW * 0.5, py = HH * 0.74;                  // pile target
    var desc = cl((p - 0.55) / 0.45);
    var cx = hx + (px - hx) * desc, cy = hy + (py - hy) * desc;
    var rot = desc * 4.712;                             // 0 -> 270deg scroll-linked
    dw.style.opacity = appear;
    dw.style.transform = 'translate(' + (cx - cw / 2) + 'px,' + (cy - ch / 2) + 'px) rotate(' + rot + 'rad) scale(' + (sc / 2) + ')';
    if (p > 0.5 && !added) { added = true; C.add(wd, bodies); EL.forEach(function (a) { a[0].style.opacity = 1; }); }
  }
  ss(); addEventListener('scroll', ss, { passive: 1 });
};
