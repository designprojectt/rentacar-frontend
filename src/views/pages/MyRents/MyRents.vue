<template>
  <v-layout >
    <app-header :id="3"></app-header>
    <v-main>
      <div v-if="isLoading" class="w-100 h-100 d-flex justify-center align-center">
        <v-progress-circular
            indeterminate
            color="primary"
        ></v-progress-circular>
      </div>
      <div v-else-if="vehicles.length === 0" class="w-100 h-100 d-flex justify-center align-center">
        You don't have any rent requests yet. You can rent a car in the home page.
      </div>
      <div v-else>
        <v-row>
          <v-col v-for="vehicle in vehicles" class="v-col-12 v-col-sm-6 v-col-md-4">
            <rent-request :vehicle="vehicle">
            </rent-request>
          </v-col>
        </v-row>
      </div>
    </v-main>
  </v-layout>
</template>

<script setup>
import AppHeader from "@/core/Components/AppHeader.vue";
import {ref} from "vue";
import {toastError} from "@/services/toast.service";
import errorMessages from "@/core/errorMessages";
import {getMyRentals} from "@/services/modules/booking.module";
import RentalCard from "@/core/Components/RentalCard.vue";
import RentRequest from "@/views/pages/MyRents/Components/RentRequest.vue";

const isLoading = ref(false);
const vehicles = ref([]);

async function getRentals() {
  vehicles.value = [];
  isLoading.value = true;

  const response = await getMyRentals();
  if (response && response.status === 200) {
    vehicles.value = response.data;
  }else {
    toastError(response.data?.error?.message ?? errorMessages.listingError);
  }
  isLoading.value = false;
}

getRentals();
</script>

<style lang="scss" scoped>
.v-layout {
  height: calc(100vh - 128px);
}
</style>