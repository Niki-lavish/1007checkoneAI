<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>訂位表</v-card-title>
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
              <v-card class="mb-4" color="grey-lighten-4" v-for="(reservation, index) in reservations" :key="index">
                <v-list-item>
                  <v-list-item-content>
                    <v-row>
                      <v-col cols="6">
                        <v-list-item-title class="headline">{{ reservation.name }}</v-list-item-title>
                        <v-list-item-subtitle><v-icon small>mdi-phone</v-icon> {{ reservation.phone }}</v-list-item-subtitle>
                      </v-col>
                      <v-col cols="6" class="text-right">
                        <v-list-item-subtitle><v-icon small>mdi-clock</v-icon> {{ reservation.time }}</v-list-item-subtitle>
                        <v-chip color="red" text-color="white" small>桌號: {{ reservation.table }}</v-chip>
                      </v-col>
                    </v-row>
                    <v-row align="center">
                      <v-col cols="6">
                        <v-list-item-subtitle><v-icon small>mdi-account-multiple</v-icon> {{ reservation.adults }}</v-list-item-subtitle>
                      </v-col>
                      <v-col cols="6" class="text-right">
                        <v-btn variant="text"><v-icon>mdi-pencil</v-icon></v-btn>
                        <v-btn variant="text" @click="deleteReservation(index)"><v-icon>mdi-delete</v-icon></v-btn>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-list>
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
                <v-text-field label="時間" append-inner-icon="mdi-clock-outline" readonly variant="outlined" v-model="newReservation.time"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select :items="['A1', 'A2', 'A3', 'B1', 'B2']" label="桌號" variant="outlined" v-model="newReservation.table"></v-select>
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
          <v-btn text @click="dialog = false">取消</v-btn>
          <v-btn color="red" flat @click="saveReservation">儲存</v-btn>
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
      reservations: [
        { name: '王曉明', phone: '0979913380', time: '12:00', table: 'A3', adults: 2, children: 0 },
        { name: '林小美', phone: '0912345678', time: '18:30', table: 'B1', adults: 4, children: 0 },
      ],
      newReservation: {
        name: '',
        phone: '',
        time: '下午 12:00',
        table: null,
        adults: 2,
        children: 0,
      },
    };
  },
  methods: {
    saveReservation() {
      this.reservations.push({ ...this.newReservation });
      this.newReservation = {
        name: '',
        phone: '',
        time: '下午 12:00',
        table: null,
        adults: 2,
        children: 0,
      };
      this.dialog = false;
    },
    deleteReservation(index) {
      this.reservations.splice(index, 1);
    },
  },
};
</script>
