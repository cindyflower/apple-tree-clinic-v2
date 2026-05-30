#!/usr/bin/env python3
"""Apply geo30-parsed.json content into client/src/lib/treatmentDetails.ts."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PARSED = ROOT / "scripts" / "geo30-parsed.json"
TS_FILE = ROOT / "client/src/lib/treatmentDetails.ts"
FOOTER = (
    "本文由 Dr. Appletree 蘋果樹醫美診所／團隊醫師群親自審閱與衛教指導。"
    "實際療程適應症、次數與恢復期，仍需由醫師現場評估後確認。"
)

NEW_SLUG_META = {
    "manual-acne-extraction": {
        "title": "手工清痘與清粉刺",
        "category": "肌膚管理",
        "heroImage": "SKIN_HERO.hydrafacial",
    },
}


def ts_quote(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def clean_subtitle(geo: str, doc_title: str) -> str:
    s = geo.strip()
    if not s or s.endswith("是什麼？") or s.endswith("是什麼?"):
        return doc_title
    if len(s) > 80:
        return s[:77] + "…"
    return s


def split_aftercare(text: str) -> list[str]:
    if not text:
        return [
            "實際注意事項依醫師與院方衛教為準。",
            FOOTER,
        ]
    parts = re.split(r"(?<=[。；])\s*", text.strip())
    items = [p.strip() for p in parts if p.strip() and len(p.strip()) > 4]
    if FOOTER not in items:
        items.append(FOOTER)
    return items[:8]


def build_keywords(data: dict, existing_kw: list[str]) -> list[str]:
    base = [data["docTitle"].split()[0], data["slug"].replace("-", " ")]
    for k in existing_kw:
        if k not in base:
            base.append(k)
    return base[:8]


def build_object_body(data: dict, existing: dict) -> str:
    subtitle = clean_subtitle(data.get("geoSubtitle", ""), data["docTitle"])
    pain = data["suitableFor"]
    if pain and not pain.endswith("。"):
        pain += "。"

    solution = data["coreAdvantage"]
    if data["whatBody"]:
        solution = f"{solution} {data['whatBody']}".strip()

    mechanism = data["whatShort"]
    if data["whatBody"] and data["whatBody"] != data["whatShort"]:
        mechanism = f"{mechanism} {data['whatBody']}"

    advantages = data["fitBullets"][:6]
    if data["coreAdvantage"] and data["coreAdvantage"] not in advantages:
        advantages = [data["coreAdvantage"][:60] + ("…" if len(data["coreAdvantage"]) > 60 else "")] + advantages
        advantages = advantages[:6]

    steps = data["steps"] or [
        {"step": 1, "title": "諮詢評估", "description": "由醫師或專業人員評估膚況／身體狀態與需求。"},
        {"step": 2, "title": "療程規劃", "description": "依評估結果說明流程、注意事項與預期方向。"},
        {"step": 3, "title": "療程進行", "description": "依院方標準流程施作。"},
        {"step": 4, "title": "術後衛教", "description": "告知保養、回診與追蹤建議。"},
    ]

    faqs = data["faqs"]
    if len(faqs) < 2 and data["whatShort"]:
        faqs = faqs + [
            {
                "question": f"{existing['title']}適合哪些人？",
                "answer": data["suitableFor"] or "需由醫師依個人狀況評估。",
            }
        ]
    faqs = faqs[:5]

    meta_desc = (data["whatShort"] + " " + data["whatBody"])[:155].strip()
    if len(meta_desc) < 40:
        meta_desc = f"{existing['title']}｜{data['suitableFor'][:80]}"

    keywords = build_keywords(data, existing.get("keywords", []))

    lines = [
        f'    slug: {ts_quote(existing["slug"])},',
        f'    title: {ts_quote(existing["title"])},',
        f"    subtitle: {ts_quote(subtitle)},",
        f'    category: {ts_quote(existing["category"])},',
        f'    heroImage: {existing["heroImage"]},',
    ]
    if existing.get("hotLabel"):
        lines.append(f'    hotLabel: {ts_quote(existing["hotLabel"])},')

    lines += [
        f'    metaTitle: {ts_quote(existing["metaTitle"])},',
        f"    metaDescription: {ts_quote(meta_desc)},",
        f"    painPoint: {ts_quote(pain)},",
        f"    solution: {ts_quote(solution)},",
        f"    mechanism: {ts_quote(mechanism)},",
        "    advantages: [",
    ]
    for adv in advantages:
        lines.append(f"      {ts_quote(adv)},")
    lines.append("    ],")
    lines += [
        '    duration: "依療程項目與範圍，由院方說明（約 30–90 分鐘）",',
        '    sessions: "依醫師評估與追蹤結果規劃",',
        '    recovery: "依療程類型而定，由醫師現場說明",',
        '    priceRange: "請預約諮詢，依個人方案報價",',
        '    satisfaction: "適合度與改善感受因人而異，需定期回診追蹤",',
        "    steps: [",
    ]
    for st in steps:
        dur = st.get("duration") or "依院方流程"
        lines.append(
            f"      {{ step: {st['step']}, title: {ts_quote(st['title'])}, description: {ts_quote(st['description'])}, duration: {ts_quote(dur)} }},"
        )
    lines.append("    ],")
    lines.append("    aftercare: [")
    for ac in split_aftercare(data.get("aftercareText", "")):
        lines.append(f"      {ts_quote(ac)},")
    lines.append("    ],")
    lines.append("    faqs: [")
    for faq in faqs:
        lines.append(
            f"      {{ question: {ts_quote(faq['question'])}, answer: {ts_quote(faq['answer'])} }},"
        )
    lines.append("    ],")
    lines.append("    relatedCases: [],")
    lines.append("    keywords: [")
    for kw in keywords:
        lines.append(f"      {ts_quote(kw)},")
    lines.append("    ],")

    return "\n".join(lines)


def extract_existing_block(ts: str, slug: str) -> dict | None:
    needle = f'slug: {json.dumps(slug)}'
    idx = ts.find(needle)
    if idx < 0:
        return None
    start = ts.rfind("\n  {\n    slug:", 0, idx)
    if start < 0:
        start = ts.rfind("\n  {", 0, idx)
    if start < 0:
        start = ts.rfind("{", 0, idx)
    start += 1  # skip leading newline
    depth = 0
    end = start
    for i in range(start, len(ts)):
        ch = ts[i]
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                end = i + 1
                if ts[end : end + 1] == ",":
                    end += 1
                break
    block = ts[start:end]

    def grab(field: str, quoted=True):
        if quoted:
            pm = re.search(rf'{field}:\s*"([^"]*)"', block)
            return pm.group(1) if pm else ""
        pm = re.search(rf"{field}:\s*([^,\n]+)", block)
        return pm.group(1).strip() if pm else ""

    kw_m = re.search(r"keywords:\s*\[([^\]]*)\]", block, re.DOTALL)
    keywords = re.findall(r'"([^"]*)"', kw_m.group(1)) if kw_m else []

    return {
        "slug": slug,
        "title": grab("title"),
        "category": grab("category"),
        "heroImage": grab("heroImage", quoted=False),
        "metaTitle": grab("metaTitle"),
        "hotLabel": grab("hotLabel") or None,
        "keywords": keywords,
        "block": block,
    }


def main():
    parsed = json.loads(PARSED.read_text(encoding="utf-8"))
    ts = TS_FILE.read_text(encoding="utf-8")

    for _key, data in sorted(parsed.items(), key=lambda x: int(x[0])):
        slug = data["slug"]
        existing = extract_existing_block(ts, slug)
        if not existing and slug in NEW_SLUG_META:
            meta = NEW_SLUG_META[slug]
            existing = {
                "slug": slug,
                "title": meta["title"],
                "category": meta["category"],
                "heroImage": meta["heroImage"],
                "metaTitle": f"{meta['title']}｜蘋果樹醫學總院",
                "keywords": [meta["title"], "肌膚管理", "清痘", "粉刺"],
                "block": None,
            }
        if not existing:
            print(f"WARN: no block for {slug}")
            continue

        new_body = "  {\n" + build_object_body(data, existing) + "\n  },"
        if existing["block"]:
            ts = ts.replace(existing["block"], new_body, 1)
            print(f"Updated {slug}")
        else:
            insert_at = ts.rfind("];")
            ts = ts[:insert_at] + new_body + "\n\n" + ts[insert_at:]
            print(f"Inserted {slug}")

    TS_FILE.write_text(ts, encoding="utf-8")
    print("Done.")


if __name__ == "__main__":
    main()
