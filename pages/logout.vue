<template>
  <div>
    <p>Deconnexion en cours...</p>
    <p>
      Vous allez être redirigé vers la page de connexion. Si ce n'est pas le
      cas, cliquez <nuxt-link class="text-blue-500" to="/login">ici</nuxt-link>.
    </p>
  </div>
</template>

<script setup>
onMounted(() => {
  const { signOut } = useAuth();
  signOut();
  setTimeout(() => {
    window.location.href = "/login";
  }, 1000);
});
</script>
