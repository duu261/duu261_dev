---
title: ZMK Cornix + Snake Dongle
role: hardware
stack: [zmk, nrf52840, c]
repo: https://github.com/duu261/zmk-keyboard-cornix
order: 3
summary: Converted a stock split keyboard to ZMK; built a wireless nRF52840 dongle receiver from scratch.
---

Converted a stock RMK split keyboard to ZMK, then built a wireless nRF52840 dongle receiver for it from scratch.

## 問題 Problem

The stock Cornix split keyboard shipped with RMK firmware and no dongle mode - wanted proper ZMK config plus a standalone wireless receiver instead of per-side Bluetooth pairing.

## 構造 Architecture

Keyboard side: forked and modified ZMK firmware for the Cornix split. Dongle side ("Snake Dongle"): nRF52840-based receiver, hardware assembled from scratch (not just a firmware fork) with a 3D-printed case, firmware forked and modified to talk to the keyboard halves.

## 判断 Key decisions

- **D-01**: Built the dongle hardware from scratch rather than buying an off-the-shelf receiver - full control over case and pinout.
- **D-02**: Forked firmware for both keyboard and dongle instead of writing from zero - faster to a working baseline, changes layered on top.

## 反省 What I'd do differently

Document the pin mapping and case dimensions as I went; had to reverse-engineer my own wiring from photos when writing this up.

## Links

- [Keyboard firmware](https://github.com/duu261/zmk-keyboard-cornix)
- [Dongle module](https://github.com/duu261/snake-module)
