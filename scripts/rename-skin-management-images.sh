#!/usr/bin/env bash
# Copy client skin-management assets (PNG) → numbered JPG in images/services/13_肌膚管理/
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ASSETS="/Users/cindyflower/.cursor/projects/Users-cindyflower-Projects-apple-tree-clinic-v2/assets"
SKIN="$ROOT/images/services/13_肌膚管理"
mkdir -p "$SKIN"

copy_pair() {
  local cover_src="$1" detail_src="$2" base="$3"
  sips -s format jpeg "$ASSETS/$cover_src" --out "$SKIN/${base}_cover.jpg" >/dev/null
  sips -s format jpeg "$ASSETS/$detail_src" --out "$SKIN/${base}.jpg" >/dev/null
  echo "OK $base"
}

copy_pair "1.AI________cover-e3ddc822-9f4a-4fef-ad67-c1e4919147dd.png" "1.AI_______-8ea75d7e-ea63-4297-a564-d910ff5262d7.png" "1.AI智慧皮膚檢測儀"
copy_pair "2._____cover-49e8c974-5669-4b11-aff0-f7bd8ee659f0.png" "2.____-fa88f8c5-e493-43d1-84a4-35f9b0dca79c.png" "2.水光注射"
copy_pair "3.____cover-45734226-0bfd-4dc2-9357-309635f1550b.png" "3.___-53ea2d8e-743d-4fe7-9491-c3e5ce76f310.png" "3.麗珠蘭"
copy_pair "4._____cover-0e4246a3-8130-48cf-a03c-cca15dab3206.png" "4.____-adbed437-f173-40ec-8ec9-edc9b9b56c21.png" "4.無針水光"
copy_pair "5.____cover-a83740be-6ac9-4378-ab8f-dbabc87857fa.png" "5.___-fe67b3d4-e803-49cd-85c4-1f69e60df048.png" "5.水飛梭"
copy_pair "6._____cover-bc8759bc-8238-4f3b-910c-6da611a0bbe8.png" "6.____-1b0357cb-0455-4458-8593-4642841f3bb6.png" "6.氧氣面罩"
copy_pair "7.AI_____cover-bd46f25f-c640-4d22-b443-556c81c59352.png" "7.AI____-3b49cc63-321f-468e-82ac-634260368f3e.png" "7.AI光譜治療"
copy_pair "8._____cover-1290928c-3db3-4639-8460-ef6b1da220ab.png" "8.____-ccae228a-6582-4c7c-88dd-4872a0665406.png" "8.安瓶導入"
# #9 already JPG in repo
copy_pair "10._________cover-34fe192f-3df9-4b7a-8a4b-1a5a6352138d.png" "10.________-015696d1-58e4-4eb7-990e-cb62edd8c7dd.png" "10.法國多酚精萃晶膜"
copy_pair "11.___________cover-c253d790-67fc-4b38-8b5e-91d512931ea8.png" "11.__________-1716b67b-9d4b-4d3c-93ee-7182dce9dbe5.png" "11.高濃度杏仁酸亮膚療程"
copy_pair "12.____________cover-07c8fbed-8ce9-4b62-bde7-9c7952f1e67b.png" "12.___________-c3da08d1-4da1-42ff-9e37-6930d07c45d1.png" "12.超級玻尿酸鎖水保濕面膜"
copy_pair "13.______cover-a8bd7dae-0865-4ec9-8e64-9a6e9adf29dd.png" "13._____-27c422fc-6a80-47e1-8a10-8a4802c9845b.png" "13.肌光潔顏蜜"

# #9 手工清痘：沿用資料夾內既有 JPG（客戶已交付）
if [[ -f "$SKIN/9.手工清痘與清粉刺_cover.jpg" ]]; then
  echo "OK 9.手工清痘與清粉刺 (existing)"
else
  echo "WARN missing 9.手工清痘與清粉刺 — add cover + detail JPG manually"
fi

echo "Done → $SKIN"
