---
title: Syncing a shared config file without hiding machine drift
date: 2026-07-13
tag: tools
hook: A visual-check post for file blocks, terminal diagrams, and warning callouts in the blog template.
context: config sync
draft: true
---

## The file

The rule is simple: shared config goes through git, machine-local values stay outside the repo.

```file title="~/.config/duu261/sync.conf" status="synced ✓"
## paths
dotfiles_repo = ~/code/dotfiles
machine_file  = ~/.config/duu261/local.conf

## rules
- never commit secrets
- test shell startup after every prompt change
- keep machine names out of shared config
```

## The topology

```blog-diagram
shared config ──▶ desktop
shared config ──▶ thinkpad
local config  ──▶ ignored file

repo update   ──▶ pull hook ──▶ shell reload ──▶ smoke test
```

## Where it broke

> **警告 WAR STORY -** one laptop carried an old alias for three weeks. Fix was boring: run a sync checklist before pushing config changes.
