# PHASE 6 — JAVASCRIPT CHANGES

**Automated CLI Implementation for Intro Reveal, City Marquee, and Why Choose Us Accordion**

All changes involve editing files in `src/`, rebuilding via `./build.sh`, and redeploying.

---

## 6.1 Edit `src/04-introrevealv9.js` — Change Reveal Direction from Horizontal to VERTICAL (Top→Bottom)

### Current Behavior
- Text reveals left→right (horizontal gradient at `90deg`)
- Easing constant K = 0.08 (relatively fast)

### Target Behavior  
- Text reveals top→bottom (vertical gradient at `0deg`)
- Easing constant K = 0.12 (slower reveal speed)

### Required Changes

**File:** `src/04-introrevealv9.js`

**Change 1: Gradient direction (line with "linear-gradient")**

**BEFORE:**
```javascript
s.style.backgroundImage='linear-gradient(90deg,'+B+' 0%,'+B+' '+(b-e)+'%,'+G+' '+(b+e)+'%,'+G+' 100%)';
```

**AFTER:**
```javascript
s.style.backgroundImage='linear-gradient(0deg,'+B+' 0%,'+B+' '+(b-e)+'%,'+G+' '+(b+e)+'%,'+G+' 100%)';
```

*(Only change: `90deg` → `0deg`)*

**Change 2: Easing constant K (near the function F definition)**

**BEFORE:**
```javascript
var t=0,m=0,R=0.78,K=0.08;
```

**AFTER:**
```javascript
var t=0,m=0,R=0.78,K=0.12;
```

*(Only change: `K=0.08` → `K=0.12`)*

### How to Apply
1. Open `src/04-introrevealv9.js`
2. Find the line containing `linear-gradient(90deg`
3. Change `90deg` to `0deg`
4. Find the line containing `K=0.08`
5. Change to `K=0.12`
6. Run `./build.sh`
7. Test on About/Contact pages to verify vertical top→bottom reveal + slower speed

---

## 6.2 Edit `src/05-citymarquee.js` — Slow Down Animation Speed

### Current Behavior
- City list scrolls at 55px/second

### Target Behavior
- City list scrolls at 35px/second (slower, more leisurely pace)

### Required Changes

**File:** `src/05-citymarquee.js`

**Change: Speed constant SPD**

**BEFORE:**
```javascript
var x=0,last=performance.now(),SPD=55;
```

**AFTER:**
```javascript
var x=0,last=performance.now(),SPD=35;
```

*(Only change: `SPD=55` → `SPD=35`)*

### How to Apply
1. Open `src/05-citymarquee.js`
2. Find the line containing `SPD=55`
3. Change to `SPD=35`
4. Run `./build.sh`
5. Test on Contact page to verify slower marquee scrolling

---

## 6.3 Create New Module `src/16-whychooseus-accordion.js` — Click-to-Expand Functionality

### Purpose
Enable clicking the "Why Choose Us" heading to toggle accordion open/closed (independent of scroll trigger).

### Implementation

**Create new file:** `src/16-whychooseus-accordion.js`

**Content:**
```javascript
/*
 * whychooseus-accordion — About page. Click heading to expand/collapse
 * individual Why Choose Us items. Gate to About page only.
 * Tunables: ANIMATE_MS = 350 (duration of open/close animation)
 */
(function() {
  if (!/^\/about(\/|$)/.test(location.pathname)) return;
  
  var items = [].slice.call(document.querySelectorAll('.pf-list-item'));
  if (!items.length) return;
  
  var ANIMATE_MS = 350;
  var openIdx = -1; // Track which item is open (-1 = none)
  
  items.forEach(function(item, idx) {
    var title = item.querySelector('.pf-list-title');
    var sub = item.querySelector('.pf-list-sub');
    
    if (!title || !sub) return;
    
    // Set initial state (closed)
    sub.style.overflow = 'hidden';
    sub.style.height = '0';
    sub.style.opacity = '0';
    sub.style.transition = 'height ' + ANIMATE_MS + 'ms ease, opacity ' + ANIMATE_MS + 'ms ease';
    
    // Click handler
    title.style.cursor = 'pointer';
    title.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close any open item
      if (openIdx !== -1 && openIdx !== idx) {
        var prevSub = items[openIdx].querySelector('.pf-list-sub');
        if (prevSub) {
          prevSub.style.height = '0';
          prevSub.style.opacity = '0';
        }
      }
      
      // Toggle current item
      if (openIdx === idx) {
        // Close
        sub.style.height = '0';
        sub.style.opacity = '0';
        openIdx = -1;
      } else {
        // Measure and open
        sub.style.transition = 'none'; // Disable transition to measure
        sub.style.height = 'auto';
        var measuredH = sub.offsetHeight;
        sub.style.transition = 'height ' + ANIMATE_MS + 'ms ease, opacity ' + ANIMATE_MS + 'ms ease';
        sub.style.height = '0'; // Reset to 0
        sub.offsetHeight; // Force reflow
        sub.style.height = measuredH + 'px';
        sub.style.opacity = '1';
        openIdx = idx;
      }
    });
  });
})();
```

### How to Apply
1. Create new file `src/16-whychooseus-accordion.js`
2. Paste the code above
3. Run `./build.sh`
4. Test on About page:
   - Click a "Why Choose Us" heading → paragraph below expands with smooth animation
   - Click another heading → previous closes, new one opens (one open at a time)
   - Click same heading again → closes

### Notes
- Content stays native/editable (no JS rewriting text)
- Only one item can be open at a time (accordion style)
- Smooth height + opacity animation (350ms)
- Gate to About page only via pathname check

---

## 6.4 (Optional) Create Module `src/17-why-click-to-expand-home.js` — Home Page Variant

**If Home also needs click-to-expand** (the requirements don't explicitly mention it, but check user feedback):

### Quick Variant for Home
Same as 6.3 but change the pathname gate:

```javascript
if (!/^\/home(\/|$)/.test(location.pathname)) return;
```

Skip for now unless explicitly requested.

---

## Build & Deploy Workflow

### Step 1: Edit Source Files
- Edit `src/04-introrevealv9.js` (Change 1 & 2)
- Edit `src/05-citymarquee.js` (Change 1)
- Create `src/16-whychooseus-accordion.js` (new module)

### Step 2: Rebuild Bundle
```bash
cd /Users/sean.fahy/platfform-web-animation
./build.sh
```

**Expected output:**
```
✓ Bundle built successfully
Checking syntax...
✓ All syntax OK
```

Verify no errors in build output.

### Step 3: Verify bundle.js
```bash
md5 -q bundle.js
```

Record this hash (new version identifier, e.g., `6a25c1a3e5f2b8c9d1a4f7e2`).

### Step 4: Create Git Commit
```bash
git add -A
git commit -m "PHASE 6: Intro reveal direction (vertical), city marquee speed (35px/s), why-choose-us click-to-expand"
```

Expected commit message pattern (user preference noted in memory):
```
PHASE 6: Intro reveal direction (vertical), city marquee speed (35px/s), why-choose-us click-to-expand

- Change 04-introrevealv9.js: gradient 90deg→0deg, K 0.08→0.12 (slower reveal)
- Change 05-citymarquee.js: SPD 55→35 px/s (slower scroll)
- Add 16-whychooseus-accordion.js: click header to expand/collapse items
- Rebuilt bundle.js

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

### Step 5: Push to GitHub
```bash
git push origin main
```

### Step 6: Purge jsDelivr Cache (Old Workflow) OR Update Webflow Asset (New Workflow)

**If using jsDelivr (old):**
```bash
curl -s https://purge.jsdelivr.net/gh/workplace-futures-group/platfform-web-animation@main/bundle.js
```

Wait 2-5 seconds for cache to purge.

**If using Webflow-hosted asset (new, from memory):**
1. Run: `md5 -q bundle.js` (e.g., yields hash `abc123`)
2. Upload new bundle via Webflow `create_asset`:
   ```
   file_name: platfform-bundle-v030.js
   file: @bundle.js (binary)
   ```
   Get `hostedUrl` back (e.g., `https://cdn.prod.website-files.com/...abc123.../platfform-bundle-v030.js`)
3. Register new loader script pointing at hostedUrl
4. Apply to site footer via `set_site_scripts`
5. Publish site via `publish_site`

**Follow whichever workflow is currently in use** (check recent Webflow deployments in your session history).

### Step 7: Test Live
- **About page:** Verify text reveals top→bottom, slower speed
- **Contact page:** Verify marquee scrolls slower
- **About page:** Click "Why Choose Us" headings → accordion opens/closes smoothly
- **Verify console:** No JavaScript errors (open DevTools → Console)

---

## Rollback Plan

If something breaks:

1. **Revert git commit:**
   ```bash
   git revert HEAD --no-edit
   git push origin main
   ```

2. **Purge jsDelivr again** (or re-upload to Webflow):
   ```bash
   curl -s https://purge.jsdelivr.net/gh/workplace-futures-group/platfform-web-animation@main/bundle.js
   ```

3. **Wait 5 seconds, hard refresh** the Webflow site to see old version

---

## Validation Checklist

After deployment, verify:

- [ ] Intro reveal on About page shows text revealing vertically (top→bottom)
- [ ] Intro reveal is visibly slower than before (compare side-by-side with old deployment if possible)
- [ ] City list marquee on Contact page scrolls slower (easier to read)
- [ ] Marquee is positioned ABOVE the image (reordered in Designer)
- [ ] Why Choose Us on About: clicking a heading expands its paragraph
- [ ] Only one paragraph open at a time (previous closes when new opens)
- [ ] Smooth animation on open/close (not instant)
- [ ] No console errors
- [ ] Mobile responsiveness intact (test on small viewport)

---

## Files Modified / Created

```
Modified:
  src/04-introrevealv9.js (2 lines)
  src/05-citymarquee.js (1 line)

Created:
  src/16-whychooseus-accordion.js (new module)

Generated:
  bundle.js (auto-rebuilt)
```

---

## Git Commit Details

- **Parent:** Latest commit on main before these changes
- **Files changed:** 3 (2 modified, 1 new)
- **Insertions/deletions:** ~50 lines (mostly new module)
- **Bundle size:** ~44KB (unchanged significantly)

After push, GitHub will show:
```
workplace-futures-group/platfform-web-animation
main: PHASE 6: Intro reveal direction...
 2 commits ahead of previous
 1 new file, 2 modified files
```

---

## Questions / Decisions Needed from User

Before running ./build.sh:

1. **City Marquee Position:** Is the Designer reordering of `.pf-locations` above the image complete? (PHASE 5.3 Designer action)
2. **Why Choose Us:** Should clicking open/close be for ABOUT page only, or also HOME? (Current implementation is About-only)
3. **Animations:** Test timings on live site — acceptable speeds or need further tuning?

If any timing/behavior feels off after testing, we can quickly adjust the constants (K, SPD, ANIMATE_MS) and rebuild.

---

## CI/CD Integration (Future)

If you set up GitHub Actions, could automate:
1. `./build.sh` on every push to `src/`
2. Generate `bundle.js`
3. Auto-commit updated bundle
4. Trigger Webflow asset upload + cache purge

For now, manual `./build.sh` + `git push` is the workflow.
