#!/usr/bin/env python3
import sys
sys.stderr.write(
    "This helper is deprecated.\n\n"
    "Canonical DecisionRank seed source now lives directly in:\n"
    "- scripts/.seed-payload.json\n"
    "- lib/category-enhancements.ts\n"
    "- lib/category-use-cases.ts\n\n"
    "Do not merge category additions through this legacy script anymore. Edit the canonical files directly instead.\n"
)
sys.exit(1)
