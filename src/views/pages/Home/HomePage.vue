<template>
  <v-row>
    <v-col v-for="vehicle in vehicles" class="v-col-12 v-col-sm-6 v-col-md-4">
      <rental-card :vehicle="vehicle">
      </rental-card>
    </v-col>
  </v-row>
</template>

<script setup>
import {getToken, parseJwt} from "@/services/modules/jwt.service";
import router from "@/router";
import {ref} from "vue";
import RentalCard from "@/views/pages/Home/Components/RentalCard.vue";
import {getAllVehicles} from "@/services/modules/vehicle.module";
import {toastError} from "@/services/toast.service";

const isLoading = ref(false);
const userProfile = ref(null);

const vehicles = ref([]);

const token = getToken();
if (!token) {
  router.push('/login');
}else {
  userProfile.value = parseJwt(token);
}

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