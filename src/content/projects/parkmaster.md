---
title: ParkMaster - Parking Building Management System
context: FPT SWP391
role: team project
stack: [spring-boot, postgresql, jwt]
repo: https://github.com/duu261/Parking-Building-Management-System
demo: https://parkmaster.vercel.app
order: 1
summary: "Spring Boot + PostgreSQL + React/Vite. FPT SWP391 capstone: JWT auth, AI slot allocation, VNPay payments."
---

A parking building runs on spreadsheets and shouting. We built the backend that replaces both - slots, sessions, billing, gate events.

## 問題 Problem

FPT SWP391 capstone: simulate a real team backend for parking operations - multi-role access (admin/manager/staff/driver), live slot allocation, and payment handling, backed by a separate React/Vite frontend.

## 構造 Architecture

Spring Boot 3.3 + Spring Security (JWT) + Spring Data JPA + Flyway migrations, PostgreSQL (Neon in production). AI slot-allocation scores every open slot on vehicle-type match, floor load balance, distance to entry, and peak-hour bonus - full breakdown shown to the user, not a black box. VNPay sandbox integration (HMAC-SHA512 signing, IPN callback verification) handles session charges, deposits, and monthly passes.

```txt
React/Vite SPA ──▶ REST API · Spring Boot 3.3
                     ├── auth (JWT, role-based)
                     ├── reservations · slot allocation
                     ├── payments (VNPay IPN)
                     └── reporting
                           │
                     PostgreSQL (Neon)
```

## 判断 Key decisions

- **D-01** Two-tier reservations (free time-slot vs. paid specific-slot) instead of one flat booking model - matches real user willingness to pay for certainty.
- **D-02** Score breakdown exposed in the API instead of a hidden ranking - makes the allocation algorithm auditable and demoable.
- **D-03** Void cascading (voiding a payment auto-cancels linked reservation/pass) to avoid orphaned state across three related tables.

## 反省 What I'd do differently

Backend and frontend versioned in one repo with a two-branch deploy flow (main → deploy); a proper monorepo tool would have made the Vercel/Render split less manual.
