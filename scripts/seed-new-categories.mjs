#!/usr/bin/env node
console.error(`This helper is deprecated.\n\nCanonical DecisionRank seed source now lives directly in:\n- scripts/.seed-payload.json\n- lib/category-enhancements.ts\n- lib/category-use-cases.ts\n\nDo not create or import category batches through this legacy script anymore. Edit the canonical files directly instead.`);
process.exit(1);
