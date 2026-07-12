---
title: My global config strategy across two Arch machines
date: 2026-05-23
tag: linux
hook: One repo, two machines, zero drift - the config that follows me around.
readTime: 4 min
context: arch workflow
draft: false
---

## Sync shape

One machine should not become the source of truth by accident. Config lives in git, secrets stay outside.

```blog-diagram
dotfiles repo ──▶ desktop
dotfiles repo ──▶ thinkpad
secrets      ──▶ local env only
```

## Guardrails

- Keep machine-specific overrides explicit.
- Do not commit generated caches.
- Test shell startup after every prompt change.
