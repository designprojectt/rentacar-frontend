<template>
  <h1 v-if="userProfile">Merhaba, {{userProfile.user.firstName}} {{userProfile.user.lastName}}</h1>
</template>

<script setup>
import {getToken, parseJwt} from "@/services/modules/jwt.service";
import router from "@/router";
import {ref} from "vue";

const userProfile = ref(null);

const token = getToken();
if (!token) {
  router.push('/login');
}else {
  userProfile.value = parseJwt(token);
}
</script>

<style scoped>

</style>