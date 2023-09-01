<template>
  <div>
    <div class="text-center my-6 font-bold md:text-2xl">
      Programmation année {{ currentYear }}
    </div>

    <div class="mx-3">
      <div v-for="student in studentList">
        <StudentProgrammation
          v-if="student.presentation_date && !student.is_presentation_finished"
          :student="student"
          class="border-b-2 border-gray-400 mt-3"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
const currentYear = runtimeConfig.public.currentYear;

const currentUser = ref(null);
currentUser.value = await $fetch("/api/me");

// get the student's university
const myUniversity = ref(null);
const studentList = ref(null);
onMounted(async () => {
  if (currentUser.value.role === "student") {
    await $fetch("/api/direction/", {
      method: "POST",
      body: { uniqueId: currentUser.value.directionId },
    }).then(async (res) => {
      myUniversity.value = res;

      // get the list of students from its university
      const { data } = await useFetch("/api/student/", {
        method: "POST",
        body: { listDirectionId: myUniversity.value.id, year: currentYear },
      });
      studentList.value = data.value.request;
      studentList.value.sort(
        (a, b) => new Date(a.presentation_date) - new Date(b.presentation_date)
      );
    });
  }

  // get the list of students from the currentUser university
  else if (currentUser.value.role === "direction") {
    await $fetch("/api/student/", {
      method: "POST",
      body: { listDirectionId: currentUser.value.id, year: currentYear },
    }).then((res) => {
      studentList.value = res.request;
      studentList.value.sort(
        (a, b) => new Date(a.presentation_date) - new Date(b.presentation_date)
      );
    });
  }
});
</script>
