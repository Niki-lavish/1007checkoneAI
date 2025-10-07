<template>
  <v-card class="mx-auto" max-width="344" flat @click="$emit('show-options', product)">
    <v-img :src="product.image" height="200px" cover></v-img>

    <v-card-title>
      {{ product.name }}
    </v-card-title>

    <v-card-subtitle>
      {{ product.description }}
    </v-card-subtitle>

    <v-card-actions>
      <v-card-text class="text-h6 font-weight-bold" style="color: #FF5722;">
        NT${{ product.price }}
      </v-card-text>

      <v-spacer></v-spacer>

      <v-btn color="#FF6A3D" variant="flat">
        <v-icon left>mdi-plus-circle-outline</v-icon>
        <span style="color: white;">選擇</span>
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
