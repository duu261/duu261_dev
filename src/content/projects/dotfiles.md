---
title: Dotfiles
role: daily driver
stack: [arch, hyprland, ansible]
repo: https://github.com/duu261/dotfiles
order: 2
summary: Arch + Hyprland + Neovim + tmux config, Ansible-managed.
---

Arch + Hyprland + Neovim + tmux, managed with Ansible so a fresh machine is one playbook away from daily-driver ready.

## 問題 Problem

Reinstalling a machine (or setting up a second one) meant re-copying configs by hand and forgetting something every time.

## 構造 Architecture

Ansible playbooks own package installs and symlinking; configs live in `~/dotfiles/` as the single source of truth for Hyprland, Neovim, tmux, and shell.

## 判断 Key decisions

- **D-01** Ansible over a shell-script installer - idempotent re-runs instead of "did I already do this."

## 反省 What I'd do differently

Split machine-specific overrides (desktop vs. ThinkPad) into their own inventory group earlier instead of branching inline in tasks.
