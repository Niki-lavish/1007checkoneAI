# router

路由設定，管理各分頁跳轉。

## ④ 變更紀錄（由 Gemini 追加；一改一記）
- [修改][v2.1]
  **動作**：新增 `/seat-map` 路由。
  **原因**：根據 `blueprint.md` 任務 1，將 `/seat-map` 路徑指向 `SeatMap.vue` 頁面。
  **影響檔案**：`src/router/index.js`
  **驗證**：終端機成功
- [修改][v2.3]
  **動作**：將 `/seat-map` 路由的佈局更換為 `admin`。
  **原因**：根據 `blueprint.md` 任務 3，讓「定位總覽」頁面使用無側邊欄的專屬佈局。
  **影響檔案**：`src/router/index.js`
  **驗證**：終端機成功
