<template>
  <div class="text-xl md:text-2xl">
    <h1 class="m-6 text-2xl md:text-3xl flex justify-center">
      Tableau de bord:
      <strong class="font-bold ml-1">{{ currentUser.university_name }}</strong>
    </h1>
    <div class="flex flex-wrap justify-between m-3">
      <div
        class="transform hover:scale-110 ease-out duration-300 flex justify-center w-2/5 m-4 py-4 md:py-16 md:ml-10 rounded bg-blue-500 text-white"
      >
        <div>
          <p>Etudiants</p>
          <br />
          <p class="flex justify-center">50</p>
        </div>
      </div>
      <div
        class="transform hover:scale-110 ease-out duration-300 flex justify-center w-2/5 m-4 py-4 md:py-16 md:mr-10 rounded bg-green-500 text-white"
      >
        <div>
          <p>Eligibles</p>
          <br />
          <p class="flex justify-center">12</p>
        </div>
      </div>
      <div
        class="transform hover:scale-110 ease-out duration-300 flex justify-center w-2/5 m-4 py-4 md:py-16 md:ml-10 rounded bg-red-500 text-white"
      >
        <div>
          <p>Eligibles</p>
          <br />
          <p class="flex justify-center">12</p>
        </div>
      </div>
      <div
        class="transform hover:scale-110 ease-out duration-300 flex justify-center w-2/5 m-4 py-4 md:py-16 md:mr-10 rounded bg-purple-500 text-white"
      >
        <div>
          <p>Etudiants</p>
          <br />
          <p class="flex justify-center">50</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const currentUser = await $fetch("/api/me");
if (currentUser.role === "student") {
  navigateTo("/");
}

const listStudent = await $fetch("/api/student/", {
  method: "POST",
  body: { directionId: currentUser.id },
});
</script>
