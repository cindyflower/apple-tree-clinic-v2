#!/usr/bin/env python3
"""Parse GEO 30 docx text export into structured JSON for treatmentDetails.ts."""
import json
import re
import subprocess
from pathlib import Path

DOCX = Path(__file__).resolve().parents[1] / "docs/Dr_Appletree_30項療程介紹_自然GEO標題版_標題修正版.docx"
OUT = Path(__file__).resolve().parent / "geo30-parsed.json"

# Doc section number -> site slug
DOC_TO_SLUG = {
    1: "microwave-sweat",
    2: "viveve",
    3: "vaginal-tightening",
    4: "labiaplasty",
    5: "clitoral-lift",
    6: "vaginal-opening-reconstruction",
    7: "g-spot-injection",
    8: "feminine-hair-removal",
    9: "hpv-vaccine",
    10: "men-acne-scar",
    11: "men-hair-restoration",
    12: "men-body-sculpting",
    13: "rejuran",
    14: "super-hyaluronic-mask",
    15: "french-polyphenol-mask",
    16: "ampule-infusion",
    17: "ai-spectrum",
    18: "ai-skin-analysis",
    19: "oxygen-mask",
    20: "needle-free-glow",
    21: "skin-glow-serum",
    22: "mandelic-acid-peel",
    23: "prolotherapy",
    24: "iht-prp",
    25: "non-surgical-hair",
    26: "scalp-detection",
    27: "ilib-laser",
    28: "nutrition-iv-drip",
    29: "music-therapy",
    30: "manual-acne-extraction",
}

def is_procedure_substep(title: str) -> bool:
    """Filter numbered lines inside 療程步驟 tables, not main section headers."""
    if len(title) > 14:
        return False
    substep_prefixes = (
        "醫師", "治療", "局部", "微波", "術後", "私密諮", "私密檢", "療程施",
        "衛教", "追蹤", "病史", "手術計", "手術設", "手術修", "手術執", "手術規",
        "注射規", "注射施", "保密", "回診", "評估", "檢查", "規劃", "設計",
        "修復", "恢復", "問診", "標記", "處理", "施作", "照護", "說明", "執行",
        "術式", "麻醉", "清潔", "部位", "接種", "疫苗", "紀錄", "篩檢", "皮膚",
        "穩膚", "疤痕", "體態", "目標", "數據", "膚質", "膚況", "敷膜", "鎖水",
        "敷晶", "儀器", "光療", "影像", "濕潤", "取適", "溫和", "輕拍", "中和",
        "保濕", "觸診", "抽血", "離心", "精準", "復健", "定期", "維持", "拍攝",
        "健康", "配方", "靜脈", "過程", "狀態", "環境", "感受", "搭配", "問診",
    )
    return any(title.startswith(p) for p in substep_prefixes)


def get_text() -> str:
    return subprocess.check_output(
        ["textutil", "-convert", "txt", "-stdout", str(DOCX)], text=True
    )


def split_sections(text: str) -> dict[int, str]:
    lines = text.splitlines()
    markers = []
    for i, line in enumerate(lines):
        m = re.match(r"^(\d{1,2})\.\s+(.+)$", line.strip())
        if not m:
            continue
        num = int(m.group(1))
        if num < 1 or num > 30:
            continue
        title = m.group(2).strip()
        if is_procedure_substep(title):
            continue
        window = "\n".join(lines[i : i + 15])
        if "適合這樣的你" in window or "主打核心優勢" in window:
            markers.append((num, i))

    sections = {}
    for idx, (num, start) in enumerate(markers):
        end = markers[idx + 1][1] if idx + 1 < len(markers) else len(lines)
        sections[num] = "\n".join(lines[start:end]).strip()
    return sections


def extract_bullets(block: str) -> list[str]:
    items = []
    for line in block.splitlines():
        line = line.strip()
        if line.startswith("•") or line.startswith("\t•") or re.match(r"^[-•]\s", line):
            items.append(re.sub(r"^[\t•\-]\s*", "", line))
        elif re.match(r"^[\t•]", line):
            items.append(line.lstrip("\t• ").strip())
    # tab bullets from textutil
    for line in block.splitlines():
        if line.startswith("\t") and not line.startswith("\t•"):
            s = line.strip()
            if s and len(s) > 2:
                items.append(s)
    return items


def section_between(text: str, start: str, ends: list[str]) -> str:
    if start not in text:
        return ""
    rest = text.split(start, 1)[1]
    positions = [rest.find(e) for e in ends if e in rest]
    positions = [p for p in positions if p >= 0]
    chunk = rest[: min(positions)] if positions else rest
    return chunk.strip()


def parse_section(num: int, raw: str) -> dict:
    lines = raw.splitlines()
    header = lines[0] if lines else ""
    m = re.match(r"^\d+\.\s+(.+)$", header.strip())
    doc_title = m.group(1).strip() if m else header

    geo_subtitle = ""
    for line in lines[1:6]:
        s = line.strip()
        if not s or s.startswith("適合") or s.startswith("主打"):
            continue
        if "？" in s or "是什麼" in s or len(s) > 12:
            geo_subtitle = s
            break

    suitable = section_between(raw, "適合這樣的你：", ["主打核心優勢", "這是什麼？"])
    suitable = suitable.replace("適合這樣的你：", "").strip()
    if not suitable:
        suitable = section_between(raw, "適合這樣的你：", ["主打", "這是什麼"])

    core_adv = section_between(raw, "主打核心優勢：", ["這是什麼？"])
    core_adv = core_adv.replace("主打核心優勢：", "").strip()

    what_block = section_between(raw, "這是什麼？", ["什麼情況適合做？"])
    what_lines = [l.strip() for l in what_block.splitlines() if l.strip()]
    what_short = what_lines[0] if what_lines else ""
    what_body = " ".join(
        l
        for l in what_lines[1:]
        if not l.startswith("（此處請補上")
    ).strip() or (what_lines[0] if what_lines else "")

    fit_block = section_between(raw, "什麼情況適合做？", ["療程怎麼做？"])
    fit_bullets = []
    for line in fit_block.splitlines():
        line = line.strip().lstrip("•\t ")
        if line and not line.startswith("什麼"):
            fit_bullets.append(line)

    steps = []
    proc_label = None
    for label in ("療程怎麼做？", "檢測怎麼做？"):
        if label in raw:
            proc_label = label
            break
    if proc_label:
        proc = section_between(
            raw,
            proc_label,
            ["和其他療程差在哪？", "和一般", "和單純", "術前術後注意", "注意事項", "FAQ"],
        )
        proc_lines = [l.strip() for l in proc.splitlines()]
        i = 0
        while i < len(proc_lines):
            sm = re.match(r"^(\d+)\.\s+(.+)$", proc_lines[i])
            if sm and int(sm.group(1)) <= 5:
                step_num = int(sm.group(1))
                title = sm.group(2).strip()
                desc = proc_lines[i + 1] if i + 1 < len(proc_lines) else ""
                purpose = proc_lines[i + 2] if i + 2 < len(proc_lines) else ""
                if re.match(r"^\d+\.", desc):
                    desc = ""
                    purpose = ""
                elif re.match(r"^\d+\.", purpose):
                    purpose = ""
                steps.append(
                    {
                        "step": step_num,
                        "title": title,
                        "description": f"{desc}。{purpose}".strip("。") if desc and purpose else (desc or purpose or title),
                    }
                )
                i += 3
                continue
            i += 1

    compare = section_between(
        raw,
        "和其他療程差在哪？",
        ["術前術後注意", "注意事項", "FAQ"],
    )
    if not compare:
        for alt in ("和一般聽音樂差在哪？", "和單純擠粉刺差在哪？"):
            if alt in raw:
                compare = section_between(raw, alt, ["術前術後注意", "注意事項", "FAQ"])
                break

    aftercare_block = ""
    for label in ("術前術後注意", "注意事項"):
        if label in raw:
            aftercare_block = section_between(raw, label, ["FAQ", "頁尾固定"])
            break

    faqs = []
    if "FAQ" in raw:
        faq_block = section_between(raw, "FAQ", ["頁尾固定", "\n\n30.", "\n\n"])
        faq_lines = [l.strip() for l in faq_block.splitlines() if l.strip()]
        current_q = None
        current_a = []
        for line in faq_lines:
            if line.startswith("問："):
                if current_q:
                    faqs.append({"question": current_q, "answer": " ".join(current_a).strip()})
                current_q = line.replace("問：", "").strip()
                current_a = []
            elif line.startswith("答："):
                current_a.append(line.replace("答：", "").strip())
            elif current_q:
                current_a.append(line)
        if current_q:
            faqs.append({"question": current_q, "answer": " ".join(current_a).strip()})

    return {
        "docNum": num,
        "slug": DOC_TO_SLUG[num],
        "docTitle": doc_title,
        "geoSubtitle": geo_subtitle,
        "suitableFor": suitable,
        "coreAdvantage": core_adv,
        "whatShort": what_short,
        "whatBody": what_body,
        "fitBullets": fit_bullets,
        "steps": steps,
        "compareNote": compare[:500] if compare else "",
        "aftercareText": aftercare_block,
        "faqs": faqs,
    }


def main():
    text = get_text()
    sections = split_sections(text)
    parsed = {str(n): parse_section(n, sections[n]) for n in sorted(sections)}
    OUT.write_text(json.dumps(parsed, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {len(parsed)} sections to {OUT}")


if __name__ == "__main__":
    main()
