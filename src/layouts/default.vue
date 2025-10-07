<template>
  <v-app>
    <Navbar 
      :cart-item-count="cartItems.length"
    />

    <v-navigation-drawer permanent>
      <CategoryMenu v-model="selectedCategory" />
    </v-navigation-drawer>
    
    <v-navigation-drawer location="right" permanent width="320">
      <ShoppingCart 
        :cart-items="cartItems"
        :total-price="totalPrice"
        @update-quantity="updateQuantity"
        @remove-item="removeItem"
      />
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, provide } from 'vue';
import Navbar from './default/navbar.vue';
import CategoryMenu from '@/components/CategoryMenu.vue';
import ShoppingCart from '@/components/ShoppingCart.vue';

const cartItems = ref([]);
const selectedCategory = ref('特色風味小火鍋');

const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
});

const addToCart = (product) => {
  const existingItem = cartItems.value.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.value.push({ ...product, quantity: 1 });
  }
};

const updateQuantity = ({ item, quantity }) => {
  if (quantity <= 0) {
    removeItem(item);
  } else {
    const cartItem = cartItems.value.find(i => i.id === item.id);
    if (cartItem) {
      cartItem.quantity = quantity;
    }
  }
};

const removeItem = (item) => {
  const index = cartItems.value.findIndex(i => i.id === item.id);
  if (index !== -1) {
    cartItems.value.splice(index, 1);
  }
};

provide('addToCart', addToCart);
provide('selectedCategory', selectedCategory);

</script>
