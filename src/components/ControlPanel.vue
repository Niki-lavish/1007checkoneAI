<template>
  <v-card>
    <v-card-text>
      <v-switch
        :model-value="editMode"
        label="編輯模式"
        @update:model-value="$emit('update:editMode', $event)"
      ></v-switch>
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
  emits: ['update:editMode'],
};
</script>
