<template>
  <v-card
    class="product-card d-flex flex-column"
    outlined
    hover
    @click="$emit('show-options', product)"
  >
    <v-img :src="product.image" height="200px" cover></v-img>

    <v-card-title class="font-weight-bold product-title">
      {{ product.name }}
    </v-card-title>

    <v-card-subtitle class="product-subtitle">
      {{ product.description }}
    </v-card-subtitle>

    <v-spacer></v-spacer>

    <v-card-actions>
      <v-card-text class="text-h6 font-weight-bold" style="color: #FF5722;">
        NT${{ product.price }}
      </v-card-text>

      <v-spacer></v-spacer>

      <v-btn color="#FF6A3D" variant="flat">
        <v-icon left class="mr-1">mdi-plus-circle-outline</v-icon>
        <span style="color: white;">加入</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  product: {
    type: Object,
    required: true,
  },
});

defineEmits(['show-options']);
</script>

<style scoped>
.product-card {
  width: 240px; /* Set a fixed width */
  transition: all 0.2s ease-in-out;
  border-radius: 12px;
  border: 1px solid #F7F7F7;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.product-title,
.product-subtitle {
  white-space: normal; /* Allow text to wrap */
  word-break: break-word; /* Break long words */
}
</style>
