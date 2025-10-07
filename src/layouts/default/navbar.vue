<template>
  <v-app-bar app color="white" flat height="80">
    <v-container class="d-flex align-center">
      <v-app-bar-nav-icon @click="$emit('toggle-navigation')"></v-app-bar-nav-icon>
      
      <v-img src="@/assets/vue.svg" max-height="40" max-width="40" contain class="ml-2"></v-img>
      
      <v-toolbar-title class="text-h5 font-weight-bold ml-4">向天泓咖啡廳</v-toolbar-title>
      
      <v-spacer></v-spacer>
      
      <v-btn icon @click="$emit('toggle-cart')">
        <v-badge :content="cartItemCount" color="error" :model-value="cartItemCount > 0">
          <v-icon>mdi-cart-outline</v-icon>
        </v-badge>
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script setup>

defineProps({
  cartItemCount: {
    type: Number,
    default: 0
  }
});

defineEmits(['toggle-navigation', 'toggle-cart']);
</script>

<style scoped>
.v-toolbar-title {
  color: #222222;
}
</style>
