# Platfform Design Amendments — PHASE 1-5 Implementation Plan

**Status: Ready for Webflow Designer Implementation**

This document outlines all changes required in **PHASES 1-5** (Webflow Designer/style_tool edits) that must be performed in the Webflow Designer or via the Webflow MCP tools (element_tool, style_tool, de_page_tool, whtml_builder).

**NOTE:** These cannot be automated from the CLI. You must perform these edits in the **Webflow Designer** using the visual tools or delegate to an agent with Webflow MCP access.

---

## PHASE 1 — HOMEPAGE TYPOGRAPHY & LAYOUT

### 1.1 Reduce All Body Copy Size (All Sections)

**Current:** Body text varies by section
**Target:** Unify body copy to smaller, fluid size  
**Action:** Via style_tool or Designer

- Reduce `.pf-body`, `.pf-contact-body`, `.pf-list-sub` to `clamp(14px, 1.1vw, 18px)` (smaller than current 16-24px)
- Apply across Home hero intro, all service sections, leasing/consultancy/PM&I/aftercare bodies

### 1.2 Unbold All Headings Site-Wide

**Current:** `.pf-h2`, `.pf-list-title`, `.pf-contact-h` at `font-weight: 500`  
**Target:** `font-weight: 400` (regular)

**Files/Classes to change:**
- `.pf-h2` (section titles) → 400
- `.pf-list-title` (Why Choose Us items) → 400
- `.pf-contact-h` (Contact heading) → 400
- `.pf-display` (hero display text if present) → 400

### 1.3 Increase Vertical Spacing Between Headings & Body

**Current:** Heading→body margin varies per section
**Target:** Consistent 40px gap desktop / 24px tablet / 16px mobile

- Apply to: `.pf-h2 { margin-bottom: clamp(16px, 2.6vw, 40px) !important; }`
- Apply same to `.pf-list-title`, `.pf-contact-h`

### 1.4 Restructure Hero Heading (Home)

**Current:**  
```
"Furniture that Transforms Workspaces"
"Design Expertise that Deliver Results"  
"Collaborating with architects..."
```

**Target:**  
```
"Furniture that Transforms Workspaces
Design Expertise that Deliver Results"
"Collaborating with architects..." (new line)
```

**Action:**
1. Open Home page in Designer
2. Find `.pf-hero .pf-display` (or equiv. hero heading)
3. Edit text to combine first two lines with `<br/>`
4. Move subheading to separate `<p>` or `<span>` on new line
5. Adjust sizing if needed for the two-line layout

### 1.5 Furniture Spec & Procurement — Align Body to Bottom of Stool Image

**Current:** Body text flows naturally above/beside image
**Target:** Body text baseline aligns with bottom edge of stool SVG

**Action:**
1. Find `.pf-spec` section (Furniture Specification...)
2. The section has an image `.pf-ill-spec` (stool SVG) + body text
3. Use `align-items: flex-end` on the parent flex container OR
4. Set `align-self: flex-end` on the `.pf-spec-body` text block

### 1.6 Furniture Leasing — LEFT-align Headline (Reference Layout)

**Current:** Heading is centered or right-aligned  
**Target:** LEFT-aligned (this is the reference/baseline)

**Action:**
1. Find `.pf-leasing .pf-h2` or `.pf-leasing-title`
2. Set `text-align: left !important;`
3. Remove any centering from parent container

### 1.7 Apply Furniture Leasing Layout to Other Sections

**Sections to update:**
- Workplace Consultancy
- Project Management & Installation
- Aftercare & Ongoing Support

**For each:**
1. Find the section's heading (`.pf-consultancy-h`, `.pf-pm-h`, `.pf-aftercare-h`)
2. Apply same left-alignment as Leasing: `text-align: left !important;`
3. Ensure heading is NOT centered in its container
4. Verify body text flows below, left-aligned

### 1.8 Update PM&I Image + Add Padding Before Aftercare Images

**Current:** PM&I section has a default image; spacing to Aftercare is standard
**Target:** New/updated PM&I image; increased padding before Aftercare

**Action:**
1. Find PM&I section image (`.pf-pm-img` or bg image on `.pf-pm-visual`)
2. Replace image (TBD — user to provide Figma export or image URL)
3. Find padding before Aftercare section (likely `margin-top` on `.pf-aftercare`)
4. Increase to `clamp(80px, 8vw, 120px)` to add breathing room

---

## PHASE 2 — HOMEPAGE IMAGES & VISUAL FIXES

### 2.1 FF&E Dressing & Artwork — Restore Chair Line Drawing Detail

**Current:** SVG chair illustration `.pf-ill-ffe` (in the orbit section)
**Target:** Re-export from Figma with cleaner line detail (stroke weight, curves)

**Action:**
1. Go to Figma "Platfform – Website" file
2. Find "FF&E Dressing & Artwork" section
3. Locate the chair illustration (node path TBD — ask user or search "chair")
4. Export as SVG (File > Export)
5. Check stroke weight (should be ~0.97-1px for consistency with other items)
6. Upload to Webflow asset library (create_asset)
7. Update `.pf-ill-ffe` background-image CSS to point to new asset URL

### 2.2 Design & Technical Support — Add Ruler/Measurement SVG Detail

**Current:** `.pf-ill-design` is a basic illustration
**Target:** Add ruler/measurement tool SVG with white-fill line drawings, lighter stroke weight

**Action:**
1. In Figma, create or locate a ruler/measurement illustration
2. Export as SVG with:
   - White fill (`#FFFFFF`)
   - Light stroke weight (~0.7px)
   - Clean line work
3. Upload to Webflow
4. Insert into `.pf-ill-design` section (replace or add as overlay)
5. Verify stroke weight consistency across all illustrations

### 2.3 Portfolio Images — Stagger Layout, Evenly Disperse Logos, Fix Distorted Logos

**Current:** Portfolio grid has 10 project images + 7 client logos
**Target:** Staggered/masonry layout with even logo distribution; correct any stretched/distorted logos

**Action:**
1. Open Portfolio page in Designer
2. Find `.pf-cms-grid` (the portfolio wall CMS collection)
3. Adjust grid CSS:
   - Add `column-gap: 48px; row-gap: 48px;` (increase spacing)
   - Set `column-count: 3` (or 4) to create stagger effect
4. For each logo item:
   - Check aspect ratio (logos should be square or landscape, not stretched)
   - If distorted: edit CMS image field to reset aspect ratio
   - Ensure `background-size: contain` on logo tiles

---

## PHASE 3 — FOOTER (Site-Wide)

### 3.1 Increase Platfform Logo Size

**Current:** `.pf-logo` in footer is standard size
**Target:** 1.5× current size

**Action:**
1. Find `.pf-foot-logo` or `.pf-logo` in footer
2. Increase width: change from `width: auto; height: 40px;` to `height: 60px; width: auto;`
3. Verify it doesn't overflow the footer width on mobile

### 3.2 Add "Tide Bankside" Text Above Address

**Current:**  
```
[Logo]
Platfform, a WFG company
[Address]
```

**Target:**  
```
[Logo]
Platfform, a WFG company
Tide Bankside
[Address]
```

**Action:**
1. Find footer address block `.pf-foot-addr`
2. Add new `<p>` or `<div>` above the address: `Tide Bankside`
3. Apply `.pf-foot-company` class (or similar) for consistent styling
4. Verify alignment and spacing

### 3.3 Add LinkedIn Icon to Footer

**Current:** Footer has no social icons
**Target:** LinkedIn icon added (+ hyperlink to LinkedIn profile)

**Action:**
1. Create a LinkedIn SVG icon (simple, 24×24px, white)
2. Upload to Webflow as asset
3. In footer, create a new link element with the icon as child
4. Position after the company info (or in a social icons group)
5. Link href to your LinkedIn company profile

### 3.4 Reformat Legal Links Horizontally

**Current:**  
```
Privacy Policy
Terms & Conditions
Modern Slavery Act
```

**Target:**  
```
Privacy Policy | Terms & Conditions | Modern Slavery Act
```

**Action:**
1. Find footer legal links (`.pf-foot-links` or equiv.)
2. Change layout from vertical (stacked) to horizontal (flex row)
3. Add pipe `|` separator between items (via CSS `::after` or update HTML)
4. Apply `gap: 12px;` between items
5. Verify mobile: on small screens, may need to wrap back to vertical or use smaller gaps

### 3.5 Reduce Footer Height

**Current:** Footer has standard padding/height
**Target:** Compact footer (reduce vertical padding)

**Action:**
1. Find `.pf-foot` or `.footer` container
2. Reduce `padding-top` and `padding-bottom` from current (likely 64/48) to `48px / 32px` desktop, `32px / 24px` mobile
3. Verify text/logo don't crowd

---

## PHASE 4 — ABOUT PAGE

### 4.1 Reduce All Copy Size + Unbold Headings

**Same as PHASE 1.1-1.2** but applied to About page:
- `.pf-about-stmt` sections: body text to `clamp(14px, 1.1vw, 18px)`
- `.pf-h2` on About: font-weight 400
- `.pf-list-title` on About: font-weight 400

### 4.2 Text Animation (Intro Reveal) — Start from TOP, Slow Down Speed

**Current:** `.04-introrevealv9.js` reveals text left→right  
**Target:** Reveal from top→bottom (vertical); slow speed K constant

**Action (JavaScript — see PHASE 6.1):**  
Edit `src/04-introrevealv9.js`:
- Change gradient direction from `90deg` (horizontal) to `0deg` (vertical/top→bottom)
- Reduce K constant from `0.08` to `0.12-0.15` (higher K = slower easing)

### 4.3 Big Body Copy — Span Across Full Page Width

**Current:** Statement copy (`.pf-stmt-p`) may be constrained width on desktop
**Target:** Full-width (or max-width: 100vw)

**Action:**
1. Find `.pf-stmt-p` or `.pf-about-stmt .pf-stmt-p`
2. Remove any `max-width` constraint
3. Set `width: 100%;` OR `max-width: none;`
4. Verify text reads well at wide widths (may need to increase font-size slightly)

### 4.4 Our Approach Section — Taller Block, Image Currently Cut Off, Add New Paragraph

**Current:** "Our Approach" section has image that's clipped/small
**Target:** Block is taller, full image visible, new paragraph text added

**Action:**
1. Find `.pf-approach` section (or equiv. "Our Approach...")
2. Find the image container (`.pf-approach-img` or bg-image)
3. Increase height: change from current (likely 400-500px) to `clamp(500px, 60vh, 800px)`
4. Change `background-size` to `cover` (if not already) so image fills without clipping
5. Find or create a new `<p>` block for additional text (user to supply copy)
6. Insert new paragraph below existing text

### 4.5 Why Choose Us — Allow CLICKING Heading to Expand (Not Just Scroll Trigger)

**Current:** Why Choose Us items are revealed on scroll  
**Target:** Clicking the heading toggles accordion open/closed (without scroll requirement)

**Action (JavaScript — see PHASE 6.3):**  
Create new module `src/16-whychooseus-accordion.js`:
- When `.pf-list-title` is clicked, toggle the sibling `.pf-list-sub` open/closed
- Use `height: 0 → auto` animation
- Gate to About page only

### 4.6 Sustainability Section — Left-align Heading, Add New Paragraph

**Current:** Sustainability section heading may be centered; single paragraph
**Target:** Left-aligned heading; new paragraph added

**Action:**
1. Find `.pf-sustainability` section (or "Sustainability...")
2. Find heading (`.pf-h2` or equiv.)
3. Set `text-align: left !important;`
4. Find or create new `<p>` block for additional content (user to supply copy)
5. Append below existing paragraph

---

## PHASE 5 — CONTACT PAGE

### 5.1 Unbold Heading Copy

**Current:** Contact page heading `.pf-contact-h` at `font-weight: 500`  
**Target:** `font-weight: 400`

**Action:**
1. Find `.pf-contact-h` (Contact section heading)
2. Set `font-weight: 400 !important;`

### 5.2 Move Heading to Single Line

**Current:** Heading wraps to 2+ lines  
**Target:** Single line

**Action:**
1. Find `.pf-contact-h`
2. Set `white-space: nowrap;` OR reduce font-size slightly to fit
3. Verify mobile: on small screens may still wrap (acceptable)

### 5.3 City Marquee Animation — Slow Down + Move ABOVE Image

**Current:** Marquee `.pf-locations` animates at 55px/s; appears below/beside image  
**Target:** Slower animation; positioned ABOVE the contact image

**Action (JavaScript & Designer):**

**JavaScript (PHASE 6.2):**
- Edit `src/05-citymarquee.js`
- Reduce SPD constant from `55` to `35` (slower speed)

**Designer:**
- Find `.pf-locations` element
- Move it in the DOM hierarchy to appear BEFORE the image element (or reorder via CSS `order` property if flexbox)
- Verify spacing/layout after reordering

### 5.4 Image — Increase Height, Move Up (Show More Building, Less Sky)

**Current:** Contact image `.pf-contact-img` has standard height; frame shows sky-heavy composition
**Target:** Taller image; repositioned to show more of the building facade, less sky

**Action:**
1. Find `.pf-contact-img` (background-image on Contact section)
2. Increase `height` from current (likely 600px) to `clamp(600px, 70vh, 900px)`
3. Adjust `background-position` from default `50% 50%` to `50% 65%` (shifts focus down to building)
4. Verify image doesn't overflow viewport on mobile

---

## PHASE 6 — JAVASCRIPT CHANGES (CLI Automation)

**These edits CAN be automated. See PHASE_6_JAVASCRIPT_CHANGES.md for the implementation.**

---

## Summary of Webflow Designer Actions Required

| Phase | Action | Complexity | Est. Time |
|-------|--------|------------|-----------|
| 1 | Reduce body copy + unbold headings | Low | 10 min |
| 1 | Adjust spacing (heading→body) | Low | 10 min |
| 1 | Restructure hero heading (2-line) | Medium | 15 min |
| 1 | Align Spec body to image bottom | Low | 5 min |
| 1 | Left-align Leasing + apply to 3 sections | Low | 15 min |
| 1 | Update PM&I image + padding | Medium | 20 min |
| 2 | Update FF&E chair SVG | Medium | 20 min |
| 2 | Add ruler SVG to Design section | Medium | 20 min |
| 2 | Stagger portfolio layout + fix logos | Medium | 20 min |
| 3 | Increase footer logo size | Low | 5 min |
| 3 | Add "Tide Bankside" text | Low | 5 min |
| 3 | Add LinkedIn icon | Low | 10 min |
| 3 | Reformat legal links horizontally | Low | 10 min |
| 3 | Reduce footer height | Low | 5 min |
| 4 | About: reduce copy + unbold (same as Phase 1) | Low | 10 min |
| 4 | Our Approach: taller block + new paragraph | Medium | 15 min |
| 4 | Sustainability: left-align + new paragraph | Low | 10 min |
| 5 | Contact: unbold + single-line heading | Low | 5 min |
| 5 | Contact: increase image height + reposition | Low | 10 min |
| 5 | City marquee move above image | Medium | 10 min |
| **Total** | | | **~4 hours** |

---

## Dependencies & Notes

- **Figma assets needed:** FF&E chair SVG, ruler/measurement SVG (request from designer or Figma file)
- **Copy needed:** New paragraphs for Our Approach, Sustainability sections (request from user)
- **Images:** PM&I section image (request from user or Figma export)
- **LinkedIn profile URL:** Needed for LinkedIn icon link

---

## Next: PHASE 6 Implementation

Once Phases 1-5 are complete in Webflow Designer, proceed to PHASE_6_JAVASCRIPT_CHANGES.md for the automated CLI edits.
