<template>
  <v-card class="pa-4" flat>
    <v-list nav dense>
      <v-list-subheader class="list-title">分類</v-list-subheader>
      <v-list-item
        v-for="item in categories"
        :key="item.title"
        link
        rounded="lg"
        class="category-item"
        :class="{ 'active-category': modelValue === item.title }"
        @click="$emit('update:modelValue', item.title)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  modelValue: {
    type: String,
    default: '特色風味小火鍋'
  }
});

defineEmits(['update:modelValue']);

const categories = ref([
  { title: '特色風味小火鍋' },
  { title: '特色風味簡餐' },
  { title: '單品咖啡' },
  { title: '義式咖啡' },
  { title: '茶' },
  { title: '無咖啡因飲品' },
  { title: '甜點' },
  { title: '炸物' },
]);
</script>

<style scoped>
.list-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: black;
  margin-bottom: 0.5rem;
  padding-inline-start: 16px;
}

.category-item {
  margin-bottom: 8px; /* Spacing between items */
}

.active-category {
  background-color: #FF6A3D;
}

.active-category .v-list-item-title {
  color: white;
}
</style>
