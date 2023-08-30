<template>
  <div>
    <div class="hover:bg-gray-200">
      {{ student }}
    </div>
  </div>
</template>

<script setup>
const { student } = defineProps(["student"]);
</script>
