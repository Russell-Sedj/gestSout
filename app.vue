<template>
  <div>
    <NuxtLayout>
      <!-- <div class="flex justify-end w-full" @click="signOut()" v-if="loggedIn">
        <button class="bg-gray-300 hover:bg-gray-400 rounded-b-xl p-2">
          Deconnexion
        </button>
      </div> -->
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// const { status, signOut } = useAuth();
// const loggedIn = computed(() => status.value === "authenticated");
</script>
