**專案**：向天泓咖啡廳
**版本**：v1.0
**技術**：Vue 3 `<script setup>` / Pinia / Vue Router / Vite
**UI 工具**：Vuetify

---

### 1) 全域設計系統（必填、數值化）
- **版心/間距**
  - 版心寬：［1200px］（置中）
  - 左右安全邊距：［24px］
  - 間距刻度：［8px 基準：8/16/24/32…］
- **斷點（RWD）**
  - lg：≥［1280］
  - md：［960–1279］
  - sm：<［960］
- **色彩（HEX）**
  - 主色：［#FF6A3D］
  - 次色：［#222222］
  - 字色淺：［#6B7280］
  - 邊框：［#E5E7EB］
  - 背景：［#FFFFFF］
  - 高亮/提醒：［#FEEFEA］
- **字體/字級**
  - 字族：［Roboto, Noto Sans TC］；字重：［400/500/700］
  - H1：［24/32］、H2：［20/28］、Body：［16/24］、Caption：［14/20］
- **按鈕樣式**
  - 高度：［36px］；圓角：［9999px］
  - 主按鈕：底色［#FF6A3D］ / 字色［#FFFFFF］
  - Hover：明度＋［5%］；Disabled：不透明度［40%］
- **樣式檔**
  - `-- [編輯SCSS]` 檔名/路徑：［src/styles/settings.scss］

---

### 2) Page：［菜單頁］
- **檔案**：［index.vue］
- **路徑**：［/src/pages/index.vue］
- **功能**：［顯示菜單、分類，並提供購物車功能］

#### 2.1 佈局（lg）
- 欄數：［三欄］
- 寬度：左［240px］ / 中［flex］ / 右［360px］
- Sticky：右欄 sticky top［24px］（僅 ≥md）
- 卡片：每列［4 欄］、卡片最小寬［auto］、間距［16px / 16px］

#### 2.2 RWD 規則
- md：［側欄改水平分類列；商品 2 欄；購物車 320px sticky］
- sm：［單欄；水平分類可捲動；購物車下移、非 sticky］

#### 2.3 顏色使用（對應區塊）
- ［#FF6A3D］：按鈕 / Active 背景 / 價格
- ［#222222］：標題文字
- ［#6B7280］：副標/說明文字
- ［#E5E7EB］：分隔線/卡片邊框
- ［#FFFFFF］：主要背景

#### 2.4 文字規範
- 區塊標題：［20/28，600］
- 商品標題：［16/24，600］
- 商品副標：［14/20，400，#6B7280］
- 價格：［16/24，700，#FF6A3D］

#### 2.5 互動行為
- 按鈕 hover/focus：陰影或底色變化
- 鍵盤可達性：Tab 順序＝［分類 → 商品卡片（圖/名/加入）→ 購物車 → 結帳］
- ARIA：加入按鈕 `aria-label="加入：{商品名}"`

#### 2.6 差異說明（如與設計圖不同）
- 元素：［右側按鈕］
- 設計期望：［訂位預約 / 會員註冊］
- 實作數值：［訂位總覽 / 回到首頁］
- 理由：［根據 need(v1).md 的需求，按鈕為"訂位總覽"和"回到首頁"］

- 元素：［商品卡片］
- 設計期望：［每行 4 個商品］
- 實作數值：［根據 need(v1).md 的需求，每行 3 個商品］
- 理由：［根據 need(v1).md 的需求，商品每行 3 個］

- 元素：［優惠資訊］
- 設計期望：［綠色字體］
- 實作數值：［預設文字顏色］
- 理由：［need(V2).md 未指定顏色，使用預設樣式］

---

### 3) Layouts：`/layouts/default/navbar.vue`（如適用）
- **功能**：［導覽列/返回/訂位/回首頁］
- **尺寸**：高度［64px］；左右內距［24px］
- **RWD**：［sm 收合為漢堡選單；md+ 顯示完整項目］
- **顏色**：背景［#FFFFFF］；文字/圖示［#222222］；Active［#FF6A3D］
- **互動**：hover/active/焦點下劃線或底色變化

---

### 4) Components（必填：Props/Emits 清楚）
> 置於 `/src/components` 或 `/src/components/common`

| 元件 | 路徑 | 職責 | 結構概要 | Props（型別/必填/預設） | Emits（事件名/參數） |
|---|---|---|---|---|---|
| ProductCard | /components/ProductCard.vue | 顯示單一商品卡片 | 圖/名/副標/價/加入 | `product:Object!` | `add-to-cart(product)` |
| CartItem | /components/CartItem.vue | 購物車項目 | 圖/名/單價/數量/刪除 | `item:Object!` | `update-qty(id, qty)`、`remove(id)` |
| CategoryMenu | /components/CategoryMenu.vue | 類別選單（側/橫） | 列表/Active 樣式 | `items:Array!`、`modelValue:String` | `update:modelValue(key)` |
| ShoppingCart | /components/ShoppingCart.vue | 購物車總覽/結帳 | 清單/小計/總計/CTA | `items:Array=[]`、`subtotal:Number=0`、`total:Number=0` | `checkout()` |

**樣式強制補充（如需要）**
- 商品圖片比例：［1:1］；圖片圓角：［8px］
- 卡片圓角：［8px］；陰影：［Elevation 2］
- 加入按鈕：高度［36px］、圓角［9999px］、主色底/白字

---

### 5) 資產/圖像
- 商品圖片：比例［1:1］、建議寬度［400px］
- Icon：尺寸［24×24］，來源［mdi］

---

### 6) 驗收清單（硬性）
- [ ] 版心寬［1200px］、左右邊距［24px］，允差 ±2px
- [ ] lg/md/sm 佈局切換符合規則（卡片 4/2/1 欄）
- [ ] Sticky 僅在 ≥md 生效、offset［24px］
- [ ] 顏色 HEX 與規格一致（主色/邊框/背景/字色）
- [ ] 元件 Props/Emits 與表格一致、無未定義事件
- [ ] 鍵盤 Tab 順序正確、ARIA label 完整
- [ ] 常見狀態（空購物車、超庫存）有對應樣式與互動
