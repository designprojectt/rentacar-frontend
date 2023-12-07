<template>
  <v-card>
    <!-- Car Image -->
    <v-img
        src="https://www.vocaleurope.eu/wp-content/uploads/no-image.jpg"
        height="200px"
        cover
    ></v-img>
    <!-- Car Brand - Car Model -->
    <v-card-title>
      {{vehicle.brand}} {{vehicle.model}} - {{vehicle.year}}
    </v-card-title>
    <!-- Rental Price -->
    <v-card-subtitle>
      {{vehicle.description}}
      <div>
        <v-icon size="small">mdi-cog</v-icon>
        Vites: {{vehicle.isAutomatic ? 'Otomatik' : 'Manuel'}}
      </div>
      <div>
        <v-icon size="small">mdi-calendar</v-icon>
        İlan Tarihi: {{new Date(vehicle.createdAt).toLocaleDateString('tr')}}
      </div>
    </v-card-subtitle>
    <!-- Actions -->
    <v-card-actions>
      <v-btn
          color="primary"
          variant="text" @click="() => {
            isRentModalShown = true;
          }">
        KİRALA
      </v-btn>
      <v-spacer></v-spacer>
      <strong>
        {{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(vehicle.price)}}
      </strong>
    </v-card-actions>
  </v-card>

  <rent-modal
      v-if="isRentModalShown"
      v-model="isRentModalShown"
      :vehicle="vehicle"
      @CloseModalClicked="() => {
        isRentModalShown = false;
      }"
      @RentVehicle="rentVehicle"
  ></rent-modal>
</template>

<script setup>
import {ref} from "vue";
import RentModal from "@/views/pages/Home/Components/RentModal.vue";

defineProps({
  vehicle: Object,
})

const isRentModalShown = ref(false);

function rentVehicle(vehicle) {
  console.log(vehicle);
}
</script>

<style scoped>
</style>