#!/usr/bin/env bash
# Rebuild bundle.js from the src/ modules (concatenated in filename order = footer order).
set -euo pipefail
cd "$(dirname "$0")"
{
  echo "/* platfform-web-animation — bundled custom code for the Platfform Webflow site."
  echo "   Source of truth: this repo. Served to Webflow via jsDelivr + a single loader script."
  echo "   Each module is an IIFE that self-gates (by pathname and/or element presence)."
  echo "   Concatenated from src/ in footer order. Do not edit bundle.js by hand — edit src/ and rebuild. */"
  for f in src/*.js; do
    echo ""; echo "/* ===== $(basename "$f") ===== */"; cat "$f"; echo ""
  done
} > bundle.js
node --check bundle.js && echo "built bundle.js ($(wc -c < bundle.js) bytes) — syntax OK"
