<template>
  <v-card class="mx-auto" max-width="344" flat>
    <v-img :src="product.image" height="200px"></v-img>

    <v-card-title>
      {{ product.name }}
    </v-card-title>

    <v-card-subtitle>
      {{ product.description }}
    </v-card-subtitle>

    <v-card-actions>
      <v-card-text class="text-h6 font-weight-bold">
        ${{ product.price }}
      </v-card-text>

      <v-spacer></v-spacer>

      <v-btn color="primary" variant="tonal">
        加入購物車
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>
