<template>
  <div>
    <p>Deconnexion en cours...</p>
    <p>
      Vous allez être deconnecté. Si ce n'est pas le cas, cliquez
      <span class="text-blue-500" to="logout">ici</span>.
    </p>
  </div>
</template>

<script setup>
const { signOut } = useAuth();

const logout = async () => {
  await signOut();
  window.location.href = "/";
};

onMounted(() => {
  logout();
});
</script>
