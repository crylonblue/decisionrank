const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const payloadPath = path.join(__dirname, '.seed-payload.json');
const data = JSON.parse(fs.readFileSync(payloadPath, 'utf8'));
const now = new Date().toISOString();
const uuid = () => crypto.randomUUID();

const targetSlugs = ['smart-rings', 'open-ear-headphones', 'sleep-trackers'];

for (const key of ['categories','rankings','products','ranking_products','specifications','sentiments','faqs']) {
  if (!Array.isArray(data[key])) throw new Error(`Missing array: ${key}`);
}

const rankingIdsToRemove = new Set();
const productIdsToRemove = new Set();
const rankingProductIdsToRemove = new Set();
const categoryIdsToRemove = new Set();

for (const category of data.categories) {
  if (targetSlugs.includes(category.slug)) categoryIdsToRemove.add(category.id);
}
for (const ranking of data.rankings) {
  if (categoryIdsToRemove.has(ranking.category_id)) rankingIdsToRemove.add(ranking.id);
}
for (const rp of data.ranking_products) {
  if (rankingIdsToRemove.has(rp.ranking_id)) {
    rankingProductIdsToRemove.add(rp.id);
    productIdsToRemove.add(rp.product_id);
  }
}

data.categories = data.categories.filter((x) => !categoryIdsToRemove.has(x.id));
data.rankings = data.rankings.filter((x) => !rankingIdsToRemove.has(x.id));
data.products = data.products.filter((x) => !productIdsToRemove.has(x.id));
data.ranking_products = data.ranking_products.filter((x) => !rankingProductIdsToRemove.has(x.id));
data.specifications = data.specifications.filter((x) => !productIdsToRemove.has(x.product_id));
data.sentiments = data.sentiments.filter((x) => !rankingProductIdsToRemove.has(x.ranking_product_id));
data.faqs = data.faqs.filter((x) => !rankingIdsToRemove.has(x.ranking_id));

const categories = [
  {
    id: uuid(),
    name: 'Smart Rings',
    slug: 'smart-rings',
    description: 'Top smart rings for sleep tracking, recovery insights, comfort, battery life, and app quality across wellness-focused wearable buyers.',
    created_at: now,
    updated_at: now,
  },
  {
    id: uuid(),
    name: 'Open-Ear Headphones',
    slug: 'open-ear-headphones',
    description: 'Top open-ear headphones for runners, cyclists, office listeners, and safety-conscious buyers who want audio without sealing off the world.',
    created_at: now,
    updated_at: now,
  },
  {
    id: uuid(),
    name: 'Sleep Trackers',
    slug: 'sleep-trackers',
    description: 'Top sleep trackers for overnight comfort, sleep-stage accuracy, recovery guidance, battery life, and long-term habit-building insights.',
    created_at: now,
    updated_at: now,
  },
];

const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));

const rankings = [
  {
    id: uuid(),
    slug: 'best-smart-rings-2026',
    question: 'What Are the Best Smart Rings in 2026?',
    description: 'We compared leading smart rings on sleep tracking, readiness insights, comfort, battery life, sizing support, and app usefulness to find the best picks for health-focused buyers who want lower-friction wearables.',
    verdict_summary: 'The Oura Ring 4 remains the safest premium recommendation for most buyers, the Ultrahuman Ring Air is the strongest no-subscription alternative, and the RingConn Gen 2 stands out for battery-conscious buyers who want strong sleep data without daily friction.',
    category_id: categoryBySlug['smart-rings'].id,
    created_at: now,
    updated_at: now,
  },
  {
    id: uuid(),
    slug: 'best-open-ear-headphones-2026',
    question: 'What Are the Best Open-Ear Headphones in 2026?',
    description: 'We tested open-ear headphones on comfort, awareness, call quality, battery life, fit security, and real-world sound performance to find the best options for runners, commuters, and desk listeners who do not want sealed earbuds.',
    verdict_summary: 'The Shokz OpenRun Pro 2 is the most balanced recommendation for active buyers, the Bose Ultra Open Earbuds are the easiest premium lifestyle pick, and the Shokz OpenFit 2 offers the best crossover option for buyers who want open-ear comfort without a full bone-conduction feel.',
    category_id: categoryBySlug['open-ear-headphones'].id,
    created_at: now,
    updated_at: now,
  },
  {
    id: uuid(),
    slug: 'best-sleep-trackers-2026',
    question: 'What Are the Best Sleep Trackers in 2026?',
    description: 'We evaluated sleep trackers on overnight comfort, sleep-stage consistency, recovery coaching, battery life, and trend reporting to find the best picks for buyers who care more about better sleep habits than smartwatch extras.',
    verdict_summary: 'The Oura Ring 4 is still the strongest all-around sleep tracker for most buyers, Whoop MG best fits coaching-first recovery users who train hard, and the Withings Sleep Analyzer remains the best non-wearable option for people who want sleep data without wearing anything to bed.',
    category_id: categoryBySlug['sleep-trackers'].id,
    created_at: now,
    updated_at: now,
  },
];

const rankingBySlug = Object.fromEntries(rankings.map((r) => [r.slug, r]));
const products = [];
const ranking_products = [];
const specifications = [];
const sentiments = [];
const faqs = [];

function addProduct(rankingSlug, rankPosition, score, name, link, specs, pros, cons) {
  const productId = uuid();
  const rpId = uuid();
  products.push({ id: productId, name, link, created_at: now, updated_at: now });
  ranking_products.push({
    id: rpId,
    ranking_id: rankingBySlug[rankingSlug].id,
    product_id: productId,
    score,
    rank_position: rankPosition,
    created_at: now,
    updated_at: now,
  });
  for (const [specName, value, unit = null] of specs) {
    specifications.push({ id: uuid(), product_id: productId, name: specName, value, unit, created_at: now, updated_at: now });
  }
  for (const content of pros) {
    sentiments.push({ id: uuid(), ranking_product_id: rpId, user_id: null, type: 'pro', content, headline: content, description: null, created_at: now, updated_at: now });
  }
  for (const content of cons) {
    sentiments.push({ id: uuid(), ranking_product_id: rpId, user_id: null, type: 'con', content, headline: content, description: null, created_at: now, updated_at: now });
  }
}

function addFaq(rankingSlug, display_order, question, answer) {
  faqs.push({ id: uuid(), ranking_id: rankingBySlug[rankingSlug].id, question, answer, display_order, created_at: now, updated_at: now });
}

addProduct('best-smart-rings-2026', 1, 9.4, 'Oura Ring 4', 'https://ouraring.com/', [
  ['Battery Life', '8', 'days'],
  ['Subscription', 'Required for full insights', null],
  ['Sensors', 'Heart rate, temperature, SpO2, movement', null],
  ['Materials', 'Titanium', null],
  ['Sizes', '4-15', null],
  ['Water Resistance', '100 m', null],
], [
  'Still the cleanest overall app and recovery experience for mainstream buyers.',
  'Excellent overnight comfort makes it easy to wear consistently.',
  'Sleep and readiness reporting feel polished instead of overly raw.',
], [
  'Subscription cost raises the real long-term price.',
  'No display or workout-first interaction for buyers who want live metrics.',
  'Sizing process still adds friction before purchase.',
]);
addProduct('best-smart-rings-2026', 2, 9.1, 'Ultrahuman Ring Air', 'https://www.ultrahuman.com/ring/', [
  ['Battery Life', '6', 'days'],
  ['Subscription', 'No', null],
  ['Sensors', 'Heart rate, temperature, movement', null],
  ['Weight', '2.4-3.6', 'g'],
  ['Materials', 'Titanium', null],
  ['Water Resistance', '100 m', null],
], [
  'Best premium smart ring pick for buyers who refuse another subscription.',
  'Metabolic and recovery framing feels ambitious and genuinely engaging.',
  'Lightweight design disappears on the finger quickly.',
], [
  'App polish and coaching consistency still trail Oura.',
  'Battery life is good, but not the category leader.',
  'Some insights can feel more experimental than foundational.',
]);
addProduct('best-smart-rings-2026', 3, 8.9, 'RingConn Gen 2', 'https://ringconn.com/', [
  ['Battery Life', '10', 'days'],
  ['Subscription', 'No', null],
  ['Sensors', 'Heart rate, SpO2, skin temperature', null],
  ['Charging Case', 'Included', null],
  ['Materials', 'Titanium', null],
  ['Water Resistance', '100 m', null],
], [
  'Excellent battery life and the charging case reduce day-to-day maintenance.',
  'No-subscription pricing is easy to justify for value-focused buyers.',
  'Sleep tracking and comfort are strong enough to make it a real Oura alternative.',
], [
  'App ecosystem and third-party integrations are still thinner than top rivals.',
  'Recovery insights are useful, but less refined than Oura.',
  'Brand trust is still developing compared with category leaders.',
]);
addProduct('best-smart-rings-2026', 4, 8.5, 'Samsung Galaxy Ring', 'https://www.samsung.com/us/rings/galaxy-ring/', [
  ['Battery Life', '7', 'days'],
  ['Subscription', 'No', null],
  ['Sensors', 'Heart rate, skin temperature, movement', null],
  ['Platform Fit', 'Best with Samsung phones', null],
  ['Materials', 'Titanium', null],
  ['Water Resistance', '10 ATM', null],
], [
  'Best ecosystem fit for Samsung buyers who want ring plus watch data.',
  'Comfort and battery life are solid for a first-gen mainstream push.',
  'No-subscription approach makes the value proposition easier to understand.',
], [
  'Best features lean heavily toward Samsung phone owners.',
  'Insights are less mature than Oura for sleep-first buyers.',
  'Broad platform compatibility is not its strongest selling point.',
]);
addProduct('best-smart-rings-2026', 5, 8.2, 'Amazfit Helio Ring', 'https://www.amazfit.com/', [
  ['Battery Life', '4', 'days'],
  ['Subscription', 'No', null],
  ['Sensors', 'Heart rate, skin temperature, recovery metrics', null],
  ['Platform Fit', 'Pairs well with Amazfit ecosystem', null],
  ['Materials', 'Titanium alloy', null],
  ['Water Resistance', '10 ATM', null],
], [
  'Appealing choice for existing Amazfit users who want deeper recovery data.',
  'No-subscription model keeps ownership cost predictable.',
  'Training-focused buyers may like the readiness positioning.',
], [
  'Battery life is only average for a ring.',
  'App experience is less polished than Oura or Ultrahuman.',
  'Category newcomers may prefer a more established ecosystem.',
]);
addProduct('best-smart-rings-2026', 6, 7.8, 'Circular Ring Slim', 'https://www.circular.xyz/', [
  ['Battery Life', '5', 'days'],
  ['Subscription', 'No', null],
  ['Sensors', 'Heart rate, SpO2, temperature', null],
  ['Form Factor', 'Slim ring', null],
  ['Materials', 'Metal shell', null],
  ['Water Resistance', 'IPX8', null],
], [
  'Slim shape appeals to buyers who want the least bulky feel possible.',
  'No subscription helps offset the rougher software edges.',
  'Feature ambition is high for sleep and wellness tracking.',
], [
  'Execution and app reliability still feel less mature than top competitors.',
  'Battery life and consistency are not class-leading.',
  'Harder to recommend unless the slimmer shape is your main priority.',
]);

addProduct('best-open-ear-headphones-2026', 1, 9.3, 'Shokz OpenRun Pro 2', 'https://shokz.com/products/openrun-pro-2', [
  ['Type', 'Bone conduction', null],
  ['Battery Life', '12', 'hours'],
  ['Weight', '30.3', 'g'],
  ['Water Resistance', 'IP55', null],
  ['Fast Charge', '5 min = 2.5 hours', null],
  ['Multipoint', 'Yes', null],
], [
  'Best all-around fit for runners who want awareness without constant earbud adjustments.',
  'Comfort and stability stay excellent through long workouts.',
  'Battery life is strong enough for serious training weeks.',
], [
  'Sound quality is enjoyable, but still not as full as sealed earbuds or over-ears.',
  'Price is high for a niche listening format.',
  'Open design naturally leaks more audio in quiet spaces.',
]);
addProduct('best-open-ear-headphones-2026', 2, 9.0, 'Bose Ultra Open Earbuds', 'https://www.bose.com/p/earbuds/bose-ultra-open-earbuds/ULT-HEADPHONEIN.html', [
  ['Type', 'Clip-on open earbuds', null],
  ['Battery Life', '7.5', 'hours'],
  ['Case Battery', '27', 'hours'],
  ['Water Resistance', 'IPX4', null],
  ['Multipoint', 'Yes', null],
  ['Platform Fit', 'Lifestyle and casual daily wear', null],
], [
  'Most premium-feeling open-ear option for casual everyday listening.',
  'Comfort is surprisingly strong once the fit clicks.',
  'Sound is fuller and more mainstream-friendly than most bone-conduction options.',
], [
  'Expensive enough that buyers should be sure they want open-ear convenience specifically.',
  'Not the best pick for intense workouts compared with sport-first rivals.',
  'Battery life is good, but not class-leading.',
]);
addProduct('best-open-ear-headphones-2026', 3, 8.8, 'Shokz OpenFit 2', 'https://shokz.com/products/openfit-2', [
  ['Type', 'Air conduction earbuds', null],
  ['Battery Life', '11', 'hours'],
  ['Case Battery', '48', 'hours'],
  ['Water Resistance', 'IP55', null],
  ['Multipoint', 'Yes', null],
  ['Controls', 'Physical + touch', null],
], [
  'Excellent crossover pick for buyers who want open-ear awareness with a more familiar earbud feel.',
  'Very strong total battery life with the case.',
  'Comfort works for long desk sessions as well as lighter workouts.',
], [
  'Still cannot match sealed earbuds for bass weight and isolation.',
  'Fit security depends more on ear shape than neckband-style Shokz models.',
  'Premium pricing keeps it out of impulse-buy territory.',
]);
addProduct('best-open-ear-headphones-2026', 4, 8.5, 'Sony LinkBuds Open', 'https://electronics.sony.com/audio/headphones/truly-wireless-earbuds/p/linkbudsopen', [
  ['Type', 'Open ring earbuds', null],
  ['Battery Life', '8', 'hours'],
  ['Case Battery', '22', 'hours'],
  ['Water Resistance', 'IPX4', null],
  ['Multipoint', 'Yes', null],
  ['Assistant Support', 'Alexa / Google', null],
], [
  'Excellent awareness for office and urban-walking use.',
  'Light, unusual fit works well for buyers who dislike in-ear pressure.',
  'Sony app features and controls are deeper than many open rivals.',
], [
  'Open ring design is polarizing for both fit and sound.',
  'Not the best choice for noisy gyms or public transport.',
  'Case battery is merely average.',
]);
addProduct('best-open-ear-headphones-2026', 5, 8.1, 'Cleer ARC 3 Sport Pro', 'https://cleeraudio.com/', [
  ['Type', 'Open-ear hook earbuds', null],
  ['Battery Life', '10', 'hours'],
  ['Case Battery', '40', 'hours'],
  ['Water Resistance', 'IPX7', null],
  ['Fit', 'Ear hook', null],
  ['Spatial Audio', 'Supported', null],
], [
  'Sporty ear-hook fit gives active buyers reassuring stability.',
  'Water resistance is among the strongest in this category.',
  'Battery life and case endurance are both very solid.',
], [
  'Bulkier than more lifestyle-oriented open-ear designs.',
  'Sound tuning is fun, but not the most natural.',
  'Brand confidence and software polish trail Sony and Bose.',
]);
addProduct('best-open-ear-headphones-2026', 6, 7.7, 'Soundcore AeroFit 2', 'https://www.soundcore.com/products/aerofit-2', [
  ['Type', 'Open-ear hook earbuds', null],
  ['Battery Life', '10', 'hours'],
  ['Case Battery', '42', 'hours'],
  ['Water Resistance', 'IP55', null],
  ['Multipoint', 'Yes', null],
  ['Price Tier', 'Mid-range value', null],
], [
  'Good value for buyers who want to try open-ear audio without paying Bose money.',
  'Battery life and comfort are competitive for the price.',
  'Multipoint and app EQ help it feel less stripped down than cheap alternatives.',
], [
  'Sound still feels clearly less refined than pricier leaders.',
  'Case and materials do not feel especially premium.',
  'Fit and call quality can be merely decent rather than standout.',
]);

addProduct('best-sleep-trackers-2026', 1, 9.4, 'Oura Ring 4', 'https://ouraring.com/', [
  ['Form Factor', 'Ring', null],
  ['Battery Life', '8', 'days'],
  ['Subscription', 'Required for full insights', null],
  ['Sleep Tracking', 'Stages + readiness + temperature', null],
  ['Comfort', 'Excellent for overnight wear', null],
  ['Water Resistance', '100 m', null],
], [
  'Still the strongest blend of sleep insights, comfort, and app polish in the category.',
  'Low-friction overnight wear makes long-term habit tracking realistic.',
  'Recovery and readiness trends are genuinely useful for most people.',
], [
  'Subscription raises the true ownership cost.',
  'Buyers who dislike jewelry-style wearables may bounce off the form factor.',
  'Workout experience is secondary to sleep and recovery.',
]);
addProduct('best-sleep-trackers-2026', 2, 9.0, 'Whoop MG', 'https://www.whoop.com/', [
  ['Form Factor', 'Screenless band', null],
  ['Battery Life', '14', 'days'],
  ['Subscription', 'Membership required', null],
  ['Sleep Tracking', 'Sleep need + strain + recovery', null],
  ['Charging', 'On-wrist battery pack', null],
  ['Water Resistance', 'IP68', null],
], [
  'Best coaching-first sleep and recovery platform for hard-training buyers.',
  'On-wrist charging reduces compliance friction.',
  'Excellent long-term trend framing for people who actually act on data.',
], [
  'Membership pricing is hard to justify for casual users.',
  'No screen means it is terrible for buyers who want immediate wrist feedback.',
  'More training-centric than some pure sleep buyers need.',
]);
addProduct('best-sleep-trackers-2026', 3, 8.8, 'Withings Sleep Analyzer', 'https://www.withings.com/us/en/sleep-analyzer', [
  ['Form Factor', 'Under-mattress pad', null],
  ['Battery Life', 'Plug-in', null],
  ['Sleep Tracking', 'Sleep cycles, snoring, heart rate', null],
  ['Sleep Apnea Detection', 'Supported in select regions', null],
  ['Wear Requirement', 'None', null],
  ['Platform', 'iOS / Android', null],
], [
  'Best option for people who want sleep data without wearing anything to bed.',
  'Great for buyers who find rings and bands annoying overnight.',
  'Set-and-forget behavior makes compliance almost effortless.',
], [
  'Less useful for daytime recovery context than wearable rivals.',
  'Shared beds and changing sleep positions can complicate the experience.',
  'Not ideal if you frequently sleep away from home.',
]);
addProduct('best-sleep-trackers-2026', 4, 8.5, 'Google Pixel Watch 3', 'https://store.google.com/product/pixel_watch_3', [
  ['Form Factor', 'Smartwatch', null],
  ['Battery Life', '36', 'hours'],
  ['Sleep Tracking', 'Fitbit sleep score + stages', null],
  ['Subscription', 'Fitbit Premium optional', null],
  ['Comfort', 'Good for smaller wrists', null],
  ['Platform Fit', 'Android-first', null],
], [
  'Strong choice for buyers who want one device for sleep plus full smartwatch duties.',
  'Fitbit sleep experience remains approachable and mainstream-friendly.',
  'Comfort is good enough that overnight wear feels realistic for many users.',
], [
  'Battery life is mediocre for dedicated sleep tracking.',
  'Less specialized than ring- or band-first sleep trackers.',
  'Best experience still leans Android.',
]);
addProduct('best-sleep-trackers-2026', 5, 8.3, 'Garmin Venu 3', 'https://www.garmin.com/en-US/p/873008', [
  ['Form Factor', 'Smartwatch', null],
  ['Battery Life', '14', 'days'],
  ['Sleep Tracking', 'Sleep coach + HRV status', null],
  ['Training Metrics', 'Recovery and body battery', null],
  ['GPS', 'Built in', null],
  ['Platform', 'iOS / Android', null],
], [
  'Great pick for buyers who want serious sleep data without giving up fitness depth.',
  'Battery life is much better than most mainstream smartwatches.',
  'Garmin recovery tools help connect sleep to training decisions.',
], [
  'Interface and insights can feel denser than casual users want.',
  'Not as discreet or sleep-first comfortable as a ring.',
  'More device than pure sleep buyers usually need.',
]);
addProduct('best-sleep-trackers-2026', 6, 7.9, 'Fitbit Charge 6', 'https://store.google.com/product/fitbit_charge_6', [
  ['Form Factor', 'Tracker band', null],
  ['Battery Life', '7', 'days'],
  ['Sleep Tracking', 'Sleep score + stages', null],
  ['GPS', 'Built in', null],
  ['Subscription', 'Fitbit Premium optional', null],
  ['Platform', 'iOS / Android', null],
], [
  'Easy recommendation for buyers who want sleep tracking in a simple mainstream band.',
  'Good balance of comfort, app clarity, and everyday health tracking.',
  'More affordable than premium rings and coaching platforms.',
], [
  'Insights feel less advanced than Oura or Whoop.',
  'Band-style wear is not as invisible overnight as a ring or under-mattress tracker.',
  'Google/Fitbit ecosystem uncertainty may give some buyers pause.',
]);

addFaq('best-smart-rings-2026', 1, 'Are smart rings better than smartwatches for sleep tracking?', 'Often yes for comfort. Smart rings are usually lighter, less distracting at night, and easier to wear consistently, which matters a lot for useful sleep data. Smartwatches still win if you want notifications, screens, workouts, and a broader all-day device.');
addFaq('best-smart-rings-2026', 2, 'Do smart rings need a subscription?', 'Some do, some do not. Oura still relies on a subscription for full insight depth, while brands like Ultrahuman and RingConn lean harder on one-time purchase pricing. Buyers should always compare total first-year and second-year cost, not just sticker price.');
addFaq('best-smart-rings-2026', 3, 'What matters most when buying a smart ring?', 'Comfort, sizing confidence, battery life, and app usefulness matter more than flashy sensor claims. A ring that feels awkward or has weak reporting will not stay on your finger long enough to create useful health trends.');
addFaq('best-smart-rings-2026', 4, 'Can a smart ring replace a fitness tracker?', 'Sometimes, but not always. Smart rings are strong for sleep, readiness, and passive health trends, but weaker for live workout interaction, screens, and some exercise-specific metrics. Buyers who train often may still prefer a watch or tracker alongside a ring.');
addFaq('best-smart-rings-2026', 5, 'How long should a good smart ring battery last?', 'Around 5 to 8 days is now the practical sweet spot, with some rings stretching closer to 10. Anything that needs charging every couple of days adds enough friction to hurt overnight tracking consistency.');

addFaq('best-open-ear-headphones-2026', 1, 'Who should buy open-ear headphones instead of earbuds?', 'Buyers who want situational awareness while running, cycling, walking, or working in shared spaces are the best fit. Open-ear models are also helpful for people who dislike the pressure or occlusion feeling of in-ear buds.');
addFaq('best-open-ear-headphones-2026', 2, 'Do open-ear headphones sound worse than regular earbuds?', 'Usually yes in pure sound-quality terms. They trade bass weight and isolation for comfort and awareness, so the best way to judge them is by whether that trade-off fits your routine instead of expecting closed-off earbud sound.');
addFaq('best-open-ear-headphones-2026', 3, 'Are bone-conduction headphones and open-ear earbuds the same thing?', 'Not exactly. Bone-conduction models send vibration through your cheekbones, while open-ear earbuds usually sit near the ear and fire sound toward it. Both keep your ears open, but they can feel and sound quite different.');
addFaq('best-open-ear-headphones-2026', 4, 'Are open-ear headphones good for office use?', 'They can be, especially if you want background audio while staying aware of coworkers or kids at home. They are less ideal in noisy offices because the open design cannot block distractions the way ANC earbuds or over-ear headphones can.');
addFaq('best-open-ear-headphones-2026', 5, 'What matters most when choosing open-ear headphones for running?', 'Fit stability, comfort, water resistance, and usable battery life matter most. Open-ear buyers should also pay attention to control quality because fiddly touch controls are especially annoying mid-run.');

addFaq('best-sleep-trackers-2026', 1, 'What is the best form factor for sleep tracking?', 'The best form factor is the one you will actually tolerate all night. Rings are excellent for low-friction wear, slim bands work well for buyers who already like trackers, and under-mattress sensors are best for people who hate wearing anything to bed.');
addFaq('best-sleep-trackers-2026', 2, 'How accurate are consumer sleep trackers?', 'They are usually good for trend tracking and rough sleep-stage patterns, but not perfect substitutes for clinical sleep studies. The biggest value is spotting consistent changes over time, not obsessing over every single nightly score.');
addFaq('best-sleep-trackers-2026', 3, 'Should I buy a dedicated sleep tracker or use my smartwatch?', 'Use your smartwatch if you already wear it comfortably overnight and like its app. Buy a dedicated sleep tracker if your watch battery, comfort, or sleep insights keep you from using it consistently.');
addFaq('best-sleep-trackers-2026', 4, 'Do I need a subscription for useful sleep tracking?', 'Not always. Some products lock deeper coaching behind subscriptions, while others provide solid baseline sleep and recovery data with no recurring fee. Buyers should decide whether they want raw trends, lightweight coaching, or a more hands-on health platform.');
addFaq('best-sleep-trackers-2026', 5, 'What matters more: comfort or feature depth in a sleep tracker?', 'Comfort usually wins. If a tracker annoys you, overheats, pinches, or runs out of battery too often, the extra features do not matter because the device will spend more time on the charger or nightstand than on your body.');

data.categories.push(...categories);
data.rankings.push(...rankings);
data.products.push(...products);
data.ranking_products.push(...ranking_products);
data.specifications.push(...specifications);
data.sentiments.push(...sentiments);
data.faqs.push(...faqs);

fs.writeFileSync(payloadPath, JSON.stringify(data, null, 2) + '\n');
console.log(`Updated seed payload with ${categories.length} categories, ${products.length} products, and ${faqs.length} FAQs.`);
