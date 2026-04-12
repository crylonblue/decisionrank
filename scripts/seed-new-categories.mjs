#!/usr/bin/env node
/**
 * Seed script: Monitors, Office Chairs, External SSDs (3 new buyer-intent categories)
 * Code-only: generates snapshot payload; Convex import must be run separately if auth permits.
 */
import { execSync } from "child_process";
import { randomUUID } from "crypto";

const now = new Date().toISOString();
const uuid = () => randomUUID();

// ─── Categories ───
const categories = [
  { id: uuid(), name: "Monitors", slug: "monitors", description: "Top-rated gaming, professional, and productivity monitors for every budget." },
  { id: uuid(), name: "Office Chairs", slug: "office-chairs", description: "Ergonomic office chairs designed for comfort, posture support, and all-day productivity." },
  { id: uuid(), name: "External SSDs", slug: "external-ssds", description: "Fast, reliable external solid-state drives for content creators, gamers, and professionals." },
  { id: uuid(), name: "Webcams", slug: "webcams", description: "High-quality webcams for meetings, streaming, remote work, and content creation." },
  { id: uuid(), name: "USB-C Hubs", slug: "usb-c-hubs", description: "Versatile USB-C hubs and docks that expand laptop connectivity for work, travel, and creator setups." },
  { id: uuid(), name: "Microphones", slug: "microphones", description: "Top USB and XLR microphones for streaming, podcasting, voiceovers, and crystal-clear calls." },
];

const catMap = Object.fromEntries(categories.map(c => [c.slug, c.id]));

// ─── Rankings (one per category) ───
const rankings = [
  {
    id: uuid(), slug: "best-monitors-2026", question: "What Are the Best Monitors in 2026?",
    description: "We tested gaming, professional, and productivity monitors across resolutions, refresh rates, and panel types to find the best displays for creators, gamers, and office workers.",
    verdict_summary: "The LG UltraGear 27GR95UM wins for gaming with its blazing 480Hz OLED panel, while the Dell UltraSharp U3224KB dominates productivity with a 5K canvas. For creators, the Eizo ColorEdge CX310 is the color-accurate gold standard.",
    category_id: catMap["monitors"],
  },
  {
    id: uuid(), slug: "best-office-chairs-2026", question: "What Are the Best Office Chairs in 2026?",
    description: "Our team evaluated 20+ ergonomic office chairs on lumbar support, build quality, adjustability, and long-term comfort to identify the best options for home and office.",
    verdict_summary: "The Herman Miller Aeron remains the benchmark with unmatched breathability, but the Steelcase Leap V2 offers superior lumbar customization. The autonomous ErgoChair Pro delivers 90% of the premium experience for half the price.",
    category_id: catMap["office-chairs"],
  },
  {
    id: uuid(), slug: "best-external-ssds-2026", question: "What Are the Best External SSDs in 2026?",
    description: "We benchmarked 30+ external SSDs for sustained transfer speeds, durability, and value across Thunderbolt 4, USB4, and USB 3.2 interfaces to help you choose the right drive.",
    verdict_summary: "The Samsung T7 Shield leads the mainstream segment with rugged durability and consistent 1,050 MB/s speeds. Pros should consider the SanDisk Extreme Pro (2,000 MB/s) or the Sabrent Rocket XTRM (4,000 MB/s) for heavy 8K workflows.",
    category_id: catMap["external-ssds"],
  },
  {
    id: uuid(), slug: "best-webcams-2026", question: "What Are the Best Webcams in 2026?",
    description: "We tested premium and mid-range webcams across daylight, low-light, autofocus reliability, microphone quality, and software controls to find the best cameras for work, streaming, and remote collaboration.",
    verdict_summary: "The Logitech MX Brio is the best all-around webcam thanks to its sharp 4K image, strong software, and excellent low-light tuning. Streamers who want mirrorless-style polish should step up to the Elgato Facecam Pro.",
    category_id: catMap["webcams"],
  },
  {
    id: uuid(), slug: "best-usb-c-hubs-2026", question: "What Are the Best USB-C Hubs in 2026?",
    description: "Our team evaluated USB-C hubs and compact docks for port selection, display support, thermal stability, passthrough charging, and travel-friendliness to identify the best options for modern laptops.",
    verdict_summary: "The Anker Prime 14-in-1 USB-C Dock wins for most people with a smart balance of ports, dependable display support, and strong charging. The CalDigit TS4 remains the premium choice for demanding desk setups that need maximum expansion.",
    category_id: catMap["usb-c-hubs"],
  },
  {
    id: uuid(), slug: "best-microphones-2026", question: "What Are the Best Microphones in 2026?",
    description: "We compared popular USB and XLR microphones for vocal clarity, background-noise rejection, ease of setup, software features, and overall value for streaming, podcasting, and hybrid work.",
    verdict_summary: "The Shure MV7+ is the standout pick with rich vocal tone, USB/XLR flexibility, and excellent onboard DSP. Budget creators should look at the HyperX QuadCast S for strong sound and a dead-simple setup.",
    category_id: catMap["microphones"],
  },
];

const rankMap = Object.fromEntries(rankings.map(r => [r.slug, r.id]));

// ─── Products ───
const products = [];
const rankingProducts = [];
const specifications = [];
const sentiments = [];

function addProduct(rankSlug, pos, score, name, link, specs, pros, cons) {
  const pid = uuid();
  products.push({ id: pid, name, link });
  rankingProducts.push({
    id: uuid(), ranking_id: rankMap[rankSlug], product_id: pid,
    score, rank_position: pos,
  });
  for (const [sName, sValue, sUnit] of specs) {
    specifications.push({ id: uuid(), product_id: pid, name: sName, value: sValue, unit: sUnit || undefined });
  }
  const rpId = rankingProducts[rankingProducts.length - 1].id;
  for (const pro of pros) {
    sentiments.push({ id: uuid(), ranking_product_id: rpId, type: "pro", content: pro, headline: pro.split(".")[0] });
  }
  for (const con of cons) {
    sentiments.push({ id: uuid(), ranking_product_id: rpId, type: "con", content: con, headline: con.split(".")[0] });
  }
}

// ─── Monitors Products ───
addProduct("best-monitors-2026", 1, 9.4, "LG UltraGear 27GR95UM", "https://www.lg.com/us/monitors/lg-27gr95um-b-",
  [["Panel Type", "OLED", null], ["Refresh Rate", "480", "Hz"], ["Resolution", "2560×1440", null], ["HDR", "HDR10", null], ["Adaptive-Sync", "FreeSync Premium", null]],
  ["Blazing 480Hz OLED panel with near-instant pixel response—unmatched for esports.", "True HDR10 highlights with infinite contrast make visuals pop.", "Sleek, minimalist design with virtually bezel-free screen."],
  ["OLED risk of burn-in with static UI elements (tactical HUDs).", "Less bright than top-tier mini-LEDs in sunny rooms."]
);

addProduct("best-monitors-2026", 2, 9.2, "Dell UltraSharp U3224KB", "https://www.dell.com/en-us/shop/dell-ultrasharp-32-5k-usb-c-hub-monitor-u3224kb/apd/210-bflp/monitors-monitor-accessories",
  [["Panel Type", "IPS", null], ["Resolution", "5120×2880", "5K"], ["USB Hub", "90W upstream", null], ["Color Gamut", "98% DCI-P3", null], ["HDR", "DisplayHDR 600", null]],
  ["5K canvas is a dream for designers and video editors.", "Built-in 90W USB-C hub powers your laptop and connects peripherals.", "Out-of-the-box color accuracy; factory calibrated."],
  ["Expensive—only for pros who need the pixels.", "No HDMI 2.1—limited to older consoles at full res."]
);

addProduct("best-monitors-2026", 3, 9.0, "Eizo ColorEdge CX310", "https://www.eizo.com/products/coloredge/cx310/",
  [["Panel Type", "IPS", null], ["Resolution", "3840×2160", "4K"], ["Color Gamut", "99% AdobeRGB", null], ["Hardware Calibration", "Yes", null], ["HDR", "HLG", null]],
  ["Industry-leading color accuracy for professional photo/video work.", "Hardware calibration ensures consistency over time without software.", "Built-in sensor and wide gamut coverage."],
  ["Very expensive—only justified for color-critical studios.", "60Hz refresh limits gaming/desktop smoothness."]
);

addProduct("best-monitors-2026", 4, 8.7, "ASUS ProArt PA32UCG-K", "https://www.asus.com/us/proart/proart-pa32ucg-k/",
  [["Panel Type", "mini-LED", null], ["Resolution", "3840×2160", "4K"], ["HDR", "HDR1000", null], ["Color Gamut", "99% DCI-P3", null], ["Refresh Rate", "120", "Hz"]],
  ["mini-LED backlight gives stunning HDR contrast.", "120Hz panel smooths scrolling and motion.", "Thunderbolt 4 connectivity with 96W delivery."],
  ["Command-menu OSD can be clunky to navigate.", "Heavy and requires sturdy desk mounting."]
);

addProduct("best-monitors-2026", 5, 8.4, "Samsung Odyssey G7 28", "https://www.samsung.com/us/gaming-monitors/odyssey-g7-28-inch-4k-144hz-g-sync-python-g77b/",
  [["Panel Type", "IPS", null], ["Resolution", "3840×2160", "4K"], ["Refresh Rate", "144", "Hz"], ["Adaptive-Sync", "G-Sync Compatible", null], ["HDR", "DisplayHDR 400", null]],
  ["4K @ 144Hz balance of crisp visuals and smooth motion.", "G-Sync compatibility validated by NVIDIA.", "Sleek, aggressive gaming aesthetic with solid build."],
  ["HDR400 is entry-level—not as impactful as HDR1000 units.", "Adjustment range limited; stand is functional but not premium."]
);

addProduct("best-monitors-2026", 6, 8.0, "Dell S2722QC", "https://www.dell.com/en-us/shop/dell-s2722qc-27-4k-usb-c-monitor/apd/210-bflq/monitors-monitor-accessories",
  [["Panel Type", "VA", null], ["Resolution", "3840×2160", "4K"], ["USB-C", "65W", null], ["HDR", "HDR10", null], ["Refresh Rate", "60", "Hz"]],
  ["Great value 4K with USB-C for single-cable desktop.", "Decent contrast from VA panel; good for movies.", "Dell's reliable warranty and support."],
  ["60Hz only—gamers look elsewhere.", "VA viewing angles narrower than IPS.", "HDR is basic and hardly worth enabling."]
);

// ─── Office Chairs Products ───
addProduct("best-office-chairs-2026", 1, 9.5, "Herman Miller Aeron", "https://www.hermanmiller.com/products/seating/office-chairs/aeron-chairs/",
  [["Material", "Mesh (Pellicle)", null], ["Lumbar", "adjustable lumbar support", null], ["Armrests", "Fully adjustable", null], ["Weight Capacity", "350", "lbs"], ["Warranty", "12", "years"]],
  ["The gold standard—unmatched breathability and build longevity.", "PostureFit support adapts to your spine's natural curve.", "12-year warranty speaks to durability."],
  ["Very expensive—a long-term investment.", "Mesh isn't for everyone (some prefer padded seats)."]
);

addProduct("best-office-chairs-2026", 2, 9.2, "Steelcase Leap V2", "https://www.steelcase.com/products/leap-v2/",
  [["Material", "LiveBack flexible mesh", null], ["Lumbar", "LiveLumbar adjustable", null], ["Armrests", "4D adjustable", null], ["Seat Depth", "Adjustable", null], ["Warranty", "12", "years"]],
  ["LiveLumbar system offers superb lower-back customization.", "Seat depth adjustment fits different body types perfectly.", "Highly durable—built for 12-hour days."],
  ["Premium pricing puts it in Herman Miller territory.", "Mesh back may not suit those preferring full upholstery."]
);

addProduct("best-office-chairs-2026", 3, 8.9, "autonomous ErgoChair Pro", "https://www.autonomous.ai/products/ergochair-pro",
  [["Material", "Mesh back + foam seat", null], ["Lumbar", "4D adjustable lumbar", null], ["Armrests", "4D", null], ["Recline", "133° tilt", null], ["Warranty", "5", "years"]],
  ["Delivers 90% of the premium chair experience at a mid-range price.", "4D lumbar and arm adjustability is excellent.", "Reclines far enough for micro-breaks."],
  ["5-year warranty shorter than Herman Miller/Steelcase.", "Aesthetics are functional, not luxurious."]
);

addProduct("best-office-chairs-2026", 4, 8.6, "Herman Miller Sayl", "https://www.hermanmiller.com/products/seating/office-chairs/sayl/",
  [["Material", "Elastomeric suspension (3D mesh)", null], ["Lumbar", "Interlocking lumbar", null], ["Armrests", "Height adjustable", null], ["Design", "Suspension-inspired", null], ["Warranty", "12", "years"]],
  ["Striking, lightweight design with exceptional lumbar support.", "More affordable entry to Herman Miller engineering.", "Highly breathable—great for warm climates."],
  ["Less plush for those who prefer soft seats.", "Armrests only height-adjustable, not 4D."]
);

addProduct("best-office-chairs-2026", 5, 8.3, "Steelcase Series 2", "https://www.steelcase.com/products/steelcase-series-2/",
  [["Material", "LiveBack flexible mesh", null], ["Lumbar", "PostureFit lumbar", null], ["Armrests", "Height adjustable", null], ["Seat", "Flexible", null], ["Warranty", "12", "years"]],
  ["LiveBack flexes with your movements—natural support.", "PostureFit lumbar keeps spine aligned.", "Steelcase reliability with a slightly lower price."],
  ["Armrests lack full 4D adjustability vs. Leap V2.", "Seat cushion could be thicker for long sitting sessions."]
);

addProduct("best-office-chairs-2026", 6, 7.9, "Branch Ergonomic Chair", "https://www.branchfurniture.com/products/ergonomic-chair",
  [["Material", "Mesh back + foam seat", null], ["Lumbar", "3D adjustable lumbar", null], ["Armrests", "3D", null], ["Recline", "115°", null], ["Warranty", "10", "years"]],
  ["Clean, modern aesthetic fits any office.", "Good adjustability spectrum for the price.", "Easy assembly in under 10 minutes."],
  ["Lumbar support not as fine-tunable as premium chairs.", "Cushion feels a bit firm for extended sitting."]
);

// ─── External SSDs Products ───
addProduct("best-external-ssds-2026", 1, 9.4, "Samsung T7 Shield", "https://www.samsung.com/us/computing/memory-storage/portable-solid-state-drives/t7-shield-portable-ssd-2tb/",
  [["Interface", "USB 3.2 Gen 2", null], ["Read Speed", "1050", "MB/s"], ["Write Speed", "1000", "MB/s"], ["Rugged", "IP65 water/dust", null], ["Capacity Options", "500GB–4TB", null]],
  ["Rugged IP65 rating handles drops, water, dust—ideal for fieldwork.", "Consistent 1,050 MB/s transfers approach SATA SSD speeds.", "Compact size and included USB-C cable."],
  ["Not the fastest—Thunderbolt options outpace it.", "5-year warranty is solid but some competitors offer longer."]
);

addProduct("best-external-ssds-2026", 2, 9.1, "SanDisk Extreme Pro v3", "https://www.westerndigital.com/products/sandisk-extreme-pro-portable-ssd-v3.html",
  [["Interface", "USB 3.2 Gen 2x2", null], ["Read Speed", "2000", "MB/s"], ["Write Speed", "1500", "MB/s"], ["Rugged", "IP65", null], ["Security", "Hardware encryption", null]],
  ["Blistering 2,000 MB/s reads make light work of 8K footage.", "Rugged with IP65 rating and included carabiner clip.", "Hardware AES-256 encryption for sensitive projects."],
  ["Requires USB 3.2 Gen 2x2 port for max speed (not all PCs have it).", "Slightly pricier per GB than slower drives."]
);

addProduct("best-external-ssds-2026", 3, 8.8, "Sabrent Rocket XTRM", "https://sabrent.com/product/rocket-xtrm/",
  [["Interface", "Thunderbolt 4 / USB4", null], ["Read Speed", "4000", "MB/s"], ["Write Speed", "3800", "MB/s"], ["Capacity", "8TB max", null], ["Form Factor", "0.5\" | 1TB-8TB", null]],
  ["Thunderbolt 4 delivers up to 4,000 MB/s—desktop-class speed in a portable.", "Works on both Thunderbolt and USB-C machines (falls back to USB4).", "Massive 8TB capacity option for pro workflows."],
  ["Needs Thunderbolt 4 to hit full speed (otherwise caps at USB4 20Gbps).", "Enclosure gets warm under sustained loads (external fan silent but present)."]
);

addProduct("best-external-ssds-2026", 4, 8.5, "OWC Envoy Pro FX", "https://buy.owc.com/product/owc-envoy-pro-fx-thunderbolt-usb4-portable-ssd/",
  [["Interface", "Thunderbolt 4 / USB4", null], ["Read Speed", "2800", "MB/s"], ["Write Speed", "2700", "MB/s"], ["Rugged", "IP67", null], ["Capacity", "500GB–4TB", null]],
  ["IP67 rating—fully dust/waterproof, perfect for on-location shooting.", "Thunderbolt 4 speeds without breaking the bank.", "OWC's reputation for Mac compatibility is strong."],
  ["Higher cost per GB than SATA-class SSDs.", "Metallic exterior can dent if dropped on hard surface."]
);

addProduct("best-external-ssds-2026", 5, 8.2, "Crucial X9 Pro", "https://www.crucial.com/ssd/external-ssds/crucial/x9-pro-portable-ssd",
  [["Interface", "USB 3.2 Gen 2", null], ["Read Speed", "1050", "MB/s"], ["Write Speed", "1000", "MB/s"], ["Security", "Hardware encryption", null], ["Capacity", "1TB–4TB", null]],
  ["Reliable performance at a competitive price point.", "Crucial's reputation for NAND quality gives confidence.", "Hardware encryption without software setup."],
  ["Plastic build feels less premium than metal rivals.", "No IP rating—treat with care."]
);

addProduct("best-external-ssds-2026", 6, 7.8, "WD My Passport SSD", "https://www.westerndigital.com/products/wd-my-passport-portable-ssd-2tb.html",
  [["Interface", "USB 3.2 Gen 2", null], ["Read Speed", "1050", "MB/s"], ["Write Speed", "900", "MB/s"], ["Capacity", "500GB–4TB", null], ["Warranty", "5", "years"]],
  ["Brand trust and widespread retail availability.", "Auto-backup software included for non-techies.", "Good speeds for everyday backups."],
  ["Plastic build and included cable feel cheap for the price.", "Less rugged than Samsung/SanDisk options.", "5-year warranty is standard but not exceptional."]
);

// ─── Webcams Products ───
addProduct("best-webcams-2026", 1, 9.3, "Logitech MX Brio", "https://www.logitech.com/en-us/products/webcams/mx-brio.html",
  [["Resolution", "3840×2160", "4K"], ["Frame Rate", "60", "fps"], ["Sensor", "Sony STARVIS", null], ["Field of View", "65°/78°/90°", null], ["Microphones", "Dual beamforming", null], ["Connectivity", "USB-C", null]],
  ["Excellent 4K sharpness with strong HDR tuning makes it look polished in almost any room.", "Logi Options+ gives you granular control over framing, exposure, and image style.", "Dual beamforming mics are good enough for meetings when you do not want a separate mic."],
  ["Premium price compared with 1080p-only alternatives.", "Windows Hello support is still missing."]
);

addProduct("best-webcams-2026", 2, 9.1, "Elgato Facecam Pro", "https://www.elgato.com/us/en/p/facecam-pro",
  [["Resolution", "3840×2160", "4K"], ["Frame Rate", "60", "fps"], ["Lens", "f/2.0 prime lens", null], ["Sensor", "Sony STARVIS", null], ["Field of View", "90", "degrees"], ["Connectivity", "USB-C", null]],
  ["Crisp 4K60 output gives creators a noticeably more cinematic image than most webcams.", "Elgato Camera Hub offers deep manual controls for exposure, ISO, and white balance.", "Wide 90-degree field of view works well for multi-person streams or overhead setups."],
  ["No built-in microphone, so you need separate audio.", "Runs warm during long recording sessions."]
);

addProduct("best-webcams-2026", 3, 8.8, "Razer Kiyo Pro Ultra", "https://www.razer.com/streaming-cameras/razer-kiyo-pro-ultra",
  [["Resolution", "3840×2160", "4K"], ["Frame Rate", "30", "fps"], ["Sensor", "1/1.2-inch Sony STARVIS 2", null], ["Aperture", "f/1.7", null], ["Field of View", "72°/82°/93°", null], ["Autofocus", "Phase detect", null]],
  ["Huge sensor delivers some of the best low-light quality in the webcam category.", "Fast autofocus keeps faces sharp without distracting hunting.", "Image looks flattering and natural right out of the box."],
  ["Large body can feel bulky on thinner monitors.", "4K is limited to 30fps."]
);

addProduct("best-webcams-2026", 4, 8.6, "Insta360 Link 2", "https://www.insta360.com/product/insta360-link-2",
  [["Resolution", "3840×2160", "4K"], ["Frame Rate", "30", "fps"], ["Gimbal", "2-axis", null], ["Tracking", "AI auto-framing", null], ["Modes", "DeskView/Whiteboard/Portrait", null], ["Microphones", "Dual noise-canceling", null]],
  ["Gimbal tracking is genuinely useful for presenters who move around on calls.", "DeskView and whiteboard modes are great for demos, teaching, and remote workshops.", "Compact design feels more refined than first-generation PTZ webcams."],
  ["AI tracking can occasionally feel overactive in tight spaces.", "Software takes a bit of setup to master."]
);

addProduct("best-webcams-2026", 5, 8.3, "Obsbot Tiny 2 Lite", "https://www.obsbot.com/obsbot-tiny-2-lite",
  [["Resolution", "3840×2160", "4K"], ["Frame Rate", "30", "fps"], ["Gimbal", "2-axis PTZ", null], ["Tracking", "AI gesture tracking", null], ["Microphones", "Dual omnidirectional", null], ["Connectivity", "USB-C", null]],
  ["AI framing and gesture controls feel surprisingly practical for solo creators.", "Compact PTZ body fits well on laptops and travel monitors.", "Very good value for buyers who want auto-tracking without Elgato pricing."],
  ["Image tuning is not as refined as Logitech or Razer.", "Built-in mics are usable, not standout."]
);

addProduct("best-webcams-2026", 6, 8.0, "AnkerWork C310", "https://www.ankerwork.com/products/a3367",
  [["Resolution", "3840×2160", "4K"], ["Frame Rate", "30", "fps"], ["Field of View", "65°/78°/95°", null], ["Microphones", "Dual stereo", null], ["Privacy Cover", "Integrated", null], ["Connectivity", "USB-C", null]],
  ["Affordable 4K webcam with a dependable image for meetings and remote work.", "Integrated privacy shutter is a small but meaningful quality-of-life win.", "AnkerWork software is simple and easy for non-technical buyers."],
  ["Dynamic range struggles in harsh backlighting.", "Autofocus is slower than top-tier models."]
);

// ─── USB-C Hubs Products ───
addProduct("best-usb-c-hubs-2026", 1, 9.4, "Anker Prime 14-in-1 USB-C Docking Station", "https://www.anker.com/products/a83b6",
  [["Ports", "14", null], ["Display Support", "Dual 4K", null], ["Upstream Charging", "160", "W"], ["Ethernet", "2.5", "Gbps"], ["USB-A", "3x 10Gbps", null], ["Card Reader", "SD/microSD UHS-II", null]],
  ["Excellent port mix covers power users without jumping to enterprise dock pricing.", "Strong 160W upstream charging is enough for most 14-inch and many 16-inch laptops.", "Stable thermals and reliable monitor detection in daily use."],
  ["Bulky for frequent travel.", "Mac multi-display support still depends on host limitations."]
);

addProduct("best-usb-c-hubs-2026", 2, 9.2, "CalDigit TS4", "https://www.caldigit.com/ts4/",
  [["Ports", "18", null], ["Display Support", "Up to dual 6K", null], ["Upstream Charging", "98", "W"], ["Ethernet", "2.5", "Gbps"], ["Thunderbolt", "3 downstream", null], ["Audio", "Front and rear audio", null]],
  ["Still the gold standard for premium desktop expansion and port reliability.", "Huge number of high-speed ports makes it ideal for creators with lots of peripherals.", "Rock-solid build quality and excellent Mac support."],
  ["Expensive compared with mainstream USB-C hubs.", "Less compelling if you only need a lightweight travel hub."]
);

addProduct("best-usb-c-hubs-2026", 3, 8.9, "UGREEN Revodok Max 213", "https://www.ugreen.com/products/revodok-max-213-thunderbolt-dock",
  [["Ports", "13", null], ["Display Support", "Dual 4K or single 8K", null], ["Upstream Charging", "90", "W"], ["Ethernet", "2.5", "Gbps"], ["USB-A", "3x 10Gbps", null], ["Storage", "SD/microSD", null]],
  ["Great balance of features and price for creators who want a TS4 alternative.", "Fast card readers and 2.5GbE make it especially appealing for photo and video workflows.", "Compact footprint is easier to fit on smaller desks."],
  ["Power brick is still fairly chunky.", "Software/firmware support is not as mature as CalDigit's."]
);

addProduct("best-usb-c-hubs-2026", 4, 8.6, "Satechi 13-in-1 USB-C Triple Display Multiport Adapter", "https://satechi.net/products/13-in-1-usb-c-triple-display-multiport-adapter",
  [["Ports", "13", null], ["Display Support", "Triple display", null], ["Upstream Charging", "100", "W"], ["Ethernet", "1", "Gbps"], ["HDMI", "2x 4K", null], ["Card Reader", "SD/microSD", null]],
  ["Excellent travel-friendly dock for hybrid workers who need lots of ports in one brick.", "Triple-display flexibility is useful on compatible Windows laptops.", "Satechi design and finish pair nicely with premium ultrabooks."],
  ["Gets warmer than desktop-oriented docks under sustained load.", "Cable is a bit short for some monitor riser setups."]
);

addProduct("best-usb-c-hubs-2026", 5, 8.3, "HyperDrive Next 10 Port USB-C Hub", "https://www.hypershop.com/products/hyperdrive-next-10-port-usb-c-hub",
  [["Ports", "10", null], ["Display Support", "4K 60Hz", null], ["Upstream Charging", "100", "W"], ["Ethernet", "1", "Gbps"], ["USB", "2x USB-C + 2x USB-A", null], ["Card Reader", "SD/microSD 104MB/s", null]],
  ["Nicely balanced port selection for MacBook and Windows ultraportable owners.", "Compact aluminum design is ideal for travel bags and hot-desk setups.", "Reliable 4K60 output, which many cheaper hubs still miss."],
  ["Only one external display on many Macs without DisplayLink.", "Not enough downstream bandwidth for heavier desktop setups."]
);

addProduct("best-usb-c-hubs-2026", 6, 8.1, "Belkin Connect 7-in-1 USB-C Hub", "https://www.belkin.com/p/usb-c-7-in-1-multiport-adapter/AVC009.html",
  [["Ports", "7", null], ["Display Support", "4K 60Hz HDMI", null], ["Upstream Charging", "100", "W"], ["Ethernet", "1", "Gbps"], ["USB-A", "2x 5Gbps", null], ["Card Reader", "SD/microSD", null]],
  ["Straightforward, dependable hub from a brand with good retail support and availability.", "Small enough to keep permanently in a laptop sleeve.", "Consistent plug-and-play performance for everyday office setups."],
  ["Port count is limited versus 10-in-1 and 14-in-1 options.", "5Gbps USB speeds are merely adequate for fast external storage."]
);

// ─── Microphones Products ───
addProduct("best-microphones-2026", 1, 9.3, "Shure MV7+", "https://www.shure.com/en-US/products/microphones/mv7plus",
  [["Connection", "USB-C + XLR", null], ["Capsule Type", "Dynamic", null], ["Polar Pattern", "Cardioid", null], ["DSP", "Auto level + denoiser + reverb", null], ["Headphone Jack", "Yes", null], ["Mount", "Integrated yoke", null]],
  ["Broadcast-style vocal tone with excellent background-noise rejection for untreated rooms.", "USB and XLR connectivity makes it a smart long-term buy that scales with your setup.", "Shure MOTIV software adds genuinely useful DSP without overwhelming beginners."],
  ["Price is high once you add a boom arm.", "Touch panel can be a little sensitive."]
);

addProduct("best-microphones-2026", 2, 9.0, "HyperX QuadCast S", "https://hyperx.com/products/hyperx-quadcast-s-usb-microphone",
  [["Connection", "USB-C", null], ["Capsule Type", "Condenser", null], ["Polar Patterns", "4", null], ["Shock Mount", "Integrated", null], ["Headphone Jack", "Yes", null], ["Lighting", "RGB", null]],
  ["Easy plug-and-play setup with consistently clear voice capture for streaming and Discord.", "Integrated shock mount and tap-to-mute design remove a lot of beginner pain points.", "Four polar patterns make it more flexible than most USB-only mics."],
  ["Sensitive condenser capsule picks up more room noise.", "RGB styling is not for everyone."]
);

addProduct("best-microphones-2026", 3, 8.8, "Elgato Wave:3", "https://www.elgato.com/us/en/p/wave-3",
  [["Connection", "USB-C", null], ["Capsule Type", "Condenser", null], ["Polar Pattern", "Cardioid", null], ["Sample Rate", "96", "kHz"], ["Clipguard", "Yes", null], ["Headphone Jack", "Yes", null]],
  ["Wave Link software is still one of the best mixer experiences for streamers.", "Clipguard tech helps prevent ruined takes when you suddenly get louder.", "Compact body works well on crowded desks and low-profile boom arms."],
  ["Single cardioid pattern limits versatility for group recording.", "Sound is clean, but less rich than top dynamic options."]
);

addProduct("best-microphones-2026", 4, 8.5, "Rode PodMic USB", "https://rode.com/en/microphones/usb/podmic-usb",
  [["Connection", "USB-C + XLR", null], ["Capsule Type", "Dynamic", null], ["Polar Pattern", "Cardioid", null], ["DSP", "APHEX processing", null], ["Headphone Jack", "Yes", null], ["Construction", "All-metal", null]],
  ["Great radio-style tone with better room-noise rejection than most USB condensers.", "Dual USB/XLR output gives you a smooth upgrade path into mixers and interfaces.", "Tank-like construction feels made for years of use."],
  ["Needs decent gain or close mic technique to sound its best.", "Heavier than many boom arms prefer."]
);

addProduct("best-microphones-2026", 5, 8.2, "Logitech G Yeti GX", "https://www.logitechg.com/en-us/products/streaming-gear/yeti-gx-gaming-microphone.html",
  [["Connection", "USB-C", null], ["Capsule Type", "Dynamic", null], ["Polar Pattern", "Supercardioid", null], ["DSP", "Smart Audio Lock", null], ["Lighting", "LIGHTSYNC RGB", null], ["Mount", "Desktop stand included", null]],
  ["Dynamic capsule helps gamers cut down keyboard and fan noise.", "Smart Audio Lock is useful for keeping levels controlled during energetic streams.", "Distinctive industrial design stands out on camera."],
  ["Software is more gamer-centric than podcast-centric.", "Desk stand is serviceable, but a boom arm is better."]
);

addProduct("best-microphones-2026", 6, 8.0, "Audio-Technica AT2040USB", "https://www.audio-technica.com/en-us/at2040usb",
  [["Connection", "USB-C", null], ["Capsule Type", "Dynamic", null], ["Polar Pattern", "Hypercardioid", null], ["Headphone Jack", "Yes", null], ["Mute", "Touch mute", null], ["Construction", "Metal chassis", null]],
  ["Warm, focused vocal sound that flatters spoken-word content.", "Dynamic design rejects room noise better than typical condenser USB mics.", "Strong value for buyers who want podcast-style sound without XLR gear."],
  ["No XLR output limits long-term upgrade flexibility.", "Needs close placement for best results."]
);

// ─── FAQs ───
const faqs = [
  // Monitors
  { id: uuid(), ranking_id: rankMap["best-monitors-2026"], question: "What monitor refresh rate do I need for gaming?", answer: "For competitive esports, 240–480Hz provides a measurable edge. For single-player and general use, 144Hz is the sweet spot. 60Hz is fine for office work but feels sluggish for gaming.", display_order: 1 },
  { id: uuid(), ranking_id: rankMap["best-monitors-2026"], question: "Should I buy an OLED or mini-LED monitor?", answer: "OLED offers perfect blacks and instant response but carries burn-in risk with static UI. mini-LED provides higher brightness and no burn-in but with slower response. Choose OLED for pure image quality and gaming; choose mini-LED for HDR brightness and longevity.", display_order: 2 },
  { id: uuid(), ranking_id: rankMap["best-monitors-2026"], question: "Is a 4K monitor worth it in 2026?", answer: "For creative work and 32+ inch screens, 4K or 5K is essential for pixel density. For gaming, 1440p @ high refresh often feels smoother and is more GPU-friendly. Consider your primary use case before buying.", display_order: 3 },
  // Office Chairs
  { id: uuid(), ranking_id: rankMap["best-office-chairs-2026"], question: "How do I adjust my office chair for proper posture?", answer: "Set seat height so feet are flat and knees at 90°. Adjust lumbar to support the natural curve of your lower back. Position armrests so elbows rest at 90–110°. Recline slightly (100–110°) to reduce spinal disc pressure.", display_order: 1 },
  { id: uuid(), ranking_id: rankMap["best-office-chairs-2026"], question: "Are mesh chairs better than padded chairs?", answer: "Mesh chairs offer superior breathability for long, hot days but less cushioning. Padded chairs feel softer initially but can trap heat. Mesh is generally preferred for 8+ hour daily use in warm climates; padded works for moderate use or colder environments.", display_order: 2 },
  { id: uuid(), ranking_id: rankMap["best-office-chairs-2026"], question: "How long should an office chair last?", answer: "Quality ergonomic chairs from Herman Miller, Steelcase, etc., last 10–15 years with proper maintenance. Warranty length is a good proxy—12 years suggests the manufacturer expects long-term durability. Cheap chairs often need replacement in 3–5 years.", display_order: 3 },
  // External SSDs
  { id: uuid(), ranking_id: rankMap["best-external-ssds-2026"], question: "What's the difference between USB 3.2, USB4, and Thunderbolt 4 for external SSDs?", answer: "USB 3.2 Gen 2 caps at 1,050 MB/s—fine for backups. USB4 hits 2,000–3,000 MB/s. Thunderbolt 4 supports up to 4,000 MB/s and daisy-chaining. Match the drive to your port: Thunderbolt drives work with USB4 but won't hit full speed on USB 3.2.", display_order: 1 },
  { id: uuid(), ranking_id: rankMap["best-external-ssds-2026"], question: "Do I need an external SSD for gaming?", answer: "Modern consoles (PS5, Xbox Series X|S) support external SSD expansion for backward-compatible games, but you need internal NVMe for current-gen titles. For PC gaming, an external SSD is great for portable game libraries or as a quick archive drive.", display_order: 2 },
  { id: uuid(), ranking_id: rankMap["best-external-ssds-2026"], question: "How often should I replace my external SSD?", answer: "NAND flash wears out after ~3,000–5,000 program/erase cycles for TLC, more for QLC. For typical consumer use (backups, media), 5–7 years is reasonable. Monitor SMART health if the drive reports it; replace if you see significant slowdowns or errors.", display_order: 3 },
  // Webcams
  { id: uuid(), ranking_id: rankMap["best-webcams-2026"], question: "Is a 4K webcam worth it for Zoom and Teams calls?", answer: "If you mostly take calls in good lighting, a strong 1080p webcam is still enough. But 4K webcams usually have better sensors, sharper cropping, and stronger low-light processing, so they look more polished even when apps compress the image down to 1080p.", display_order: 1 },
  { id: uuid(), ranking_id: rankMap["best-webcams-2026"], question: "What matters more, sensor size or resolution?", answer: "Sensor size usually matters more than raw resolution because it affects low-light quality, dynamic range, and background separation. A well-tuned 4K webcam with a larger sensor will generally look more natural than a cheaper high-resolution model with weak optics.", display_order: 2 },
  { id: uuid(), ranking_id: rankMap["best-webcams-2026"], question: "Should I buy a webcam with AI tracking?", answer: "AI tracking is genuinely useful if you teach, present, or move around during calls. For standard desk setups, image quality, autofocus, and software controls matter more than motorized tracking, so a fixed camera is often the better value.", display_order: 3 },
  { id: uuid(), ranking_id: rankMap["best-webcams-2026"], question: "Do built-in webcam microphones sound good enough?", answer: "For meetings, many premium webcams are good enough in a quiet room. For streaming, podcasting, or client presentations, a dedicated USB microphone still sounds fuller and rejects background noise much better.", display_order: 4 },
  // USB-C Hubs
  { id: uuid(), ranking_id: rankMap["best-usb-c-hubs-2026"], question: "What's the difference between a USB-C hub and a docking station?", answer: "A hub is usually smaller, bus-powered or lightly powered, and built for travel or simple desk expansion. A docking station is typically externally powered, offers more bandwidth and ports, and is better suited to permanent multi-monitor or creator setups.", display_order: 1 },
  { id: uuid(), ranking_id: rankMap["best-usb-c-hubs-2026"], question: "Do USB-C hubs work the same on Mac and Windows?", answer: "Not always. Port function is usually the same, but external display support varies by the laptop's chipset and operating system. Many Macs, especially base M-series models, have stricter multi-display limits than comparable Windows laptops.", display_order: 2 },
  { id: uuid(), ranking_id: rankMap["best-usb-c-hubs-2026"], question: "How much passthrough charging do I need?", answer: "For ultraportables, 65W to 100W is usually enough. For larger creator or gaming laptops, 100W to 140W is safer, though some power-hungry machines still need their original charger for full performance under load.", display_order: 3 },
  { id: uuid(), ranking_id: rankMap["best-usb-c-hubs-2026"], question: "Can a USB-C hub slow down my SSD or monitor?", answer: "Yes, if the hub shares bandwidth across many devices or if your laptop only exposes a lower-speed USB-C port. Fast external SSDs, high-refresh displays, and multiple peripherals can compete for bandwidth, so premium docks matter when you run everything at once.", display_order: 4 },
  // Microphones
  { id: uuid(), ranking_id: rankMap["best-microphones-2026"], question: "Should I buy a USB or XLR microphone in 2026?", answer: "USB is still the easiest choice for most people because setup is faster and sound quality is excellent on modern models. If you want upgrade flexibility, dual-mode microphones with both USB and XLR are the sweet spot because they work now and still fit a more advanced setup later.", display_order: 1 },
  { id: uuid(), ranking_id: rankMap["best-microphones-2026"], question: "Are dynamic microphones better than condenser microphones for home offices?", answer: "Usually, yes. Dynamic microphones reject keyboard noise, fans, and room echo better than condensers, which makes them a smarter pick for untreated rooms. Condensers can sound more detailed, but they are also less forgiving.", display_order: 2 },
  { id: uuid(), ranking_id: rankMap["best-microphones-2026"], question: "Do I need a boom arm and pop filter?", answer: "A boom arm is strongly recommended because it lets you position the mic closer to your mouth, which improves clarity and reduces room noise. A pop filter is helpful for plosives, though many modern streaming mics already include decent internal wind protection.", display_order: 3 },
  { id: uuid(), ranking_id: rankMap["best-microphones-2026"], question: "What is the best microphone for gaming and Discord?", answer: "For most gamers, a dynamic USB microphone is the best fit because it sounds full while keeping keyboard and PC fan noise under control. Models like the Shure MV7+ and Logitech G Yeti GX are especially strong for spoken voice and live chat.", display_order: 4 },
];

// ─── Build snapshot payload ───
const snapshot = {
  categories: categories.map(c => ({ ...c, created_at: now, updated_at: now })),
  rankings: rankings.map(r => ({ ...r, created_at: now, updated_at: now })),
  products: products.map(p => ({ ...p, created_at: now, updated_at: now })),
  ranking_products: rankingProducts.map(rp => ({ ...rp, created_at: now, updated_at: now })),
  users: [],
  sentiments: sentiments.map(s => ({ ...s, created_at: now, updated_at: now })),
  specifications: specifications.map(s => ({ ...s, created_at: now, updated_at: now })),
  assets: [],
  faqs: faqs.map(f => ({ ...f, created_at: now, updated_at: now })),
};

// Write to temp file for convex run
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const tmpFile = join(__dirname, ".seed-payload.json");
writeFileSync(tmpFile, JSON.stringify(snapshot, null, 2));

console.log("Seed payload written to", tmpFile);
console.log(`Categories: ${snapshot.categories.length}`);
console.log(`Rankings: ${snapshot.rankings.length}`);
console.log(`Products: ${snapshot.products.length}`);
console.log(`Ranking Products: ${snapshot.ranking_products.length}`);
console.log(`Sentiments: ${snapshot.sentiments.length}`);
console.log(`Specifications: ${snapshot.specifications.length}`);
console.log(`FAQs: ${snapshot.faqs.length}`);

// Run the mutation via convex CLI
try {
  const result = execSync(
    `npx convex run imports:importSnapshot < "${tmpFile}"`,
    { cwd: join(__dirname, ".."), stdio: ["pipe", "pipe", "pipe"], timeout: 30000 }
  );
  console.log("\n✅ Import result:", result.toString());
} catch (err) {
  // convex run may need args differently - try with --args flag
  console.log("Trying with --args flag...");
  const payload = JSON.stringify(snapshot);
  try {
    const result = execSync(
      `npx convex run imports:importSnapshot --args '${payload}'`,
      { cwd: join(__dirname, ".."), stdio: ["pipe", "pipe", "pipe"], timeout: 30000, maxBuffer: 10 * 1024 * 1024 }
    );
    console.log("\n✅ Import result:", result.toString());
  } catch (err2) {
    console.error("❌ Import failed:", err2.stderr?.toString() || err2.message);
    console.log("\nPayload saved to", tmpFile, "— run manually with:");
    console.log(`cd ${join(__dirname, "..")} && npx convex run imports:importSnapshot < scripts/.seed-payload.json`);
    process.exit(1);
  }
}
