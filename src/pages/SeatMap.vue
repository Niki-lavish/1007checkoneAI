<template>
  <v-container>
    <v-row>
      <v-col cols="7">
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
                    <v-row>
                      <v-col cols="6">
                        <v-list-item-title class="headline">{{ reservation.name }}</v-list-item-title>
                        <v-list-item-subtitle><v-icon size="small">mdi-phone</v-icon> {{ reservation.phone }}</v-list-item-subtitle>
                      </v-col>
                      <v-col cols="6" class="text-right">
                        <v-list-item-subtitle><v-icon size="small">mdi-clock</v-icon> {{ reservation.time }}</v-list-item-subtitle>
                        <v-chip color="red" text-color="white" size="small">桌號: {{ reservation.table }}</v-chip>
                      </v-col>
                    </v-row>
                    <v-row align="center">
                      <v-col cols="6">
                        <v-list-item-subtitle><v-icon size="small">mdi-account-multiple</v-icon> {{ reservation.adults }}</v-list-item-subtitle>
                      </v-col>
                      <v-col cols="6" class="text-right">
                        <v-btn variant="text"><v-icon>mdi-pencil</v-icon></v-btn>
                        <v-btn variant="text" @click="deleteReservation(reservation)"><v-icon>mdi-delete</v-icon></v-btn>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card>
          <v-card-title>桌位狀態</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6" v-for="table in tableStatuses" :key="table.name">
                <v-card :color="table.reservations.length > 0 ? 'green-lighten-1' : 'surface-variant'" variant="tonal">
                  <v-card-text>
                    <div class="d-flex justify-space-between align-center mb-2">
                      <span class="font-weight-bold">{{ table.name }}</span>
                    </div>
                    <div v-if="table.reservations.length > 0">
                      <v-list-item v-for="res in table.reservations" :key="res.time" class="px-0" density="compact">
                        <div class="d-flex justify-space-between w-100">
                          <span>{{ res.time }}</span>
                          <span>{{ res.adults }}人</span>
                        </div>
                      </v-list-item>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span class="headline">新增訂位</span>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-subtitle>請填寫客人的訂位詳細資訊。</v-card-subtitle>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field label="姓名" required variant="outlined" v-model="newReservation.name"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="電話" required variant="outlined" v-model="newReservation.phone"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-dialog v-model="timeDialog" width="auto">
                  <template v-slot:activator="{ props }">
                    <v-text-field v-bind="props" v-model="newReservation.time" label="時間" append-inner-icon="mdi-clock-outline" readonly variant="outlined"></v-text-field>
                  </template>
                  <v-time-picker v-if="timeDialog" v-model="newReservation.time" format="24hr">
                    <v-btn variant="text" @click="timeDialog = false">取消</v-btn>
                    <v-btn color="primary" @click="timeDialog = false">確定</v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select :items="tables" label="桌號" variant="outlined" v-model="newReservation.table"></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="大人" type="number" variant="outlined" v-model.number="newReservation.adults"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="小孩" type="number" variant="outlined" v-model.number="newReservation.children"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="dialog = false">取消</v-btn>
          <v-btn color="red" variant="flat" @click="saveReservation">儲存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      timeDialog: false,
      date: new Date(),
      reservations: [],
      tables: ['A1', 'A2', 'A3', 'A4', 'A5', 'B1', 'B2', 'B3', 'B4', 'B5'],
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
      return this.reservations.filter(r => r.date === this.formattedDate).sort((a, b) => a.time.localeCompare(b.time));
    },
    tableStatuses() {
      return this.tables.map(table => {
        const reservationsForTable = this.reservations
          .filter(r => r.date === this.formattedDate && r.table === table)
          .sort((a, b) => a.time.localeCompare(b.time));
        return {
          name: table,
          reservations: reservationsForTable,
        };
      });
    },
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
      this.newReservation = {
        name: '',
        phone: '',
        time: '12:00',
        table: null,
        adults: 2,
        children: 0,
      };
      this.dialog = false;
    },
    deleteReservation(reservationToDelete) {
      const index = this.reservations.findIndex(r => r === reservationToDelete);
      if (index > -1) {
        this.reservations.splice(index, 1);
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
