<template>
  <v-layout>
    <app-header :id="2"></app-header>
    <v-main>
      <div v-if="isLoading" class="w-100 h-100 d-flex justify-center align-center">
        <v-progress-circular
            indeterminate
            color="primary"
        ></v-progress-circular>
      </div>
      <div v-else-if="vehicles.length === 0" class="w-100 h-100 d-flex justify-center align-center">
        You don't have any ads yet. You can create one using the '+' icon down below.
      </div>
      <div v-else>
        <v-row>
          <v-col v-for="vehicle in vehicles" class="v-col-12 v-col-sm-6 v-col-md-4">
            <rental-card :vehicle="vehicle" @VehicleDeleted="getAllVehicles">
            </rental-card>
          </v-col>
        </v-row>
      </div>
      <v-fab-transition>
        <v-btn
            class="position-absolute"
            style="right: 24px; bottom: 24px;"
            color="primary"
            elevation="8"
            icon="mdi-plus"
            @click="() => {
              isCreateVehicleModalShown = true;
            }">
        </v-btn>
      </v-fab-transition>
    </v-main>
  </v-layout>

  <create-vehicle-modal
      v-if="isCreateVehicleModalShown"
      v-model="isCreateVehicleModalShown"
      @CloseModalClicked="() => {
        isCreateVehicleModalShown = false;
      }"
      @VehicleCreated="vehicleCreated"
  ></create-vehicle-modal>
</template>

<script setup>
import CreateVehicleModal from "@/views/pages/MyVehicles/Components/CreateVehicleModal.vue";
import {ref} from "vue";
import AppHeader from "@/core/Components/AppHeader.vue";
import {getMyVehicles} from "@/services/modules/vehicle.module";
import {toastError, toastSuccess} from "@/services/toast.service";
import errorMessages from "@/core/errorMessages";
import RentalCard from "@/core/Components/RentalCard.vue";

const isLoading = ref(false);
const vehicles = ref([]);

const isCreateVehicleModalShown = ref(false);

async function getAllVehicles() {
  vehicles.value = [];
  isLoading.value = true;

  const response = await getMyVehicles();
  if (response && response.status === 200) {
    vehicles.value = response.data;
  }else {
    toastError(response.data?.error?.message ?? errorMessages.listingError);
  }
  isLoading.value = false;
}

function vehicleCreated() {
  isCreateVehicleModalShown.value = false;
  toastSuccess("İlan başarıyla oluşturuldu.");
  getAllVehicles();
}

getAllVehicles();
</script>

<style lang="scss" scoped>
.v-layout {
  height: calc(100vh - 128px);
}
</style>