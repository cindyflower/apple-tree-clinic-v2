#!/usr/bin/env bash
# Copy feminine aesthetic assets (PNG) → numbered JPG in images/services/05_女性私密美學/
# Numbering matches SERVICE_CATEGORIES feminine items order (constants.ts).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ASSETS="/Users/cindyflower/.cursor/projects/Users-cindyflower-Projects-apple-tree-clinic-v2/assets"
FEM="$ROOT/images/services/05_女性私密美學"
mkdir -p "$FEM"

copy_pair() {
  local cover_src="$1" detail_src="$2" base="$3"
  sips -s format jpeg "$ASSETS/$cover_src" --out "$FEM/${base}_cover.jpg" >/dev/null
  sips -s format jpeg "$ASSETS/$detail_src" --out "$FEM/${base}.jpg" >/dev/null
  echo "OK $base"
}

# 1–7: cards 1–7 in constants; 8.HPV → card 9 (HPV 疫苗)
copy_pair "1.________cover-7e073d09-d754-4087-ab3f-59c3624ed42c.png" "1.______-748d417a-b865-4d18-98ac-675036613ed8.png" "1.私密處雷射"
copy_pair "2._____cover-e081329a-1db7-4f91-b694-4316911d978c.png" "2.____-274d22c8-dfad-4309-bf23-508219934da3.png" "2.薇薇電波"
copy_pair "3._______cover-e6322b17-55d7-42ae-ad25-02fce2b3c622.png" "3.______-9b82e728-9c11-47d9-abbc-b70525cf58e5.png" "3.陰道緊緻手術"
copy_pair "4.________cover-5a45ecc7-5e09-4459-871f-ccc66a74cb5d.png" "4._______-0fb8a424-4558-4fe1-ad1d-a000736b166b.png" "4.小陰唇美型手術"
copy_pair "5._______cover-d4302e4e-bad3-44a2-a481-33557aa01862.png" "5.______-a8b39cce-60f9-4629-8fda-98659c9a6f67.png" "5.陰蒂拉提手術"
copy_pair "6.G____cover-50b40bcc-7cf1-4b65-8349-0539231c16db.png" "6.G___-54d5aacd-53db-49b0-ad66-04835d6b2e94.png" "6.G點注射"
copy_pair "7._________cover-b72840b5-8992-4e58-80ef-f7a358f1ed4a.png" "7.________-69eb8687-e205-491c-beb9-1555c3925ded.png" "7.陰道洞口重建手術"
copy_pair "8.HPV_______cover-c584e560-803a-497f-99ce-925001c5f9c6.png" "8.HPV______-c5b8df11-6fc1-4064-8dea-28abbd502de9.png" "8.HPV子宮頸癌疫苗"

echo "Done → $FEM"
