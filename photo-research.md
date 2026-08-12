# 店家封面照補齊研究紀錄

## 盤點結果

目前 `restaurants.ts` 共列出 30 間店家，其中已有 `photoUrl` 的店家為 La Badiane、Phở Gia Truyền Bát Đàn、Phở Thìn、Bún Chả Chan、Bánh Mì Vui；其餘 25 間需要尋找或核對封面照。資料檔中的店家 id 由 2 至 31，網站畫面目前顯示 30 間。

## 首批影像搜尋結果（2026-08-12）

| 店家 | 候選影像 | 本地檔案 | 核對依據 | 初步判定 |
|---|---|---|---|---|
| Phở Gà Nguyệt | Tripadvisor「Store - Picture of Pho Ga Nguyet, Hanoi」；照片可直接讀到店招與店內門面 | `/home/ubuntu/upload/search_images/jVIlr8l7aXCX.jpg` | 店招清楚顯示「PHỞ GÀ NGUYỆT」，與資料地址 5B P. Phủ Doãn 相符 | 可採用 |
| Chào Bạn | Tripadvisor「CHAO BAN VIETNAMESE RESTAURANT」；黃色建築與入口招牌「CHÀO BẠN」 | `/home/ubuntu/upload/search_images/ZvOF7uiC7qps.jpg` 或 `/home/ubuntu/upload/search_images/hp4gG1tBLEqD.jpg` | 店面招牌與資料地址 98 Đường Tô Ngọc Vân 相符 | 可採用；優先用橫幅照片 |
| Don Duck Old Quarter | 「DON DUCK Old quarter restaurant」門面照；店招與地址文字可見 | `/home/ubuntu/upload/search_images/10xUGjN3YWr5.jpg`、`/home/ubuntu/upload/search_images/7`（實際索引檔為搜尋結果第 7 項） | 店招寫有 DON DUCK、Old quarter restaurant；與資料地址 29 P. Bát Đàn 相符 | 可採用；需從搜尋結果檔案選取第 7 或第 5 項 |

## 使用規則

只採用能從店招、門面、地址或來源頁標題直接核對店家的照片；無法可靠核對者不放入正式資料。所有採用影像需先複製到 `/home/ubuntu/webdev-static-assets/`，再使用 `manus-upload-file --webdev` 取得永久 WebDev URL。

## 第二批影像搜尋結果

| 店家 | 候選影像 | 本地檔案 | 核對依據 | 初步判定 |
|---|---|---|---|---|
| Bao An Vegan Street Food | The West Australian 文章中的店面／招牌照片，畫面可讀到「BẢO AN VEGAN」與 66B Trần Hưng Đạo | `/home/ubuntu/upload/search_images/svf4kjdZaf2B.jpg` | 招牌名稱與資料地址一致，畫面為店面入口 | 可採用 |
| Quán Bánh Đúc Nóng Bà Nội | VnExpress 文章中的老店門面／巷口照片，招牌可讀到 Bánh đúc nóng、gia truyền | `/home/ubuntu/upload/search_images/zJN0l0gKCkdg.jpg` 或 `/home/ubuntu/upload/search_images/bt8VAz66M0U9.jpg` | 來源標題與店名一致；需再確認是否為資料中的 Lê Ngọc Hân 分店 | 暫列候選，核對地址後採用 |
| Phở Gà Nguyệt | Michelin／DanielFoodDiary／Tripadvisor 多個店面候選 | `/home/ubuntu/upload/search_images/4Qa3mi3XZTm8.jpg`, `/home/ubuntu/upload/search_images/2cd2gpYpo8su.jpg`, `/home/ubuntu/upload/search_images/oXkvVhpnYnFV.jpg` | 店招「PHỞ GÀ NGUYỆT」清楚可見，與 5B Phủ Doãn 相符 | 可採用；優先用橫幅門面照 |

## 第三批影像搜尋結果

| 店家 | 候選影像 | 本地檔案 | 核對依據 | 初步判定 |
|---|---|---|---|---|
| Bún Ziu Gánh | Tripadvisor／Corner 店面與招牌照片 | `/home/ubuntu/upload/search_images/Ez5ayhU7iMDp.jpg`, `/home/ubuntu/upload/search_images/MIsGqiSYx30J.jpg` | 招牌可讀到「Yến BÚN ZIU GÁNH」，Corner 標題含地址 Ng. Lương Sử C/104 | 可採用；優先用含招牌照片 |
| Bún Thang Thanh gia truyền | Corner 店面照片，資料標題直接含「2 ngõ 23 Tôn Thất Thiệp」 | `/home/ubuntu/upload/search_images/43czuiPBtecl.jpeg` 或 `/home/ubuntu/upload/search_images/b1V9DOjyE4FY.jpeg` | 來源標題地址與資料地址完全一致 | 可採用；優先用橫幅照片 |
| Bún Ngan Nhàn | 搜尋結果含 Bún Ngan Nhàn 相關照片，但候選畫面未清楚顯示店招／地址 | `/home/ubuntu/upload/search_images/LVK34dC1HF0h.jpg` | 來源標題匹配店名，但門面核對證據不足 | 暫不採用，需進一步核對 |

## 第四批影像搜尋結果

| 店家 | 候選影像 | 本地檔案 | 核對依據 | 初步判定 |
|---|---|---|---|---|
| Mr Bảy Miền Tây | Corner／Rexby／Tripadvisor 門面照片，招牌可讀到 Mr. Bảy Miền Tây 與 79 Hàng Điếu | `/home/ubuntu/upload/search_images/iPnoN758UBiH.jpeg`、`/home/ubuntu/upload/search_images/q2xnW1C0L3RL.jpg` | Corner 標題地址與資料完全一致，門面招牌也相符 | 可採用；優先用橫幅門面照 |
| Ốc Vi Saigon | Tripadvisor／Michelin 門面照片，店招有「ỐC VI SAIGON」與 21 Gia Ngư | `/home/ubuntu/upload/search_images/F1jF6MnmOvg8.jpg`、`/home/ubuntu/upload/search_images/ocKC30ErbL0S.jpg` | 門面招牌與資料地址 21 P. Gia Ngư 相符 | 可採用；優先用 Michelin／橫幅門面照 |
| Xôi Mây | 搜尋結果主要為 Xôi 菜品或其他店家，未找到可可靠核對的 Xôi Mây 門面 | `/home/ubuntu/upload/search_images/L6nqlPFB49Dr.jpg` 等 | 候選沒有清楚店名與資料地址證據 | 暫不採用 |

## 第五批影像搜尋結果

| 店家 | 候選影像 | 本地檔案 | 核對依據 | 初步判定 |
|---|---|---|---|---|
| Bánh cuốn Bà Xuân | Corner／Tripadvisor 門面照片，店招清楚顯示 Bánh Cuốn Bà Xuân 與 16 Dốc Hoè Nhai | `/home/ubuntu/upload/search_images/dTSd5LJrahTL.jpeg`、`/home/ubuntu/upload/search_images/zrKG1AzbjJos.jpg` | 店招地址與資料 16 Dốc P. Hoè Nhai 相符 | 可採用；優先用招牌門面照 |
| Bánh Tráng Bé My | Corner 門面照片，招牌清楚顯示 Bánh Tráng Bé My；來源標題含 33 P. Quang Trung | `/home/ubuntu/upload/search_images/o4ULOC0Ps4VH.jpeg` 或 `/home/ubuntu/upload/search_images/mzS1stvrXCiO.jpeg` | 來源標題地址與資料 33/20 P. Quang Trung 相符 | 可採用；優先用含招牌門面照 |
| Bún Ngan Hòe Nhai | 搜尋結果未找到能清楚核對店名與 3 P. Hòe Nhai 的門面照片 | — | 相關候選多為其他店家或室內／菜品畫面 | 暫不採用 |

## 第六批影像搜尋結果

| 店家 | 候選影像 | 本地檔案 | 核對依據 | 初步判定 |
|---|---|---|---|---|
| Nem Chua Rán Thành Xăm | TikTok／ShopeeFood 影像；有店名或 Hàng Bông 來源標示 | `/home/ubuntu/upload/search_images/2Q8lgzBFhEMe.jpeg`、`/home/ubuntu/upload/search_images/bcVfARIjKytU.jpg` | TikTok 標題直接含店名；ShopeeFood 標題含 Hàng Bông，與資料地址 38 Hàng Bông 相符 | 可採用；需優先選有店名／街景的影像並標記來源 |
| Bánh Giò Miss Béo | Hà Nội Đẹp／地方文章中的店面照片，來源標題含 Bánh Giò Cô Béo 與 3 Đ. Thụy Khuê | `/home/ubuntu/upload/search_images/RgUVxtW99CBy.jpg` 或 `/home/ubuntu/upload/search_images/Vjuv6cPOtRiN.jpg` | 來源標題與資料地址完全一致 | 可採用；優先用橫幅店面照 |
| Bún Đậu An An | 搜尋結果沒有可靠匹配；候選多為其他 Bún Đậu 或其他城市 | — | 無法以店名與資料地址雙重核對 | 暫不採用 |

## 第七批影像搜尋結果

| 店家 | 候選影像 | 本地檔案 | 核對依據 | 初步判定 |
|---|---|---|---|---|
| Hidden Gem Cafe Hanoi | Tripadvisor／AYA／Hanoi Backstreet Tours 門面照片，招牌可讀到 Hidden Gem Cafe，且部分畫面帶有地址 19 Hàng Tre | `/home/ubuntu/upload/search_images/SjDob8r82zxr.jpg`、`/home/ubuntu/upload/search_images/77lFQzQkLNYR.jpg` 或 `/home/ubuntu/upload/search_images/77lFQzQkLNYR.jpg` | 店名與資料相符；需以地址清楚的門面照優先 | 可採用；優先用帶地址招牌的候選 |
| Cafe Duy Trí | Tripadvisor／Saigoneer 門面照片，招牌可讀到 Cà Phê Duy Trí，部分照片標示 43 Phố Yên Phụ | `/home/ubuntu/upload/search_images/Lfc2VAouhYVr.jpg`、`/home/ubuntu/upload/search_images/WoHiUxDBBddV.jpg` | 店招與資料店名相符；需核對資料地址是否為 43 Yên Phụ | 可採用；優先用店招與街景皆清楚的照片 |
| Bếp Chíp Mít | 本批搜尋未找到能以店招／地址可靠核對的候選 | — | 搜尋結果被其他餐廳或無關圖片佔據 | 暫不採用，需再用越文地址搜尋 |

## 第八批影像搜尋結果

| 店家 | 候選影像 | 本地檔案 | 核對依據 | 初步判定 |
|---|---|---|---|---|
| Xôi chè Bà Thìn | Corner／Hà Nội Đẹp 門面照片，招牌可讀到 Xôi Chè Bà Thìn、1 P. Bát Đàn | `/home/ubuntu/upload/search_images/pq6dm27TjFRG.jpeg` 或 `/home/ubuntu/upload/search_images/Cb5isQZa32EJ.jpg` | 來源標題地址與資料地址 1 Bát Đàn 相符，店招清楚 | 可採用；優先用橫幅店面照 |
| Zô Zô Tofu Pudding | Corner 門面照片，招牌可讀到 Tào Phớ Zô Zô，來源標題含 7b Phố Hàng Da | `/home/ubuntu/upload/search_images/8c0pTpy6NLcw.jpeg` 或 `/home/ubuntu/upload/search_images/9NS0qnTK7Iiv.jpeg` | 店招與資料店名相符，來源地址可核對 | 可採用；優先用店面照 |
| Tràng Tiền Ice Cream | VinWonders／旅遊文章中的 Kem Tràng Tiền 門面照片，品牌招牌與綠色門面清楚 | `/home/ubuntu/upload/search_images/CjyaQZHi9nH7.jpg` 或 `/home/ubuntu/upload/search_images/HwvG2zDMCUq6.jpg` | 品牌招牌清楚，與資料店名相符；需注意可能是品牌門店而非影片拍攝入口 | 可採用；標記為品牌門面候選 |

## 第九批影像搜尋結果

| 店家 | 候選影像 | 本地檔案 | 核對依據 | 初步判定 |
|---|---|---|---|---|
| Kem Trứng Bà Khanh | Corner／YouTube 門面與店內照片；來源標題直接含 55B P. Hai Bà Trưng，照片可讀到 Kem Trứng Bà Khanh | `/home/ubuntu/upload/search_images/MZ8ibcL2Q7xE.jpg`、`/home/ubuntu/upload/search_images/SKbkgk26OVwY.jpg` | 來源標題地址與資料地址相符，店名／招牌可核對 | 可採用；優先用含招牌的橫幅照片 |
| Chè Yến | 本批搜尋未找到能清楚對應資料店名與地址的候選 | — | 搜尋結果多為其他甜品店或無法核對的圖片 | 暫不採用，需用越文地址／原始影片再查 |
| Bếp Chíp Mít | 本批搜尋仍未找到可靠匹配 | — | 無店招或地址雙重核對證據 | 暫不採用 |

## 第十批影像搜尋結果

| 店家 | 候選影像 | 本地檔案 | 核對依據 | 初步判定 |
|---|---|---|---|---|
| Bún Ngan Nhàn | Riviu／Foody／新聞來源照片；來源標題直接含 14 Ngõ Trung Yên，且招牌／店面可見 Bún Ngan Nhàn | `/home/ubuntu/upload/search_images/36E1zNpu67Oe.jpeg`、`/home/ubuntu/upload/search_images/0Cp1E0btcmTs.jpg` 或 `/home/ubuntu/upload/search_images/mS0SYM9IQbOr.jpeg` | 來源標題地址與資料地址一致，候選有店面／招牌證據 | 可採用；優先用有店名與門面構圖的候選 |
| Xôi Mây | 搜尋結果含招牌「XÔI MÂY」，但照片上的地址看似 58 Bùi ...，與資料 31 Lý Thường Kiệt 尚需核對 | `/home/ubuntu/upload/search_images/B3m9HbF0ZexZ.jpg` | 店名匹配但地址未完全核對 | 暫列候選，需確認是否為同一攤位／搬遷後位置 |
| Bún Ngan Hòe Nhai | 搜尋結果多為 3 Hòe Nhai 其他店家或菜品，未找到清楚店招 | `/home/ubuntu/upload/search_images/1sQpQHUMfWWc.jpg` | 只有街道／其他店家資訊，無法确认店名 | 暫不採用 |

## 視覺核對補充（2026-08-12）

已製作候選照片總覽並逐一檢查。可直接作為封面照的候選包括：Chào Bạn、Don Duck、Phở Gà Nguyệt、Bao An Vegan、Bún Ziu Gánh、Bún Thang Thanh、Bún Đậu An An、Mr Bảy Miền Tây、Ốc Vi Saigon、Bánh cuốn Bà Xuân、Bánh Tráng Bé My、Hidden Gem Cafe、Cafe Duy Trí、Xôi chè Bà Thìn、Zô Zô Tofu Pudding、Tràng Tiền Ice Cream；Nem Chua Rán Thành Xăm 的候選為直式短片截圖，能讀到店名但構圖較弱，仍可作為保守補圖。Chè Yến 的攤位截圖能讀到「CHÈ YẾN NGÕ CHỢ ĐỒNG XUÂN」，可作為攤位照；不採用菜品特寫作為店面照。

需更換或暫不採用的已選候選：Bánh Giò Miss Béo、Bún Ngan Nhàn、Chè Yến 的 Foody 菜品照、Kem Trứng Bà Khanh 的飲品／甜點照。Xôi Mây、Bún Ngan Hòe Nhai、Bếp Chíp Mít、Quán Bánh Đúc Nóng Bà Nội 仍沒有足夠可靠的店面照；不以相似店家或未核對地址的照片代替。

新增核對：Bún Đậu An An 的 Corner 候選 `/home/ubuntu/upload/search_images/UXWjCslT6wl7.jpeg` 顯示清楚紅色店招與門面，且與資料地址 7 Ngõ Gạch 相符，可採用。Bếp Chíp Mít 的 Facebook 公開頁面確認店名與 41 Nguyễn Siêu 地址，但目前可見內容主要是 Logo／菜單，不足以作為店面照。

## 替代候選視覺核對（2026-08-12）

替代候選中新增可採用項目：Quán Bánh Đúc Nóng Bà Nội 使用 `/home/ubuntu/upload/search_images/bt8VAz66M0U9.jpg`，畫面可見巷內店面與「Bánh đúc nóng」招牌；Kem Trứng Bà Khanh 使用 `/home/ubuntu/upload/search_images/SKbkgk26OVwY.jpg`，畫面可讀到「KEM TRỨNG BÀ KHANH」且為店面招牌構圖；Xôi Mây 使用 `/home/ubuntu/upload/search_images/B3m9HbF0ZexZ.jpg`，畫面可讀到「XÔI MÂY」與攤位，雖地址未完全核對，標記為「店名核對、地址待確認」而非完全確證；Bún Ngan Hòe Nhai 的 `/home/ubuntu/upload/search_images/1sQpQHUMfWWc.jpg` 可見街邊店面，但招牌不是清楚的 Bún Ngan Hòe Nhai，因此暫不採用；Bún Ngan Nhàn 的替代候選仍以菜品或文字截圖為主，暫不採用；Bánh Giò Miss Béo 的 `/home/ubuntu/upload/search_images/Vjuv6cPOtRiN.jpg` 可見街邊店面，但店名／地址證據不如資料來源標題清楚，暫不採用。
