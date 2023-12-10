<template>
  <v-dialog max-width="700" :persistent="true">
    <v-form ref="rentForm">
      <v-card>
        <v-card-title>
          <v-icon size="x-small" class="mr-2">
            mdi-car-side
          </v-icon>
          Araç Kirala
        </v-card-title>
        <hr class="ma-0 pa-0"/>
        <v-card-text>
          <v-row>
            <v-col class="v-col-12">
              <div>Lütfen aracı kiralamak istediğiniz tarih aralığını seçiniz:</div>
            </v-col>
            <v-col class="v-col-12 v-col-sm-6">
              <v-text-field
                  v-model="modalItem.startDate"
                  label="Başlangıç Tarihi"
                  :rules="[rules.startDate]"
                  density="compact"
              ></v-text-field>
            </v-col>
            <v-col class="v-col-12 v-col-sm-6">
              <v-text-field
                  v-model="modalItem.endDate"
                  label="Bitiş Tarihi"
                  :rules="[rules.endDate]"
                  density="compact"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn size="small" variant="elevated" color="success" class="mr-1" @click="rentCarClicked">
            <v-icon class="mr-1">mdi-playlist-plus</v-icon>
            Kirala
          </v-btn>
          <v-btn size="small" variant="elevated" color="error" @click="$emit('CloseModalClicked')">
            <v-icon size="small" class="mr-1">mdi-cancel</v-icon>
            Kapat
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import {ref} from "vue";
import {rentCar} from "@/services/modules/booking.module";
import {userProfile} from "@/services/modules/jwt.service";
import {toastError, toastSuccess} from "@/services/toast.service";
import errorMessages from "@/core/errorMessages";

const emit = defineEmits();

const props = defineProps({
  vehicle: Object,
})

const isLoading = ref(false);
const rentForm = ref(null);
const modalItem = ref({});
const profile = ref(userProfile());

function parseDate(value) {
  const parts = value?.split(".");
  const day = parts ? parseInt(parts[0], 10) : null;
  const month = parts ? parseInt(parts[1], 10) : null;
  const year = parts ? parseInt(parts[2], 10) : null;
  return (day && month && year) ? new Date(year, month - 1, day) : null;
}

const rules = {
  startDate: value => {
    return (value && /^\d{2}\.\d{2}\.\d{4}$/.test(value) && parseDate(value) >= new Date() || "Please enter a valid date. (dd.MM.yyyy)")
  },
  endDate: value => (value && /^\d{2}\.\d{2}\.\d{4}$/.test(value) && parseDate(value) >= new Date() && (modalItem.value.startDate && parseDate(value) > parseDate(modalItem.value.startDate)) || "Please enter a valid date. (dd.MM.yyyy)")
}

async function rentCarClicked() {
  const {valid} = await rentForm.value.validate();
  if (!valid) {
    return;
  }

  const model = {
    startDate: parseDate(modalItem.value.startDate).toISOString(),
    endDate: parseDate(modalItem.value.endDate).toISOString(),
    userId: profile.value.id,
    vehicleId: props.vehicle.id,
    totalPrice: props.vehicle.price,
  }
  isLoading.value = true;
  const response = await rentCar(model);
  if (response && response.status === 201) {
    toastSuccess("The car request has been sent successfully.");
    emit("CloseModalClicked");
  }else {
    toastError(response.data?.error?.message ?? errorMessages.rentCarError);
  }
  isLoading.value = false;
}
</script>

<style scoped>
</style>