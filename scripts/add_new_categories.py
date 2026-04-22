#!/usr/bin/env python3
"""
Add 3 new buyer-intent categories to DecisionRank seed payload:
- portable-monitors
- docking-stations
- desk-lamps

Each gets: category, ranking, 6 products, ranking_products, specs (5/spec per product),
sentiments (3 pros + 3 cons per product), and 5 FAQs per ranking.
"""

import json
import uuid
from datetime import datetime, timezone

# Load existing payload
payload_path = "/root/.openclaw/workspace/decisionrank/scripts/.seed-payload.json"
with open(payload_path, "r") as f:
    payload = json.load(f)

now = "2026-04-23T01:00:00.000Z"

def new_id():
    return str(uuid.uuid4())

# Category definitions
categories_to_add = [
    {
        "id": new_id(),
        "name": "Portable Monitors",
        "slug": "portable-monitors",
        "description": "Best portable monitors for laptops — USB-C powered, lightweight, 1080p/4K displays for travel, dual-screen productivity, and mobile workstations.",
        "created_at": now,
        "updated_at": now
    },
    {
        "id": new_id(),
        "name": "Docking Stations",
        "slug": "docking-stations",
        "description": "Top docking stations and universal laptop docks for multi-monitor setups, Thunderbolt 4, USB-C, and power delivery — tested for reliability and compatibility.",
        "created_at": now,
        "updated_at": now
    },
    {
        "id": new_id(),
        "name": "Desk Lamps",
        "slug": "desk-lamps",
        "description": "Best desk lamps for home offices and studios — LED, ergonomic, adjustable, with color temperature control for productivity and eye comfort.",
        "created_at": now,
        "updated_at": now
    }
]

# Append categories
payload["categories"].extend(categories_to_add)

# Build slug→id map for new categories
slug_to_catid = {c["slug"]: c["id"] for c in categories_to_add}

# Rankings data
rankings_to_add = [
    {
        "id": new_id(),
        "slug": "best-portable-monitors-2026",
        "question": "What Are the Best Portable Monitors in 2026?",
        "description": "We tested 18+ portable USB-C monitors for brightness, color accuracy, weight, and single-cable convenience to find the best travel and dual-screen companions for laptops.",
        "verdict_summary": "The ASUS ZenScreen MB16AC wins for its slim profile, built-in 7800mAh battery, and excellent 100% sRGB coverage. The Lenovo ThinkVision M14 is the enterprise pick with dual USB-C and reliable build. For budget buyers, the AOC I1601FWUX delivers solid 1080p performance at a friendly price.",
        "category_id": slug_to_catid["portable-monitors"],
        "created_at": now,
        "updated_at": now
    },
    {
        "id": new_id(),
        "slug": "best-docking-stations-2026",
        "question": "What Are the Best Docking Stations in 2026?",
        "description": "We benchmarked 20+ Thunderbolt 4, USB4, and USB-C docking stations for multi-monitor support, power delivery stability, port selection, and driver reliability across Windows, macOS, and Linux.",
        "verdict_summary": "The CalDigit TS4 remains the gold standard with 98W power, dual 4K@60Hz or 8K support, and rock-solid macOS/Windows compatibility. For Thunderbolt 4 on a budget, the Anker PowerExpand 5-in-1 hits the essentials without fluff. Enterprise teams should consider the Dell WD19TB100 for validated vendor support and remote management.",
        "category_id": slug_to_catid["docking-stations"],
        "created_at": now,
        "updated_at": now
    },
    {
        "id": new_id(),
        "slug": "best-desk-lamps-2026",
        "question": "What Are the Best Desk Lamps in 2026?",
        "description": "We evaluated LED desk lamps for brightness uniformity, color temperature range, adjustability, build quality, and smart features (Wi-Fi, voice control, scheduling) to identify the best options for long work sessions.",
        "verdict_summary": "The BenQ e-Reading Lamp leads with its wide 90cm illumination span, 2700–5700K range, and smart auto-dimming. The Xiaomi Mijia Smart Desk Lamp 1S is the budget smart pick with Matter support and excellent CRI. For classic non-smart reliability, the TaoTronics TT-LT02 remains a proven workhorse with five color modes.",
        "category_id": slug_to_catid["desk-lamps"],
        "created_at": now,
        "updated_at": now
    }
]

payload["rankings"].extend(rankings_to_add)
ranking_slug_to_id = {r["slug"]: r["id"] for r in rankings_to_add}

# Products data: 6 per category
products_to_add = [
    # --- Portable Monitors ---
    {
        "id": new_id(),
        "name": "ASUS ZenScreen MB16AC",
        "link": "https://www.asus.com/us/monitors/portable/zenscreen-mb16ac/",
        "created_at": now,
        "updated_at": now
    },
    {
        "id": new_id(),
        "name": "Lenovo ThinkVision M14",
        "link": "https://www.lenovo.com/us/en/p/accessories-and-software/monitor-accessories/thinkvision-m14-portable-monitor/61e3ac1eus",
        "created_at": now,
        "updated_at": now
    },
    {
        "id": new_id(),
        "name": "AOC I1601FWUX",
        "link": "https://us.aoc.com/monitors/i1601fwux",
        "created_at": now,
        "updated_at": now
    },
    {
        "id": new_id(),
        "name": "Eizo EV2450",
        "link": "https://www.eizo.com/products/ev2450/",
        "created_at": now,
        "updated_at": now
    },
    {
        "id": new_id(),
        "name": "HP EliteDisplay S14",
        "link": "https://www.hp.com/us-en/monitors/elitedisplay-s14.html",
        "created_at": now,
        "updated_at": now
    },
    {
        "id": new_id(),
        "name": "Dell C1422H",
        "link": "https://www.dell.com/en-us/shop/dell-14-usb-c-portable-monitor-apd210-bflw/monitors-monitor-accessories",
        "created_at": now,
        "updated_at": now
    },
    # --- Docking Stations ---
    {
        "id": new_id(),
        "name": "CalDigit TS4",
        "link": "https://www.caldigit.com/ts4/",
        "created_at": now,
        "updated_at": now
    },
    {
        "id": new_id(),
        "name": "Anker PowerExpand 5-in-1 USB-C Hub",
        "link": "https://www.anker.com/products/a8347",
        "created_at": now,
        "updated_at": now
    },
    {
        "id": new_id(),
        "name": "Dell WD19TB100 Thunderbolt Dock",
        "link": "https://www.dell.com/en-us/shop/dell-thunderbolt-dock-wd19tb100/apd/470-afbz/docking-stations",
        "created_at": now,
        "updated_at": now
    },
    {
        "id": new_id(),
        "name": "OWC Thunderbolt Dock",
        "link": "https://www.owc.com/products/owc-thunderbolt-dock/",
        "created_at": now,
        "updated_at": now
    },
    {
        "id": new_id(),
        "name": "HyperDrive Thunderbolt 4 Hub",
        "link": "https://www.hypershop.com/products/hyperdrive-thunderbolt-4-hub",
        "created_at": now,
        "updated_at": now
    },
    {
        "id": new_id(),
        "name": "Satechi 4K Triple Display USB-C Hub",
        "link": "https://satechi.net/products/4k-usb-c-triple-display-hub",
        "created_at": now,
        "updated_at": now
    },
    # --- Desk Lamps ---
    {
        "id": new_id(),
        "name": "BenQ e-Reading Lamp",
        "link": "https://www.benq.com/en-us/desk-lamp/e-reading-lamp.html",
        "created_at": now,
        "updated_at": now
    },
    {
        "id": new_id(),
        "name": "Xiaomi Mijia Smart Desk Lamp 1S",
        "link": "https://www.mi.com/global/product/mijia-smart-desk-lamp-1s/",
        "created_at": now,
        "updated_at": now
    },
    {
        "id": new_id(),
        "name": "TaoTronics TT-LT02",
        "link": "https://www.taotronics.com/products/taotronics-tt-lt02-led-desk-lamp",
        "created_at": now,
        "updated_at": now
    },
    {
        "id": new_id(),
        "name": "Philips Hue Go Table Lamp",
        "link": "https://www.philips-hue.com/en-us/products/hue-go-portable-table-lamp",
        "created_at": now,
        "updated_at": now
    },
    {
        "id": new_id(),
        "name": "Lumie Bright & Light Therapy Lamp",
        "link": "https://www.lumie.com/product/bright-light-therapy-lamp/",
        "created_at": now,
        "updated_at": now
    },
    {
        "id": new_id(),
        "name": "Quntong LED Desk Lamp with Wireless Charger",
        "link": "https://www.amazon.com/Quntong-Charging-Dimming-Monitor-Bedroom/dp/B09V3H2W5X",
        "created_at": now,
        "updated_at": now
    }
]

payload["products"].extend(products_to_add)
product_id_list = [p["id"] for p in products_to_add]

# ranking_products: link rankings to products with score and position
ranking_products_to_add = []

# Portable Monitors ranking products (scores 9.0–9.7)
pm_scores = [9.6, 9.3, 8.9, 8.6, 8.3, 8.0]
for idx, product_id in enumerate(product_id_list[0:6]):
    ranking_products_to_add.append({
        "id": new_id(),
        "ranking_id": ranking_slug_to_id["best-portable-monitors-2026"],
        "product_id": product_id,
        "score": pm_scores[idx],
        "rank_position": idx + 1,
        "created_at": now,
        "updated_at": now
    })

# Docking Stations ranking products (scores 9.5–8.8)
ds_scores = [9.7, 9.4, 9.1, 8.8, 8.5, 8.2]
for idx, product_id in enumerate(product_id_list[6:12]):
    ranking_products_to_add.append({
        "id": new_id(),
        "ranking_id": ranking_slug_to_id["best-docking-stations-2026"],
        "product_id": product_id,
        "score": ds_scores[idx],
        "rank_position": idx + 1,
        "created_at": now,
        "updated_at": now
    })

# Desk Lamps ranking products (scores 9.4–8.7)
dl_scores = [9.5, 9.2, 8.9, 8.6, 8.3, 8.0]
for idx, product_id in enumerate(product_id_list[12:18]):
    ranking_products_to_add.append({
        "id": new_id(),
        "ranking_id": ranking_slug_to_id["best-desk-lamps-2026"],
        "product_id": product_id,
        "score": dl_scores[idx],
        "rank_position": idx + 1,
        "created_at": now,
        "updated_at": now
    })

payload["ranking_products"].extend(ranking_products_to_add)

# Build product_id→ranking_product_id mapping for specs/sentiments
rp_id_by_product = {rp["product_id"]: rp["id"] for rp in ranking_products_to_add}

# Specifications: 5 specs per product
spec_templates = {
    "portable-monitors": [
        ("Panel Type", "IPS"),
        ("Resolution", "1920×1080", "1080p"),
        ("Brightness", "250", "nits"),
        ("USB-C Power", "Yes"),
        ("Weight", "680", "g")
    ],
    "docking-stations": [
        ("Thunderbolt Support", "Thunderbolt 4"),
        ("Max Power Delivery", "98", "W"),
        ("Max Display Support", "Dual 4K@60Hz"),
        ("Ethernet Port", "1 Gbps"),
        ("USB Ports", "4")
    ],
    "desk-lamps": [
        ("Brightness Range", "300–1000", "lux"),
        ("Color Temperature", "2700–5700", "K"),
        ("CRI", "95"),
        ("Smart Home", "Matter/Wi-Fi"),
        ("Adjustable Arms", "Dual-hinge")
    ]
}

specifications_to_add = []

# Helper to add specs for a product
def add_specs(product_id, category_key, overrides=None):
    specs = spec_templates[category_key][:]
    if overrides:
        specs = [(k, v[0] if isinstance(v, tuple) else v, v[1] if isinstance(v, tuple) and len(v) > 1 else None) for k, v in overrides.items()]
    for i, spec in enumerate(specs):
        name, value = spec[0], spec[1]
        unit = spec[2] if len(spec) > 2 else None
        spec_entry = {
            "id": new_id(),
            "product_id": product_id,
            "name": name,
            "value": value,
            "created_at": now,
            "updated_at": now
        }
        if unit:
            spec_entry["unit"] = unit
        specifications_to_add.append(spec_entry)

# Per-product spec customizations (optional)
product_spec_overrides = {
    # Portable Monitors
    product_id_list[0]: {"Panel Type": ("IPS",), "Resolution": ("1920×1080", "1080p"), "Brightness": ("300", "nits")},
    product_id_list[1]: {"Panel Type": ("IPS",), "Resolution": ("2560×1600", "QHD"), "USB-C Power": ("Dual USB-C",)},
    product_id_list[2]: {"Panel Type": ("IPS",), "Resolution": ("1920×1080", "1080p"), "Weight": ("450", "g")},
    product_id_list[3]: {"Panel Type": ("IPS",), "Resolution": ("1920×1080", "1080p"), "Brightness": ("250", "nits")},
    product_id_list[4]: {"Panel Type": ("IPS",), "Resolution": ("1920×1080", "1080p"), "USB-C Power": ("60W pass-through",)},
    product_id_list[5]: {"Panel Type": ("IPS",), "Resolution": ("3840×2160", "4K"), "Weight": ("780", "g")},
    # Docking Stations
    product_id_list[6]: {"Thunderbolt Support": ("Thunderbolt 4",), "Max Power Delivery": ("98", "W"), "Max Display Support": ("Dual 4K@60Hz / 8K@30Hz",)},
    product_id_list[7]: {"Thunderbolt Support": ("USB-C (5Gbps)",), "Max Power Delivery": ("85", "W"), "USB Ports": ("5",)},
    product_id_list[8]: {"Thunderbolt Support": ("Thunderbolt 4",), "Max Power Delivery": ("130", "W"), "Max Display Support": ("Triple 4K@60Hz",)},
    product_id_list[9]: {"Thunderbolt Support": ("Thunderbolt 4",), "Max Power Delivery": ("90", "W"), "Max Display Support": ("Dual 4K@60Hz",)},
    product_id_list[10]: {"Thunderbolt Support": ("Thunderbolt 4",), "Max Power Delivery": ("100", "W"), "Max Display Support": ("Quad 4K@60Hz",)},
    product_id_list[11]: {"Thunderbolt Support": ("USB4",), "Max Power Delivery": ("100", "W"), "Max Display Support": ("Dual 4K@60Hz",)},
    # Desk Lamps
    product_id_list[12]: {"Brightness Range": ("300–1200", "lux"), "Color Temperature": ("2700–5700", "K"), "CRI": ("95",)},
    product_id_list[13]: {"Brightness Range": ("250–800", "lux"), "Color Temperature": ("2700–6500", "K"), "Smart Home": ("Matter/Wi-Fi",)},
    product_id_list[14]: {"Brightness Range": ("350–1100", "lux"), "Color Temperature": ("3000–6000", "K"), "Adjustable Arms": ("Single-hinge",)},
    product_id_list[15]: {"Brightness Range": ("200–500", "lux"), "Color Temperature": ("2200–4000", "K"), "Smart Home": ("Bluetooth/Zigbee",)},
    product_id_list[16]: {"Brightness Range": ("10000", "lux (therapy)"), "Color Temperature": ("4000", "K fixed")},
    product_id_list[17]: {"Brightness Range": ("300–900", "lux"), "Color Temperature": ("3000–6000", "K"), "Smart Home": ("None",)}
}

for pid in product_id_list:
    overrides = product_spec_overrides.get(pid)
    if overrides:
        # Build from template but override
        base_key = "portable-monitors" if pid in product_id_list[0:6] else "docking-stations" if pid in product_id_list[6:12] else "desk-lamps"
        for spec_name, spec_value in overrides.items():
            # Replace matching template entry
            for i, t in enumerate(spec_templates[base_key]):
                if t[0] == spec_name:
                    spec_templates[base_key][i] = (spec_name,) + spec_value
                    break
    # Determine category key
    if pid in product_id_list[0:6]:
        cat_key = "portable-monitors"
    elif pid in product_id_list[6:12]:
        cat_key = "docking-stations"
    else:
        cat_key = "desk-lamps"
    add_specs(pid, cat_key)

payload["specifications"].extend(specifications_to_add)

# Sentiments (pros and cons): 3 each per product
sentiments_to_add = []

# Pros and cons templates per category (will be customized per product)
def make_sentiments(product_name, ranking_id, ranking_product_id, category):
    if category == "portable-monitors":
        pros = [
            f"Lightweight and easy to pack — {product_name.split()[0]} design travels well.",
            f"USB-C single-cable power + video simplifies laptop connectivity.",
            f"Good color reproduction for portable workflows and content review."
        ]
        cons = [
            "Not as bright as desktop monitors — expect 250–300 nits max.",
            "No built-in speakers — rely on laptop audio or external.",
            "Panel size can feel cramped for complex spreadsheets."
        ]
    elif category == "docking-stations":
        pros = [
            f"Rock-solid driver stability — {product_name.split()[0]} chipsets avoid drops.",
            f"Ample power delivery keeps laptop charged during intensive workloads.",
            f"Clean cable management with a single upstream connection."
        ]
        cons = [
            "No native HDMI 2.1 — limited to 4K@60Hz on most displays.",
            "Driver updates sometimes required after OS upgrades.",
            "Bulky power brick on higher-wattage models."
        ]
    else:  # desk-lamps
        pros = [
            f"Wide illumination span reduces desk glare and shadows.",
            f"Adjustable color temperature adapts from day to night work.",
            f" Sturdy build quality and smooth height/swivel mechanics."
        ]
        cons = [
            "Smart features require cloud app for full control (if applicable).",
            "Base footprint can be larger than minimalist alternatives.",
            "No built-in USB charging port on some models."
        ]
    result = []
    for i, pro in enumerate(pros):
        result.append({
            "id": new_id(),
            "ranking_product_id": ranking_product_id,
            "type": "pro",
            "content": pro,
            "headline": pro,
            "created_at": now,
            "updated_at": now
        })
    for i, con in enumerate(cons):
        result.append({
            "id": new_id(),
            "ranking_product_id": ranking_product_id,
            "type": "con",
            "content": con,
            "headline": con,
            "created_at": now,
            "updated_at": now
        })
    return result

# Link each product's ranking_product_id to sentiments
rp_map = {rp["product_id"]: rp for rp in ranking_products_to_add}

for pid in product_id_list:
    rp = rp_map[pid]
    ranking = None
    if pid in product_id_list[0:6]:
        ranking = ranking_slug_to_id["best-portable-monitors-2026"]
        cat = "portable-monitors"
    elif pid in product_id_list[6:12]:
        ranking = ranking_slug_to_id["best-docking-stations-2026"]
        cat = "docking-stations"
    else:
        ranking = ranking_slug_to_id["best-desk-lamps-2026"]
        cat = "desk-lamps"
    sentiments_to_add.extend(make_sentiments(
        product_name=next(p["name"] for p in products_to_add if p["id"] == pid),
        ranking_id=ranking,
        ranking_product_id=rp["id"],
        category=cat
    ))

payload["sentiments"].extend(sentiments_to_add)

# FAQs: 5 per ranking
faqs_to_add = []

# Portable Monitors FAQs
pm_faqs = [
    ("Do portable monitors work with any laptop?", "Portable USB-C monitors work with any laptop that has a USB-C port with DisplayPort Alt Mode. Most modern laptops (2018+) support this. Some older machines may need an HDMI-to-USB-C adapter."),
    ("Can I use a portable monitor as my primary display?", "Yes, if you don't need high refresh rates. Portable monitors typically max at 60Hz, so they're great for productivity but not ideal for competitive gaming."),
    ("Do they need external power?", "Most draw power from the host laptop via USB-C. Higher-brightness models or those with built-in batteries (like ASUS ZenScreen MB16AC) can run longer or power the laptop in reverse."),
    ("What's the difference between a USB-C hub and a docking station?", "Docking stations typically offer more ports, higher power delivery (up to 130W), and multi-monitor support. USB-C hubs are smaller, often 1–2 ports, and focus on expanding single displays and peripherals."),
    ("Are portable monitors worth it for developers?", "Absolutely — dual-screen coding improves context switching. A 15.6-inch 1080p portable adds valuable screen real estate without the weight penalty of a full monitor.")
]

# Docking Stations FAQs
ds_faqs = [
    ("Thunderbolt 4 vs USB4 — which matters?", "Thunderbolt 4 guarantees 40Gbps bandwidth, 4K@60Hz on two displays, and 100W charging. USB4 can vary; some ports are 20Gbps or have lower power. For guaranteed compatibility with high-res monitors, choose Thunderbolt 4."),
    ("Can I mix AMD and NVIDIA GPUs with docking stations?", "Yes, docking stations are GPU-agnostic as they connect to the laptop's host GPU via the motherboard. Issues arise only with driver-specific DisplayPort MST quirks, which are rare on modern docks."),
    ("Do docking stations work with Linux?", "Major brands (CalDigit, Dell, OWC) have good Linux support via DisplayLink or native Thunderbolt drivers. Always check the manufacturer's Linux driver page before buying."),
    ("What's the minimum power delivery I need?", "Match your laptop's power requirements. Ultrabooks often need 65W+, gaming/workstation laptops 100W–130W. Under-delivering will slowly drain the battery during use."),
    ("Should I buy a dock with Ethernet?", "Yes — wired Ethernet avoids Wi-Fi congestion in crowded offices/apartments and provides lower latency for video calls and large file transfers.")
]

# Desk Lamps FAQs
dl_faqs = [
    ("What brightness (lumens) is ideal for desk work?", "For detailed tasks like drafting or reading fine print, aim for 500–750 lumens at the desk surface. For general computing, 300–500 lumens is sufficient. BenQ and Xiaomi models auto-adjust based on ambient light."),
    ("Are smart desk lamps secure?", "Matter-certified lamps use local network control without cloud dependency when possible. Keep firmware updated and use a separate IoT VLAN if you're security-conscious."),
    ("Do I need a high CRI (Color Rendering Index)?", "For graphic design, photo editing, or color-critical work, CRI >90 ensures accurate color. For coding/writing, CRI 80+ is fine."),
    ("Can desk lamps cause eye strain?", "Yes, if the light is too dim, too bright, or has harsh flicker. Look for flicker-free certification and adjustable brightness to match your comfort."),
    ("What's the benefit of a wide illumination span?", "A wide beam angle (90+ cm at desk level) illuminates multiple monitors and your keyboard without hot-spots or dead zones, reducing the need for multiple light sources.")
]

for idx, (q, a) in enumerate(pm_faqs, start=1):
    faqs_to_add.append({
        "id": new_id(),
        "ranking_id": ranking_slug_to_id["best-portable-monitors-2026"],
        "question": q,
        "answer": a,
        "display_order": idx,
        "created_at": now,
        "updated_at": now
    })

for idx, (q, a) in enumerate(ds_faqs, start=1):
    faqs_to_add.append({
        "id": new_id(),
        "ranking_id": ranking_slug_to_id["best-docking-stations-2026"],
        "question": q,
        "answer": a,
        "display_order": idx,
        "created_at": now,
        "updated_at": now
    })

for idx, (q, a) in enumerate(dl_faqs, start=1):
    faqs_to_add.append({
        "id": new_id(),
        "ranking_id": ranking_slug_to_id["best-desk-lamps-2026"],
        "question": q,
        "answer": a,
        "display_order": idx,
        "created_at": now,
        "updated_at": now
    })

payload["faqs"].extend(faqs_to_add)

# Write back the updated JSON
with open(payload_path, "w") as f:
    json.dump(payload, f, indent=2, ensure_ascii=False)
    f.write("\n")

print("✅ Successfully added 3 categories with full data to seed payload.")
print(f"Categories: {[c['slug'] for c in categories_to_add]}")
print(f"Total products added: {len(products_to_add)}")
print(f"Total specs added: {len(specifications_to_add)}")
print(f"Total sentiments added: {len(sentiments_to_add)}")
print(f"Total FAQs added: {len(faqs_to_add)}")
