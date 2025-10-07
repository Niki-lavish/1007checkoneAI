<template>
  <v-card class="d-flex flex-column pa-4" flat height="100%">
    <v-card-title class="text-h5 font-weight-bold">
      購物車
    </v-card-title>

    <v-card-text v-if="cartItems.length === 0" class="text-center flex-grow-1 d-flex flex-column justify-center align-center">
      <v-icon size="64" color="grey-lighten-1">mdi-cart-outline</v-icon>
      <p class="mt-4 text-grey-darken-1">您的購物車是空的</p>
    </v-card-text>

    <v-list v-else class="flex-grow-1 overflow-y-auto">
      <v-list-item
        v-for="item in cartItems"
        :key="item.id"
        class="mb-2"
      >
        <template v-slot:prepend>
            <v-img :src="item.image" width="64" class="mr-4 rounded"></v-img>
        </template>

        <v-list-item-title class="font-weight-bold">{{ item.name }}</v-list-item-title>
        
        <v-list-item-subtitle>
          <div class="d-flex align-center mt-1">
            <span class="mr-auto">${{ item.price }}</span>
            <div class="d-flex align-center">
              <v-btn icon size="x-small" variant="tonal" @click="updateQuantity(item, item.quantity - 1)">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <span class="mx-3">{{ item.quantity }}</span>
              <v-btn icon size="x-small" variant="tonal" @click="updateQuantity(item, item.quantity + 1)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
          </div>
        </v-list-item-subtitle>

        <template v-slot:append>
          <v-btn icon size="small" variant="text" @click="removeItem(item)">
            <v-icon color="error">mdi-delete-outline</v-icon>
          </v-btn>
        </template>
      </v-list-item>
    </v-list>

    <div class="mt-auto">
      <v-divider class="my-4"></v-divider>

      <div class="d-flex justify-space-between align-center mb-4">
        <span class="text-h6">總計:</span>
        <span class="text-h6 font-weight-bold">${{ totalPrice }}</span>
      </div>

      <v-btn block color="primary" size="large" :disabled="cartItems.length === 0">
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
  emit('update-quantity', { item, quantity });
};

const removeItem = (item) => {
  emit('remove-item', item);
};
</script>

<style scoped>
.rounded {
  border-radius: 8px;
}
</style>
