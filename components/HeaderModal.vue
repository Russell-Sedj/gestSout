<template>
  <div>
    <header
      class="flex justify-between items-center h-20 z-10 font-mono bg-gray-800 text-white"
    >
      <nuxt-link to="/" class="font-bold text-2xl md:text-3xl ml-1"
        >Easy Manager</nuxt-link
      >

      <!-- normal Menu -->
      <ul class="w-auto font-semibold hidden md:flex">
        <li class="mx-2">
          <nuxt-link to="/">Acceuil</nuxt-link>
        </li>
        <li class="mx-2" v-if="loggedIn">
          <button @click="signOut">Deconnexion</button>
        </li>
        <li class="mx-2" v-else>
          <nuxt-link to="/login">Connexion</nuxt-link>
        </li>
        <li class="mx-2">
          <nuxt-link to="/about">A propos</nuxt-link>
        </li>
      </ul>

      <!-- toggle menu -->
      <div class="md:hidden">
        <ToggleMenu />
      </div>
    </header>
  </div>
</template>

<script setup>
const { status, signOut } = useAuth();
const loggedIn = computed(() => status.value === "authenticated");
</script>
