# HMR WebSocket 修復待辦

- [x] 檢查 Vite 設定與開發伺服器近期錯誤
- [x] 確認預覽代理下的 HMR WebSocket host、clientPort 與 protocol
- [x] 調整必要的 Vite HMR 設定
- [x] 停止開發環境註冊 Service Worker，避免快取舊版 HTML 與 `/@vite/client`
- [x] 清除或版本化既有 Service Worker 快取
- [x] 攔截預覽環境的 `/@vite/client`，避免建立無法穿透代理的 WebSocket
- [x] 重新啟動開發伺服器
- [x] 驗證首頁載入、TypeScript 檢查與瀏覽器錯誤
- [ ] 建立修復後檢查點並回報版本

## 修復紀錄

- 目前錯誤：預覽頁面無法連線至 Vite HMR WebSocket。
- 發生頁面：`/?from_webdev=1`
- 發生時間：2026-08-12 11:58:31（Asia/Taipei）

## 注意事項

- HMR 只影響開發時熱更新，不應阻止已建置的網站載入。
- 不會修改後端 API、資料庫或專案業務功能。
- 不使用破壞性 Git 操作。

