<template>
  <div class="login-container">
    <v-sheet
        elevation="12"
        rounded="rounded"
        width="400"
        class="mx-auto my-auto">
      <v-form ref="loginForm" class="pa-8">
        <h2>User Login</h2>
        <v-text-field
            v-model="email"
            class="mt-6"
            label="E-Mail Address"
            density="comfortable"
            :clearable="true"
            hide-details="auto"
            :rules="[value => !!value || 'E-Mail Address Must Be Entered.']"
            prepend-inner-icon="mdi mdi-account">
        </v-text-field>
        <v-text-field
            v-model="password"
            class="mt-4"
            label="Password"
            density="comfortable"
            :clearable="true"
            hide-details="auto"
            type="password"
            :rules="[value => !!value || 'Password Must Be Entered.']"
            prepend-inner-icon="mdi mdi-lock"
            @keydown.enter="login">
        </v-text-field>
        <v-btn
            :loading="isLoading"
            class="mt-8"
            color="primary"
            :block="true"
            size="large"
            @click="login">
          LOGIN
        </v-btn>
        <div class="d-flex justify-center mt-4">
          <v-btn variant="text" @click="() => router.push('/register')">
            You Don't Have an Account? Register.
          </v-btn>
        </div>
      </v-form>
    </v-sheet>
  </div>
</template>

<script setup>
import {ref} from "vue";
import router from "@/router";
import {loginUser} from "@/services/modules/auth.module";
import {toastError, toastSuccess} from "@/services/toast.service";
import {saveToken} from "@/services/modules/jwt.service";
import errorMessages from "@/core/errorMessages";

const isLoading = ref(false);

const loginForm = ref(null);
const email = ref(null);
const password = ref(null);

async function login() {
  const {valid} = await loginForm.value.validate();
  if (!valid) {
    return;
  }

  isLoading.value = true;
  const model = {
    email: email.value,
    password: password.value
  }
  const response = await loginUser(model);
  if (response && response.status === 200) {
    toastSuccess("You have successfully logged in.");
    saveToken(response.data.token);
    await router.push('/');
  }else if (response?.data) {
    if (response?.data?.error) {
      toastError(response.data.error.message);
    }else {
      response.data.details.forEach(e => {
        toastError(e.message);
      });
    }
  }else {
    toastError(errorMessages.serverError);
  }
  isLoading.value = false;
}

</script>

<style>
#app {
  padding: 0 !important;
}

.login-container {
  height: 100vh;
  display: flex;
}
</style>
