<template>
  <div>
    <div>
      <p>Nombre d'etudiant</p>
    </div>
  </div>
</template>

<script setup>
const currentUser = await $fetch("/api/me");
console.log("currentUser:  -----------------", currentUser);

const listStudent = await $fetch("/api/student/", {
  method: "POST",
  body: { directionId: currentUser.id },
});
console.log("listStudent:  -----------------", listStudent);
</script>
