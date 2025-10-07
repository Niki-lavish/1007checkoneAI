<template>
  <v-card class="d-flex flex-column pa-4" flat height="100%">
    <v-card-title class="text-h5 font-weight-bold">
      我的購物車
    </v-card-title>

    <v-card-text v-if="cartItems.length === 0" class="text-center flex-grow-1 d-flex flex-column justify-center align-center">
      <p class="mt-4 text-grey-darken-1">購物車是空的</p>
    </v-card-text>

    <v-list v-else class="flex-grow-1 overflow-y-auto" lines="three">
      <template v-for="(item, index) in cartItems" :key="item.id">
        <v-list-item class="mb-2">
          <div class="d-flex align-center">
            <v-img :src="item.image" width="80" height="80" cover class="mr-4 rounded-lg"></v-img>
            <div class="flex-grow-1">
              <v-list-item-title class="font-weight-bold">{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle v-if="item.description" class="text-grey-darken-1 my-1">{{ item.description }}</v-list-item-subtitle>
              <div class="d-flex align-center justify-space-between">
                 <div class="font-weight-bold">NT${{ item.price }}</div>
                <div class="d-flex align-center">
                  <v-btn variant="text" icon="mdi-minus" size="x-small" @click="updateQuantity(item, item.quantity - 1)"></v-btn>
                  <span class="px-2">{{ item.quantity }}</span>
                  <v-btn variant="text" icon="mdi-plus" size="x-small" @click="updateQuantity(item, item.quantity + 1)"></v-btn>
                </div>
              </div>
            </div>
            <v-btn variant="text" icon="mdi-close" size="small" @click="removeItem(item)" class="ml-2 align-self-start"></v-btn>
          </div>
        </v-list-item>
        <v-divider v-if="index < cartItems.length - 1"></v-divider>
      </template>
    </v-list>

    <div class="mt-auto">
      <div class="d-flex justify-space-between align-center mt-4">
        <span>小計:</span>
        <span class="font-weight-bold">NT${{ totalPrice }}</span>
      </div>

      <div class="my-4 text-center">
        <p class="promo-text">🎉 全品項85折優惠實施中!</p>
        <p class="promo-text">滿500元再送炸物拼盤一份!</p>
      </div>

      <div class="d-flex justify-space-between align-center mb-4">
        <span class="text-h5">總計:</span>
        <span class="text-h5 font-weight-bold">NT${{ totalPrice }}</span>
      </div>

      <v-btn block color="#FF8C69" size="large" class="checkout-btn" :disabled="cartItems.length === 0">
        前往結帳
      </v-btn>
    </div>
  </v-card>
</template>

<script setup>
defineProps({
  cartItems: {
    type: Array,
    default: () => []
  },
  totalPrice: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['update-quantity', 'remove-item']);

const updateQuantity = (item, quantity) => {
  if (quantity <= 0) {
    removeItem(item);
  } else {
    emit('update-quantity', { item, quantity });
  }
};

const removeItem = (item) => {
  emit('remove-item', item);
};
</script>

<style scoped>
.promo-text {
  color: #FF6A3D;
  font-size: 0.9rem;
  margin: 4px 0;
}

.checkout-btn {
  color: white !important;
}
</style>
