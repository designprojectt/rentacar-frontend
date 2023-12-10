<template>
  <v-app-bar>
    <template v-slot:prepend>
      Rent a Car
    </template>

    <template v-slot:append>
      <v-btn
          :disabled="id === 1"
          variant="text"
          :to="id !== 1 ? `/` : null">
        RENTAL CARS
      </v-btn>
      <v-btn
          v-if="profile !== null"
          :disabled="id === 2"
          variant="text"
          :to="id !== 2 ? `/my-vehicles` : null">
        MY RENTALS
      </v-btn>
      <v-btn
          v-if="profile !== null"
          :disabled="id === 3"
          variant="text"
          :to="id !== 3 ? `/my-rents` : null">
        MY RENTED CARS
      </v-btn>
      <v-btn
          v-if="profile === null"
          variant="text"
          :to="id !== 4 ? `/login` : null">
        LOGIN
      </v-btn>
      <v-btn
          v-if="profile !== null"
          variant="text"
          @click="logout">
        LOG OUT
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
import {ref} from "vue";
import {logoutUser, userProfile} from "@/services/modules/jwt.service";

const props = defineProps({
  id: Number
});

const profile = ref(userProfile());

function logout() {
  logoutUser();
  window.location.reload();
}
</script>

<style>

</style>
