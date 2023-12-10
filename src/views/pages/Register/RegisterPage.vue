<template>
  <div class="register-form">
    <v-sheet
        elevation="12"
        rounded="rounded"
        width="400"
        class="mx-auto my-auto">
      <v-form ref="registerForm" class="pa-8">
        <h2>Register</h2>
        <v-text-field
            v-model="firstName"
            class="mt-6"
            label="Name"
            density="comfortable"
            :clearable="true"
            hide-details="auto"
            :rules="[rules.firstName]"
            prepend-inner-icon="mdi mdi-account"
            @keydown.enter="register">
        </v-text-field>
        <v-text-field
            v-model="lastName"
            class="mt-4"
            label="Last Name"
            density="comfortable"
            :clearable="true"
            hide-details="auto"
            :rules="[rules.lastName]"
            prepend-inner-icon="mdi mdi-account"
            @keydown.enter="register">
        </v-text-field>
        <v-text-field
            v-model="email"
            class="mt-4"
            label="E-Mail Address"
            density="comfortable"
            :clearable="true"
            hide-details="auto"
            :rules="[rules.email]"
            prepend-inner-icon="mdi mdi-email"
            @keydown.enter="register">
        </v-text-field>
        <v-text-field
            v-model="password"
            class="mt-4"
            label="Password"
            density="comfortable"
            :clearable="true"
            hide-details="auto"
            type="password"
            :rules="[rules.password]"
            prepend-inner-icon="mdi mdi-lock"
            @keydown.enter="register">
        </v-text-field>
        <v-btn
            :loading="isLoading"
            class="mt-8"
            color="primary"
            :block="true"
            size="large"
            @click="register">
          REGISTER
        </v-btn>
        <div class="d-flex justify-center mt-4">
          <v-btn variant="text" @click="() => router.push('/login')">
            Already Have an Account? Login.
          </v-btn>
        </div>
      </v-form>
    </v-sheet>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {registerUser} from "@/services/modules/auth.module";
import {toastError, toastSuccess} from "@/services/toast.service";
import router from "@/router";
import errorMessages from "@/core/errorMessages";

const isLoading = ref(false);

const registerForm = ref(null);

const firstName = ref(null);
const lastName = ref(null);
const email = ref(null);
const password = ref(null);

const rules = {
  firstName: value => (value && value.length >= 3 && value.length < 30 || 'Name must be 3-30 characters long.'),
  lastName: value => (value && value.length >= 3 && value.length < 30 || 'Last Name must be 3-30 characters long.'),
  email: value => (value && /^(([a-zA-Z0-9.+*_-]+(\.[a-zA-Z0-9.+*_-]+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) || 'Please enter a valid email address.'),
  password: value => (value && /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(value) || 'Password must at least include 6 characters, 1 letter, 1 number and 1 special character.')
}

async function register() {
  const {valid} = await registerForm.value.validate();
  if (!valid) {
    return;
  }

  isLoading.value = true;
  const model = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value
  }
  const response = await registerUser(model);
  if (response && response.status === 201) {
    toastSuccess("Başarıyla kayıt olundu.");
    await router.push('/');
  }else if (response?.data) {
    toastError(response.data.error.message);
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

.register-form {
  height: 100vh;
  display: flex;
}
</style>
