<template>
  <div>
    <div v-for="student in studentList">
      <div>{{ student }}</div>
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

      // get the list of students from the university
      const { data } = await useFetch("/api/student/", {
        method: "POST",
        body: { listDirectionId: myUniversity.value.id, year: currentYear },
      });
      studentList.value = data.value.request;
    });
  }
});
</script>
