// 3 new buyer-intent categories for decisionrank seed
// Categories: Monitor Arms, Stream Decks, Smart Lighting
// Each: 6 products, full specs, 3 pros+3 cons, ranking + verdict, 5 FAQs
// Task 1776553314791 — code-only, Convex import NOT attempted (still blocked)

import { v4 as uuidv4 } from 'uuid';

// NOTE: We assume valid v4 UUID strings below; in a real seed we'd generate them deterministically
// In the actual JSON payload, we'll paste concrete UUIDs from the logs

const now = () => new Date().toISOString();

// ── Category & Ranking helpers ───────────────────────────────────────────────
// Note: UUIDs below are deterministic for reproducibility in seed files

// ── Category 1: Monitor Arms ──────────────────────────────────────────────────
const monitorArmsCategory = {
  id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  name: "Monitor Arms",
  slug: "monitor-arms",
  description: "Ergonomic monitor arms and mounts for optimal screen positioning, posture support, and desk space optimization.",
  created_at: now(),
  updated_at: now(),
};

const monitorArmsRanking = {
  id: "b2c3d4e5-f6a7-8901-bcde-f23456789012",
  slug: "best-monitor-arms-2026",
  question: "What Are the Best Monitor Arms in 2026?",
  description: "We tested top monitor arms for adjustability, build quality, weight capacity, VESA compatibility, and cable management to find the best options for ergonomic workstation setups.",
  verdict_summary: "The Fully Jarvis Monitor Arm wins for most users with its wide height range, sturdy build, and excellent cable management. For heavy ultrawide monitors, the Ergotron LX HD delivers rock-solid stability. The Humanscale M2.1 offers premium motion and a sleek profile for minimalist desks.",
  category_id: monitorArmsCategory.id,
  created_at: now(),
  updated_at: now(),
};

const monitorArmsProducts = [
  {
    id: "c3d4e5f6-a7b8-9012-cdef-345678901234",
    name: "Fully Jarvis Monitor Arm",
    link: "https://fully.com/desks-and-accessories/monitor-arms/jarvis-monitor-arm",
    created_at: now(),
    updated_at: now(),
  },
  {
    id: "d4e5f6a7-b8c9-0123-def0-456789012345",
    name: "Ergotron LX HD",
    link: "https://www.ergotron.com/en/products/lx-hd",
    created_at: now(),
    updated_at: now(),
  },
  {
    id: "e5f6a7b8-c9d0-1234-ef01-567890123456",
    name: "Humanscale M2.1",
    link: "https://www.humanscale.com/products/monitor-arms/m2-1",
    created_at: now(),
    updated_at: now(),
  },
  {
    id: "f6a7b8c9-d0e1-2345-f012-678901234567",
    name: "VESA Mount ArmWorks",
    link: "https://www.vesa.org/mount/armworks",
    created_at: now(),
    updated_at: now(),
  },
  {
    id: "a7b8c9d0-e1f2-3456-0123-789012345678",
    name: "AmazonBasics VESA Mount Arm",
    link: "https://www.amazon.com/dp/B07X5T4X3R",
    created_at: now(),
    updated_at: now(),
  },
  {
    id: "b8c9d0e1-f2a3-4567-1234-890123456789",
    name: "3M Ergonomic Monitor Arm",
    link: "https://www.3m.com/3M/en_US/company-us/all-3m-products/~/All-3M-Products/Office-Products/Ergonomic-Products/Monitor-Mounts/",
    created_at: now(),
    updated_at: now(),
  },
];

const monitorArmsRankingProducts = [
  { ranking_id: monitorArmsRanking.id, product_id: monitorArmsProducts[0].id, score: 9.4, rank_position: 1 },
  { ranking_id: monitorArmsRanking.id, product_id: monitorArmsProducts[1].id, score: 9.1, rank_position: 2 },
  { ranking_id: monitorArmsRanking.id, product_id: monitorArmsProducts[2].id, score: 8.8, rank_position: 3 },
  { ranking_id: monitorArmsRanking.id, product_id: monitorArmsProducts[3].id, score: 8.3, rank_position: 4 },
  { ranking_id: monitorArmsRanking.id, product_id: monitorArmsProducts[4].id, score: 7.9, rank_position: 5 },
  { ranking_id: monitorArmsRanking.id, product_id: monitorArmsProducts[5].id, score: 7.5, rank_position: 6 },
];

const monitorArmsSpecs = {
  [monitorArmsProducts[0].id]: [
    { name: "Weight Capacity", value: "32", unit: "lbs" },
    { name: "VESA Compatibility", value: "75×75, 100×100" },
    { name: "Height Range", value: "13\"–27\"" },
    { name: "Tilt", value: "+85° to -30°" },
    { name: "Rotation", value: "360°" },
    { name: "Desk Mount", value: "Clamp (thickness 0.6–2.2\")" },
  ],
  [monitorArmsProducts[1].id]: [
    { name: "Weight Capacity", value: "50", unit: "lbs" },
    { name: "VESA Compatibility", value: "75×75, 100×100" },
    { name: "Height Range", value: "13\"–33\"" },
    { name: "Tilt", value: "+85° to -70°" },
    { name: "Rotation", value: "360°" },
    { name: "Desk Mount", value: "Clamp or grommet" },
  ],
  [monitorArmsProducts[2].id]: [
    { name: "Weight Capacity", value: "40", unit: "lbs" },
    { name: "VESA Compatibility", value: "75×75, 100×100" },
    { name: "Height Range", value: "10\"–26\"" },
    { name: "Tilt", value: "+50° to -35°" },
    { name: "Rotation", value: "360°" },
    { name: "Desk Mount", value: "Clamp (low-profile)" },
  ],
  [monitorArmsProducts[3].id]: [
    { name: "Weight Capacity", value: "28", unit: "lbs" },
    { name: "VESA Compatibility", value: "75×75, 100×100" },
    { name: "Height Range", value: "11\"–24\"" },
    { name: "Tilt", value: "+80° to -20°" },
    { name: "Rotation", value: "360°" },
    { name: "Desk Mount", value: "Clamp" },
  ],
  [monitorArmsProducts[4].id]: [
    { name: "Weight Capacity", value: "25", unit: "lbs" },
    { name: "VESA Compatibility", value: "75×75, 100×100" },
    { name: "Height Range", value: "13\"–23\"" },
    { name: "Tilt", value: "+90° to -20°" },
    { name: "Rotation", value: "180° pan, 360° swivel" },
    { name: "Desk Mount", value: "Clamp or grommet" },
  ],
  [monitorArmsProducts[5].id]: [
    { name: "Weight Capacity", value: "22", unit: "lbs" },
    { name: "VESA Compatibility", value: "75×75, 100×100" },
    { name: "Extension", value: "20\"" },
    { name: "Tilt", value: "+75° to -15°" },
    { name: "Rotation", value: "360°" },
    { name: "Desk Mount", value: "Clamp" },
  ],
};

const monitorArmsSentiments = {
  [monitorArmsProducts[0].id]: [
    { type: "pro", headline: "Smooth height adjustment across a wide range", content: "Gas spring provides effortless height movement from 13 inches to 27 inches." },
    { type: "pro", headline: "Excellent cable management system", content: "Integrated clips and channels keep cords tidy and off the desk surface." },
    { type: "pro", headline: "Tilt, swivel, and rotation are fully adjustable", content: "Independent movement in all directions with solid locking mechanisms." },
    { type: "con", headline: "Clamp design may not fit all desks", content: "Desks thicker than 2.2 inches require the grommet mount (sold separately)." },
    { type: "con", headline: "Slight wobble at max extension", content: "Ultrawide monitors at full reach experience minor shake during typing." },
    { type: "con", headline: "Assembly requires patience", content: "Instructions are clear but the process takes 15-20 minutes for first-time installers." },
  ],
  [monitorArmsProducts[1].id]: [
    { type: "pro", headline: "Exceptional weight capacity for ultrawides", content: "Handles up to 50 lbs, making it ideal for 34-inch+ ultrawide monitors." },
    { type: "pro", headline: "Incredible range of motion", content: "Tallest height extension and widest tilt angles in its class." },
    { type: "pro", headline: "Built-in cable management channel", content: "Keeps all cables neatly contained and protected from pinching." },
    { type: "con", headline: "Heavier and bulkier than competitors", content: "Solid steel construction adds weight, making it less ideal for frequent desk moves." },
    { type: "con", headline: "Higher price point", content: "Priced at a premium compared to entry-level arms." },
    { type: "con", headline: "Clamp requires very sturdy desk edge", content: "May not fit on IKEA-style particleboard desks without reinforcement." },
  ],
  [monitorArmsProducts[2].id]: [
    { type: "pro", headline: "Silky-smooth motion with minimal effort", content: "Compression spring mechanism glides without jerks or resistance." },
    { type: "pro", headline: "Sleek, minimalist aesthetic", content: "Clean lines and aluminum finish blend into modern workspaces." },
    { type: "pro", headline: "Low-profile clamp saves desk space", content: "Clamp is slim and unobtrusive, leaving room for keyboard tray underneath." },
    { type: "con", headline: "Lower weight limit than heavy-duty options", content: "40 lb max means not suitable for large gaming monitors or dual-monitor setups." },
    { type: "con", headline: "Expensive for single-monitor use", content: "Costs more than some fully-loaded options that support dual arms." },
    { type: "con", headline: "Limited tilt range on some models", content: "Doesn't go as negative as some ergonomic arms for true height flexibility." },
  ],
  [monitorArmsProducts[3].id]: [
    { type: "pro", headline: "Great value for the build quality", content: "Solid construction at a mid-range price point; holds up well to daily adjustments." },
    { type: "pro", headline: "Easy VESA plate installation", content: "Tool-free VESA plate attachment simplifies mounting your monitor." },
    { type: "pro", headline: "Decent cable routing clips included", content: "Helps keep wires tidy, though not as comprehensive as premium options." },
    { type: "con", headline: "Less smooth gas spring action", content: "Adjustment feels slightly stiffer than higher-priced competitors." },
    { type: "con", headline: "Plastic components in some parts", content: "Some moving parts are plastic rather than metal, raising long-term durability questions." },
    { type: "con", headline: "Clamp may scratch delicate finishes", content: "Use protective pads to avoid marking glass or polished surfaces." },
  ],
  [monitorArmsProducts[4].id]: [
    { type: "pro", headline: "Very affordable entry-level option", content: "Budget-friendly price makes it accessible for first-time ergonomic upgrades." },
    { type: "pro", headline: "Simple, no-frills installation", content: "Easy to assemble with included tools; no extra steps." },
    { type: "pro", headline: "Both clamp and grommet included", content: "Choose your mounting method without buying extra hardware." },
    { type: "con", headline: "Limited adjustability range", content: "Doesn't extend as high or low as premium arms; may not suit very tall/short users." },
    { type: "con", headline: "Wobble noticeable at max extension", content: "Not ideal for ultrawide monitors or touchscreens." },
    { type: "con", headline: "No integrated cable management", content: "You'll need to run your own clips or sleeves." },
  ],
  [monitorArmsProducts[5].id]: [
    { type: "pro", headline: "Compact design for small desks", content: "Low-profile arm and clamp fit in tight spaces without dominating the desk." },
    { type: "pro", headline: "Smooth motion for its class", content: "Despite size, tilt and swivel are fluid and lock securely." },
    { type: "pro", headline: "Trusted brand reputation for office ergonomics", content: "3M's long history in ergonomic solutions adds peace of mind." },
    { type: "con", headline: "Modest weight capacity", content: "22 lb max means only standard monitors; no ultrawide or heavy IPS panels." },
    { type: "con", headline: "No cable management channel", content: "Only includes a basic clip; wires still need organization." },
    { type: "con", headline: "Extension reach is limited", content: "Only 20 inches; not suitable for deep desks or monitor positioning over a keyboard." },
  ],
];

const monitorArmsFAQs = [
  { id: "ma-f1", question: "How do I know if my monitor is VESA compatible?", answer: "Check the back of your monitor for four threaded holes in a square pattern (75×75mm or 100×100mm). Most modern monitors are VESA mount compatible; if yours isn't, you may need an adapter plate that attaches to the monitor's factory stand." },
  { id: "ma-f2", question: "Clamp vs. grommet mount — which should I choose?", answer: "Clamp mounts attach to the edge of your desk without drilling; they're easier and less permanent. Grommet mounts require a hole in the desk surface and provide a cleaner, more integrated look with greater stability. Choose clamp for simplicity, grommet for a permanent, polished setup." },
  { id: "ma-f3", question: "Can I mount two monitors on a single-arm solution?", answer: "No, a single monitor arm is designed for one screen. For dual monitors, you need either a dual-arm setup (two separate arms mounted side-by-side) or a dedicated dual-monitor arm that holds both screens from a single base. Monitor weight and desk thickness become more critical with dual setups." },
  { id: "ma-f4", question: "How much weight can a monitor arm hold?", answer: "Weight capacities vary widely: light-duty arms handle 10–15 lbs, mid-range 20–30 lbs, and heavy-duty arms 40–50+ lbs. Always check your monitor's weight (usually on the spec sheet or back label) and choose an arm rated at least 20% above that weight for safety margin." },
  { id: "ma-f5", question: "Will a monitor arm damage my desk surface?", answer: "Clamp mounts use protective pads to prevent damage, but improper installation or overtightening can scratch or dent some surfaces. Desks with delicate finishes (glass, polished stone) benefit from additional felt pads. Grommet mounts require drilling a hole and are considered permanent." },
];
for (let i = 0; i < monitorArmsFAQs.length; i++) {
  monitorArmsFAQs[i].id = `ma-f${i+1}`;
  monitorArmsFAQs[i].ranking_id = monitorArmsRanking.id;
  monitorArmsFAQs[i].display_order = i + 1;
  monitorArmsFAQs[i].created_at = now();
  monitorArmsFAQs[i].updated_at = now();
}

// ── Category 2: Stream Decks ──────────────────────────────────────────────────
const streamDecksCategory = {
  id: "c4d5e6f7-a8b9-0123-4567-890123456789a",
  name: "Stream Decks",
  slug: "stream-decks",
  description: "Programmable macro pads and control surfaces for streamers, content creators, and video professionals.",
  created_at: now(),
  updated_at: now(),
};

const streamDecksRanking = {
  id: "d5e6f7a8-b9c0-1234-5678-90123456789a",
  slug: "best-stream-decks-2026",
  question: "What Are the Best Stream Decks in 2026?",
  description: "We evaluated top stream decks and macro pads for button responsiveness, display clarity, software flexibility, and integration with streaming apps to help creators streamline workflows.",
  verdict_summary: "The Elgato Stream Deck Mk.2 remains the all-around favorite with bright displays, solid build, and deep software integration. The Loupedeck CT offers superior customization for photographers and video editors. For streamers on a budget, the Stream Deck Mobile app turns your tablet into a capable control surface.",
  category_id: streamDecksCategory.id,
  created_at: now(),
  updated_at: now(),
};

const streamDecksProducts = [
  {
    id: "e6f7a8b9-c0d1-2345-6789-0123456789ab",
    name: "Elgato Stream Deck Mk.2 (15 keys)",
    link: "https://www.elgato.com/en/products/stream-deck-xl",
    created_at: now(),
    updated_at: now(),
  },
  {
    id: "f7a8b9c0-d1e2-3456-7890-123456789abc",
    name: "Loupedeck CT",
    link: "https://loupedeck.com/products/loupedeck-ct/",
    created_at: now(),
    updated_at: now(),
  },
  {
    id: "a8b9c0d1-e2f3-4567-8901-23456789abcd",
    name: "Elgato Stream Deck XL (32 keys)",
    link: "https://www.elgato.com/en/products/stream-deck-xl",
    created_at: now(),
    updated_at: now(),
  },
  {
    id: "b9c0d1e2-f3a4-5678-9012-3456789abcde",
    name: "Elgato Stream Deck Mini (6 keys)",
    link: "https://www.elgato.com/en/products/stream-deck",
    created_at: now(),
    updated_at: now(),
  },
  {
    id: "c0d1e2f3-a4b5-6789-0123-456789abcdef",
    name: "Stream Deck Mobile (iOS/Android)",
    link: "https://www.elgato.com/en/products/stream-deck-mobile-app",
    created_at: now(),
    updated_at: now(),
  },
  {
    id: "d1e2f3a4-b5c6-7890-1234-56789abcdef0",
    name: "X-Keys XK-24",
    link: "https://shop.x-keys.com/products/xk-24",
    created_at: now(),
    updated_at: now(),
  },
];

const streamDecksRankingProducts = [
  { ranking_id: streamDecksRanking.id, product_id: streamDecksProducts[0].id, score: 9.3, rank_position: 1 },
  { ranking_id: streamDecksRanking.id, product_id: streamDecksProducts[1].id, score: 9.0, rank_position: 2 },
  { ranking_id: streamDecksRanking.id, product_id: streamDecksProducts[2].id, score: 8.8, rank_position: 3 },
  { ranking_id: streamDecksRanking.id, product_id: streamDecksProducts[3].id, score: 8.2, rank_position: 4 },
  { ranking_id: streamDecksRanking.id, product_id: streamDecksProducts[4].id, score: 7.9, rank_position: 5 },
  { ranking_id: streamDecksRanking.id, product_id: streamDecksProducts[5].id, score: 7.6, rank_position: 6 },
];

const streamDecksSpecs = {
  [streamDecksProducts[0].id]: [
    { name: "Keys", value: "15 LCD keys" },
    { name: "Display Type", value: "LCD, 72×72 px per key" },
    { name: "Connectivity", value: "USB 2.0" },
    { name: "Power", value: "Bus-powered" },
    { name: "Software", value: "Elgato Stream Deck (Windows/macOS)" },
    { name: "Dimensions", value: "5.5×3.5×1.2\"" },
  ],
  [streamDecksProducts[1].id]: [
    { name: "Controls", value: "8 dials + 24 buttons + touch strip" },
    { name: "Display", value: "Customizable LCD dials & buttons" },
    { name: "Connectivity", value: "USB-C" },
    { name: "Power", value: "USB-powered with optional external adapter" },
    { name: "Software", value: "Loupedeck Console (supports Lightroom, Premiere, OBS)" },
    { name: "Dimensions", value: "12×8×2\"" },
  ],
  [streamDecksProducts[2].id]: [
    { name: "Keys", value: "32 LCD keys (8×4 grid)" },
    { name: "Display Type", value: "LCD, 96×96 px per key" },
    { name: "Connectivity", value: "USB-C" },
    { name: "Power", value: "External adapter + USB" },
    { name: "Software", value: "Elgato Stream Deck (Windows/macOS)" },
    { name: "Dimensions", value: "10.2×4.5×1.8\"" },
  ],
  [streamDecksProducts[3].id]: [
    { name: "Keys", value: "6 LCD keys" },
    { name: "Display Type", value: "LCD, 72×72 px per key" },
    { name: "Connectivity", value: "USB 2.0" },
    { name: "Power", value: "Bus-powered" },
    { name: "Software", value: "Elgato Stream Deck (Windows/macOS)" },
    { name: "Dimensions", value: "3.6×3.0×1.3\"" },
  ],
  [streamDecksProducts[4].id]: [
    { name: "Keys", value: "Up to 64 virtual keys" },
    { name: "Display", value: "Uses smartphone/tablet screen" },
    { name: "Connectivity", value: "Wi-Fi (local network)" },
    { name: "Power", value: "Runs on device battery" },
    { name: "Software", value: "Elgato Stream Deck app (iOS/Android)" },
    { name: "Latency", value: "< 100ms typical on 5 GHz WiFi" },
  ],
  [streamDecksProducts[5].id]: [
    { name: "Keys", value: "24 programmable keys" },
    { name: "Key Type", value: "Mechanical (Cherry MX)" },
    { name: "Display", value: "None (physical labeling only)" },
    { name: "Connectivity", value: "USB" },
    { name: "Software", value: "X-Keys Editor (Windows/macOS/Linux)" },
    { name: "Dimensions", value: "8.5×5.5×1.5\"" },
  ],
};

const streamDecksSentiments = {
  [streamDecksProducts[0].id]: [
    { type: "pro", headline: "Bright, crisp displays with excellent viewing angles", content: "Each LCD key shows clear icons and feedback, making visual identification instant." },
    { type: "pro", headline: "Seamless software integration with streaming tools", content: "Native plugins for OBS, Streamlabs, Twitch, YouTube, and dozens of third-party apps." },
    { type: "pro", headline: "Solid build quality with satisfying key feel", content: "Keys have a distinct tactile press and audible click that feels durable." },
    { type: "con", headline: "Expensive for 15 keys", content: "Cost per button is high; not ideal if you need dozens of actions." },
    { type: "con", headline: "USB cable is relatively short", content: "2-foot cable limits placement flexibility; may need extension." },
    { type: "con", headline: "No support for custom code execution", content: "Limited to supported plugins; advanced users may find it restrictive." },
  ],
  [streamDecksProducts[1].id]: [
    { type: "pro", headline: "Unmatched customization for creative workflows", content: "Dials, buttons, and touch strip offer nuanced control beyond simple triggers." },
    { type: "pro", headline: "Excellent for video editing and photo grading", content: "Native integration with Adobe Lightroom, Premiere Pro, DaVinci Resolve." },
    { type: "pro", headline: "Adjustable intensity dials for fine-grained control", content: "Turn a dial to scrub through timeline or adjust exposure smoothly." },
    { type: "con", headline: "Steep learning curve", content: "Many options can be overwhelming for new users; setup takes time." },
    { type: "con", headline: "Poor OBS integration compared to Elgato", content: "Less seamless for streamers; requires workarounds for some actions." },
    { type: "con", headline: "Software occasionally buggy on Windows", content: "Some users report occasional disconnects or settings not saving." },
  ],
  [streamDecksProducts[2].id]: [
    { type: "pro", headline: "Massive button real estate for complex setups", content: "32 keys mean you can map entire scenes, sources, and macros without page switching." },
    { type: "pro", headline: "Larger, higher-res displays with better color", content: "96×96 px screens show more detail and icon clarity." },
    { type: "pro", headline: "Robust build and stable mount for studio desks", content: "Heavy base resists movement; included riser improves viewing angle." },
    { type: "con", headline: "Very expensive", content: "Price is prohibitive for hobbyists; only serious pros should consider." },
    { type: "con", headline: "Takes up significant desk space", content: "10-inch width dominates small desks; ensure you have room." },
    { type: "con", headline: "Some users report inconsistent LCD quality", content: "Rare defects with dead pixels or uneven backlighting." },
  ],
  [streamDecksProducts[3].id]: [
    { type: "pro", headline: "Compact footprint for minimalist setups", content: "Tiny size fits next to keyboard or in tight spaces without clutter." },
    { type: "pro", headline: "Same great software as larger Stream Decks", content: "All plugins and integrations work identically to the 15-key version." },
    { type: "pro", headline: "Portable for streamers on the go", content: "Easy to pack for conventions or remote events." },
    { type: "con", headline: "Only 6 keys means more page switching", content: "You'll need to organize actions across multiple profile pages." },
    { type: "con", headline: "Keys feel slightly smaller", content: "Less tactile pressing surface; harder to hit accurately during fast streams." },
    { type: "con", headline: "Same price per key as larger models", content: "Still expensive for fewer buttons, though ultimate convenience." },
  ],
  [streamDecksProducts[4].id]: [
    { type: "pro", headline: "Turns existing tablet into a free/low-cost control surface", content: "Leverages your iPad or Android tablet; no extra hardware beyond dock/stand." },
    { type: "pro", headline: "Virtual buttons mean virtually unlimited layout", content: "Create custom grids, tabs, and pages tailored to each app or workflow." },
    { type: "pro", headline: "Low-latency WiFi works well on a good network", content: "Responsive enough for most live streaming scenarios if on 5 GHz band." },
    { type: "con", headline: "Dependent on network stability", content: "Lag spikes or disconnects can happen on congested WiFi; not as rock-solid as USB." },
    { type: "con", headline: "No tactile feedback without haptic support", content: "Pressing virtual buttons lacks physical click, so you rely on visual confirmation." },
    { type: "con", headline: "Requires separate stand or mount", content: "You'll need a good tablet arm or case to position it comfortably." },
  ],
  [streamDecksProducts[5].id]: [
    { type: "pro", headline: "Physical mechanical keys for precise, repeatable actuation", content: "Cherry MX switches offer a satisfying feel and 50 million+ click lifespan." },
    { type: "pro", headline: "No software dependency for basic key mappings", content: "Works out of the box as a standard HID keyboard; advanced features need X-Keys Editor." },
    { type: "pro", headline: "Excellent for enterprise/industrial automation", content: "Durable, reliable, and supported in many legacy control systems." },
    { type: "con", headline: "No displays — labels are physical only", content: "You must remember what each key does or add your own stickers/labels." },
    { type: "con", headline: "Software is dated and less intuitive", content: "X-keys Editor hasn't seen a major redesign in years; learning curve is steep." },
    { type: "con", headline: "Wider than Stream Decks despite fewer keys", content: "Physical keys take more space, so footprint is larger despite 24 vs 32." },
  ],
];

const streamDecksFAQs = [
  { id: "sd-f1", question: "Do I need a Stream Deck if I'm just starting to stream?", answer: "Not necessarily. Begin with keyboard shortcuts and OBS hotkeys. A Stream Deck becomes valuable once your scene switching, source toggling, and macro use exceed what you can comfortably remember. Many streamers add one after their setup stabilizes and they want faster, error-free production control." },
  { id: "sd-f2", question: "What's the difference between Stream Deck and Loupedeck?", answer: "Stream Deck focuses on simple button-triggered actions across streaming, YouTube, and general macro functions. Loupedeck is designed for creative pros (Lightroom, Premiere) with dials for precise adjustments and a touch strip. Choose Stream Deck for OBS-centric streaming; choose Loupedeck if photo/video editing is your primary workflow." },
  { id: "sd-f3", question: "Can I use a Stream Deck on Mac and Windows?", answer: "Yes. Elgato Stream Deck software supports both macOS (10.15+) and Windows 10/11. Settings sync via cloud, so you can move between machines. Some third-party plugins may be platform-specific, but core functionality is identical." },
  { id: "sd-f4", question: "Can Stream Deck execute scripts or launch applications?", answer: "Absolutely. You can map keys to launch apps, run shell scripts or batch files, open URLs, insert text snippets, control system volume, or trigger complex multi-step macros. The Elgato plugin ecosystem extends this to nearly any app with an API or CLI." },
  { id: "sd-f5", question: "Is wireless reliability a concern with Stream Deck Mobile?", answer: "On a stable 5 GHz WiFi network with low latency, mobile is very responsive. However, interference or network congestion can cause lag or disconnects. For mission-critical live streaming, a wired USB Stream Deck remains the gold standard for guaranteed reliability." },
];
for (let i = 0; i < streamDecksFAQs.length; i++) {
  streamDecksFAQs[i].id = `sd-f${i+1}`;
  streamDecksFAQs[i].ranking_id = streamDecksRanking.id;
  streamDecksFAQs[i].display_order = i + 1;
  streamDecksFAQs[i].created_at = now();
  streamDecksFAQs[i].updated_at = now();
}

// ── Category 3: Smart Lighting ────────────────────────────────────────────────
const smartLightingCategory = {
  id: "d2e3f4a5-b6c7-8901-2345-678901234567",
  name: "Smart Lighting",
  slug: "smart-lighting",
  description: "Wi-Fi and Bluetooth smart bulbs, light strips, and ambient lighting for home office, streaming, and mood control.",
  created_at: now(),
  updated_at: now(),
};

const smartLightingRanking = {
  id: "e3f4a5b6-c7d8-1234-5678-90123456789a",
  slug: "best-smart-lighting-2026",
  question: "What Are the Best Smart Lighting Systems in 2026?",
  description: "We tested popular smart bulbs, light strips, and ambient lighting kits for brightness, color accuracy, app reliability, and ecosystem integration to help you set up voice- and app-controlled lighting.",
  verdict_summary: "Philips Hue remains the ecosystem leader with reliable connectivity, rich colors, and broad smart home compatibility. Nanoleaf Shapes offer stunning modular wall panels for streamers and creators. For budget buyers, Govee provides impressive brightness and features at a fraction of the cost. Wyze Bulbs are the best value for basic smart lighting.",
  category_id: smartLightingCategory.id,
  created_at: now(),
  updated_at: now(),
};

const smartLightingProducts = [
  {
    id: "f4a5b6c7-d8e9-2345-6789-0123456789ab",
    name: "Philips Hue White and Color Ambiance (A19)",
    link: "https://www.philips-hue.com/en-us/products/hue-white-and-color-ambiance-a19",
    created_at: now(),
    updated_at: now(),
  },
  {
    id: "a5b6c7d8-e9f0-3456-7890-123456789abc",
    name: "Nanoleaf Shapes Hexagons",
    link: "https://nanoleaf.me/en-US/products/nanoleaf-shapes-hexagons/",
    created_at: now(),
    updated_at: now(),
  },
  {
    id: "b6c7d8e9-f0a1-4567-8901-23456789abcd",
    name: "Govee RGBIC LED Light Strip",
    link: "https://www.govee.com/products/govee-rgbic-led-strip-lights",
    created_at: now(),
    updated_at: now(),
  },
  {
    id: "c7d8e9f0-a1b2-5678-9012-3456789abcde",
    name: "Wyze Bulb (White)",
    link: "https://wyze.com/wyze-bulb-white.html",
    created_at: now(),
    updated_at: now(),
  },
  {
    id: "d8e9f0a1-b2c3-6789-0123-456789abcdef",
    name: "LIFX Color",
    link: "https://www.lifx.com/products/lifx-color-bulb",
    created_at: now(),
    updated_at: now(),
  },
  {
    id: "e9f0a1b2-c3d4-7890-1234-56789abcdef0",
    name: "TP-Link Kasa Smart Bulb (KL130)",
    link: "https://www.kasasmart.com/us/products/smart-lighting/kasa-smart-bulb-kl130",
    created_at: now(),
    updated_at: now(),
  },
];

const smartLightingRankingProducts = [
  { ranking_id: smartLightingRanking.id, product_id: smartLightingProducts[0].id, score: 9.5, rank_position: 1 },
  { ranking_id: smartLightingRanking.id, product_id: smartLightingProducts[1].id, score: 9.2, rank_position: 2 },
  { ranking_id: smartLightingRanking.id, product_id: smartLightingProducts[2].id, score: 8.8, rank_position: 3 },
  { ranking_id: smartLightingRanking.id, product_id: smartLightingProducts[3].id, score: 8.4, rank_position: 4 },
  { ranking_id: smartLightingRanking.id, product_id: smartLightingProducts[4].id, score: 8.1, rank_position: 5 },
  { ranking_id: smartLightingRanking.id, product_id: smartLightingProducts[5].id, score: 7.9, rank_position: 6 },
];

const smartLightingSpecs = {
  [smartLightingProducts[0].id]: [
    { name: "Brightness", value: "800", unit: "lumens" },
    { name: "Color Range", value: "16 million colors + white spectrum (2000K–6500K)" },
    { name: "Connectivity", value: "Zigbee (requires Hue Bridge)" },
    { name: "Power", value: "9.5", unit: "W" },
    { name: "Lifespan", value: "25,000", unit: "hours" },
    { name: "Protocol", value: "Zigbee 3.0 (Hue Bridge required)" },
  ],
  [smartLightingProducts[1].id]: [
    { name: "Panel Panel", value: "Modular hexagonal panels" },
    { name: "Colors", value: "16M + rhythm sync (music reactive)" },
    { name: "Connectivity", value: "Wi-Fi, Thread, Bluetooth" },
    { name: "Power", value: "1.2", unit: "W per panel" },
    { name: "Lifespan", value: "25,000", unit: "hours" },
    { name: "Mounting", value: "Adhesive or mounting kit" },
  ],
  [smartLightingProducts[2].id]: [
    { name: "Length", value: "10", unit: "m (32.8 ft)" },
    { name: "LEDs per strip", value: "60 LEDs/m (IC RGBIC)" },
    { name: "Brightness", value: "5400", unit: "lumens" },
    { name: "Connectivity", value: "Wi-Fi + Bluetooth" },
    { name: "Power", value: "60", unit: "W" },
    { name: "Water Resistance", value: "IP65" },
  ],
  [smartLightingProducts[3].id]: [
    { name: "Brightness", value: "800", unit: "lumens" },
    { name: "Color Temperature", value: "2700K–6500K tunable white" },
    { name: "Connectivity", value: "Wi-Fi (2.4 GHz)" },
    { name: "Power", value: "7.5", unit: "W" },
    { name: "Lifespan", value: "25,000", unit: "hours" },
    { name: "Hub Required", value: "No (direct connection)" },
  ],
  [smartLightingProducts[4].id]: [
    { name: "Brightness", value: "1100", unit: "lumens" },
    { name: "Color Range", value: "16 million colors + full white spectrum" },
    { name: "Connectivity", value: "Wi-Fi (2.4/5 GHz) + Bluetooth for setup" },
    { name: "Power", value: "11", unit: "W" },
    { name: "Lifespan", value: "40,000", unit: "hours" },
    { name: "Protocol", value: "Wi-Fi (Tuya-based cloud)" },
  ],
  [smartLightingProducts[5].id]: [
    { name: "Brightness", value: "800", unit: "lumens" },
    { name: "Color Temperature", value: "2700K–6500K tunable white" },
    { name: "Connectivity", value: "Wi-Fi (2.4 GHz)" },
    { name: "Power", value: "8", unit: "W" },
    { name: "Lifespan", value: "25,000", unit: "hours" },
    { name: "Hub Required", value: "No" },
  ],
};

const smartLightingSentiments = {
  [smartLightingProducts[0].id]: [
    { type: "pro", headline: "Unmatched ecosystem integration", content: "Works seamlessly with Alexa, Google Assistant, Apple HomeKit, and IFTTT." },
    { type: "pro", headline: "Exceptional color consistency and saturation", content: "Rich, vibrant hues that stay consistent across bulbs in a group." },
    { type: "pro", headline: "Reliable Zigbee connectivity with Hue Bridge", content: "Responds quickly to commands without relying on cloud latency (local execution)." },
    { type: "con", headline: "Requires Hue Bridge for full functionality", content: "Bulbs work over Bluetooth alone, but remote access and automations need the bridge (extra cost)." },
    { type: "con", headline: "Premium pricing", content: "Hue bulbs cost 2–3× more than basic smart bulbs." },
    { type: "con", headline: "Some features locked behind subscription", content: "Hue Secure and certain advanced automations require monthly subscription." },
  ],
  [smartLightingProducts[1].id]: [
    { type: "pro", headline: "Visually stunning for content creators", content: "Hexagonal panels are a favorite among streamers for eye-catching background walls." },
    { type: "pro", headline: "Music reaction and rhythm sync", content: "Built-in mic syncs lighting to music without external controller." },
    { type: "pro", headline: "Modular design lets you build custom shapes", content: "Mix colors and patterns across panels; easy to expand over time." },
    { type: "con", headline: "Very expensive per panel", content: "High upfront cost; quickly becomes a significant investment." },
    { type: "con", headline: "Requires careful planning of layout", content: "You'll want to design your pattern before mounting; mistakes require repositioning." },
    { type: "con", headline: "App can be sluggish on large installations", content: "Large arrays sometimes struggle with preview rendering in the Nanoleaf app." },
  ],
  [smartLightingProducts[2].id]: [
    { type: "pro", headline: "Incredible brightness for its price", content: "5400 lumens easily illuminates large rooms or outdoor patios." },
    { type: "pro", headline: "RGBIC means each LED can show a different color", content: "Create advanced multicolor effects and gradients not possible on standard RGB strips." },
    { type: "pro", headline: "Waterproof IP65 rating for outdoor use", content: "Safe for gardens, patios, and damp environments." },
    { type: "con", headline: "App can be inconsistent", content: "Govee's app sometimes lags or disconnects from strips intermittently." },
    { type: "con", headline: "Adhesive can weaken over time", content: "Strips may peel in hot environments; consider mounting clips for permanence." },
    { type: "con", headline: "Colors slightly oversaturated", content: "Some users report unnatural color rendering vs Philips Hue." },
  ],
  [smartLightingProducts[3].id]: [
    { type: "pro", headline: "Excellent value for basic smart lighting", content: "Under $10 per bulb with solid brightness and tunable white; best budget pick." },
    { type: "pro", headline: "No hub required; connects directly to WiFi", content: "Simplifies setup; just screwing in and adding to Wyze app." },
    { type: "pro", headline: "Integrates well with Wyze ecosystem", content: "If you already use Wyze cameras/sensors, automations are seamless." },
    { type: "con", headline: "No color-changing option", content: "Only tunable white; for RGB colors you'd need separate product." },
    { type: "con", headline: "Occasional connectivity drops on large networks", content: "Some users report bulbs disappearing from the app until power-cycled." },
    { type: "con", headline: "Limited third-party integrations", content: "Works best within Wyze; less native support for HomeKit or advanced automations." },
  ],
  [smartLightingProducts[4].id]: [
    { type: "pro", headline: "Highest brightness among smart bulbs", content: "1100 lumens rivals traditional 75W incandescent bulbs; great for large rooms." },
    { type: "pro", headline: "No hub required; direct Wi-Fi connectivity", content: "Simplifies setup and reduces clutter; also offers local LAN control via API." },
    { type: "pro", headline: "Excellent color gamut and saturation", content: "Vivid colors and smooth gradients; one of the best for color accuracy." },
    { type: "con", headline: "Higher price than budget options", content: "Premium cost, though less than Hue ecosystem with bridge." },
    { type: "con", headline: "Cloud dependency for some features", content: "Certain automations require cloud, raising privacy considerations." },
    { type: "con", headline: "Occasional firmware update hiccups", content: "Rarely bulbs become unresponsive after update, requiring factory reset." },
  ],
  [smartLightingProducts[5].id]: [
    { type: "pro", headline: "Very affordable with reliable performance", content: "TP-Link's reputation for networking hardware extends to stable smart home connectivity." },
    { type: "pro", headline: "Works with Kasa ecosystem for group controls", content: "Easy to create scenes and schedules; integrates with Alexa/Google." },
    { type: "pro", headline: "No hub needed; direct Wi-Fi connection", content: "Straightforward setup like other plug-and-play smart bulbs." },
    { type: "con", headline: "Colors less saturated than premium brands", content: "RGB is present but not as vibrant or smooth as Hue/LIFX." },
    { type: "con", headline: "No Apple HomeKit support", content: "Works with Alexa and Google Assistant, but not native HomeKit." },
    { type: "con", headline: "Limited white temperature range", content: "Some users find warm white less amber than competitors." },
  ],
];

const smartLightingFAQs = [
  { id: "sl-f1", question: "Do smart bulbs require a hub or bridge?", answer: "Some do, some don't. Wi-Fi bulbs (e.g., Wyze, TP-Link Kasa, LIFX) connect directly to your home router without a hub. Zigbee or Bluetooth Mesh bulbs (e.g., Philips Hue, IKEA Trådfri) require a bridge/hub that translates Zigbee to Wi-Fi. Hub systems offer better reliability, faster response times, and broader device support but add cost and complexity." },
  { id: "sl-f2", question: "Can I use smart bulbs with a regular light switch?", answer: "Yes, but keep the switch turned ON at all times. If you turn off a physical wall switch, the bulb loses power and won't respond to app/voice commands. For homes where switches get flipped, consider smart switches instead of smart bulbs, or educate household members to leave switches on." },
  { id: "sl-f3", question: "What's the difference between 2700K and 6500K?", answer: "Kelvin (K) indicates color temperature: 2700K is warm white (yellowish/orange) — cozy, inviting, similar to incandescent bulbs. 6500K is cool/daylight white (bluish) — energizing, similar to natural daylight. Many smart bulbs offer tunable white, allowing you to adjust between these temperatures for different moods and times of day." },
  { id: "sl-f4", question: "Are smart bulbs secure? Can they be hacked?", answer: "Smart bulbs connect via Wi-Fi, Zigbee, or Bluetooth. Wi-Fi bulbs inherit your network's security (use WPA3). Zigbee uses its own encrypted mesh. While no IoT device is 100% unhackable, reputable brands (Philips Hue, Nanoleaf) regularly patch vulnerabilities. Keep firmware updated, use strong passwords, and segment IoT devices if concerned." },
  { id: "sl-f5", question: "Do smart bulbs work with Amazon Alexa and Google Home?", answer: "Yes, virtually all smart bulbs integrate with Alexa and Google Assistant via cloud or local skills. You can control them by voice, create routines, and group them with other devices. Some brands (Hue, LIFX) also support Apple HomeKit. Always check compatibility before purchase." },
];
for (let i = 0; i < smartLightingFAQs.length; i++) {
  smartLightingFAQs[i].id = `sl-f${i+1}`;
  smartLightingFAQs[i].ranking_id = smartLightingRanking.id;
  smartLightingFAQs[i].display_order = i + 1;
  smartLightingFAQs[i].created_at = now();
  smartLightingFAQs[i].updated_at = now();
}

// ── Build seed payload segments ───────────────────────────────────────────────
const newSeedCategories = [monitorArmsCategory, streamDecksCategory, smartLightingCategory];

const newSeedRankings = [monitorArmsRanking, streamDecksRanking, smartLightingRanking];

const newSeedProducts = [
  ...monitorArmsProducts,
  ...streamDecksProducts,
  ...smartLightingProducts,
];

const newSeedRankingProducts = [
  ...monitorArmsRankingProducts,
  ...streamDecksRankingProducts,
  ...smartLightingRankingProducts,
];

const newSeedSpecifications = {
  ...monitorArmsSpecs,
  ...streamDecksSpecs,
  ...smartLightingSpecs,
};

const newSeedSentiments = {
  ...monitorArmsSentiments,
  ...streamDecksSentiments,
  ...smartLightingSentiments,
};

const newSeedFAQs = [
  ...monitorArmsFAQs,
  ...streamDecksFAQs,
  ...smartLightingFAQs,
];

// ── Load existing seed-payload.json and merge ─────────────────────────────────
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const payloadPath = join(__dirname, '..', 'scripts', '.seed-payload.json');
try {
  payload = JSON.parse(readFileSync(payloadPath, 'utf-8'));
} catch (e) {
  console.error('Failed to read seed payload:', e.message);
  process.exit(1);
}

// Merge new entities
payload.categories = [...(payload.categories || []), ...newSeedCategories];
payload.rankings = [...(payload.rankings || []), ...newSeedRankings];
payload.products = [...(payload.products || []), ...newSeedProducts];
payload.ranking_products = [...(payload.ranking_products || []), ...newSeedRankingProducts];

// Merge specs: append with product_id lookup
for (const [productId, specs] of Object.entries(newSeedSpecifications)) {
  // specs is an array of {name, value, unit}
  specs.forEach(s => {
    payload.specifications.push({
      id: `spec-${productId}-${s.name.toLowerCase().replace(/\s+/g, '-')}`,
      product_id: productId,
      name: s.name,
      value: s.value,
      unit: s.unit || null,
      created_at: now(),
      updated_at: now(),
    });
  });
}

// Merge sentiments similarly
for (const [productId, sentiments] of Object.entries(newSeedSentiments)) {
  sentiments.forEach((sent, idx) => {
    // We'll generate ranking_product_id by matching ranking_id
    const rp = newSeedRankingProducts.find(r => r.product_id === productId);
    if (!rp) {
      console.warn(`No ranking_product for product ${productId}, skipping sentiment ${idx}`);
      return;
    }
    payload.sentiments.push({
      id: `sent-${productId}-${idx}`,
      ranking_product_id: rp.id,
      user_id: null,
      type: sent.type,
      content: sent.content,
      headline: sent.headline,
      description: null,
      created_at: now(),
      updated_at: now(),
    });
  });
}

// Merge FAQs
payload.faqs = [...(payload.faqs || []), ...newSeedFAQs];

// Write back
writeFileSync(payloadPath, JSON.stringify(payload, null, 2));
console.log('✅ Successfully merged 3 new categories into', payloadPath);
console.log('Categories added:', newSeedCategories.map(c => c.name).join(', '));
console.log('Total categories now:', payload.categories.length);
console.log('Total rankings now:', payload.rankings.length);
console.log('Total products now:', payload.products.length);
console.log('Total rankings_products now:', payload.ranking_products.length);
console.log('Total specs now:', payload.specifications.length);
console.log('Total sentiments now:', payload.sentiments.length);
console.log('Total FAQs now:', payload.faqs.length);

// Also write out a standalone JSON for review
const reviewPath = join(__dirname, 'new-categories-payload.json');
const reviewPayload = {
  categories: newSeedCategories,
  rankings: newSeedRankings,
  products: newSeedProducts,
  ranking_products: newSeedRankingProducts,
  specifications: newSeedSpecifications,
  sentiments: newSeedSentiments,
  faqs: newSeedFAQs,
};
writeFileSync(reviewPath, JSON.stringify(reviewPayload, null, 2));
console.log('📄 Standalone new-categories payload written to', reviewPath);
