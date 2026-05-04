#!/usr/bin/env node
console.error(`This helper is deprecated.\n\nCanonical DecisionRank seed source now lives directly in:\n- scripts/.seed-payload.json\n- lib/category-enhancements.ts\n- lib/category-use-cases.ts\n\nDo not generate or merge category data through legacy helper scripts anymore. Edit the canonical files directly, then run any validation you need.`);
process.exit(1);
