# blueprint.md（任務清單）

1.  **目標**：完成「向天泓咖啡廳」菜單頁面開發，包含三欄式佈局、商品展示、購物車功能，並符合 RWD 規範。
2.  **規範查核（Rule Echo）**：
    *   **§5.2 Level B - UI/RWD/樣式**: 優先使用 Vuetify Grid，主題色集中管理。
    *   **§5.4 Level D - 資料夾職責**: `src/components` 放可重用元件, `src/pages` 放頁面容器。
    *   **§2.4 變更紀錄**: 每次簽出後更新對應資料夾的 `README.md`。
3.  **執行步驟**：
    *   **任務 1**: 設定 Vuetify 主題與全域樣式。 [狀態: 完成]
    *   **任務 2**: 建立三欄式佈局與導覽列。 [狀態: 完成]
    *   **任務 3**: 建立左側分類選單元件 (`CategoryMenu.vue`)。 [狀態: 完成]
    *   **任務 4**: 建立商品卡片元件 (`ProductCard.vue`)。 [狀態: 完成]
    *   **任務 5**: 建立右側購物車元件 (`ShoppingCart.vue`)。 [狀態: 完成]
    *   **任務 6**: 組合元件並完成主頁面 (`index.vue`)。 [狀態: 完成]
    *   **任務 7**: 實現 RWD 規則。 [狀態: 完成]
    *   **任務 8**: 更新所有相關 `README.md` 檔案。 [狀態: 完成]
4.  **驗證計畫**：
    *   每次檔案寫入後，檢查終端機的 Vite 編譯狀態。
    *   每個元件完成後，在頁面上進行視覺與互動測試。
5.  **紀錄計畫**：
    *   每完成一個任務步驟，更新 `blueprint.md` 狀態。
    *   每修改或建立一個有 `README.md` 的資料夾內的檔案，就更新該 `README.md`。
6.  **輸出**：
    *   `GEMINI畫面分析.md`
    *   `blueprint.md`
    *   `src/plugins/vuetify.js`
    *   `src/styles/settings.scss`
    *   `src/layouts/default.vue`
    *   `src/layouts/default/navbar.vue`
    *   `src/components/CategoryMenu.vue`
    *   `src/components/ProductCard.vue`
    *   `src/components/ShoppingCart.vue`
    *   `src/pages/index.vue`
    *   `src/components/README.md`
    *   `src/layouts/default/README.md`
    *   `src/pages/README.md`
    *   `src/plugins/README.md`
    *   `src/styles/README.md`
7.  **狀態**：完成
