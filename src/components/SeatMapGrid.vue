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
        :class="{ 'reserved': getReservationsForTable(table).length > 0 }"
        :style="{ top: table.y + 'px', left: table.x + 'px' }"
        :draggable="draggable"
        @dragstart="onDragStart($event, table)"
        variant="outlined"
      >
        <!-- Table Header -->
        <div class="table-header d-flex justify-space-between align-center pa-2">
          <span class="font-weight-bold text-h6">{{ table.name }}</span>
          <div>
            <v-btn v-if="draggable" icon size="x-small" variant="text" @click.stop="$emit('edit-table', table)">
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>
            <v-btn v-if="draggable" icon size="x-small" variant="text" @click.stop="$emit('delete-table', table.id)">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
            <v-btn 
              v-if="!draggable && getReservationsForTable(table).length > 0" 
              icon 
              size="x-small" 
              variant="text" 
              @click.stop="$emit('show-reservation-details', getReservationsForTable(table))"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </div>
        </div>

        <!-- Reservations -->
        <div v-if="!draggable && getReservationsForTable(table).length > 0" class="reservation-list pb-1">
          <div
            v-for="reservation in getReservationsForTable(table)"
            :key="reservation.id"
            class="reservation-item d-flex justify-space-between align-center px-3 py-1 mx-2 mb-2 text-body-1"
          >
            <span>{{ reservation.time }}</span>
            <span>{{ reservation.adults + reservation.children }}人</span>
          </div>
        </div>

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
    reservations: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update-table-position', 'edit-table', 'delete-table', 'show-reservation-details'],
  data() {
    return {
      draggedTable: null,
      offsetX: 0,
      offsetY: 0,
    };
  },
  methods: {
    getReservationsForTable(table) {
      if (!this.reservations) return [];
      return this.reservations
        .filter(r => r.table === table.name)
        .sort((a, b) => a.time.localeCompare(b.time));
    },
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
  height: 600px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}
.table-card {
  position: absolute;
  cursor: move;
  width: 140px; 
  min-height: 50px;
  display: flex;
  flex-direction: column;
  user-select: none;
  border-radius: 8px;
  background-color: white;
}
.table-card.reserved {
  background-color: #e8f5e9;
  border: 1px solid #a5d6a7;
}
.reservation-item {
  background-color: #ffffff;
  border-radius: 4px;
  font-size: 0.875rem;
}
</style>
