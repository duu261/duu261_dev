---
title: Dummy Diagram Demo
role: hardware
stack: [demo]
order: 99
summary: Throwaway page to preview a real SVG diagram next to an ASCII one. Delete me.
---

Throwaway page comparing diagram styles. Delete after viewing.

## 問題 Problem

Show how a hand-drawn SVG diagram renders next to the auto-colored ASCII kind.

## 構造 Architecture

ASCII fence, auto-colored by the build plugin:

```txt
client ──▶ REST API (dummy)
             │
            DB
```

Real SVG image, colors drawn into the file itself:

![architecture diagram](/diagrams/dummy.svg)

Mermaid, rendered to SVG locally with mermaid-cli + Catppuccin themeVariables, committed as an asset:

![mermaid diagram](/diagrams/dummy-mermaid.svg)

## 判断 Key decisions

- **D-01** SVG colors live in the file, ASCII colors come from the plugin.

## 反省 What I'd do differently

Nothing, I am a dummy page.
