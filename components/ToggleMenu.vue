<template>
  <div class="relative">
    <button @click="isOpen = !isOpen">
      <div class="flex">
        <div class="bg-gray-600 w-2 h-2 m-1 rounded-full"></div>
        <div class="bg-gray-600 w-2 h-2 m-1 rounded-full"></div>
        <div class="bg-gray-600 w-2 h-2 m-1 rounded-full"></div>
      </div>
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 z-20 mt-2 w-48 text-lg bg-white rounded-md shadow-xl text-gray-700 font-bold"
      @click.away="isOpen = false"
    >
      <nuxt-link class="block px-4 py-2 hover:bg-gray-100" to="/"
        >Acceuil</nuxt-link
      >
      <button
        class="block px-4 py-2 hover:bg-gray-100"
        @click="signOut"
        v-if="loggedIn"
      >
        Deconnexion
      </button>
      <nuxt-link class="block px-4 py-2 hover:bg-gray-100" to="/login" v-else
        >Connexion</nuxt-link
      >
      <nuxt-link class="block px-4 py-2 hover:bg-gray-100" to="/about"
        >A propos</nuxt-link
      >
    </div>
  </div>
</template>

<script setup>
const { signOut, status } = useAuth();
const loggedIn = computed(() => status.value === "authenticated");
const isOpen = ref(false);
</script>
