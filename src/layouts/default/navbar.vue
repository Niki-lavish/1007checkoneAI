<template>
  <v-app-bar app color="white" flat height="64">
    <v-btn class="nav-button" rounded="lg" to="/">
      <v-icon left>mdi-view-dashboard-outline</v-icon>
      返回儀表板
    </v-btn>

    <v-toolbar-title 
      class="text-h5 font-weight-bold"
      style="
        position: absolute; 
        left: 50%; 
        transform: translateX(-50%);
        color: #222222;
      "
    >
      向天泓咖啡廳
    </v-toolbar-title>

    <v-spacer></v-spacer>
    
    <v-btn class="nav-button" rounded="lg">
      <v-icon left>mdi-book-outline</v-icon>
      訂位總覽
    </v-btn>
    <v-btn class="nav-button" rounded="lg">
      <v-icon left>mdi-home-outline</v-icon>
      回到首頁
    </v-btn>
    <v-btn icon>
      <v-badge :content="cartItemCount" color="error" :model-value="cartItemCount > 0">
        <v-icon>mdi-cart-outline</v-icon>
      </v-badge>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
defineProps({
  cartItemCount: {
    type: Number,
    default: 0
  }
});
</script>

<style scoped>
.nav-button {
  background-color: #FFECE6 !important;
  color: #FF6A3D !important;
  margin-right: 16px;
}
</style>
