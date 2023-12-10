<template>
  <v-layout>
    <app-header :id="2"></app-header>
    <v-main>
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
  ></create-vehicle-modal>
</template>

<script setup>
import CreateVehicleModal from "@/views/pages/MyVehicles/Components/CreateVehicleModal.vue";
import {ref} from "vue";
import AppHeader from "@/core/Components/AppHeader.vue";

const isCreateVehicleModalShown = ref(false);
</script>

<style lang="scss" scoped>
</style>