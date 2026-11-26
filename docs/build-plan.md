# Build plan

Introductory accessibility training for University of Utah campus web editors, built for a 15–20 minute interview presentation. Emphasis: **why accessibility matters and the basics**, not technical depth.

The brief asks the training to cover: why accessibility matters; headings, alt text, descriptive links, color contrast and keyboard accessibility; practical ways to find and fix issues; and how accessibility and university branding work together. It also asks for a short demonstration of finding and fixing an issue.

## Topics, in priority order

Cut from the bottom if time runs short.

| # | Topic | Slug | WCAG | Most affected |
|---|---|---|---|---|
| 1 | Images | `images` | 1.1.1 Non-text Content, 1.4.5 Images of Text | No/low vision; cognitive, learning and language disabilities |
| 2 | Color contrast and branding | `contrast` | 1.4.3 Contrast (Minimum), 1.4.1 Use of Color | Low vision; color vision deficiency; older users; situational (glare, bright sun) |
| 3 | Links and jump links | `links` | 2.4.4 Link Purpose (In Context), 1.4.1 Use of Color | No/low vision; cognitive, learning and language disabilities; limited mobility (voice control) |
| 4 | Headings and lists | `headings` | 1.3.1 Info and Relationships, 2.4.6 Headings and Labels | No/low vision; cognitive, learning and language disabilities |
| 5 | Keyboard and focus order | `keyboard` | 2.1.1 Keyboard, 2.4.3 Focus Order, 4.1.2 Name, Role, Value | Limited reach, strength or mobility (permanent or temporary); no/low vision |

Topics considered and left out to keep it introductory: documents and PDFs, data tables, video captions, links that open in a new tab.

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
- Presenter notes live in `/notes/<topic>.md`, gitignored, and will be deleted after the presentation.
- University images are hotlinked from their public sites. Images of text come from public-domain US government sources (OSHA, FEMA/NFIP), copied to `assets/images/`. No AI-generated images.
- The site itself stays neutral, not styled as an official University page. Example content uses made-up departments.
- Real alt text from the University's sites is not shown as a failure; failing alt text is written by us.

## Build steps

- [x] **0. Shared setup.** `shared.css` (version switcher, topic summary, status labels, mock content box, swatches, visually-hidden utility), `template/` and `template/fixed/`, index page, chrome checked.
- [ ] **1. Images.** See checklist below.
- [ ] **2. Contrast and branding.**
- [ ] **3. Links and jump links.**
- [ ] **4. Headings and lists.**
- [ ] **5. Keyboard and focus order.**
- [ ] **6. Presenter notes** in `/notes/`, one per topic: who is affected, why it matters in 2–3 sentences, what to show in ANDI, and a "stop here" line to keep it basic.
- [ ] **7. Final pass.** HTML validation, contrast check of every color used, keyboard walkthrough, ANDI run on every page (presenter), screenshots of each ANDI result as an offline backup.

## Intended failures, per page

Fill this in as each page is built. A failing page should show these in ANDI and nothing else; a fixed page should show none of them.

### images
Failing page:
- Content image with a filename as alt
- Content image with "Image of…" style alt
- Image whose alt repeats the visible caption
- Decorative icon next to a text label, with alt text (read twice)
- Logo link with empty alt (link has no name)
- Card where image and title are separate links to the same place
- Image of text (event flyer) with alt "flyer" and no text alternative

### contrast
Failing page:
- Accent colors (Granite Peak, Wasatch Sunrise, Mountain Green, Great Salt Lake) as text on white
- Zion Cinder Cone text on Salt Flat Grey
- White text over the campus skyline photo with no backing
- "Required fields are marked in red": meaning by color alone

### links
Failing page:
- "Click here" and "Read more"
- Bare URL as link text
- Several "Register" links to different events
- Link to a PDF with no file type
- Links distinguished from text by color alone
- Table of contents where one jump link targets an ID that does not exist

### headings
Failing page:
- Bold paragraphs used as headings
- Heading levels chosen for size
- Heading used for a large callout that is not a heading
- A second `h1` in the content
- Lists typed with dashes and numbers

### keyboard
Failing page:
- Empty link left behind by the editor
- Image link and text link to the same place (duplicate tab stops)
- Layout where the visual order differs from the reading order
- Embedded iframe with no title
