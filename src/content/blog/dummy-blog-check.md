---
title: How I keep two Arch machines in sync
date: 2026-07-12
tag: linux
hook: One repo, two machines, and enough guardrails to stop local drift from becoming invisible.
readTime: 5 min
context: dotfiles
draft: false
---

## The topology

The repo owns shared config. Each machine owns hardware-specific overrides and secrets.

```blog-diagram
dotfiles repo ──▶ desktop
dotfiles repo ──▶ thinkpad
secrets       ──▶ local env only
```

## The config

Everything important is versioned. Everything sensitive is local.

- Shell prompt stays fast.
- Machine-specific values sit in ignored files.
- Startup changes get tested on both machines before staying.

## Where it broke

> **警告 WAR STORY -** one laptop carried an old shell alias for three weeks. Fix was boring: sync checklist before pushing config changes.
