#!/usr/bin/env bash
# Copy client micro-injection assets (PNG) → numbered JPG in images/services/02_微整注射/
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ASSETS="/Users/cindyflower/.cursor/projects/Users-cindyflower-Projects-apple-tree-clinic-v2/assets"
INJ="$ROOT/images/services/02_微整注射"
mkdir -p "$INJ"

copy_pair() {
  local cover_src="$1" detail_src="$2" base="$3"
  sips -s format jpeg "$ASSETS/$cover_src" --out "$INJ/${base}_cover.jpg" >/dev/null
  sips -s format jpeg "$ASSETS/$detail_src" --out "$INJ/${base}.jpg" >/dev/null
  echo "OK $base"
}

copy_pair "1____cover-ed22408b-196e-414e-9e7a-2c5f13b87731.png" "1___-be68574f-3844-4743-b9dd-42933593aea2.png" "1.逆時針"
copy_pair "2____cover-9d949456-620b-4d62-90ea-2b58e2d6abfd.png" "2___-08f5dc3e-b693-4be1-b8a6-54238d9603dc.png" "2.璞菲洛"
copy_pair "3.Sunmax____-____cover-ef5322f7-0f6d-4b3b-9e93-318163aec176.png" "3.Sunmax____-___-4401e169-2824-4acb-b6cd-b6b179e8cdc6.png" "3.Sunmax膠原蛋白-熊貓針"
copy_pair "4._______cover-9367cfb5-815b-47dc-be25-df60f1c1b532.png" "4_______-11e1ad3e-a33c-46a2-b539-5a6458c207ff.png" "4.VivaBella薇貝拉"
copy_pair "5._AestheFill____cover-1f687e53-cd08-4113-b634-b7b182897b66.png" "5._AestheFill___-1bcc8075-f8c4-4a47-b5f1-dbb5c540df20.png" "5.AestheFill艾麗斯"
copy_pair "6._Ellanse____cover-cf2bcf9f-0b47-49c6-bdeb-cf0e7f93e1bc.png" "6._Ellanse___-2fcc3089-8a1e-4271-a8c6-6aea920ebeb0.png" "6.Ellanse洢蓮絲"
copy_pair "7._Sculptra____cover-512f8c79-11a9-4a0e-8705-1969e42559c2.png" "7._Sculptra___-1bec9bd9-771c-460e-97c4-b4712fabc784.png" "7.Sculptra舒顏萃"
copy_pair "8.______cover-45603625-b108-4ac8-a4af-5fb2442f2e33.png" "8._____-7358bb8c-efa9-4504-a428-9e7ff31c2742.png" "8.肉毒桿菌"
copy_pair "9.______cover-5b9d2ca0-e5ce-4a4d-a6e7-64bd007895c4.png" "9._____-23e2ae8b-3241-4def-b63a-396dcb1fb904.png" "9.保提拉肉毒"
copy_pair "10.________cover-d1316994-c9b8-42d0-b658-b0513410197f.png" "10._______-96af0f40-0038-4344-90f9-c0ddb99d123f.png" "10.喬雅登玻尿酸"
copy_pair "11.________cover-3134233f-f5b6-4e4c-872d-d130d67c3556.png" "11._______-96654f3d-d705-4dac-a0ab-2a6efebfa61b.png" "11.緹奧希玻尿酸"
copy_pair "12._________cover-7356b317-a2e6-4272-a7a4-92bcbbdb06c0.png" "12.________-a8f71ea8-92bd-412d-87fa-3729ac441251.png" "12.思妃公主玻尿酸"
copy_pair "13._BELKYRA____cover-05706254-a1d7-4f26-9a7d-169e928b57af.png" "13._BELKYRA___-3bf07e13-dc2b-45e1-8026-f2d5dfaf37aa.png" "13.BELKYRA倍克脂"
copy_pair "14._______cover-13ff3015-94db-43d3-a000-7e334b9cde02.png" "14._______-a9c503ad-a36c-434e-b0c2-9f7d4b208b30.png" "14.塑立愛立提線"
copy_pair "15.____________cover-e4ce10c6-895b-4f4c-bd10-1f8fd7b6e0c3.png" "15.___________-223782a1-8f74-46dc-bd1a-3e1488068fa6.png" "15.腋下止汗"

echo "Done → $INJ"
