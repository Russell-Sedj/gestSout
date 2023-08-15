<template>
  <div>
    <input type="text" placeholder="email" v-model="email" />
    <input type="text" placeholder="password" v-model="password" />
    <button
      @click="
        signIn('credentials', {
          email: emailStudent,
          password: passwordStudent,
        })
      "
    >
      OK
    </button>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup>
const emailStudent = ref("");
const passwordStudent = ref("");

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});
const { signIn, signOut } = useAuth();

const logout = async () => {
  await signOut();
};
</script>
