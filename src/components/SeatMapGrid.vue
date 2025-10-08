<template>
  <v-card>
    <v-card-title>座位圖</v-card-title>
    <v-card-text
      class="seat-map-grid"
      @dragover.prevent
      @drop="onDrop"
    >
      <v-card
        v-for="table in tables"
        :key="table.id"
        class="table-card"
        :style="{ top: table.y + 'px', left: table.x + 'px' }"
        :draggable="draggable"
        @dragstart="onDragStart($event, table)"
      >
        <v-card-text class="text-center">
          <div class="font-weight-bold">{{ table.name }}</div>
        </v-card-text>
        <v-card-actions v-if="draggable" class="justify-center">
          <v-btn icon size="small" @click.stop="$emit('edit-table', table)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon size="small" @click.stop="$emit('delete-table', table.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    tables: {
      type: Array,
      required: true,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update-table-position', 'edit-table', 'delete-table'],
  data() {
    return {
      draggedTable: null,
      offsetX: 0,
      offsetY: 0,
    };
  },
  methods: {
    onDragStart(event, table) {
      if (!this.draggable) {
        event.preventDefault();
        return;
      }
      this.draggedTable = table;
      this.offsetX = event.clientX - event.target.getBoundingClientRect().left;
      this.offsetY = event.clientY - event.target.getBoundingClientRect().top;
      event.dataTransfer.effectAllowed = 'move';
    },
    onDrop(event) {
      if (!this.draggedTable) return;

      const gridRect = event.currentTarget.getBoundingClientRect();
      const newX = event.clientX - gridRect.left - this.offsetX;
      const newY = event.clientY - gridRect.top - this.offsetY;

      // Emit an event to the parent component to update the table's position
      this.$emit('update-table-position', {
        tableId: this.draggedTable.id,
        x: newX,
        y: newY,
      });

      this.draggedTable = null;
    },
  },
};
</script>

<style scoped>
.seat-map-grid {
  position: relative;
  height: 600px; /* Adjust as needed */
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}
.table-card {
  position: absolute;
  cursor: move;
  width: 90px;
  height: 90px;
  display: flex;
  flex-direction: column; /* Arrange items vertically */
  align-items: center;
  justify-content: center;
  user-select: none; /* Prevent text selection while dragging */
}
.v-card-actions {
  padding: 0;
}
</style>
