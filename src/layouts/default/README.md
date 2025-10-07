# layouts/default

預設佈局，定義了應用程式的主要結構，包含導覽列和主要內容區域。

## ④ 變更紀錄（由 Gemini 追加；一改一記）
- [修改][v1.0]
  **動作**：建立三欄式佈局與導覽列。
  **原因**：根據 `GEMINI畫面分析.md` 的佈局要求，設定頁面的基本結構。
  **影響檔案**：`src/layouts/default.vue`, `src/layouts/default/navbar.vue`
  **驗證**：終端機成功
- [修改][v2.0]
  **動作**：實現 RWD 規則並重構佈局。
  **原因**：將 `CategoryMenu` 和 `ShoppingCart` 移至 `default.vue`，並使用 `v-navigation-drawer` 實現響應式行為，符合 `GEMINI畫面分析.md` 的 RWD 設計。
  **影響檔案**：`src/layouts/default.vue`, `src/layouts/default/navbar.vue`
  **驗證**：終端機成功
- [修改][v2.1]
  **動作**：更新導覽列「定位總覽」按鈕的連結。
  **原因**：根據 `blueprint.md` 任務 1，將按鈕的 `to` 屬性指向新建的 `/seat-map` 路由。
  **影響檔案**：`src/layouts/default/navbar.vue`
  **驗證**：終端機成功
- [修改][v2.2]
  **動作**：新增「返回點餐」按鈕。
  **原因**：根據 `blueprint.md` 任務 2，在導覽列新增一個按鈕，方便使用者返回點餐頁面。
  **影響檔案**：`src/layouts/default/navbar.vue`
  **驗證**：終端機成功
