<template>
  <v-dialog :model-value="isOpen" @update:model-value="close" max-width="500px">
    <v-card style="border-radius: 32px;">
      <v-card-title class="text-h5 font-weight-bold d-flex justify-space-between">
        <span>{{ product.name }} - 套餐選項</span>
        <v-btn icon @click="close" variant="text">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <p class="mb-4">此餐點包含白飯及一杯飲料。您可選擇預設飲料,或更換其他飲品並折抵NT$60。</p>
        
        <h3 class="text-h6 font-weight-bold mb-2">飲料選擇</h3>
        <v-radio-group v-model="drinkOption">
          <v-radio value="default" color="#FF6A3D">
            <template v-slot:label>
              <div>選擇附餐飲料 (免費)</div>
            </template>
          </v-radio>
          <v-select
            v-if="drinkOption === 'default'"
            :items="['冰紅茶', '冰綠茶', '冰奶茶']"
            v-model="selectedDrink"
            variant="outlined"
            dense
            class="ml-8 mt-2"
            hide-details
          ></v-select>
          <v-radio value="custom" class="mt-2" color="#FF6A3D">
            <template v-slot:label>
              <div>更換其他飲品 (折抵 NT$60)</div>
            </template>
          </v-radio>
          <v-select
            v-if="drinkOption === 'custom'"
            v-model="selectedCustomDrink"
            :items="drinkProducts"
            :item-title="item => `${item.name} (NT$${item.price})`"
            return-object
            label="選擇更換的飲品"
            variant="outlined"
            dense
            class="ml-8 mt-2"
            hide-details
          ></v-select>
        </v-radio-group>

        <h3 class="text-h6 font-weight-bold mt-4 mb-2">加點白飯 (NT$10/碗)</h3>
        <div class="d-flex align-center ml-2">
          <v-btn variant="outlined" size="small" @click="riceQuantity > 0 && riceQuantity--">-</v-btn>
          <span class="px-4 text-h6">{{ riceQuantity }}</span>
          <v-btn variant="outlined" size="small" @click="riceQuantity++">+</v-btn>
        </div>

      </v-card-text>
      <v-card-actions class="pa-4">
        <div class="text-h6 font-weight-bold">總計: NT${{ finalPrice }}</div>
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="close">取消</v-btn>
        <v-btn color="#FF6A3D" variant="flat" @click="confirmAddToCart" :disabled="isConfirmDisabled" class="text-white">確認加入購物車</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    default: null,
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
  allProducts: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:isOpen', 'add-to-cart']);

const drinkOption = ref('default');
const selectedDrink = ref('冰紅茶');
const selectedCustomDrink = ref(null);
const riceQuantity = ref(0);

const drinkCategories = ['單品咖啡', '義式咖啡', '茶', '無咖啡因飲品'];
const drinkProducts = computed(() => {
  return props.allProducts.filter(p => drinkCategories.includes(p.category));
});

watch(() => props.product, () => {
  drinkOption.value = 'default';
  selectedDrink.value = '冰紅茶';
  riceQuantity.value = 0;
  selectedCustomDrink.value = null;
});

watch(drinkOption, (newValue) => {
    if (newValue === 'default') {
        selectedCustomDrink.value = null;
    }
});

const close = () => {
  emit('update:isOpen', false);
};

const finalPrice = computed(() => {
    if (!props.product) return 0;
    let price = props.product.price;
    price += riceQuantity.value * 10;
    if (drinkOption.value === 'custom' && selectedCustomDrink.value) {
        price += Math.max(0, selectedCustomDrink.value.price - 60);
    }
    return price;
})

const isConfirmDisabled = computed(() => {
  return drinkOption.value === 'custom' && !selectedCustomDrink.value;
});

const confirmAddToCart = () => {
  if (!props.product || isConfirmDisabled.value) return;
  
  let description = [];
  if (drinkOption.value === 'default') {
    description.push(selectedDrink.value);
  } else if (drinkOption.value === 'custom' && selectedCustomDrink.value) {
    description.push(`更換: ${selectedCustomDrink.value.name}`);
  }

  if (riceQuantity.value > 0) {
    description.push(`加飯 x${riceQuantity.value}`);
  }

  const item = {
    ...props.product,
    price: finalPrice.value,
    id: `${props.product.id}-${Date.now()}`,
    name: props.product.name,
    description: description.join(', '),
  };
  emit('add-to-cart', item);
  close();
};

</script>
<style scoped>
.text-white {
  color: white !important;
}
</style>