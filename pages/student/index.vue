<template>
  <div class="flex items-center justify-center my-6">
    <div class="w-4/5 md:w-3/5">
      <h1 class="text-2xl md:text-3xl mb-6">
        Bienvenue, {{ currentUser.firstname }} {{ currentUser.lastname }}
      </h1>
      <div class="text-xl">
        <div class="flex justify-between">
          <p>Filiere</p>
          <p>{{ currentUser.field }}</p>
        </div>
        <div class="flex justify-between">
          <p>Maitre Memoire</p>
          <p>{{ currentUser.master }}</p>
        </div>
        <div>
          <p>Maitre de Stage</p>
          <p>{{ currentUser.internMaster }}</p>
        </div>
        <div>
          <p>Sujet de Memoire</p>
          <p>{{ currentUser.subject }}</p>
        </div>
        <div>
          <p>PV</p>
          <p>{{ currentUser.appreciation }}</p>
        </div>
        <div>
          <p>Date de presentation</p>
          <p>{{ currentUser.presentation_date }}</p>
        </div>
        <div>
          <p>Salle de presentation</p>
          <p>{{ currentUser.presentation_room }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const currentUser = await $fetch("/api/me");

currentUser;
</script>
