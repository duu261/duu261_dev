---
title: Neovim + tmux vs. an IDE for Java
date: 2026-06-18
tag: java
hook: Contrarian, specific, and measured with real project builds instead of editor folklore.
context: lsp setup
draft: true
---

## What LSP actually gives

Java in Neovim works when the LSP setup owns boring basics: project import, classpath, diagnostics, and refactors.

```blog-diagram
source file ──▶ jdtls ──▶ diagnostics
build file  ──▶ jdtls ──▶ classpath

editor save ──▶ jdtls ──▶ gradle model ──▶ import graph
rename type ──▶ lsp edit ──▶ workspace apply ──▶ compile check
test run    ──▶ tmux pane ──▶ failing method ──▶ quickfix list
```

## Tradeoffs

- IDE still wins for discoverability.
- Neovim wins for terminal flow and tmux pairing.
- Java needs build discipline either way.
