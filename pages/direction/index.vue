<template>
  <div>
    <div class="mt-3 md:mt-0 md:text-lg font-medium">
      <nuxt-link
        class="mx-2 px-2 py-1 bg-green-300 rounded md:rounded-b"
        to="importStudent"
        >Importer Etudiants</nuxt-link
      >
      <nuxt-link
        class="mx-2 px-2 py-1 bg-green-300 rounded md:rounded-b"
        to="exportStudent"
        >Exporter Etudiants</nuxt-link
      >
    </div>
    <div class="text-xl md:text-2xl">
      <h1 class="m-6 text-2xl md:text-3xl flex justify-center">
        Tableau de bord:
        <strong v-if="currentUser" class="font-bold ml-1">{{
          currentUser.university_name
        }}</strong>
        <strong v-else class="font-bold ml-1">???</strong>
      </h1>

      <div class="flex flex-wrap justify-between m-3">
        <nuxt-link
          :to="{
            path: '/direction/studentList',
            query: {
              filterValue: 'all',
            },
          }"
          class="transform hover:scale-110 ease-out duration-300 flex justify-center w-2/5 m-4 py-4 md:py-16 md:ml-10 rounded bg-blue-500 text-white"
        >
          <div>
            <p>Etudiants</p>
            <br />
            <p class="flex justify-center">
              {{ studentList ? studentList.length : "Chargement..." }}
            </p>
          </div>
        </nuxt-link>

        <nuxt-link
          :to="{
            path: '/direction/studentList',
            query: {
              filterValue: 'enCours',
            },
          }"
          class="transform hover:scale-110 ease-out duration-300 flex justify-center w-2/5 m-4 py-4 md:py-16 md:mr-10 rounded bg-green-500 text-white"
        >
          <div>
            <p>En cours</p>
            <br />
            <p class="flex justify-center">
              {{ inProgressList ? inProgressList.length : "Chargement..." }}
            </p>
          </div>
        </nuxt-link>

        <nuxt-link
          :to="{
            path: '/direction/studentList',
            query: {
              filterValue: 'eligible',
            },
          }"
          class="transform hover:scale-110 ease-out duration-300 flex justify-center w-2/5 m-4 py-4 md:py-16 md:ml-10 rounded bg-red-500 text-white"
        >
          <div>
            <p>Eligibles</p>
            <br />
            <p class="flex justify-center">
              {{ eligibleList ? eligibleList.length : "Chargement..." }}
            </p>
          </div>
        </nuxt-link>

        <nuxt-link
          :to="{
            path: '/direction/studentList',
            query: {
              filterValue: 'termine',
            },
          }"
          class="transform hover:scale-110 ease-out duration-300 flex justify-center w-2/5 m-4 py-4 md:py-16 md:mr-10 rounded bg-purple-500 text-white"
        >
          <div>
            <p>Terminés</p>
            <br />
            <p class="flex justify-center">
              {{ finishedList ? finishedList.length : "Chargement..." }}
            </p>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const currentUser = ref(null);
currentUser.value = await $fetch("/api/me");

// if (currentUser.value.role === "student") {
//   await navigateTo("/");
// }

const runtimeConfig = useRuntimeConfig();
const currentYear = runtimeConfig.public.currentYear;

const studentList = ref(null);
studentList.value = (
  await $fetch("/api/student/", {
    method: "POST",
    body: { listDirectionId: currentUser.value.id, year: currentYear },
  })
).request;

const eligibleList = ref(null);
const inProgressList = ref(null);
const finishedList = ref(null);

onMounted(() => {
  eligibleList.value = studentList.value.filter(
    (student) =>
      student.is_ready_for_presentation &&
      !student.is_presentation_finished &&
      !student.final_decision &&
      !student.case_closed
  );

  inProgressList.value = studentList.value.filter(
    (student) =>
      !student.is_ready_for_presentation &&
      !student.is_presentation_finished &&
      !student.final_decision &&
      !student.case_closed
  );

  finishedList.value = studentList.value.filter(
    (student) =>
      (student.final_decision || student.case_closed) &&
      student.is_presentation_finished &&
      student.is_ready_for_presentation
  );
});
</script>
