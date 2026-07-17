---
title: ParkMaster - Parking Building Management System
context: FPT University · SWP391
role: team project
stack: [spring-boot, postgresql, jwt, flyway, vnpay]
repo: https://github.com/duu261/Parking-Building-Management-System
demo: https://parkmaster.vercel.app
order: 1
summary: "Spring Boot 3.5 + PostgreSQL + JWT. FPT University SWP391: 4 roles, stateless auth, automated slot allocation, VNPay payments, 103 tests."
draft: false
---

Most parking buildings still run on spreadsheets and walkie-talkies. We built the backend that replaces both. SWP391 at FPT University is a teamwork-focused course subject, not a graduation project. Four students, ten weeks. I handled the backend alone while three teammates built the frontend.

## 問題 Problem

SWP391 puts you in a team and gives you a deadline. The point is learning to ship together. Our project was a Parking Building Management System with four user roles - Admin, Manager, Staff, Driver. Every feature - check-in, checkout, payments via VNPay, reservations, monthly passes, exception reports - started as an API endpoint I had to write. Three frontend developers built screens in parallel. No endpoint, no screen.

## 構造 Architecture

Spring Boot on Java 21, PostgreSQL, stateless JWT auth, Flyway for database migrations. Deployed on free tiers: Render, Neon, Vercel.

When a driver checks in, the system scores every available slot across four criteria - vehicle type match, floor load, distance to entry, and whether it is peak hour. Every sub-score comes back in the API response. You can see exactly why the system picked slot B over slot A. The rubric called this AI allocation. It is a weighted sum. We defended it anyway by arguing that autonomous multi-criteria decision-making counts, and the panel bought it. VNPay sandbox handles payments through signed redirect URLs with callback verification.

```txt
React/Vite SPA (Vercel) ──▶ REST API · Spring Boot (Render)
                              ├── JwtAuthFilter · stateless HMAC-SHA256
                              ├── RBAC by URL prefix: /admin/** /manager/** /staff/** /driver/**
                              ├── Slot allocation: vehicle + load + distance + peak
                              ├── VNPay v2.1.0 · HMAC-SHA512 ──▶ sandbox.vnpayment.vn
                              └── Flyway migrations ──▶ PostgreSQL (Neon)
```

## 判断 Key decisions

- **D-01** Two kinds of reservations - free reserves a time window, paid locks a specific slot. People will pay for certainty about where they park.
- **D-02** The allocation response includes every sub-score, not just the winner. During the defense you can point at the numbers and explain the choice.
- **D-03** Void a payment, the linked reservation or monthly pass cancels too. One action cleans three tables. No orphaned rows.

## 反省 What I'd do differently

I built more than we needed. The allocation weights, the deploy split, extra tables that never got screens - all things that felt important in week one and did not matter by week ten. Next time I will start by asking what is the smallest thing that actually ships, then stop there. YAGNI is easy to say and hard to do when you are trying to impress a grading panel.
