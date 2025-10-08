<template>
  <v-card>
    <v-card-text>
      <v-switch
        :model-value="editMode"
        label="編輯模式"
        @update:model-value="$emit('update:editMode', $event)"
      ></v-switch>
      <div v-if="editMode">
        <v-divider class="my-4"></v-divider>
        <v-btn class="mb-2 w-100" @click="$emit('add-floor')">新增樓層</v-btn>
        <v-btn class="mb-2 w-100" color="error" @click="$emit('delete-floor')">刪除樓層</v-btn>
        <v-divider class="my-4"></v-divider>
        <v-btn class="mb-2 w-100" @click="$emit('add-table')">新增桌位</v-btn>
        <v-btn class="w-100" @click="$emit('align-to-grid')">對齊網格</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    editMode: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:editMode', 'add-floor', 'delete-floor', 'add-table', 'align-to-grid'],
};
</script>
