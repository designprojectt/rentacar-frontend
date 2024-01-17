<template>
  <v-card>
    <v-card-title>
      {{vehicle.Vehicle.brand}} {{vehicle.Vehicle.model}} - {{vehicle.Vehicle.year}}
    </v-card-title>
    <hr/>
    <v-card-text>
      <v-row>
        <v-col class="v-col-12">
          {{vehicle.Vehicle.description}}
        </v-col>
        <v-col class="v-col-12">
          <div>
            <v-icon>mdi-calendar</v-icon>
            Start Date:
            {{new Date(vehicle.startDate).toLocaleDateString()}}
          </div>
          <div>
            <v-icon>mdi-calendar-today</v-icon>
            End Date:
            {{new Date(vehicle.endDate).toLocaleDateString()}}
          </div>
        </v-col>
        <v-col class="v-col-12">
          <div>
            <v-icon size="small">mdi-cog</v-icon>
            Transmission: {{vehicle.isAutomatic ? 'Automatic' : 'Manual'}}
          </div>
        </v-col>
        <v-col class="v-col-12">
          <div>
            Price:
            <strong class="ml-2">
              {{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(vehicle.totalPrice)}}
            </strong>
          </div>
          <div>
            Status: <span :style="`color: ${statusCodes[vehicle.status].color}`">{{statusCodes[vehicle.status].title}}</span>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <hr/>
    <v-card-actions>
      <!-- Reject Button -->
      <v-btn
          color="error"
          variant="text"
          @click="() => {}">
        Reject
      </v-btn>
      <v-spacer></v-spacer>
      <!-- Approve Button -->
      <v-btn
          color="primary"
          variant="text"
          @click="() => {}">
        Approve
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
  vehicle: Object,
})

const statusCodes = ref({
  PENDING: {
    title: "Pending",
    color: "orange"
  },
  APPROVED: {
    title: "Approved",
    color: "limegreen"
  },
  REJECTED: {
    title: "Rejected",
    color: "red"
  }
});
</script>

<style>

</style>