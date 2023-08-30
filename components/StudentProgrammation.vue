<template>
  <div>
    <div class="hover:bg-gray-200 p-1 rounded-md">
      <p class="flex justify-between">
        <span class="text-sm md:text-base lg:text-xl mr-2">
          {{ student.lastname + " " + student.firstname }}
        </span>
        <span class="lg:text-xl font-medium text-right">
          <span>{{ formatedDate }}</span>
        </span>
      </p>
      <div class="flex justify-between">
        <div
          class="text-xs md:text-sm bg-gray-300 rounded-full inline-block w-auto px-2 py-1 my-2"
        >
          {{ student.field }}
        </div>

        <div class="lg:text-xl font-medium">
          Salle {{ student.presentation_room }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { student } = defineProps(["student"]);

const formatedDate = computed(() => {
  const date = new Date(student.presentation_date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };
  return date.toLocaleDateString("fr-FR", options);
});
</script>
