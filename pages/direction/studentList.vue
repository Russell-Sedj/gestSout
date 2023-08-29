<template>
  <div class="my-5">
    <div class="mb-5">
      <ul class="flex flex-wrap">
        <div class="flex justify-between">
          <li
            class="border-black border-2 rounded-full my-1 mx-4 px-4 py-2 inline-block w-auto cursor-pointer"
            @click="filterValue = 'all'"
          >
            Tous
            <input
              type="radio"
              name="filterValue"
              value="all"
              v-model="filterValue"
            />
          </li>
        </div>
        <div class="flex justify-between">
          <li
            class="border-black border-2 rounded-full my-1 mx-4 px-4 py-2 inline-block w-auto cursor-pointer"
            @click="filterValue = 'enCours'"
          >
            En cours
            <input
              type="radio"
              name="filterValue"
              value="enCours"
              v-model="filterValue"
            />
          </li>
        </div>
        <div class="flex justify-between">
          <li
            class="border-black border-2 rounded-full my-1 mx-4 px-4 py-2 inline-block w-auto cursor-pointer"
            @click="filterValue = 'eligible'"
          >
            Eligibles
            <input
              type="radio"
              name="filterValue"
              value="eligible"
              v-model="filterValue"
            />
          </li>
        </div>
        <div class="flex justify-between">
          <li
            class="border-black border-2 rounded-full my-1 mx-4 px-4 py-2 inline-block w-auto cursor-pointer"
            @click="filterValue = 'termine'"
          >
            Terminés
            <input
              type="radio"
              name="filterValue"
              value="termine"
              v-model="filterValue"
            />
          </li>
          <li>
            <select
              class="border-black border-2 rounded-full my-1 mx-4 px-4 py-2 inline-block w-auto cursor-pointer"
              v-model="year"
            >
              <option value="2023-2024">2023-2024</option>
              <option value="2022-2023">2022-2023</option>
            </select>
          </li>
        </div>
      </ul>
    </div>

    <!-- Display list of students -->
    <div v-if="filteredList" class="mx-3 p-1">
      <div v-for="student in filteredList">
        <nuxt-link :to="`/direction/student/${student.id}`">
          <StudentView
            :student="student"
            class="border-b-2 border-gray-400 mt-3"
          />
        </nuxt-link>
      </div>
    </div>

    <div v-else>
      <Loading />
    </div>
  </div>
</template>

<script setup>
// get the current user
const currentUser = ref(null);
currentUser.value = await $fetch("/api/me");

// get the filter value from the url
const route = useRoute();
// const filterValue = ref("all");
const filterValue = ref(route.query.filterValue || "all");

// current year
const year = ref("2023-2024");

const studentList = ref(null);

studentList.value = await $fetch("/api/student/", {
  method: "POST",
  body: { listDirectionId: currentUser.value.id, year: year.value },
});

watch(year, async () => {
  studentList.value = await $fetch("/api/student/", {
    method: "POST",
    body: { listDirectionId: currentUser.value.id, year: year.value },
  });
});

const filteredList = computed(() => {
  if (studentList.value.request) {
    if (filterValue.value === "all") {
      return studentList.value.request;
    } else if (filterValue.value === "eligible") {
      return studentList.value.request.filter(
        (student) =>
          student.is_ready_for_presentation &&
          !student.is_presentation_finished &&
          !student.final_decision &&
          !student.case_closed
      );
    } else if (filterValue.value === "termine") {
      return studentList.value.request.filter(
        (student) =>
          (student.final_decision || student.case_closed) &&
          student.is_presentation_finished &&
          student.is_ready_for_presentation
      );
    } else if (filterValue.value === "enCours") {
      return studentList.value.request.filter(
        (student) =>
          !student.is_ready_for_presentation &&
          !student.is_presentation_finished &&
          !student.final_decision &&
          !student.case_closed
      );
    }
  }
});
</script>
