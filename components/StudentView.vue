<template>
  <div>
    <div class="hover:bg-gray-200 cursor-pointer">
      <p class="flex justify-between">
        <span class="text-sm md:text-base mr-2">
          {{ student.lastname + " " + student.firstname }}
        </span>
        <span>
          <span
            v-if="student.is_ready_for_presentation"
            class="font-bold text-green-500"
          >
            Prêt
          </span>
          <span v-else-if="student.final_decision" class="font-bold font-body">
            {{ student.final_decision }}
          </span>
          <span v-else class="font-bold text-gray-500"> Non prêt </span>
        </span>
      </p>
      <p
        class="text-xs md:text-sm bg-gray-300 rounded-full inline-block w-auto px-2 py-1 mb-1"
      >
        {{ student.field }}
      </p>
    </div>
  </div>
</template>

<script setup>
const { student } = defineProps(["student"]);
</script>
