<template>
  <v-app>
    <Navbar 
      :cart-item-count="cartItems.length"
      @toggle-navigation="drawer = !drawer" 
      @toggle-cart="cartDrawer = !cartDrawer"
    />

    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
    >
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        title="John Leider"
        nav
      >
        <template v-slot:append>
          <v-btn
            variant="text"
            icon="mdi-chevron-left"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>
      <v-divider></v-divider>
      <CategoryMenu />
    </v-navigation-drawer>
    
    <v-navigation-drawer v-model="cartDrawer" location="right" temporary width="400">
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
import { useDisplay } from 'vuetify';
import Navbar from './default/navbar.vue';
import CategoryMenu from '@/components/CategoryMenu.vue';
import ShoppingCart from '@/components/ShoppingCart.vue';

const { mobile } = useDisplay();
const drawer = ref(!mobile.value);
const cartDrawer = ref(false);
const rail = ref(false);

const cartItems = ref([]);

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
  cartDrawer.value = true;
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
</script>
