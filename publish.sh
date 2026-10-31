#!/bin/bash
# Rebuild the phone apps from their sources and push them live.
# New stories in docs/newspaper/articles.json trigger the Newspaper alert workflow.
set -e
cd "$(dirname "$0")"
python3 build.py
git add -A
if git diff --cached --quiet; then echo "Phone apps already up to date."; exit 0; fi
git commit -q -m "${1:-Update phone apps}"
git push -q origin main
echo "Pushed. Live in about a minute at https://coltonhall523-lang.github.io/phone-apps/"
