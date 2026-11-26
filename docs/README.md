# Repo overview

Developer and maintainer notes. Nothing in `/docs` is linked from the site, but it is committed so it survives the loss of a local copy.

## What this is

A plain static site (no build step, no JavaScript framework) published with GitHub Pages. It holds live example pages for an introductory accessibility training aimed at CMS editors with little or no technical background. Each topic has a page of **failing** examples and a matching page of **fixed** examples, so a presenter can run ANDI on one, switch, and run it again.

It began as a trimmed copy of the `accessibility-training-and-docs` repo, which sits in the same parent folder and uses the same page pattern.

## Structure

```
index.html              Topic list. Links to each topic's failing page.
shared.css              All shared styles. Page-specific styles go in a <style> block in that page.
template/index.html     Copy this to start a topic's failing page.
template/fixed/index.html  Copy this to start a topic's fixed page.
<topic>/index.html      Failing examples for a topic (e.g. /images/).
<topic>/fixed/index.html   Fixed examples for the same topic (e.g. /images/fixed/).
assets/images/          Local images, when a remote URL is not suitable.
docs/                   Repo notes, build plan, check tools. Committed, not linked.
reference-docs/         Source material (interview brief, training notes) and presenter notes (notes.md). Gitignored.
```

### URL convention

`/<topic>/` is always the failing page and `/<topic>/fixed/` is always the fixed page. There are no landing pages between the index and the examples. Keep topic slugs short and stable (`images`, `contrast`, `links`, `headings`, `keyboard`).

## Page anatomy

Every topic page has:

1. A skip link to `#example-container`.
2. A breadcrumb back to the topic list.
3. The `h1`: "<Topic>: failing examples" or "<Topic>: fixed examples".
4. A version switcher (`nav.version-switch`) linking the two versions, with `aria-current="page"` on the current one.
5. A topic summary (`dl.topic-meta`): the WCAG criteria involved (linked to the W3C Understanding docs) and the groups of people most affected.
6. `#example-container`, holding one `section.example` per example. Each has an `h2`, a status label (`.status--fail` or `.status--pass`, written out in words so it does not rely on color), a `.mock-content` box holding the content being tested, and an optional one-line `.example-note`.

## The golden rule for failing pages

A failing page must fail **only** in the ways it is meant to. The page chrome (everything outside `.mock-content`) has to pass, so an ANDI scan shows only the intended problems. When adding an example, record what it is meant to fail in the build plan's checklist, then confirm that is all ANDI reports.

Headings are the hardest case, because the chrome's own `h1`/`h2`s show up in ANDI's heading list next to the broken examples. The headings topic handles this inside its own page; see the build plan.

## Images

Images of the University of Utah's public sites are hotlinked by URL rather than copied, which is acceptable for a one-time presentation. Public-domain US government images (OSHA, FEMA/NFIP) can be copied into `assets/images/`. Do not use AI-generated images.

## Testing

Automated checks live in `docs/tools/` (its `node_modules` is gitignored):

```
cd docs/tools
npm install
npm run validate   # HTML validation of every index.html
npm run axe        # axe-core scan of every topic page, served locally
```

`axe-check.js` serves the repo over a local HTTP server and drives the installed Microsoft Edge through `playwright-core` (`channel: 'msedge'`), so no browser download is needed. Edit the page list in `package.json` as topics are added. On failing pages, axe should report only the intended failures; it will miss some (for example, unhelpful but non-empty alt text), which is why ANDI and a human check still matter.

Manual checks:

- ANDI (bookmarklet, needs internet): https://www.ssa.gov/accessibility/andi/help/install.html
- Colour Contrast Analyser for checking colors by hand.
- Keyboard: Tab through every page and confirm the focus indicator is visible and the order makes sense.
