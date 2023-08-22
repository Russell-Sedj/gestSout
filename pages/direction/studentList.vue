<template>
  <div>
    <div class="flex my-4 flex-wrap">
      <ul>
        <li
          class="flex justify-between border-black border-2 rounded-full my-1 mx-4 px-4 py-2 w-24 cursor-pointer"
          @click="filter = 'tout'"
        >
          Tout
          <input type="radio" name="filter" value="tout" v-model="filter" />
        </li>
        <li
          class="flex justify-between border-black border-2 rounded-full my-1 mx-4 px-4 py-2 w-32 cursor-pointer"
          @click="filter = 'attente'"
        >
          En attente
          <input type="radio" name="filter" value="attente" v-model="filter" />
        </li>
        <li
          class="flex justify-between border-black border-2 rounded-full my-1 mx-4 px-4 py-2 w-28 cursor-pointer"
          @click="filter = 'eligible'"
        >
          Eligible
          <input type="radio" name="filter" value="eligible" v-model="filter" />
        </li>
      </ul>
    </div>
    <!-- Display list of students -->
    <div></div>
  </div>
</template>

<script setup>
const currentUser = await $fetch("/api/me");
if (currentUser.role === "student") {
  navigateTo("/");
}

const filter = ref("tout");

const listStudent = await $fetch("/api/student/", {
  method: "POST",
  body: { directionId: currentUser.id },
});
</script>
