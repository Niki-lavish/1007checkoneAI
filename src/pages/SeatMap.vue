<template>
  <v-container fluid>
    <!-- Floor Selection -->
    <v-row>
      <v-col>
        <v-tabs v-model="currentFloorId">
          <v-tab v-for="floor in floors" :key="floor.id" :value="floor.id">
            {{ floor.name }}
            <v-btn
              v-if="editMode"
              icon
              size="x-small"
              variant="text"
              @click.stop.prevent="openEditFloorDialog(floor)"
              class="ml-2"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>

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
                <v-text-field
                  label="搜尋姓名/電話/桌號"
                  hide-details
                  v-model="searchQuery"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-btn color="primary" @click="openReservationDialog">新增訂位</v-btn>
              </v-col>
            </v-row>

            <!-- Reservations List -->
            <v-list class="mt-4" bg-color="transparent" v-if="filteredReservations.length > 0">
              <v-card
                class="mb-4"
                variant="outlined"
                v-for="reservation in filteredReservations"
                :key="reservation.id"
              >
                <v-card-text class="pa-3">
                  <v-row no-gutters align="start">
                    <v-col cols="6">
                      <div class="text-h6 font-weight-bold">{{ reservation.name }}</div>
                      <div class="text-body-2 text-grey-darken-1"><v-icon size="small">mdi-phone-outline</v-icon> {{ reservation.phone }}</div>
                    </v-col>
                    <v-col cols="6" class="text-right">
                      <div class="text-h6"><v-icon size="small">mdi-clock-outline</v-icon> {{ reservation.time }}</div>
                      <v-chip color="red-lighten-5" text-color="red-darken-4" size="small" class="mt-1 font-weight-bold">桌號: {{ reservation.table }}</v-chip>
                    </v-col>
                  </v-row>
                  <v-divider class="my-2"></v-divider>
                  <v-row no-gutters align="center">
                    <v-col cols="6">
                      <div class="text-h6 font-weight-bold"><v-icon>mdi-account-group-outline</v-icon> {{ reservation.adults + reservation.children }}</div>
                    </v-col>
                    <v-col cols="6" class="text-right">
                      <v-btn icon="mdi-pencil-outline" variant="text" size="small" @click="openEditReservationDialog(reservation)"></v-btn>
                      <v-btn icon="mdi-trash-can-outline" variant="text" size="small" color="error" @click="openDeleteReservationDialog(reservation)"></v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-list>

            <!-- No Reservations Message -->
            <v-alert v-else class="mt-4" type="info" variant="tonal">
              今日尚無訂位
            </v-alert>

          </v-card-text>
        </v-card>
      </v-col>

      <!-- Seat Map Column -->
      <v-col cols="6">
        <seat-map-grid
          :tables="tables"
          :draggable="editMode"
          @update-table-position="handleUpdateTablePosition"
          @edit-table="openEditTableDialog"
          @delete-table="handleDeleteTable"
        ></seat-map-grid>
      </v-col>

      <!-- Control Panel Column -->
      <v-col cols="3">
        <control-panel
          v-model:edit-mode="editMode"
          @add-floor="addFloor"
          @delete-floor="deleteFloor"
          @add-table="addTable"
          @align-to-grid="alignToGrid"
        ></control-panel>
      </v-col>
    </v-row>

    <!-- Add/Edit Reservation Dialog -->
    <v-dialog v-model="dialog" max-width="500px" persistent>
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span class="headline">{{ formTitle }}</span>
          <v-btn icon @click="closeReservationDialog"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="reservationForm">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <div class="text-subtitle-1 font-weight-medium mb-2">姓名</div>
                  <v-text-field v-model="newReservation.name" variant="outlined" density="compact" placeholder="請輸入姓名"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="text-subtitle-1 font-weight-medium mb-2">電話</div>
                  <v-text-field
                    v-model="phoneProxy"
                    :rules="phoneRules"
                    variant="outlined"
                    density="compact"
                    placeholder="請輸入 09 開頭的電話號碼"
                    counter
                    type="tel"
                    maxlength="10"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="text-subtitle-1 font-weight-medium mb-2">時間</div>
                  <v-row dense>
                    <v-col cols="6">
                      <v-select
                        :items="hourSlots"
                        v-model="newReservation.hour"
                        variant="outlined"
                        density="compact"
                        placeholder="小時"
                      ></v-select>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        :items="minuteSlots"
                        v-model="newReservation.minute"
                        variant="outlined"
                        density="compact"
                        placeholder="分鐘"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="text-subtitle-1 font-weight-medium mb-2">桌號</div>
                  <v-select :items="tableNames" v-model="newReservation.table" variant="outlined" density="compact" placeholder="請選擇桌號"></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="text-subtitle-1 font-weight-medium mb-2">大人</div>
                  <v-text-field type="number" v-model.number="newReservation.adults" variant="outlined" density="compact" placeholder="請輸入人數"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="text-subtitle-1 font-weight-medium mb-2">小孩</div>
                  <v-text-field type="number" v-model.number="newReservation.children" variant="outlined" density="compact" placeholder="請輸入人數"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeReservationDialog">取消</v-btn>
          <v-btn color="primary" @click="saveReservation">儲存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Reservation Confirmation Dialog -->
    <v-dialog v-model="deleteReservationConfirmDialog" max-width="400px">
      <v-card>
        <v-card-title class="headline">確認刪除</v-card-title>
        <v-card-text>
          確定要刪除「{{ reservationToDelete ? reservationToDelete.name : '' }}」的訂位嗎？此動作無法復原。
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="cancelDeleteReservation">取消</v-btn>
          <v-btn color="error" text @click="executeDeleteReservation">刪除</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Table Dialog -->
    <v-dialog v-model="editTableDialog" max-width="300px">
      <v-card>
        <v-card-title>編輯桌號</v-card-title>
        <v-card-text>
          <v-text-field label="桌號" v-model="editedTableName"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="editTableDialog = false">取消</v-btn>
          <v-btn color="primary" @click="saveTableName">儲存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Floor Dialog -->
    <v-dialog v-model="editFloorDialog" max-width="300px">
      <v-card>
        <v-card-title>編輯樓層名稱</v-card-title>
        <v-card-text>
          <v-text-field label="樓層名稱" v-model="editedFloorName"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="editFloorDialog = false">取消</v-btn>
          <v-btn color="primary" @click="saveFloorName">儲存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Floor Confirmation Dialog -->
    <v-dialog v-model="deleteFloorConfirmDialog" max-width="400px">
      <v-card>
        <v-card-title class="headline">確認刪除</v-card-title>
        <v-card-text>
          確定要刪除「{{ currentFloor ? currentFloor.name : '' }}」樓層嗎？此動作無法復原。
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="deleteFloorConfirmDialog = false">取消</v-btn>
          <v-btn color="error" text @click="executeDeleteFloor">刪除</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <!-- Delete Table Confirmation Dialog -->
    <v-dialog v-model="deleteTableConfirmDialog" max-width="400px">
      <v-card>
        <v-card-title class="headline">確認刪除</v-card-title>
        <v-card-text>
          確定要刪除「{{ tableToDelete ? tableToDelete.name : '' }}」桌位嗎？此動作無法復原。
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="cancelDeleteTable">取消</v-btn>
          <v-btn color="error" text @click="executeDeleteTable">刪除</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Minimum Floor Warning Dialog -->
    <v-dialog v-model="minFloorWarningDialog" max-width="400px">
      <v-card>
        <v-card-title class="headline">無法刪除</v-card-title>
        <v-card-text>
          至少需要保留一個樓層。
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="minFloorWarningDialog = false">確認</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Duplicate Table Name Warning Dialog -->
    <v-dialog v-model="duplicateNameWarningDialog" max-width="400px">
      <v-card>
        <v-card-title class="headline">名稱重複</v-card-title>
        <v-card-text>
          已有相同的桌號存在，請使用其他名稱。
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="duplicateNameWarningDialog = false">確認</v-btn>
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
      editTableDialog: false,
      editFloorDialog: false,
      deleteFloorConfirmDialog: false,
      deleteTableConfirmDialog: false,
      deleteReservationConfirmDialog: false,
      minFloorWarningDialog: false,
      duplicateNameWarningDialog: false,
      date: new Date(),
      reservations: [],
      editMode: false,
      searchQuery: '',
      currentFloorId: '1F',
      floors: [
        {
          id: '1F',
          name: '一樓',
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
        },
        {
          id: '2F',
          name: '二樓',
          tables: [
            { id: 101, name: 'C1', x: 10, y: 10 },
            { id: 102, name: 'C2', x: 110, y: 10 },
          ],
        },
      ],
      hourSlots: ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'],
      minuteSlots: ['00', '10', '20', '30', '40', '50'],
      phoneRules: [
        v => !!v || '電話為必填欄位',
        v => /^09\d{8}$/.test(v) || '格式不符，請輸入 09 開頭的 10 位數字',
      ],
      newReservation: {
        id: null, // Add id for editing
        name: '',
        phone: '',
        hour: '12',
        minute: '00',
        table: null,
        adults: 2,
        children: 0,
      },
      editedReservation: null,
      reservationToDelete: null,
      gridSize: 100, // 90 (table width) + 10 (gap)
      nextTableId: 103, // Keep track of the next available table ID
      nextFloorId: 3, // Keep track of the next available floor ID
      nextReservationId: 1, // Keep track of the next available reservation ID
      editedTable: null,
      editedTableName: '',
      editedFloor: null,
      editedFloorName: '',
      tableToDelete: null,
    };
  },
  computed: {
    formTitle() {
      return this.editedReservation ? '編輯訂位' : '新增訂位';
    },
    phoneProxy: {
      get() {
        return this.newReservation.phone;
      },
      set(val) {
        const digits = val.replace(/\D/g, '');
        this.newReservation.phone = digits.slice(0, 10);
      },
    },
    currentFloor() {
      return this.floors.find(f => f.id === this.currentFloorId);
    },
    tables() {
      return this.currentFloor ? this.currentFloor.tables : [];
    },
    formattedDate() {
      const year = this.date.getFullYear();
      const month = this.date.getMonth() + 1;
      const day = this.date.getDate();
      return `${year}年${month}月${day}日`;
    },
    filteredReservations() {
      const query = this.searchQuery.toLowerCase().trim();
      const dateFiltered = this.reservations.filter(reservation => reservation.date === this.formattedDate);

      if (!query) {
        return dateFiltered.sort((a, b) => a.time.localeCompare(b.time));
      }

      const searchFiltered = dateFiltered.filter(reservation => {
        const nameMatch = reservation.name.toLowerCase().includes(query);
        const phoneMatch = reservation.phone.includes(query);
        const tableMatch = reservation.table.toLowerCase().includes(query);
        return nameMatch || phoneMatch || tableMatch;
      });

      return searchFiltered.sort((a, b) => a.time.localeCompare(b.time));
    },
    tableNames() {
      return this.tables.map(t => t.name);
    }
  },
  methods: {
    openReservationDialog() {
      this.editedReservation = null;
      this.dialog = true;
    },
    openEditReservationDialog(reservation) {
      this.editedReservation = reservation;
      // Copy reservation data to newReservation for editing
      const [hour, minute] = reservation.time.split(':');
      this.newReservation = { 
        ...reservation,
        hour,
        minute,
      };
      this.dialog = true;
    },
    closeReservationDialog() {
      this.dialog = false;
      this.$nextTick(() => {
        this.$refs.reservationForm.resetValidation();
        this.newReservation = { id: null, name: '', phone: '', hour: '12', minute: '00', table: null, adults: 2, children: 0 };
        this.editedReservation = null;
      });
    },
    openDeleteReservationDialog(reservation) {
      this.reservationToDelete = reservation;
      this.deleteReservationConfirmDialog = true;
    },
    cancelDeleteReservation() {
      this.deleteReservationConfirmDialog = false;
      this.reservationToDelete = null;
    },
    executeDeleteReservation() {
      const index = this.reservations.findIndex(r => r.id === this.reservationToDelete.id);
      if (index !== -1) {
        this.reservations.splice(index, 1);
      }
      this.cancelDeleteReservation();
    },
    previousDay() {
      this.date.setDate(this.date.getDate() - 1);
      this.date = new Date(this.date);
    },
    nextDay() {
      this.date.setDate(this.date.getDate() + 1);
      this.date = new Date(this.date);
    },
    async saveReservation() {
      const { valid } = await this.$refs.reservationForm.validate();
      if (!valid) return;

      const reservationData = {
        ...this.newReservation,
        time: `${this.newReservation.hour}:${this.newReservation.minute}`,
        date: this.formattedDate,
      };
      delete reservationData.hour;
      delete reservationData.minute;

      if (this.editedReservation) {
        // Update existing reservation
        const index = this.reservations.findIndex(r => r.id === this.editedReservation.id);
        if (index !== -1) {
          this.reservations.splice(index, 1, reservationData);
        }
      } else {
        // Add new reservation
        reservationData.id = this.nextReservationId++;
        this.reservations.push(reservationData);
      }
      this.closeReservationDialog();
    },
    handleUpdateTablePosition({ tableId, x, y }) {
      const table = this.tables.find(t => t.id === tableId);
      if (table) {
        table.x = x;
        table.y = y;
      }
    },
    addTable() {
      if (!this.currentFloor) return;

      let newName = `T${this.nextTableId}`;
      let isDuplicate = this.floors.some(floor => floor.tables.some(table => table.name === newName));

      while (isDuplicate) {
        this.nextTableId++;
        newName = `T${this.nextTableId}`;
        isDuplicate = this.floors.some(floor => floor.tables.some(table => table.name === newName));
      }

      const newTable = {
        id: this.nextTableId,
        name: newName,
        x: 10,
        y: 10,
      };
      
      this.currentFloor.tables.push(newTable);
      this.nextTableId++; // Ensure next ID is fresh
    },
    alignToGrid() {
      this.tables.forEach(table => {
        table.x = Math.round(table.x / this.gridSize) * this.gridSize + 10; // +10 for the initial offset
        table.y = Math.round(table.y / this.gridSize) * this.gridSize + 10; // +10 for the initial offset
      });
    },
    openEditTableDialog(table) {
      this.editedTable = table;
      this.editedTableName = table.name;
      this.editTableDialog = true;
    },
    saveTableName() {
      if (!this.editedTable) return;

      const newName = this.editedTableName.trim();
      if (!newName) return; // Prevent saving empty names

      // Check for duplicates across ALL floors, excluding the table being edited
      const isDuplicate = this.floors.some(floor => 
        floor.tables.some(table => 
          table.id !== this.editedTable.id && table.name === newName
        )
      );

      if (isDuplicate) {
        this.duplicateNameWarningDialog = true;
        return;
      }

      this.editedTable.name = newName;
      this.editTableDialog = false;
      this.editedTable = null;
      this.editedTableName = '';
    },
    handleDeleteTable(tableId) {
      this.tableToDelete = this.tables.find(t => t.id === tableId);
      if (this.tableToDelete) {
        this.deleteTableConfirmDialog = true;
      }
    },
    executeDeleteTable() {
      if (this.currentFloor && this.tableToDelete) {
        const index = this.currentFloor.tables.findIndex(t => t.id === this.tableToDelete.id);
        if (index !== -1) {
          this.currentFloor.tables.splice(index, 1);
        }
      }
      this.cancelDeleteTable();
    },
    cancelDeleteTable() {
      this.deleteTableConfirmDialog = false;
      this.tableToDelete = null;
    },
    openEditFloorDialog(floor) {
      this.editedFloor = floor;
      this.editedFloorName = floor.name;
      this.editFloorDialog = true;
    },
    saveFloorName() {
      if (this.editedFloor) {
        this.editedFloor.name = this.editedFloorName;
      }
      this.editFloorDialog = false;
      this.editedFloor = null;
      this.editedFloorName = '';
    },
    addFloor() {
      const newFloorId = `${this.nextFloorId++}F`;
      this.floors.push({
        id: newFloorId,
        name: '新樓層',
        tables: [],
      });
      this.currentFloorId = newFloorId;
    },
    deleteFloor() {
      if (this.floors.length <= 1) {
        this.minFloorWarningDialog = true;
        return;
      }
      this.deleteFloorConfirmDialog = true;
    },
    executeDeleteFloor() {
      this.deleteFloorConfirmDialog = false;
      const index = this.floors.findIndex(f => f.id === this.currentFloorId);
      if (index !== -1) {
        this.floors.splice(index, 1);
        if (this.floors.length > 0) {
          this.currentFloorId = this.floors[Math.max(0, index - 1)].id;
        } else {
          this.currentFloorId = null;
        }
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
