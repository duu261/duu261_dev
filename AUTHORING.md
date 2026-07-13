# Writing project/blog markdown

Plain markdown. The build handles the styling - you do NOT hand-write HTML or colors.

## Workflow

1. Create the file: `src/content/blog/my-post.md` or `src/content/projects/my-project.md`.
   The filename stem is the URL slug: `parkmaster.md` -> `/projects/parkmaster`.
2. Add frontmatter (schemas below). Missing or invalid fields fail the build.
3. Preview: `pnpm dev`, then open `localhost:4321/blog/my-post`. `draft: true`
   removes the entry from all routes, lists, and counts - including the dev
   server - so keep `draft: false` while previewing and only flip it to `true`
   if you commit unfinished work.
4. Before committing, `pnpm build` must pass.

## Blog frontmatter

```yaml
---
title: What I learned shipping ParkMaster
date: 2026-07-14            # YYYY-MM-DD
tag: java                   # java | tools | linux | brse | hardware
hook: One or two sentences shown on the /blog index.
context: FPT SWP391         # optional, shown in the post meta line
draft: false                # true = excluded from the site entirely
---
```

Read time is computed at build (200 wpm on the body) - never write it by hand.

## Project frontmatter

```yaml
---
title: ParkMaster - Parking Building Management System
context: FPT SWP391        # optional, shown peach before role
role: team project         # team project | daily driver | hardware
stack: [spring-boot, postgresql, jwt]
repo: https://github.com/...   # optional -> REPO button
demo: https://...              # optional -> LIVE DEMO button
order: 1                   # position on /projects
summary: One-liner for cards.
draft: false               # true = excluded from the site entirely
---
```

## Body structure

- First paragraph = hook shown on /projects index. Hidden on the case page itself.
- Sections: `## 問題 Problem`, `## 構造 Architecture`, `## 判断 Key decisions`,
  `## 反省 What I'd do differently`. JP label is auto-split into the small red
  kicker - just type it inline.
- Decisions: `- **D-01** One sentence.` - renders as notched cards with the
  label in its own column. No colon after D-01.
- The paragraph DIRECTLY after `## 構造 Architecture` renders in the peach-bordered
  block (and the one after `## 反省 ...` in the red callout). Diagrams get their own
  box always. Order controls the box count: diagram first = one box (prose below
  stays plain); prose first = prose box + diagram box.
- No `## Links` section - repo/demo buttons come from frontmatter.
- No em dashes - spaced hyphens.

## Diagrams

1. **ASCII (default)**: fenced ```txt block. Any fence containing `──▶`
  (whatever its language) is auto-colored: source before arrow peach, target
  after red, `(...)` muted, last non-empty line blue. Keep `──▶` out of real
  code samples or they turn into diagrams. Fences without the arrow get normal
  Catppuccin code highlighting.
2. **Excalidraw/hand SVG**: draw with palette colors, save to `public/diagrams/`,
   embed `![alt](/diagrams/name.svg)`.
3. **Mermaid**: write `foo.mmd`, run `scripts/mermaid.sh foo.mmd`, commit the
   SVG it writes to `public/diagrams/`, embed as image. Never rendered at site
   build - keeps deploy chromium-free and the site zero-JS.

Palette hexes when drawing: red #ed8796 · peach #f5a97f · blue #8aadf4 ·
green #a6da95 · text #cad3f5 · muted #6e738d · bg #24273a / #1e2030.

## Blog-only blocks

- File panel: fenced ```file block with metadata:
  ````md
  ```file title="~/.config/app.conf" status="synced ✓"
  ## paths
  key = value
  - rule item
  ```
  ````
  The build renders the notched terminal file panel and colors comments, keys,
  values, and bullets. Do not hand-write HTML.
- Warning callout: blockquote with bold label:
  `> **警告 WAR STORY -** One sentence.`
- Blog diagram: fenced ```blog-diagram block. Same arrow coloring as diagrams,
  but no special blue final line, so all rows stay visually consistent.

## Markdown coverage (blog + projects)

Every standard construct is themed on both templates - write plain markdown and
it lands on-style. Projects keep their own extras (decision cards, boxed
構造/反省 paragraphs, blue-final-line txt diagrams); blog keeps file panels and
blog-diagram:

| construct | renders as |
| --------- | ---------- |
| `## h2` | Shippori heading with red ❯ prompt |
| `### h3` | smaller Shippori heading, no prompt |
| `#### h4` | small mono uppercase label |
| `- item` | red ▸ bullets |
| `1. item` | peach `01` `02` mono counters |
| `**bold**` | brighter text weight 700 |
| `` `code` `` | peach inline chip |
| `[link](url)` | peach underline, red on hover |
| `---` | centered `· · ·` divider |
| tables | mono, bordered, mono uppercase header row |
| ` ```lang ` | Catppuccin-highlighted panel, peach left edge |
| images | full-width, thin border |
| `> quote` | red-edged callout; bold **first** word set styles the 警告 label |

Stress page with every construct once: `src/content/blog/dummy-template-check.md`.
It ships with `draft: true`, so set `draft: false` locally and run `pnpm dev` to
view it at `/blog/dummy-template-check` - revert before committing.
