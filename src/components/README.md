# components

共用元件目錄，包含各種可重複使用的 Vue 元件。

## ④ 變更紀錄（由 Gemini 追加；一改一記）
- [建立][v1.0]
  **動作**：建立左側分類選單元件。
  **原因**：根據 `GEMINI畫面分析.md` 的設計，建立可重複使用的分類選單元件。
  **影響檔案**：`src/components/CategoryMenu.vue`
  **驗證**：終端機成功
- [建立][v1.0]
  **動作**：建立商品卡片元件。
  **原因**：根據 `GEMINI畫面分析.md` 的設計，建立可重複使用的商品卡片元件。
  **影響檔案**：`src/components/ProductCard.vue`
  **驗證**：終端機成功
- [建立][v1.0]
  **動作**：建立右側購物車元件。
  **原因**：根據 `GEMINI畫面分析.md` 的設計，建立可重複使用的購物車元件。
  **影響檔案**：`src/components/ShoppingCart.vue`
  **驗證**：終端機成功
- [修改][v2.0]
  **動作**：重構 `ShoppingCart.vue` 為展示型元件。
  **原因**：為實現 RWD 佈局，將購物車狀態提升至 `default.vue` 管理，`ShoppingCart.vue` 改為接收 `props` 並發送 `events`。
  **影響檔案**：`src/components/ShoppingCart.vue`
  **驗證**：終端機成功
