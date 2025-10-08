<template>
  <v-container fluid>
    <v-row>
      <!-- Reservation List Column -->
      <v-col cols="3">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>訂位表</span>
            <div class="d-flex align-center">
              <v-btn icon @click="previousDay"><v-icon>mdi-chevron-left</v-icon></v-btn>
              <span>{{ formattedDate }}</span>
              <v-btn icon @click="nextDay"><v-icon>mdi-chevron-right</v-icon></v-btn>
            </div>
          </v-card-title>
          <v-card-text>
            <v-row align="center">
              <v-col cols="8">
                <v-text-field label="搜尋姓名/電話/桌號" hide-details></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-btn color="primary" @click="dialog = true">新增訂位</v-btn>
              </v-col>
            </v-row>
            <v-list class="mt-4" bg-color="transparent">
              <v-card class="mb-4" color="grey-lighten-4" v-for="(reservation, index) in filteredReservations" :key="index">
                <v-list-item>
                  <v-list-item-content>
                     <v-list-item-title class="headline">{{ reservation.name }}</v-list-item-title>
                     <v-list-item-subtitle><v-icon size="small">mdi-phone</v-icon> {{ reservation.phone }}</v-list-item-subtitle>
                     <v-list-item-subtitle><v-icon size="small">mdi-clock</v-icon> {{ reservation.time }}</v-list-item-subtitle>
                     <v-chip color="red" text-color="white" size="small">桌號: {{ reservation.table }}</v-chip>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Seat Map Column -->
      <v-col cols="6">
        <seat-map-grid :tables="tables" :draggable="editMode" @update-table-position="handleUpdateTablePosition"></seat-map-grid>
      </v-col>

      <!-- Control Panel Column -->
      <v-col cols="3">
        <control-panel v-model:edit-mode="editMode"></control-panel>
      </v-col>
    </v-row>

    <!-- Add Reservation Dialog -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span class="headline">新增訂位</span>
          <v-btn icon @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6"><v-text-field label="姓名" v-model="newReservation.name"></v-text-field></v-col>
              <v-col cols="12" sm="6"><v-text-field label="電話" v-model="newReservation.phone"></v-text-field></v-col>
              <v-col cols="12" sm="6"><v-text-field label="時間" v-model="newReservation.time"></v-text-field></v-col>
              <v-col cols="12" sm="6"><v-select :items="tableNames" label="桌號" v-model="newReservation.table"></v-select></v-col>
              <v-col cols="12" sm="6"><v-text-field label="大人" type="number" v-model.number="newReservation.adults"></v-text-field></v-col>
              <v-col cols="12" sm="6"><v-text-field label="小孩" type="number" v-model.number="newReservation.children"></v-text-field></v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">取消</v-btn>
          <v-btn color="primary" @click="saveReservation">儲存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import SeatMapGrid from '../components/SeatMapGrid.vue';
import ControlPanel from '../components/ControlPanel.vue';

export default {
  components: {
    SeatMapGrid,
    ControlPanel,
  },
  data() {
    return {
      dialog: false,
      date: new Date(),
      reservations: [],
      editMode: false,
      tables: [
        { id: 1, name: 'A1', x: 10, y: 10 },
        { id: 2, name: 'A2', x: 110, y: 10 },
        { id: 3, name: 'A3', x: 210, y: 10 },
        { id: 4, name: 'A4', x: 10, y: 110 },
        { id: 5, name: 'A5', x: 110, y: 110 },
        { id: 6, name: 'B1', x: 10, y: 210 },
        { id: 7, name: 'B2', x: 110, y: 210 },
        { id: 8, name: 'B3', x: 210, y: 210 },
        { id: 9, name: 'B4', x: 10, y: 310 },
        { id: 10, name: 'B5', x: 110, y: 310 },
      ],
      newReservation: {
        name: '',
        phone: '',
        time: '12:00',
        table: null,
        adults: 2,
        children: 0,
      },
    };
  },
  computed: {
    formattedDate() {
      const year = this.date.getFullYear();
      const month = this.date.getMonth() + 1;
      const day = this.date.getDate();
      return `${year}年${month}月${day}日`;
    },
    filteredReservations() {
      // This is a simplified filter. You might want to enhance it.
      return this.reservations.sort((a, b) => a.time.localeCompare(b.time));
    },
    tableNames() {
      return this.tables.map(t => t.name);
    }
  },
  methods: {
    previousDay() {
      this.date.setDate(this.date.getDate() - 1);
      this.date = new Date(this.date);
    },
    nextDay() {
      this.date.setDate(this.date.getDate() + 1);
      this.date = new Date(this.date);
    },
    saveReservation() {
      this.reservations.push({ ...this.newReservation, date: this.formattedDate });
      this.newReservation = { name: '', phone: '', time: '12:00', table: null, adults: 2, children: 0 };
      this.dialog = false;
    },
    handleUpdateTablePosition({ tableId, x, y }) {
      const table = this.tables.find(t => t.id === tableId);
      if (table) {
        table.x = x;
        table.y = y;
      }
    },
  },
};
</script>

<style scoped>
.w-100 {
  width: 100%;
}
</style>
