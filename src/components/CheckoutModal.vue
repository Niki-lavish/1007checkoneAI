<template>
  <v-dialog :model-value="isOpen" @update:model-value="$emit('update:isOpen', $event)" max-width="500px">
    <v-card>
      <v-card-title class="text-h5 text-center font-weight-bold py-4">
        選擇結帳方式
        <v-btn icon="mdi-close" variant="text" class="position-absolute" style="right: 8px; top: 8px;" @click="$emit('update:isOpen', false)"></v-btn>
      </v-card-title>

      <v-card-text class="py-4">
        <p class="font-weight-bold mb-2">給店家備註：</p>
        <v-textarea
          v-model="notes"
          placeholder="例如：熱拿鐵半糖、餐點不要香菜"
          rows="2"
          maxlength="50"
          counter
          outlined
          no-resize
        ></v-textarea>
      </v-card-text>

      <div class="px-4 pb-4">
        <v-btn block color="#FFECE6" class="mb-3 cash-payment-btn" size="large">
          <v-icon left class="mr-2">mdi-cash</v-icon>
          櫃檯現金支付
        </v-btn>
        <v-btn block color="#D32F2F" class="line-pay-btn" size="large">
          <v-icon left class="mr-2">mdi-credit-card</v-icon>
          線上 LinePay
        </v-btn>
      </div>

      <v-card-actions class="justify-center pb-4">
        <v-btn variant="text" @click="$emit('update:isOpen', false)">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  isOpen: Boolean
});

defineEmits(['update:isOpen']);

const notes = ref('');
</script>

<style scoped>
.cash-payment-btn {
  color: #FF6A3D !important;
}

.line-pay-btn {
  color: white !important;
}
</style>
