<template>
  <div class="my-5">
    <div v-if="studentStatus">
      <StudentStatus />
    </div>
    <div class="mb-5">
      <ul class="flex flex-wrap">
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
            Eligible
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
            Terminé
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
    <div class="mx-3 p-1">
      <div v-for="student in filteredList">
        <StudentView
          :student="student"
          class="border-b-2 border-gray-400 mt-3"
          @click="studentStatus = true"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const filterValue = ref("enCours");
const year = ref("2023-2024");
const studentStatus = ref(false);

const currentUser = await $fetch("/api/me");
if (currentUser.role === "student") {
  navigateTo("/");
}

const studentList = ref(null);

studentList.value = await $fetch("/api/student/", {
  method: "POST",
  body: { directionId: currentUser.id, year: year.value },
});

watch(year, async () => {
  studentList.value = await $fetch("/api/student/", {
    method: "POST",
    body: { directionId: currentUser.id, year: year.value },
  });
});

const filteredList = computed(() => {
  if (studentList.value.request) {
    if (filterValue.value === "eligible") {
      return studentList.value.request.filter(
        (student) => student.is_ready_for_presentation === true
      );
    } else if (filterValue.value === "termine") {
      return studentList.value.request.filter(
        (student) => student.final_decision
        // && student.is_ready_for_presentation &&
        // student.is_presentation_finished
      );
    } else if (filterValue.value === "enCours") {
      return studentList.value.request.filter(
        (student) => !student.is_ready_for_presentation
        // && !student.final_decision &&
        // !student.is_presentation_finished
      );
    }
  }
});
</script>
