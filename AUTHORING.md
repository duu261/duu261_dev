# Writing project/blog markdown

Plain markdown. The build handles the styling - you do NOT hand-write HTML or colors.

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

1. **ASCII (default)**: fenced ```txt block. Any block containing `──▶` is
  auto-colored: source before arrow peach, target after red, `(...)` muted,
  last non-empty line blue. Other fences get normal Catppuccin code highlighting.
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
