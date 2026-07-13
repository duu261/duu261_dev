---
title: Template stress check for blog rendering
date: 2026-07-14
tag: tools
hook: A dense dummy post that exercises every markdown construct the blog theme supports - prose, headings, lists, tables, code, diagrams, file panels, and callouts.
context: render audit
draft: true
---

## The topology

The operator owns the plan and updates one machine at a time. Each step reports evidence back before git history moves. Inline code like `systemctl --user status` stays peach, **bold stays bright**, and *italic stays italic*. Links such as [the Arch wiki](https://wiki.archlinux.org/) get the peach underline.

```blog-diagram
operator (plans, reviews, owns git)
    ├──▶ worker: api      controllers + services
    ├──▶ worker: db       schema + migrations
    └──▶ worker: tests    red first, green second
```

### Deeper cut

An h3 carries a sub-point inside a section without earning a new prompt marker.

#### Field note

An h4 reads as a small mono label, nothing louder.

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

Rollout order matters, so it is numbered:

1. Snapshot the current config on both machines.
2. Apply the change on the laptop first.
3. Reload, verify, then mirror to the desktop.

Unordered notes keep the arrow bullets:

- laptop and desktop share one dotfiles repo
- secrets never enter the repo
- reload check runs on every apply

| machine | role | sync |
| ------- | ---- | ---- |
| laptop | daily driver | push |
| desktop | build box | pull |

Regular highlighted code keeps the Catppuccin theme:

```java
public final class SyncCheck {
    public static void main(String[] args) {
        var drift = ConfigDiff.between("laptop", "desktop");
        if (!drift.isEmpty()) throw new IllegalStateException(drift.report());
    }
}
```

---

## Where it broke

> **警告 WAR STORY -** one laptop kept an old alias for three weeks. The fix was procedural: every config update now ends with a reload check on both machines.

A plain quote with emphasis inside must not turn into a warning label:

> Configuration drift is **silent** until the day it is not.
