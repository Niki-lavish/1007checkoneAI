<template>
  <v-container fluid>
    <div class="product-grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @show-options="showOptionsModal"
      />
    </div>
    <ProductOptionsModal 
      :is-open="isOptionsModalOpen"
      :product="selectedProduct"
      :all-products="allProducts"
      @update:is-open="isOptionsModalOpen = $event"
      @add-to-cart="handleAddToCart"
    />
  </v-container>
</template>

<script setup>
import { ref, inject, computed } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import ProductOptionsModal from '@/components/ProductOptionsModal.vue';

const injectedAddToCart = inject('addToCart');
const selectedCategory = inject('selectedCategory');

const isOptionsModalOpen = ref(false);
const selectedProduct = ref(null);

const showOptionsModal = (product) => {
  if (product.category === '特色風味小火鍋' || product.category === '特色風味簡餐') {
    selectedProduct.value = product;
    isOptionsModalOpen.value = true;
  } else {
    injectedAddToCart(product);
  }
};

const handleAddToCart = (product) => {
  injectedAddToCart(product);
  isOptionsModalOpen.value = false;
}

const allProducts = ref([
  {
    "id": 10,
    "name": "蕃茄牛奶鍋",
    "description": "濃郁番茄與香醇牛奶的完美結合",
    "price": 400,
    "image": "/images/product-10.jpg",
    "category": "特色風味小火鍋"
  },
  {
    "id": 11,
    "name": "泰式酸辣鍋",
    "description": "道地的泰式酸辣風味，開胃首選",
    "price": 380,
    "image": "/images/product-11.jpg",
    "category": "特色風味小火鍋"
  },
  {
    "id": 12,
    "name": "香煎雞腿排",
    "description": "附白飯、湯、小菜",
    "price": 280,
    "image": "/images/product-12.jpg",
    "category": "特色風味簡餐"
  },
  {
    "id": 13,
    "name": "鹽烤鯖魚",
    "description": "附白飯、湯、小菜",
    "price": 260,
    "image": "/images/product-13.jpg",
    "category": "特色風味簡餐"
  },
  {
    "id": 1,
    "name": "耶加雪菲",
    "description": "柑橘、花香、檸檬",
    "price": 180,
    "image": "/images/product-1.jpg",
    "category": "單品咖啡"
  },
  {
    "id": 2,
    "name": "肯亞AA",
    "description": "莓果、烏梅、黑醋栗",
    "price": 200,
    "image": "/images/product-2.jpg",
    "category": "單品咖啡"
  },
  {
    "id": 3,
    "name": "曼特寧",
    "description": "藥草、奶油、巧克力",
    "price": 160,
    "image": "/images/product-3.jpg",
    "category": "單品咖啡"
  },
  {
    "id": 4,
    "name": "拿鐵",
    "description": "濃縮咖啡與蒸氣牛奶",
    "price": 120,
    "image": "/images/product-4.jpg",
    "category": "義式咖啡"
  },
  {
    "id": 5,
    "name": "卡布奇諾",
    "description": "濃縮咖啡、蒸氣牛奶與奶泡",
    "price": 120,
    "image": "/images/product-5.jpg",
    "category": "義式咖啡"
  },
  {
    "id": 6,
    "name": "美式咖啡",
    "description": "濃縮咖啡加熱水",
    "price": 90,
    "image": "/images/product-6.jpg",
    "category": "義式咖啡"
  },
  {
    "id": 14,
    "name": "日月潭紅茶",
    "description": "台灣特色紅茶",
    "price": 80,
    "image": "/images/product-14.jpg",
    "category": "茶"
  },
  {
    "id": 15,
    "name": "文山包種茶",
    "description": "清香甘醇",
    "price": 90,
    "image": "/images/product-15.jpg",
    "category": "茶"
  },
  {
    "id": 16,
    "name": "新鮮水果茶",
    "description": "多種新鮮水果調製",
    "price": 130,
    "image": "/images/product-16.jpg",
    "category": "無咖啡因飲品"
  },
  {
    "id": 17,
    "name": "蜂蜜檸檬",
    "description": "天然蜂蜜搭配新鮮檸檬",
    "price": 100,
    "image": "/images/product-17.jpg",
    "category": "無咖啡因飲品"
  },
  {
    "id": 7,
    "name": "提拉米蘇",
    "description": "馬斯卡彭起司、咖啡、手指餅乾",
    "price": 150,
    "image": "/images/product-7.jpg",
    "category": "甜點"
  },
  {
    "id": 8,
    "name": "紐約起司蛋糕",
    "description": "濃郁的奶油起司風味",
    "price": 130,
    "image": "/images/product-8.jpg",
    "category": "甜點"
  },
  {
    "id": 9,
    "name": "法式檸檬塔",
    "description": "酸甜清新的檸檬內餡",
    "price": 110,
    "image": "/images/product-9.jpg",
    "category": "甜點"
  },
  {
    "id": 18,
    "name": "美式脆薯",
    "description": "金黃酥脆",
    "price": 90,
    "image": "/images/product-18.jpg",
    "category": "炸物"
  },
  {
    "id": 19,
    "name": "唐揚雞塊",
    "description": "日式風味炸雞",
    "price": 120,
    "image": "/images/product-19.jpg",
    "category": "炸物"
  }
]);

const filteredProducts = computed(() => {
  return allProducts.value.filter(p => p.category === selectedCategory.value);
});
</script>

<style scoped>
.product-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px; /* Provides spacing between cards */
  justify-content: flex-start; /* Aligns the cards to the left */
}
</style>
