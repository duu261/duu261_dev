#!/usr/bin/env bash
# Render a .mmd file to a Catppuccin-themed SVG in public/diagrams/.
# Usage: scripts/mermaid.sh my-diagram.mmd
set -euo pipefail
in="$1"
out="public/diagrams/$(basename "${in%.mmd}").svg"
npx -y @mermaid-js/mermaid-cli -i "$in" -o "$out" \
  -c scripts/mermaid-theme.json \
  -p <(echo '{ "executablePath": "/usr/bin/chromium" }') \
  -b transparent
echo "wrote $out"
