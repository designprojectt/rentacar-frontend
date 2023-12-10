<template>
  <v-layout>
    <app-header :id="1"></app-header>
    <v-main>
      <v-row>
        <v-col v-for="vehicle in vehicles" class="v-col-12 v-col-sm-6 v-col-md-4">
          <rental-card :vehicle="vehicle">
          </rental-card>
        </v-col>
      </v-row>
    </v-main>
  </v-layout>
</template>

<script setup>
import {ref} from "vue";
import RentalCard from "@/views/pages/Home/Components/RentalCard.vue";
import {getAllVehicles} from "@/services/modules/vehicle.module";
import {toastError} from "@/services/toast.service";
import AppHeader from "@/core/Components/AppHeader.vue";

const isLoading = ref(false);

const vehicles = ref([]);

// Fetch vehicles
async function fetchVehicles() {
  isLoading.value = true;
  const response = await getAllVehicles();
  if (response && response.status) {
    vehicles.value = response.data;
  }else {
    toastError("Araç ilanları getirilirken bir hata oluştu.");
  }
  isLoading.value = false;
}

fetchVehicles();
</script>

<style scoped>
</style>
