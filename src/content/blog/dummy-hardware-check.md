---
title: Building a ZMK split keyboard keymap that survives real coursework
date: 2026-03-14
tag: hardware
hook: Layer design, combos, and the boring constraints that matter more than switch choice.
context: zmk keymap
draft: true
---

## Keymap constraint

A good split layout optimizes recovery. When coursework gets intense, the keymap must stay boring under pressure.

```blog-diagram
base layer ──▶ symbols ──▶ navigation
thumbs     ──▶ layers  ──▶ escape hatch

combo press ──▶ firmware ──▶ host keycode ──▶ editor command
```

## Rules that stuck

- Combos only for low-risk actions.
- Navigation layer must be symmetrical.
- Firmware change needs one week of daily use before judging.
