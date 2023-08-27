<template>
  <div>
    <header
      class="flex justify-between items-center h-20 font-mono bg-gray-800 text-white"
    >
      <nuxt-link to="/" class="font-bold text-2xl md:text-3xl ml-1"
        >Easy Manager</nuxt-link
      >

      <!-- normal Menu -->
      <ul class="w-auto font-semibold hidden md:flex">
        <li class="mx-2">
          <nuxt-link to="/">Acceuil</nuxt-link>
        </li>
        <li class="mx-2" v-if="!loggedIn">
          <nuxt-link to="/login">Connexion</nuxt-link>
        </li>
        <li class="mx-2">
          <nuxt-link to="/about">A propos</nuxt-link>
        </li>
        <li class="mx-2" v-if="loggedIn">
          <nuxt-link to="/" @click="signOut">Deconnexion</nuxt-link>
        </li>
      </ul>

      <!-- toggle menu -->
      <div class="md:hidden">
        <ToggleMenu />
      </div>
    </header>
    <div>
      <!-- <div class="mb-3">
        <nuxt-link
          v-if="
            currentUser.role === 'direction' || currentUser.role === 'admin'
          "
          to="/direction"
          class="bg-green-300 hover:bg-green-400 ease-out duration-300 rounded w-auto px-2 py-1 mx-2 relative top-3 md:text-xl"
        >
          Dashboard
        </nuxt-link>
      </div> -->
    </div>
    <div class="hidden md:flex">
      <nuxt-link
        v-if="currentUser.role === 'direction' || currentUser.role === 'admin'"
        to="/direction"
        class="bg-green-300 hover:bg-green-400 ease-out duration-300 rounded w-auto px-2 py-1 mx-2 relative top-3 md:text-xl"
      >
        Dashboard
      </nuxt-link>

      <nuxt-link
        v-if="currentUser.role === 'direction' || currentUser.role === 'admin'"
        to="/direction/profilDirection"
        class="bg-green-300 hover:bg-green-400 ease-out duration-300 rounded w-auto px-2 py-1 mx-2 relative top-3 md:text-xl"
      >
        Profil
      </nuxt-link>

      <nuxt-link
        v-if="currentUser.role === 'direction' || currentUser.role === 'admin'"
        to="/direction/registerStudent"
        class="bg-green-300 hover:bg-green-400 ease-out duration-300 rounded w-auto px-2 py-1 mx-2 relative top-3 md:text-xl"
      >
        Ajouter un etudiant
      </nuxt-link>

      <nuxt-link
        v-if="currentUser.role === 'direction' || currentUser.role === 'admin'"
        to="/direction/studentList"
        class="bg-green-300 hover:bg-green-400 ease-out duration-300 rounded w-auto px-2 py-1 mx-2 relative top-3 md:text-xl"
      >
        List des etudiants
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
const { status, signOut } = useAuth();
const loggedIn = computed(() => status.value === "authenticated");

const currentUser = await $fetch("/api/me");
</script>
