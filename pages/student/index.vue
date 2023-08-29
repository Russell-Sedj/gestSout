<template>
  <div>
    <div
      v-if="currentUser"
      class="md:flex md:justify-center md:items-center mt-8 mb-4 lg:mt-20 md:text-xl"
    >
      <div class="m-3 md:w-3/4 lg:w-2/4">
        <h1
          v-if="currentUser.lastname && currentUser.firstname"
          class="text-gray-700 font-bold mb-6 text-2xl md:text-4xl"
        >
          {{ currentUser.lastname + " " + currentUser.firstname }}
        </h1>
        <h1 v-else class="text-gray-700 font-bold mb-6 text-2xl md:text-4xl">
          ???
        </h1>

        <div class="mb-6 flex justify-between">
          <div class="w-auto mr-2">Theme</div>
          <div v-if="currentUser.subject" class="font-medium">
            {{ currentUser.subject }}
          </div>
          <div v-else class="font-medium">???</div>
        </div>

        <div class="mb-6 flex justify-between">
          <div class="w-auto mr-2">Filière</div>
          <div v-if="currentUser.field" class="font-medium">
            {{ currentUser.field }}
          </div>
          <div v-else class="font-medium">???</div>
        </div>

        <div class="mb-6 flex justify-between">
          <div class="w-auto mr-2">Année</div>
          <div v-if="currentUser.year" class="font-medium">
            {{ currentUser.year }}
          </div>
          <div v-else class="font-medium">???</div>
        </div>

        <div class="mb-6 flex justify-between">
          <div class="w-auto mr-2">Maitre de Stage</div>
          <div v-if="currentUser.master" class="font-medium">
            {{ currentUser.master }}
          </div>
          <div v-else class="font-medium">???</div>
        </div>

        <div v-if="!currentUser.case_closed">
          <div v-if="!currentUser.is_ready_for_presentation">
            <div class="flex justify-between mb-6">
              <div v-if="currentUser.is_profil_information_complete">
                <span
                  class="mb-6 bg-green-200 text-green-900 rounded-md inline-block px-3 py-2"
                >
                  Profil complet
                </span>
              </div>
              <div v-if="!currentUser.is_profil_information_complete">
                <span
                  class="mb-6 bg-red-200 text-red-900 rounded-md inline-block px-3 py-2"
                >
                  Profil incomplet
                </span>
              </div>
            </div>

            <div class="flex justify-between mb-6">
              <label
                class="mb-6 bg-red-200 text-red-900 rounded-md inline-block px-3 py-2"
                v-if="!currentUser.is_school_fees_paid"
              >
                Scolarité non close
              </label>
              <label
                class="mb-6 bg-green-200 text-green-900 rounded-md inline-block px-3 py-2"
                v-else
              >
                Scolarité close
              </label>
            </div>

            <div class="flex justify-between mb-6">
              <label
                class="mb-6 bg-red-200 text-red-900 rounded-md inline-block px-3 py-2"
                v-if="!currentUser.is_credit_enough"
                >Crédits insufisants</label
              >
              <label
                class="mb-6 bg-green-200 text-green-900 rounded-md inline-block px-3 py-2"
                v-else
                >Crédits sufisants</label
              >
            </div>
          </div>
        </div>

        <div v-else>
          <div class="mb-6 flex justify-between">
            <div class="w-auto mr-2">Decision finale</div>
            <div v-if="currentUser.final_decision" class="font-medium">
              {{ currentUser.final_decision }}
            </div>
            <div v-else class="font-medium">???</div>
          </div>

          <div class="mb-6">
            <div class="mb-2">Appreciation</div>
            <div
              v-if="currentUser.appreciation"
              class="border-2 border-gray-400 p-2 rounded-md bg-gray-200"
            >
              {{ currentUser.appreciation }}
            </div>
            <div
              v-else
              class="text-center border-2 border-gray-400 p-2 rounded-md bg-gray-200"
            >
              ???
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const currentUser = ref(null);
currentUser.value = await $fetch("/api/me");

// if (currentUser.role === "direction") {
//   await navigateTo("/");
// }
</script>
