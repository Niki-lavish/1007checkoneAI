<template>
  <v-card class="pa-4" flat>
    <v-list dense nav>
      <v-list-item
        v-for="item in categories"
        :key="item.title"
        link
        :class="{ 'v-list-item--active': item.title === '所有商品' }"
      >
        <template v-slot:prepend>
          <v-icon>{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';

const categories = ref([
  { title: '所有商品', icon: 'mdi-all-inclusive' },
  { title: '主食', icon: 'mdi-food' },
  { title: '點心', icon: 'mdi-cake-variant' },
  { title: '飲品', icon: 'mdi-coffee' },
]);
</script>

<style scoped>
.v-list-item--active {
  background-color: #F5F5F5;
  color: #222222;
  border-radius: 4px;
}
</style>
