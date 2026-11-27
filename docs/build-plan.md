# Build plan

Introductory accessibility training for University of Utah campus web editors, built for a 15–20 minute interview presentation. Emphasis: **why accessibility matters and the basics**, not technical depth.

The brief asks the training to cover: why accessibility matters; headings, alt text, descriptive links, color contrast and keyboard accessibility; practical ways to find and fix issues; and how accessibility and university branding work together. It also asks for a short demonstration of finding and fixing an issue.

## Topics, in priority order

Cut from the bottom if time runs short.

| # | Topic | Slug | WCAG | Most affected |
|---|---|---|---|---|
| 1 | Images | `images` | 1.1.1 Non-text Content, 1.4.5 Images of Text | No/low vision; cognitive, learning and language disabilities |
| 2 | Color contrast and branding | `contrast` | 1.4.3 Contrast (Minimum), 1.4.1 Use of Color | Low vision; color vision deficiency; older users; situational (glare, bright sun) |
| 3 | Links | `links` | 2.4.4 Link Purpose (In Context), 2.5.3 Label in Name | No/low vision; cognitive, learning and language disabilities; limited mobility (voice control) |
| 4 | Headings and lists | `headings` | 1.3.1 Info and Relationships, 2.4.6 Headings and Labels | No/low vision; cognitive, learning and language disabilities |
| 5 | Keyboard and focus order | `keyboard` | 2.1.1 Keyboard, 2.4.3 Focus Order, 4.1.2 Name, Role, Value | Limited reach, strength or mobility (permanent or temporary); no/low vision |

Topics considered and left out to keep it introductory: documents and PDFs, data tables, video captions, links that open in a new tab, jump links.

## Brand color findings

Source: https://brand.utah.edu/branding/colors/. The guide lists colors but gives **no text/background pairing guidance and no contrast or accessibility statement**. Accent colors are limited to 10% of a design. The typography page gives no minimum sizes.

Calculated contrast ratios (4.5:1 needed for normal text, 3:1 for large text):

| Color | On white | On black | Notes |
|---|---|---|---|
| Utah Red #BE0000 | 6.58 pass | 3.19 large only | White on Utah Red: 6.58 pass |
| Red Rocks #890000 | 10.18 pass | 2.06 fail | |
| Zion Cinder Cone #707271 | 4.85 pass (barely) | 4.33 fail | On Salt Flat Grey: 3.85 fail |
| Granite Peak #708E99 | 3.49 fail | 6.02 pass | White on it: 3.49 fail |
| Wasatch Sunrise #FFB81D | 1.73 fail | 12.13 pass | On Utah Red: 3.80 fail |
| Mountain Green #6CC24A | 2.22 fail | 9.45 pass | |
| Great Salt Lake #3ABFC0 | 2.24 fail | 9.39 pass | |
| Salt Flat Grey #E2E6E6 | 1.26 fail | 16.70 pass | Black on it: 16.70 pass |

Talking point: the brand gives editors the palette, not the safe pairings. Utah Red and white work in both directions; four of the six accent colors fail as text on white.

## Decisions

- `/<topic>/` is the failing page and `/<topic>/fixed/` is the fixed page. No intermediate landing pages. The index links to each failing page.
- Presenter talking points live in one file, `reference-docs/notes.md` (gitignored), separate from this plan. Anything for the talk rather than the pages goes there.
- University images are hotlinked from their public sites. Images of text come from public-domain US government sources (OSHA, FEMA/NFIP), copied to `assets/images/`. No AI-generated images.
- The site itself stays neutral, not styled as an official University page. Example content uses made-up departments.
- Real alt text from the University's sites is not shown as a failure; failing alt text is written by us.

## Build steps

- [x] **0. Shared setup.** `shared.css` (version switcher, topic summary, status labels, mock content box, swatches, visually-hidden utility), `template/` and `template/fixed/`, index page, chrome checked.
- [x] **1. Images.** See checklist below.
- [x] **2. Contrast and branding.**
- [x] **3. Links.**
- [x] **4. Headings and lists.**
- [x] **5. Keyboard and focus order.**
- [ ] **6. Presenter notes.** Filled in as each topic is built, in `reference-docs/notes.md`. Final pass per topic: who is affected, why it matters in 2–3 sentences, what to show in ANDI, and a "stop here" line to keep it basic.
- [ ] **7. Final pass.** HTML validation, contrast check of every color used, keyboard walkthrough, ANDI run on every page (presenter), screenshots of each ANDI result as an offline backup.

## Intended failures, per page

Fill this in as each page is built. A failing page should show these in ANDI and nothing else; a fixed page should show none of them.

### images
Grouped by image type (informative, decorative, functional, images of text). The fixed page keeps the same order and ids, with headings that describe the fix.

Failing page:
- Informative: campus photo with no alt attribute (axe and ANDI flag it)
- Informative: puppy photo with a file name as alt (`IMG_4417.JPG`; tools miss it)
- Informative: "lost dog" photo with `alt=""` (tools miss it)
- Decorative: location pin icon beside a "Location:" label, with alt "red location pin icon" (tools miss it)
- Functional: U logo linking to utah.edu with `alt=""`, so the link has no name (axe and ANDI flag it)
- Image of text: NFIP fact sheet thumbnail with alt "fact sheet graphic" (tools miss it)

Checked: HTML valid; axe reports only `image-alt` and `link-name` on the failing page and nothing on the fixed page. Automated tools catch 2 of the 6, which is itself a talking point.

Images: campus skyline and logo hotlinked from brand.utah.edu, pin icon from utah.edu, dogs from Lorem Picsum (ids 237 and 1025), fact sheet thumbnail from the NFIP agent resource library in `assets/images/`.

### contrast
Kept simple on purpose: 4.5:1 for text, 3:1 for link color against surrounding text. Large-text rules, 1.4.11 button boundaries and disabled controls are left to the presenter notes.

Failing page:
- Callout: white text on Wasatch Sunrise, 1.73:1 (axe `color-contrast`)
- Button: white text on Mountain Green, 2.22:1 (axe `color-contrast`)
- Paragraph links in Red Rocks with no underline, 2.06:1 against the black text (axe `link-in-text-block`)
- Banner image: white text on gold, 1.73:1 (tools miss it; check with a color picker). Image has correct alt text so it fails contrast only.

Fixed page: black text on the same gold (12.13:1) and green (9.45:1); links Fix A (Red Rocks, always underlined) and Fix B (Utah Red, 3.19:1 against black text, underline on hover and focus); banner re-rendered with black text.

Guard rails so nothing fails by accident:
- The button has a 2px `#222` border on both pages, so its green background is never the only thing identifying it (1.4.11).
- Fix B only works because the paragraph text is pure black. Utah Red against the site's `#222` body text is 2.42:1.

Also on both pages: the brand color swatches with a link to https://brand.utah.edu/branding/colors/ for a live Colour Contrast Analyser check.

Checked: HTML valid; axe reports only the three detectable failures above on the failing page and nothing on the fixed page.

Images: `assets/images/open-house-banner_low-contrast.png` and `open-house-banner_fixed.png`, made by rendering HTML in the browser (no AI), in brand colors.

### links
All three examples are genuine Level A failures. Jump links were dropped: their common problems (broken targets, empty `<a id>` anchors) are content-maintenance issues, not WCAG failures. Links shown by color alone are covered on the contrast page.

Failing page:
- "Click here" in its own paragraph, cut off from the paragraph describing it (2.4.4; tools miss it)
- Three cards (plain `div`s) each with a "View details" link to a different site (2.4.4; axe misses it, ANDI should raise an ambiguous-link alert). Card headings do not count as link context: W3C lists the preceding-heading technique (H80) as advisory only.
- Three Commuter Services cards with visible "Learn more" and an `aria-label` of just the card title (2.5.3; axe `label-content-name-mismatch`). Reads fine in a screen reader; fails voice control users. The note spells out the difference between the two.

Fixed page: descriptive link text; card links with descriptive visible text (the simplest fix); "Learn more" cards whose `aria-label` starts with the visible words ("Learn more about the campus shuttle"), for designs that need the same words on every card.

Checked: HTML valid; axe reports only `label-content-name-mismatch` on the failing page and nothing on the fixed page.

### headings
The rule taught: headings and lists must be real (programmatic), not plain text made to look like them, and not used for styling. Heading levels show which topics sit under which (the "indented table of contents" test); skipping a level is fine when the structure is right. How a heading looks (size, font) doesn't matter. Multiple or missing `h1`s, empty headings, pasting from Word, and Shift+Enter fake lists are presenter notes only. Description lists are left out.

Examples are `h2`s like every other page, so the mock content starts at `h3`.

Failing page:
- Bold paragraph used as a heading (1.3.1; tools miss it)
- Announcement set as an `h3` to make it big (1.3.1; tools miss it)
- "Contact Commuter Services" as an `h4` under "Parking permits", though it's a new topic (1.3.1; tools miss it, no level is skipped)
- Vague headings "Overview / Details / More" (2.4.6; tools miss it)
- **Intended pass:** cards with `h4`s directly under the example's `h2` (axe `heading-order` flags it; ANDI doesn't). Same on both pages. Shows a scanner false positive.
- Bullets typed with dashes and line breaks (1.3.1; tools miss it)
- Steps numbered by hand in separate paragraphs (1.3.1; tools miss it)

Fixed page: real `h3`; announcement as a styled paragraph (`.announcement`); "Contact Commuter Services" moved up to `h3`; descriptive headings; `ul` for the unordered list, `ol` for the steps.

Checked: HTML valid; axe reports only `heading-order` (the intended false positive) on both pages.

The index page also has a short "paste as plain text" note (Ctrl+Shift+V), since pasted formatting can cause problems on every topic.

### keyboard
Grouped under two `h2`s: "Test it and report it" (problems built into the design or code, which editors can find with Tab but not fix) and "Fix it in the editor". Examples are `h3`s. Image-plus-text links to the same place were dropped: extra tab stops are a usability point, not a failure (presenter notes).

Failing page:
- Test and report: three "Step" cards flipped with `row-reverse`, so they read 1, 2, 3 but Tab visits 3, 2, 1 (2.4.3), plus a `div` "Email me this checklist" button that only responds to a mouse click (2.1.1). Tools miss both; found by pressing Tab.
- Fix in the editor: empty link after deleted link text (2.4.4, 4.1.2; axe `link-name`, html-validate `wcag/h30`)
- Fix in the editor: Google Maps embed with no `title` (4.1.2; axe `frame-title`, html-validate `element-required-attributes`)

Fixed page: cards in code order 1, 2, 3; a real `<button>`; link text restored (note mentions unlinking as the other fix); `title="Map of the J. Willard Marriott Library"`.

Checked: HTML valid apart from the two intended errors; axe reports only `link-name` and `frame-title` on the failing page and nothing on the fixed page (plus a `frame-tested` review notice on both, from the third-party map). Scripted Tab walkthrough confirmed the 3, 2, 1 order, the skipped button and the focusable empty link on the failing page, and the 1, 2, 3, button order (Enter works) on the fixed page. The map renders.
