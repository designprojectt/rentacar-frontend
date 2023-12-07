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
                  label="Başlangıç Tarihi"
                  :readonly="true"
                  density="compact"
              ></v-text-field>
            </v-col>
            <v-col class="v-col-12 v-col-sm-6">
              <v-text-field
                  label="Bitiş Tarihi"
                  :readonly="true"
                  density="compact"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn size="small" variant="elevated" color="success" class="mr-1">
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

const emit = defineEmits();

defineProps({
  vehicle: Object,
})

const rentForm = ref(null);
async function rentCar() {
  const {valid} = await rentForm.value.validate();
  if (!valid) {
    return;
  }
  emit('RentVehicle', props.vehicle);
}
</script>

<style scoped>
</style>