<template>

</template>

<script setup>
import {verifyMail} from "@/services/modules/auth.module";
import {toastError, toastSuccess} from "@/services/toast.service";
import errorMessages from "@/core/errorMessages";
import router from "@/router";

const params = new URLSearchParams(window.location.search);
const token = params.get("token");

if (token) {
  const model = {
    verifyToken: token,
  }
  const response = await verifyMail(model);
  if (response && response.status === 200) {
    toastSuccess('E-Mail başarıyla doğrulandı. Giriş yapabilirsiniz.');
    setInterval(async () => {
      //await router.push('login');
    }, 1000);
  } else if (response?.data) {
    toastError(response.data.error.message);
  } else {
    toastError(errorMessages.serverError);
  }
}
</script>

<style>

</style>