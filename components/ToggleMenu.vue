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
      class="absolute right-0 z-30 mt-2 w-48 text-lg bg-white rounded-md shadow-xl text-gray-700 font-bold"
      @click.away="isOpen = false"
    >
      <!-- case the user is direction -->
      <div>
        <nuxt-link
          class="block px-4 py-2 hover:bg-gray-100"
          v-if="
            currentUser.role === 'direction' || currentUser.role === 'admin'
          "
          to="/direction"
        >
          Dashboard
        </nuxt-link>

        <nuxt-link
          class="block px-4 py-2 hover:bg-gray-100"
          v-if="
            currentUser.role === 'direction' || currentUser.role === 'admin'
          "
          to="/direction/profilDirection"
        >
          Profil
        </nuxt-link>

        <nuxt-link
          class="block px-4 py-2 hover:bg-gray-100"
          v-if="
            currentUser.role === 'direction' || currentUser.role === 'admin'
          "
          to="/direction/registerStudent"
        >
          Ajouter un etudiant
        </nuxt-link>

        <nuxt-link
          class="block px-4 py-2 hover:bg-gray-100"
          v-if="
            currentUser.role === 'direction' || currentUser.role === 'admin'
          "
          to="/direction/studentList"
        >
          Liste des etudiants
        </nuxt-link>

        <div class="border-t-2 border-gray-300 w-full"></div>
      </div>

      <!-- case the user is student -->
      <div>
        <nuxt-link
          class="block px-4 py-2 hover:bg-gray-100"
          v-if="currentUser.role === 'student' || currentUser.role === 'admin'"
          to="/student"
        >
          Statut
        </nuxt-link>

        <nuxt-link
          class="block px-4 py-2 hover:bg-gray-100"
          v-if="currentUser.role === 'student' || currentUser.role === 'admin'"
          to="/student/profilStudent"
        >
          Profil
        </nuxt-link>
        <div class="border-t-2 border-gray-300 w-full"></div>
      </div>

      <!-- normal menu -->
      <nuxt-link class="block px-4 py-2 hover:bg-gray-100" to="/"
        >Acceuil</nuxt-link
      >

      <nuxt-link
        class="block px-4 py-2 hover:bg-gray-100"
        v-if="loggedIn"
        to="/"
        @click="signOut"
        >Deconnexion</nuxt-link
      >

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

const currentUser = await $fetch("/api/me");
</script>
