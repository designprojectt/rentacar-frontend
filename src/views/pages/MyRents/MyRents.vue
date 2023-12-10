<template>
  <v-layout style="height: 100vh;">
    <app-header :id="3"></app-header>
    <v-main class="h-100">
      <div class="w-100 h-100 d-flex justify-center align-center">
        You don't have any rental cars yet. You can rent a car in the home page.
      </div>
    </v-main>
  </v-layout>
</template>

<script setup>
import AppHeader from "@/core/Components/AppHeader.vue";
</script>

<style scoped>
</style>