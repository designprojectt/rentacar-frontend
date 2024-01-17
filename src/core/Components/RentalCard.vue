<template>
  <v-card>
    <!-- Car Image -->
    <v-img
        :src="vehicle.VehiclePhotos.length > 0 ? vehicle.VehiclePhotos[0].Photo.url : placeholderImage"
        height="300px"
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
        Transmission: {{vehicle.isAutomatic ? 'Automatic' : 'Manual'}}
      </div>
      <div>
        <v-icon size="small">mdi-calendar</v-icon>
        Created At: {{new Date(vehicle.createdAt).toLocaleDateString('tr')}}
      </div>
    </v-card-subtitle>
    <!-- Actions -->
    <v-card-actions>
      <strong class="ml-2">
        {{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(vehicle.price)}}
      </strong>
      <v-spacer></v-spacer>
      <!-- Rent Button -->
      <v-btn
          v-if="profile?.id !== vehicle.userId"
          color="primary"
          variant="text"
          @click="rentVehicleClicked">
        KİRALA
      </v-btn>
      <!-- Delete Button -->
      <v-btn
          v-else
          color="error"
          variant="text"
          @click="deleteVehicleAd">
        İLANI KALDIR
      </v-btn>
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
import {deleteVehicle} from "@/services/modules/vehicle.module";
import {toastError} from "@/services/toast.service";
import errorMessages from "@/core/errorMessages";
import router from "@/router";
import {userProfile} from "@/services/modules/jwt.service";

const emit = defineEmits();

const props = defineProps({
  vehicle: Object,
})

const profile = ref(userProfile());

const placeholderImage = ref("https://www.vocaleurope.eu/wp-content/uploads/no-image.jpg");
const isRentModalShown = ref(false);

function rentVehicle(vehicle) {
  console.log(vehicle);
}

function rentVehicleClicked() {
  if (profile) {
    isRentModalShown.value = true;
  }else {
    router.push('/login');
  }
}

async function deleteVehicleAd() {
  const response = await deleteVehicle(props.vehicle.id);
  if (response && response.status === 200) {
    emit("VehicleDeleted");
  }else {
    toastError(response.data?.error?.message ?? errorMessages.deleteError);
  }
}
</script>

<style scoped>
</style>