#!/usr/bin/env python3
"""
Generate seed data for 3 new developer tools buyer-intent categories:
1. Code Editors & IDEs
2. CI/CD Platforms
3. API Testing Tools

Outputs JSON ready to merge into scripts/.seed-payload.json
"""
import json
import uuid
from datetime import datetime, timezone

now = datetime.now(timezone.utc).isoformat()
def u(): return str(uuid.uuid4())

def make_category(name, slug, description):
    return {
        "id": u(), "name": name, "slug": slug, "description": description,
        "created_at": now, "updated_at": now
    }

def make_ranking(slug, question, description, verdict_summary, category_id):
    return {
        "id": u(), "slug": slug, "question": question, "description": description,
        "verdict_summary": verdict_summary, "category_id": category_id,
        "created_at": now, "updated_at": now
    }

def make_product(name, link):
    return {"id": u(), "name": name, "link": link, "created_at": now, "updated_at": now}

def make_ranking_product(ranking_id, product_id, score, rank_position):
    return {
        "id": u(), "ranking_id": ranking_id, "product_id": product_id,
        "score": score, "rank_position": rank_position,
        "created_at": now, "updated_at": now
    }

def make_spec(product_id, name, value, unit=None):
    spec = {"id": u(), "product_id": product_id, "name": name, "value": value, "created_at": now, "updated_at": now}
    if unit: spec["unit"] = unit
    return spec

def make_sentiment(ranking_product_id, typ, content):
    headline = content.split('.')[0]
    return {
        "id": u(), "ranking_product_id": ranking_product_id, "type": typ,
        "content": content, "headline": headline,
        "created_at": now, "updated_at": now
    }

def make_faq(ranking_id, question, answer, order):
    return {
        "id": u(), "ranking_id": ranking_id, "question": question, "answer": answer,
        "display_order": order, "created_at": now, "updated_at": now
    }

# ==================== CATEGORY 1: Code Editors & IDEs ====================
code_cat = make_category(
    "Code Editors & IDEs",
    "code-editors",
    "Top code editors and IDEs for developers — from lightweight editors to full-featured integrated development environments for every language and workflow."
)
code_rank = make_ranking(
    "best-code-editors-2026",
    "What Are the Best Code Editors and IDEs in 2026?",
    "We evaluated the leading code editors and IDEs on extensibility, language support, debugging, performance, and AI-assisted development to find the best options for professional developers and teams.",
    "Visual Studio Code wins for most developers with its unmatched ecosystem and Copilot integration. JetBrains IntelliJ IDEA is the powerhouse for JVM and .NET work. Cursor leads AI-first editing, while Sublime Text remains the lightweight classic.",
    code_cat["id"]
)

# Products: slug, name, link, score, rank, specs, pros, cons
code_products = [
    ("visual-studio-code", "Visual Studio Code", "https://code.visualstudio.com/", 9.6, 1,
     [["Extension Ecosystem", "Largest (45,000+)", None], ["AI Integration", "GitHub Copilot built-in", None], ["Pricing", "Free (MIT)", None], ["Languages", "All major via extensions", None], ["Remote Dev", "Built-in SSH/Containers/WSL", None], ["Performance", "Fast, Electron-based", None]],
     ["Free and open-source with zero licensing cost.", "Largest extension marketplace by far.", "Copilot AI integration is seamless and deeply embedded."],
     ["Electron base means moderate RAM usage.", "Occasional extension conflicts require troubleshooting."]),

    ("jetbrains-intellij-idea", "JetBrains IntelliJ IDEA Ultimate", "https://www.jetbrains.com/idea/", 9.2, 2,
     [["Language Support", "Java/Kotlin/Scala first-class", None], ["AI Integration", "JetBrains AI Assistant", "$10/mo"], ["Pricing", "$149/year (Individual)", None], ["Debugging", "Best-in-class", None], ["Database Tools", "Built-in SQL editor", None], ["Performance", "Native JVM, heavier RAM", None]],
     ["Deep code understanding and refactoring for JVM languages.", "Exceptional built-in tools (database, REST client, decompiler).", "Outstanding debugging and profiling capabilities."],
     ["Expensive compared to free editors.", "Slower on large projects due to indexing.", "Resource-heavy (requires 8+ GB RAM for comfort)."]),

    ("cursor", "Cursor", "https://cursor.sh/", 9.0, 3,
     [["AI Model", "GPT-4/Claude 3.5 (default)", None], ["Pricing", "$20/mo Pro", None], ["Codebase Awareness", "Full repository indexing", None], ["Privacy Mode", "Optional (local-only)", None], ["Collaboration", "Live sharing via Cursor Forge", None], ["IDE Base", "Fork of VS Code", None]],
     ["AI-first workflow accelerates feature development significantly.", "Codebase-wide context really understands project conventions.", "Strong privacy controls keep sensitive code local."],
     ["Relatively new — fewer enterprise case studies.", "Cost adds up for teams ($20/user/month).", "Occasional AI hallucinations in complex refactors."]),

    ("windsurf", "Windsurf", "https://codeium.com/windsurf", 8.8, 4,
     [["AI Mode", "Agentic workflows (Auto mode)", None], ["Pricing", "$15–$19/mo", None], ["Context Limits", "200K tokens context", None], ["Pricing Tier", "$15/mo (basic)", "$19/mo (premium)"], ["Supported Languages", "50+", None], ["Platform", "VS Code fork", None]],
     ["Agentic mode automates routine coding tasks end-to-end.", "Competitive pricing versus Cursor.", "Strong multi-file reasoning across codebase."],
     ["Less mature extension ecosystem than VS Code.", "AI agent can run long without oversight — needs caution.", "No offline AI fallback; requires cloud."]),

    ("sublime-text", "Sublime Text", "https://www.sublimetext.com/", 8.5, 5,
     [["Pricing", "$99 one-time (unlicensed)", "trial nag"], ["Performance", "Extremely lightweight", None], ["Extensibility", "Python plugins", None], ["Startup", "Instant (<1s)", None], ["Cross-platform", "Windows/Mac/Linux", None], ["Vintage Mode", "Vim emulation", None]],
     ["Blazing fast — launches instantly even on old hardware.", "Extremely lightweight on system resources.", "Clean, distraction-free UI that stays out of your way."],
     ["No built-in AI features (must add plugins manually).", "One-time license nag in unlicensed version.", "Plugin ecosystem significantly smaller than VS Code."]),

    ("zed", "Zed", "https://zed.dev/", 8.2, 6,
     [["Collaboration", "Built-in multiplayer editing", None], ["Pricing", "Free (open-source)", None], ["Language Server", "Custom LSP-based", None], ["Terminal", "Integrated GPU-accelerated", None], ["Startup Speed", "Fast (Rust)", None], ["Remote Pair", "Real-time shared sessions", None]],
     ["Outstanding real-time collaboration for pair programming.", "Modern Rust-based editor is fast and responsive.", "Completely free and open-source (Apache 2.0)."],
     ["Still beta — occasional crashes on edge workflows.", "Extension ecosystem is growing but not mature yet.", "Limited plugin marketplace compared to VS Code."]),
]

# ==================== CATEGORY 2: CI/CD Platforms ====================
cicd_cat = make_category(
    "CI/CD Platforms",
    "ci-cd-tools",
    "Compare leading CI/CD platforms for automated builds, testing, and deployment — choose the best continuous integration and delivery solution for your team's workflow and scale."
)
cicd_rank = make_ranking(
    "best-cicd-tools-2026",
    "What Are the Best CI/CD Tools in 2026?",
    "We tested leading CI/CD platforms for build speed, pipeline flexibility, ecosystem integration, scalability, and pricing to help teams of any size choose the right automation platform.",
    "GitHub Actions wins for GitHub-native teams seeking simplicity and zero setup. GitLab CI suits end-to-end GitLab users wanting integrated security. Jenkins remains the most flexible for complex, self-hosted pipelines. CircleCI excels for Docker-first workflows.",
    cicd_cat["id"]
)

cicd_products = [
    ("github-actions", "GitHub Actions", "https://github.com/features/actions", 9.4, 1,
     [["Free Tier", "2,000 min/month for private", None], ["Integration", "Native GitHub", None], ["Runners", "Hosted (Linux/Win/macOS)", None], ["Self-hosted", "Yes (unlimited)", None], ["Matrix Builds", "Native support", None], ["Caching", "Layer + package cache", None]],
     ["Seamless integration with GitHub repositories and PRs.", "Generous free tier for public and private repos.", "Easy YAML configuration with visual editor."],
     ["Only works well with GitHub — poor for GitLab/Bitbucket.", "Self-hosted runner management can be tricky at scale.", "Limited artifact retention without paid plans."]),

    ("gitlab-ci", "GitLab CI/CD", "https://docs.gitlab.com/ee/ci/", 9.0, 2,
     [["Free Tier", "400 min/month (shared)", None], ["Integrated Security", "SAST/DAST built-in", None], ["Auto DevOps", "Yes, preconfigured pipelines", None], ["Container Registry", "Built-in", None], ["Multi-project", "Cross-pipeline triggers", None], ["Self-hosted", "Full (GitLab self-managed)", None]],
     ["Single pane of glass — source, pipelines, security in one platform.", "Auto DevOps gets new projects shipping quickly.", "Powerful for complex, dependency-aware pipelines."],
     ["Less flexible than dedicated CI platforms for non-GitLab repos.", "Configuration can get verbose for complex workflows.", "Shared runners slower than dedicated cloud CI."]),

    ("jenkins", "Jenkins", "https://www.jenkins.io/", 8.8, 3,
     [["Plugin Ecosystem", "2,000+ plugins", None], ["Self-hosted", "Required (full control)", None], ["Learning Curve", "Steep (Jenkinsfile DSL)", None], ["Scalability", "Horizontal via agents", None], ["Cost", "Free (open-source)", None], ["Corporate Use", "Widely adopted", None]],
     ["Unmatched flexibility — almost anything is possible with plugins.", "Completely free and open-source (no vendor lock).", "Battle-tested at massive scale in enterprises."],
     ["Steep learning curve and maintenance overhead.", "Manual security patching required for self-hosted instances.", "UI feels dated; configuration-as-code is essential."]),

    ("circleci", "CircleCI", "https://circleci.com/", 8.6, 4,
     [["Free Tier", "3,000 build mins/month", None], ["Orbs", "Reusable config packages", None], ["Docker Support", "First-class layer caching", None], ["Parallelism", "Up to 8x per job", None],["Performance", "Fast cloud executors", None], ["VCS Support", "GitHub, Bitbucket, GitLab", None]],
     ["Excellent Docker and Kubernetes support with efficient caching.", "Orbs marketplace accelerates pipeline setup significantly.", "Fast, reliable cloud executors with good parallelism."],
     ["Pricing can escalate quickly for high-build-volume teams.", "Limited built-in security scanning vs GitLab CI.", "Some configuration complexity around resource classes."]),

    ("buildkite", "Buildkite", "https://buildkite.com/", 8.4, 5,
     [["Agent Model", "Self-hosted agents + cloud UI", None], ["Pricing", "$15/user/mo + compute", None], ["Security", "Code never leaves your infra", None], ["Scalability", "Elastic agents (AWS/GCP)", None], ["Pipeline UI", "Clean, real-time views", None], ["Plugins", "Ruby-based", None]],
     ["Hybrid model keeps code private while providing cloud UI.", "Excellent for regulated industries (SOC2, HIPAA).", "Elastic agent scaling on AWS/GCP simplifies ops."],
     ["More expensive than pure open-source options.", "Smaller community than Jenkins/GitHub Actions.", "Less pre-built integrations out of the box."]),

    ("bitbucket-pipelines", "Bitbucket Pipelines", "https://bitbucket.org/product/features/pipelines", 8.0, 6,
     [["Free Tier", "500 build minutes/month", None], ["Integration", "Native to Bitbucket", None], ["Deployment Envs", "3 built-in (test/stage/prod)", None], ["Docker", "Docker-in-Docker supported", None], ["Caching", "Basic dependency cache", None], ["Pricing", "Paid from $3/user/mo", None]],
     ["Seamless if your code already lives in Bitbucket.", "Simple YAML config with good defaults for small teams.", "Tight Jira integration links builds to issues automatically."],
     ["Tightly coupled to Atlassian ecosystem — poor for multi-VCS teams.", "Feature set lags behind GitHub Actions and CircleCI.", "Limited customization of build environments."]),
]

# ==================== CATEGORY 3: API Testing & Development Tools ====================
api_cat = make_category(
    "API Testing Tools",
    "api-testing-tools",
    "Best API testing and development tools for manual testing, automation, and collaboration — find the right API client for your workflow, whether you're debugging locally or running CI/CD test suites."
)
api_rank = make_ranking(
    "best-api-testing-tools-2026",
    "What Are the Best API Testing Tools in 2026?",
    "We compared API clients and testing platforms on request building, scripting/automation, team collaboration, documentation generation, and pricing to identify the best tools for developers and QA engineers.",
    "Postman remains the most complete platform for teams with robust collaboration and monitoring. Insomnia wins for polished desktop experience. Hoppscotch is the best free open-source alternative. Bruno is ideal for Git-ops workflows that prioritize local storage.",
    api_cat["id"]
)

api_products = [
    ("postman", "Postman", "https://www.postman.com/", 9.4, 1,
     [["Free Tier", "1,000 requests/month", None], ["Collection Runs", "100 included", None], ["Team Collaboration", "Shared workspaces + comments", None], ["Mock Servers", "Unlimited (free)", None], ["API Monitoring", "50k calls (paid)", None], ["CI Integration", "Newman CLI runner", None]],
     ["Industry standard — huge community and documentation resources.", "Excellent team collaboration and versioning for collection sharing.", "Powerful built-in mock servers and monitoring for API lifecycle."],
     ["Expensive for larger teams (~$39/user/month at scale).", "Desktop app can feel bloated and slow to start.", "Complex pricing tiers make budgeting difficult."]),

    ("insomnia", "Insomnia", "https://insomnia.rest/", 9.0, 2,
     [["Open Source Core", "Yes (MIT)", None], ["Pricing", "Free + $180/yr Team", None], ["GraphQL", "First-class support", None],["Plugin System", "NPM-based", None], ["Environment Vars", "Nested + dynamic", None], ["Import Formats", "Postman, HAR, cURL", None]],
     ["Clean, fast UI with excellent GraphQL debugging tools.", "Open-source core with no feature lock behind paywall.", "Seamless import from Postman for migration teams."],
     ["Team features require paid subscription for full sync.", "Less mature API monitoring than Postman.", "Mobile app less featured than desktop client."]),

    ("hoppscotch", "Hoppscotch", "https://hoppscotch.io/", 8.8, 3,
     [["License", "Fully open-source (MIT)", None], ["Pricing", "Free (self-host or cloud)", None], ["Web Version", "Works entirely in browser", None], ["API Protocols", "REST, GraphQL, WebSocket", None], ["Team Spaces", "Basic shared collections", None], ["CLI", "Hoppscotch CLI (npm)", None]],
     ["Completely free and open-source — can self-host for privacy.", "Web version requires zero install; great for quick tests.", "Lightweight and fast, with no account required for basic use."],
     ["Premium support only via paid priority plan ($49/mo).", "Mobile app less feature-rich than desktop/web.", "Lacks advanced automation features of Postman."]),

    ("bruno", "Bruno", "https://www.usebruno.com/", 8.6, 4,
     [["Storage", "Local filesystem (plain JSON)", None], ["Git Friendly", "All collections stored as code", None], ["Offline", "100% offline-first", None], ["License", "MIT open-source", None], ["Collaboration", "Git-based sharing", None], ["Environment Vars", "Local per-collection", None]],
     ["Collections stored as plain Bru files — diff and merge easily.", "Perfect for Git-ops workflows; no cloud vendor dependency.", "Entirely offline with no telemetry, great for air-gapped environments."],
     ["No built-in cloud collaboration — relies on Git.", "Less polished UI compared to commercial tools.", "No native API monitoring or mock server hosting."]),

    ("paw", "Paw", "https://paw.cloud/", 8.3, 5,
     [["Platform", "macOS only (native)", None], ["Pricing", "$99 one-time", None], ["Dynamic Values", "Scripting in JavaScript", None], ["SSH & SSL", "Built-in cert manager", None], ["Code Gen", "30+ languages/sdks", None], ["Team Sync", "Paw Cloud (paid add-on)", None]],
     ["Native macOS performance with polished Apple-style UI.", "Powerful dynamic values system for complex request chaining.", "One-time purchase — no subscription required for core features."],
     ["macOS only — no Windows/Linux support.", "Team collaboration requires separate Paw Cloud subscription.", "Smaller community than cross-platform tools."]),

    ("thunder-client", "Thunder Client (VS Code Extension)", "https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client", 7.9, 6,
     [["Platform", "VS Code extension", None], ["Pricing", "Free", None], ["Lightweight", "Runs inside VS Code", None], ["Collections", "Simple folder-based", None], ["Environment Vars", "Basic scoping", None], ["Cloud Sync", "None (local only)", None]],
     ["Zero context-switching — test APIs without leaving your editor.", "Completely free and lightweight.", "Good enough for simple CRUD and quick debugging."],
     ["No team collaboration features — strictly local.", "Feature set is minimal; lacks advanced scripting.", "Cannot replace dedicated API client for complex workflows."]),
]

# Assemble
new_data = {
    "categories": [code_cat, cicd_cat, api_cat],
    "rankings": [code_rank, cicd_rank, api_rank],
    "products": [],
    "ranking_products": [],
    "specifications": [],
    "sentiments": [],
    "faqs": []
}

# Build product data with relationships
rank_map = {r["slug"]: r["id"] for r in new_data["rankings"]}
cat_map = {c["slug"]: c["id"] for c in new_data["categories"]}

# Helper to add all records for a single product
def add_product(rank_slug, pos, score, name, link, specs, pros, cons):
    pid = u()
    new_data["products"].append({"id": pid, "name": name, "link": link, "created_at": now, "updated_at": now})
    rpid = u()
    new_data["ranking_products"].append({
        "id": rpid, "ranking_id": rank_map[rank_slug], "product_id": pid,
        "score": score, "rank_position": pos, "created_at": now, "updated_at": now
    })
    for s_name, s_value, s_unit in specs:
        new_data["specifications"].append({
            "id": u(), "product_id": pid, "name": s_name, "value": s_value,
            "unit": s_unit if s_unit else None,
            "created_at": now, "updated_at": now
        })
    for pro in pros:
        new_data["sentiments"].append({
            "id": u(), "ranking_product_id": rpid, "type": "pro", "content": pro,
            "headline": pro.split(".")[0], "created_at": now, "updated_at": now
        })
    for con in cons:
        new_data["sentiments"].append({
            "id": u(), "ranking_product_id": rpid, "type": "con", "content": con,
            "headline": con.split(".")[0], "created_at": now, "updated_at": now
        })

# Populate products for each category
for prod in code_products:
    slug, name, link, score, pos, specs, pros, cons = prod
    add_product("best-code-editors-2026", pos, score, name, link, specs, pros, cons)

for prod in cicd_products:
    slug, name, link, score, pos, specs, pros, cons = prod
    add_product("best-cicd-tools-2026", pos, score, name, link, specs, pros, cons)

for prod in api_products:
    slug, name, link, score, pos, specs, pros, cons = prod
    add_product("best-api-testing-tools-2026", pos, score, name, link, specs, pros, cons)

# FAQs per ranking
new_data["faqs"].append(make_faq(rank_map["best-code-editors-2026"],
    "Should I choose VS Code or a paid IDE like JetBrains?",
    "Choose VS Code if you want a free, extensible editor with a massive marketplace and solid AI Copilot support. Upgrade to JetBrains if you work primarily with JVM, .NET, or need deep static analysis, refactoring, and built-in database tools.",
    1))
new_data["faqs"].append(make_faq(rank_map["best-code-editors-2026"],
    "Is an AI-first editor like Cursor worth the $20/month?",
    "Cursor is worth it if you regularly work on large codebases and want AI that understands your entire project context. For smaller projects or if you're happy with VS Code + Copilot, the free setup still delivers strong value.",
    2))
new_data["faqs"].append(make_faq(rank_map["best-code-editors-2026"],
    "What's the fastest editor for large projects?",
    "Sublime Text remains the fastest for extremely large files and old hardware due to its native C++ core. VS Code is fast enough for most users, while JetBrains IDEs require more RAM but offer deeper analysis. Zed shows promise for collaborative speed.",
    3))
new_data["faqs"].append(make_faq(rank_map["best-code-editors-2026"],
    "Do I need both an editor and a separate IDE?",
    "Modern editors like VS Code blur the line with rich extensions. Most developers use either a lightweight editor with plugins or a full IDE. Pick one ecosystem and stick with it to avoid workflow fragmentation.",
    4))
new_data["faqs"].append(make_faq(rank_map["best-code-editors-2026"],
    "How important is native language support vs extensions?",
    "For mainstream languages (Python, JavaScript/TypeScript, Go), VS Code extensions are excellent. For complex typed languages (Java, Kotlin, C#), JetBrains IDEs provide deeper understanding, refactoring, and framework support out of the box.",
    5))

new_data["faqs"].append(make_faq(rank_map["best-cicd-tools-2026"],
    "GitHub Actions vs Jenkins: which should I choose?",
    "Choose GitHub Actions if your code lives on GitHub and you want zero-maintenance hosted runners with simple YAML configs. Pick Jenkins if you need maximum customization, self-hosted control, or work across multiple VCS platforms.",
    1))
new_data["faqs"].append(make_faq(rank_map["best-cicd-tools-2026"],
    "Is GitLab CI worth it if I'm not using the rest of GitLab?",
    "GitLab CI shines when paired with the full GitLab platform for issue tracking, container registry, and security scanning. If you only need CI, GitHub Actions or CircleCI often provide better standalone experiences.",
    2))
new_data["faqs"].append(make_faq(rank_map["best-cicd-tools-2026"],
    "What's the most cost-effective CI for small startups?",
    "Start with GitHub Actions (2,000 free minutes/month) or CircleCI's free tier (3,000 minutes). For heavy builds, consider self-hosted Jenkins to avoid per-minute charges, but budget for maintenance overhead.",
    3))
new_data["faqs"].append(make_faq(rank_map["best-cicd-tools-2026"],
    "When should I choose a self-hosted CI over cloud options?",
    "Self-hosted is necessary for air-gapped environments, compliance regimes that forbid external data egress, or extreme scale where per-minute cloud costs become prohibitive. Otherwise, hosted runners typically offer better reliability.",
    4))
new_data["faqs"].append(make_faq(rank_map["best-cicd-tools-2026"],
    "Which CI/CD tool integrates best with Kubernetes?",
    "All major tools integrate well. GitHub Actions and GitLab CI offer native Kubernetes integration and deployment strategies. CircleCI's machine executors are highly optimized for container builds. Jenkins requires more plugin configuration.",
    5))

new_data["faqs"].append(make_faq(rank_map["best-api-testing-tools-2026"],
    "Postman vs Insomnia: which is better for teams?",
    "Postman excels at large-scale team collaboration, shared workspaces, and API monitoring. Insomnia offers a cleaner UI, better GraphQL support, and an open-source core. Teams should trial both and pick based on workflow fit.",
    1))
new_data["faqs"].append(make_faq(rank_map["best-api-testing-tools-2026"],
    "Can I replace Postman with a free open-source tool?",
    "Yes — Hoppscotch is a compelling free alternative with a web app and decent feature set. For local-first workflows, Bruno is excellent if your team works primarily via Git. Both cover most everyday testing needs.",
    2))
new_data["faqs"].append(make_faq(rank_map["best-api-testing-tools-2026"],
    "What's the best API tool for CI/CD automation?",
    "Postman's Newman CLI is the most mature for CI/CD pipelines. Insomnia's CLI is improving. For pure open-source workflows, Hoppscotch CLI or Bruno with Git hooks can work, but Newman has the largest community and plugin ecosystem.",
    3))
new_data["faqs"].append(make_faq(rank_map["best-api-testing-tools-2026"],
    "Should I store API collections in the cloud or locally?",
    "Store locally (Bruno) if security, Git history, or offline access matters. Use cloud (Postman/Insomnia) for easy team sharing and sync. Some teams hybridize: local development with cloud sync for stakeholder preview.",
    4))
new_data["faqs"].append(make_faq(rank_map["best-api-testing-tools-2026"],
    "Are desktop-only tools like Paw worth the cost?",
    "Paw is worth it for macOS-native teams that need advanced dynamic scripting and code generation. Its one-time $99 price avoids subscriptions, but lack of Windows/Linux support limits collaboration with cross-platform teams.",
    5))

# Write output
with open('new-categories-output.json', 'w') as f:
    json.dump(new_data, f, indent=2)

print(f"Generated: {len(new_data['categories'])} categories, {len(new_data['rankings'])} rankings, {len(new_data['products'])} products, {len(new_data['specifications'])} specs, {len(new_data['sentiments'])} sentiments, {len(new_data['faqs'])} FAQs")
