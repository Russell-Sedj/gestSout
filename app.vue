<template>
  <div>
    <NuxtLayout>
      <button class="bg-slate-500" @click="signOut()" v-if="loggedIn">
        Deconnexion
      </button>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const { status, signOut } = useAuth();
const loggedIn = computed(() => status.value === "authenticated");
</script>
