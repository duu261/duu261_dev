---
title: SWP391 taught me to say no to my own plans
date: 2026-07-17
tag: brse
hook: Ten weeks, four people, one backend. I overbuilt the database and had to tell my team we were cutting scope.
context: FPT University · SWP391
draft: false
---

Week four I called a meeting I really did not want to call.

SWP391 at FPT University is a teamwork-focused course subject. They put four students in a room, give them ten weeks, and tell them to build something. I was the only backend developer. Three frontend teammates. We picked a Parking Building Management System.

I was the bottleneck and I knew it. So I overcorrected.

## The overbuild

Week one I started designing for a real parking garage. Vehicle types, pricing tiers, peak-hour pricing, reservation deposits, exception reports, monthly passes, analytics dashboards. I kept adding tables to the database. By week two I had migrations for features the frontend team had zero screens for. By week four the list was 15 files and growing.

Every one of those files was a feature I promised on behalf of three people who had no idea the promise existed.

## The conversation

I finally looked at what the frontend team actually had. Check-in, checkout, basic reservations. Five screens. I had planned enough features for triple that.

So I called a meeting and laid it out: here is everything I planned, here is what we actually have screens for, here is the gap. Then I went through the list and proposed cuts. We argued about one feature for twenty minutes. Then we agreed on what stays and what goes.

```blog-diagram
Week 1-3: I design alone ──▶ Database grows unchecked ──▶ Frontend team unaware
Week 4:    I call meeting ──▶ Show the gap ──▶ Propose cuts
Week 5-9:  Cut scope ──▶ Ship working flows ──▶ Defense-ready demo
```

> **警告 WAR STORY -** The features I cut were not stupid. Monthly pass auto-renewal, analytics across multiple buildings, a notification system for expiring reservations - any real parking garage would want these. They were stupid for ten weeks with three frontend developers. A good idea at the wrong time is just a delayed bug.

## What actually shipped

We landed at 23 database migrations instead of the 30-something I sketched. Four user roles, automated slot allocation, VNPay payments, reservation tiers, exception reporting, analytics. Every feature had a screen in front of it and worked end to end.

The stack was fine. Stateless auth, versioned migrations so anyone on the team could get the same database with one command, a single file showing which roles could hit which endpoints. None of that was the hard part.

## What transfers

I walked into SWP391 thinking the hard thing was the code. It is not. The hard thing is building only what fits in the time you actually have, and then telling your team when you screwed that up.

Next time, week one is screens with the whole team in the room. Scope is not a backend call. It is everyone's problem.
