<template>
  <div class="flex items-center justify-center mx-3">
    <div>
      <div v-if="myUniversity">
        <div
          v-if="myUniversity.limit_date"
          class="flex items-center justify-center text-xl md:text-2xl my-6"
        >
          <strong class="font-bold text-5xl text-red-600 mr-2">! </strong> Date
          limite de depot :
          {{ myUniversity.limit_date }}
        </div>
      </div>
      <div v-else-if="currentUser.limit_date">
        <div class="flex items-center justify-center text-xl md:text-2xl my-6">
          <strong class="font-bold text-5xl text-red-600 mr-2">! </strong> Date
          limite de depot :
          {{ currentUser.limit_date }}
        </div>
      </div>

      <div v-if="currentUser.role === 'student'" class="text-center mb-6">
        <div v-if="currentUser.is_ready_for_presentation">
          <div
            v-if="
              !currentUser.is_presentation_finished || !currentUser.case_closed
            "
          >
            <PresentationAlert
              :currentUser="currentUser"
              v-if="currentUser.presentation_date"
            />
          </div>
        </div>
      </div>

      <div v-if="currentUser">
        {{ currentUser }}
      </div>

      <div class="mb-6">
        <p class="font-bold text-xl md:text-2xl mb-3">FAQ</p>
        <ol>
          <li>
            <p>
              Q: Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
              cumque.
            </p>
            <p>
              R: Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aliquid!
            </p>
          </li>
          <li>
            <p>
              Q: Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dolorum est deserunt ex?
            </p>
            <p>
              R: Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Facere, in? Molestias!
            </p>
          </li>
          <li>
            <p>
              Q: Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dolorum est deserunt ex?
            </p>
            <p>
              R: Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Facere, in? Molestias!
            </p>
          </li>
          <li>
            <p>
              Q: Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dolorum est deserunt ex?
            </p>
            <p>
              R: Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Facere, in? Molestias!
            </p>
          </li>
          <li>
            <p>
              Q: Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dolorum est deserunt ex?
            </p>
            <p>
              R: Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Facere, in? Molestias!
            </p>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  auth: {
    unauthenticatedOnly: false,
    navigateAuthenticatedTo: "/",
  },
});

const currentUser = ref(null);
currentUser.value = await $fetch("/api/me");

// get the student's university
const myUniversity = ref(null);
onMounted(async () => {
  if (currentUser.value.role === "student") {
    await $fetch("/api/direction/", {
      method: "POST",
      body: { uniqueId: currentUser.value.directionId },
    }).then((data) => {
      myUniversity.value = data;
    });
  }
});
</script>
