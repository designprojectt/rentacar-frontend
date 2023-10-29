<template>
  <v-sheet
      elevation="12"
      rounded="rounded"
      width="400"
      class="mx-auto">
    <v-form class="pa-8">
      <h2>Kullanıcı Girişi</h2>
      <v-text-field
          v-model="email"
          class="mt-6"
          label="E-Posta Adresi"
          density="comfortable"
          :clearable="true"
          hide-details="auto"
          :rules="[value => !!value || 'E-Posta Adresi Boş Bırakılamaz']"
          prepend-inner-icon="mdi mdi-account">
      </v-text-field>
      <v-text-field
          v-model="password"
          class="mt-4"
          label="Parola"
          density="comfortable"
          :clearable="true"
          hide-details="auto"
          type="password"
          :rules="[value => !!value || 'Parola Boş Bırakılamaz']"
          prepend-inner-icon="mdi mdi-lock">
      </v-text-field>
      <v-btn
          :loading="isLoading"
          class="mt-8"
          color="primary"
          :block="true"
          size="large"
          @click="login">
        Giriş Yap
      </v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup>
import {ref} from "vue";
import router from "@/router";

const isLoading = ref(false);

const email = ref(null);
const password = ref(null);

function login() {
  isLoading.value = true;
  setTimeout(() => {
    router.push('/');
  }, 2000);

}

</script>

<style scoped>

</style>