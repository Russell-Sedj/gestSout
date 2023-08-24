<template>
  <div
    class="md:flex md:justify-center md:items-center mt-11 mb-4 lg:mt-20 md:text-xl"
  >
    <div class="m-3 md:w-3/4 lg:w-2/4">
      <h1 class="text-gray-700 font-bold mb-6 text-2xl md:text-4xl">
        {{ student.lastname + " " + student.firstname }}
      </h1>

      <div class="mb-6">
        <span class="mr-2"> Theme: </span>
        <strong v-if="studentUpdate.subject" class="font-bold">{{
          " " + studentUpdate.subject
        }}</strong>
        <strong v-else class="font-bold"> ???</strong>
      </div>

      <div v-if="studentUpdate.is_presentation_finished" class="mb-6">
        <p>Presentation terminée</p>
      </div>

      <div v-if="student.final_decision" class="mb-6">
        Decision finale:
        <strong class="font-bold">{{ studentUpdate.final_decision }}</strong>
      </div>

      <form @submit.prevent="updateStudent(studentUpdate)">
        <div v-if="studentUpdate.is_presentation_finished">
          <div v-if="!student.final_decision" class="mb-6 flex justify-between">
            <label>Decision finale</label>
            <select v-model="studentUpdate.final_decision">
              <option value="Très bien">Très bien</option>
              <option value="Bien">Bien</option>
              <option value="Assez bien">Assez bien</option>
              <option value="Passable">Passable</option>
              <option value="Insuffisant">Insuffisant</option>
            </select>
          </div>

          <div v-if="!studentUpdate.appreciation">
            <p class="mb-6">Appreciation</p>
            <textarea
              class="border-2 border-gray-400 mb-6"
              rows="4"
              cols="45"
              v-model="studentUpdate.appreciation"
            ></textarea>
          </div>
        </div>

        <div v-if="!studentUpdate.is_presentation_finished">
          <div class="flex justify-between mb-6">
            <label
              class="bg-green-300 inline-block px-2 py-1 rounded-md mb-6"
              v-if="studentUpdate.is_profil_information_complete"
              >Profil complet</label
            >
            <label
              class="bg-red-300 inline-block px-2 py-1 rounded-md mb-6"
              v-if="!studentUpdate.is_profil_information_complete"
              >Profil incomplet</label
            >
          </div>

          <div v-if="studentUpdate.is_ready_for_presentation">
            <p class="bg-green-300 inline-block px-2 py-1 rounded-md mb-6">
              Prêt pour presenter
            </p>
            <nuxt-link :to="`/direction/student/programmation${student.id}`"
              >Programmer l'etudiant</nuxt-link
            >
          </div>

          <div v-if="!studentUpdate.is_profil_information_complete">
            <div class="flex justify-between mb-6">
              <label
                class="bg-red-300 inline-block px-2 py-1 rounded-md mb-6"
                v-if="!studentUpdate.is_school_fees_paid"
              >
                Scolarité non close
              </label>
              <label
                class="bg-green-300 inline-block px-2 py-1 rounded-md mb-6"
                v-else
              >
                Scolarité close
              </label>
              <input
                class="w-6 h-6"
                type="checkbox"
                v-model="studentUpdate.is_school_fees_paid"
              />
            </div>

            <div class="flex justify-between mb-6">
              <label
                class="bg-red-300 inline-block px-2 py-1 rounded-md mb-6"
                v-if="!studentUpdate.is_credit_enough"
                >Crédits insufisants</label
              >
              <label
                class="bg-green-300 inline-block px-2 py-1 rounded-md mb-6"
                v-else
                >Crédits sufisants</label
              >
              <input
                class="w-6 h-6"
                type="checkbox"
                v-model="studentUpdate.is_credit_enough"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="mb-6 bg-blue-500 hover:bg-blue-700 ease-out duration-500 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Valider
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const studentId = route.params.id;
const obj = await $fetch("/api/student", {
  method: "POST",
  body: { uniqueId: studentId },
});
const student = obj.request;
const studentUpdate = ref(student);

const updateStudent = async (studentUpdate) => {
  const req = await $fetch("/api/student", {
    method: "PUT",
    body: studentUpdate,
  });
  if (req.message) {
    alert("Erreur lors de la mise à jour");
  } else if (!req.message) {
    alert("Etudiant mis à jour avec succes");
  } else {
    alert("Erreur lors de la mise à jour");
  }
};
</script>
