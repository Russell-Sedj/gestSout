<template>
  <div>
    <div class="hover:bg-gray-200 cursor-pointer p-1 rounded-md">
      <p class="flex justify-between">
        <span class="text-sm md:text-base lg:text-xl mr-2">
          {{ student.lastname + " " + student.firstname }}
        </span>
        <span class="lg:text-xl">
          <span v-if="student.is_ready_for_presentation">
            <span v-if="student.final_decision" class="font-bold">
              {{ student.final_decision }}
            </span>
            <span v-else class="font-bold text-green-500"> Prêt </span>
          </span>

          <span v-else class="font-bold text-gray-500"> Non prêt </span>
        </span>
      </p>
      <p
        class="text-xs md:text-sm bg-gray-300 rounded-full inline-block w-auto px-2 py-1 my-2"
      >
        {{ student.field }}
      </p>
    </div>
  </div>
</template>

<script setup>
const { student } = defineProps(["student"]);
</script>
