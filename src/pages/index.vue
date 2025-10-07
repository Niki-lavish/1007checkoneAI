<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <ProductCard :product="product" @add-to-cart="addToCart" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, inject } from 'vue';
import ProductCard from '@/components/ProductCard.vue';

const addToCart = inject('addToCart');

const products = ref([
  {
    id: 1,
    name: '濃縮咖啡',
    description: '純粹的咖啡風味',
    price: 80,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    name: '拿鐵',
    description: '咖啡與牛奶的完美結合',
    price: 120,
    image: 'https://plus.unsplash.com/premium_photo-1675435432312-32c589574591?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    name: '卡布奇諾',
    description: '奶泡、牛奶與咖啡的經典組合',
    price: 120,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    name: '可頌',
    description: '外酥內軟的法式經典',
    price: 60,
    image: 'https://images.unsplash.com/photo-1587668178277-2952e7f90c21?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    name: '提拉米蘇',
    description: '帶有咖啡酒香的義式甜點',
    price: 100,
    image: 'https://images.unsplash.com/photo-1571877232231-c27ee531e208?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
]);
</script>
