---
title: Template stress check for blog rendering
date: 2026-07-14
tag: tools
hook: A dense dummy post that exercises prose, inline code, diagrams, file panels, and warning callouts in one place.
readTime: 9 min
context: render audit
draft: false
---

## The topology

The operator owns the plan and updates one machine at a time. Each step reports evidence back before git history moves.

```blog-diagram
operator (plans, reviews, owns git)
    ├──▶ worker: api      controllers + services
    ├──▶ worker: db       schema + migrations
    └──▶ worker: tests    red first, green second
```

## The config

Everything lives in a shared `sync.conf`, versioned and checked on both machines before staying.

```file title="~/.config/duu261/sync.conf" status="synced ✓"
## agents
orchestrator = plans, reviews, owns git
workers      = one module each, no cross-edits

## rules
- workers never run git commands
- every handoff names its review step
```

## Where it broke

> **警告 WAR STORY -** one laptop kept an old alias for three weeks. The fix was procedural: every config update now ends with a reload check on both machines.
