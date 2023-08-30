<template>
  <div
    class="transform hover:scale-105 ease-out duration-300 bg-yellow-200 text-yellow-900 rounded-md inline-block px-3 py-2"
  >
    <nuxt-link to="/student/">
      <p>Vous avez été programmé !!!</p>
      <p>
        {{ formatedDate ? formatedDate : "???" }}
      </p>
      <p>
        Salle
        {{
          currentUser.presentation_room ? currentUser.presentation_room : "???"
        }}
      </p>
    </nuxt-link>
  </div>
</template>

<script setup>
const { currentUser } = defineProps(["currentUser"]);

const formatedDate = computed(() => {
  const date = new Date(currentUser.presentation_date);
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
