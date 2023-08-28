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

    <!-- double header direction -->
    <div
      v-if="currentUser.role === 'direction' || currentUser.role === 'admin'"
      class="hidden md:flex justify-between h-auto p-3 bg-gray-300"
    >
      <nuxt-link
        v-if="currentUser.role === 'direction' || currentUser.role === 'admin'"
        to="/direction"
        class="hover:bg-gray-700 hover:text-white ease-out duration-300 rounded w-auto px-2 py-1 mx-2 md:text-xl"
      >
        Dashboard
      </nuxt-link>

      <nuxt-link
        v-if="currentUser.role === 'direction' || currentUser.role === 'admin'"
        to="/direction/profilDirection"
        class="hover:bg-gray-700 hover:text-white ease-out duration-300 rounded w-auto px-2 py-1 mx-2 md:text-xl"
      >
        Profil
      </nuxt-link>

      <nuxt-link
        v-if="currentUser.role === 'direction' || currentUser.role === 'admin'"
        to="/direction/registerStudent"
        class="hover:bg-gray-700 hover:text-white ease-out duration-300 rounded w-auto px-2 py-1 mx-2 md:text-xl"
      >
        Ajouter un etudiant
      </nuxt-link>

      <nuxt-link
        v-if="currentUser.role === 'direction' || currentUser.role === 'admin'"
        to="/direction/studentList"
        class="hover:bg-gray-700 hover:text-white ease-out duration-300 rounded w-auto px-2 py-1 mx-2 md:text-xl"
      >
        List des etudiants
      </nuxt-link>
    </div>

    <!-- double header student -->
    <div
      v-if="currentUser.role === 'student' || currentUser.role === 'admin'"
      class="hidden md:flex h-auto p-3 bg-gray-300"
    >
      <nuxt-link
        v-if="currentUser.role === 'student' || currentUser.role === 'admin'"
        to="/student/"
        class="hover:bg-gray-700 hover:text-white ease-out duration-300 rounded w-auto px-2 py-1 mx-2 md:text-xl"
      >
        Statut
      </nuxt-link>
      <nuxt-link
        v-if="currentUser.role === 'student' || currentUser.role === 'admin'"
        to="/student/profilStudent"
        class="hover:bg-gray-700 hover:text-white ease-out duration-300 rounded w-auto px-2 py-1 mx-2 md:text-xl"
      >
        Profil
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
const { status, signOut } = useAuth();
const loggedIn = computed(() => status.value === "authenticated");

const currentUser = await $fetch("/api/me");
</script>
