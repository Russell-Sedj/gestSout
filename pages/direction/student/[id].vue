<template>
  <div
    class="md:flex md:justify-center md:items-center mt-11 mb-4 lg:mt-20 md:text-xl"
  >
    <div class="m-3 md:w-3/4 lg:w-2/4">
      <h1 class="text-gray-700 font-bold mb-6 text-2xl md:text-4xl">
        {{ studentUpdate.lastname + " " + studentUpdate.firstname }}
      </h1>

      <div class="mb-6 flex justify-between">
        <span class="mr-2"> Theme: </span>
        <span v-if="studentUpdate.subject" class="font-bold">{{
          " " + studentUpdate.subject
        }}</span>
        <span v-else class="font-bold">???</span>
      </div>

      <!-- if the case of the student is not closed ------------------------------------------------------------------------------------------------------------ -->
      <div v-if="studentUpdate.case_closed"></div>

      <!-- if the case of the student is closed ------------------------------------------------------------------------------------------------------------ -->
      <form @submit.prevent="updateStudent(studentUpdate)" v-else>
        <div v-if="!studentUpdate.is_ready_for_presentation">
          <div class="flex justify-between mb-6">
            <div v-if="studentUpdate.is_profil_information_complete">
              <span class="bg-green-300 inline-block px-2 py-1 rounded-md mb-6">
                Profil complet
              </span>
            </div>
            <div v-if="!studentUpdate.is_profil_information_complete">
              <span class="bg-red-300 inline-block px-2 py-1 rounded-md mb-6">
                Profil incomplet
              </span>
            </div>
          </div>

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

        <div v-else>
          <div v-if="!studentUpdate.is_presentation_finished">
            <p class="bg-green-300 inline-block px-2 py-1 rounded-md mb-6">
              Prêt pour presenter
            </p>

            <div>
              <p class="mb-6">Date de presentation</p>
              <input
                class="border-2 border-gray-400 mb-6"
                type="datetime-local"
                v-model="studentUpdate.presentation_date"
              />
            </div>

            <div>
              <p class="mb-6">Salle de presentation</p>
              <input
                class="border-2 border-gray-400 mb-6"
                type="text"
                v-model="studentUpdate.presentation_room"
              />
            </div>

            <div>
              <span>Presentation terminée</span>
              <!-- <span v-else
                >Annuler la confirmation de
                <span class="font-medium">Presentation terminée</span></span
              > -->
              <div
                @click="is_presentation_finished = !is_presentation_finished"
                class="inline-block cursor-pointer mb-6 bg-yellow-500 hover:bg-yellow-700 ease-out duration-500 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                <span v-if="!is_presentation_finished"> Cliquer ici </span>
                <span v-else> Annuler </span>
              </div>
            </div>
          </div>

          <div v-else>
            <div
              class="mb-6 bg-green-200 text-green-900 rounded inline-block px-3 py-2"
            >
              <p>Presentation terminée</p>
            </div>

            <div class="mb-6 flex justify-between">
              <label>Decision finale</label>
              <select v-model="final_decision">
                <option value="Très bien">Très bien</option>
                <option value="Bien">Bien</option>
                <option value="Assez bien">Assez bien</option>
                <option value="Passable">Passable</option>
                <option value="Insuffisant">Insuffisant</option>
              </select>
            </div>

            <div>
              <p class="mb-2">Appreciation</p>
              <textarea
                class="border-2 border-gray-400 mb-6"
                rows="4"
                cols="45"
                v-model="appreciation"
              ></textarea>
            </div>

            <div
              class="flex justify-between"
              v-if="studentUpdate.final_decision && studentUpdate.appreciation"
            >
              <span class="font-medium"
                >Cloturer le dossier (Irréversible !)</span
              >

              <div
                class="inline-block cursor-pointer mb-6 bg-red-500 hover:bg-red-700 ease-out duration-500 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                @click="case_closed = !case_closed"
              >
                <span v-if="!case_closed"> Cliquer ici </span>
                <span v-else> Annuler </span>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          class="mb-6 bg-blue-500 hover:bg-blue-700 ease-out duration-500 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Valider
        </button>

        <p>{{ studentUpdate }}</p>
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

const case_closed = ref(studentUpdate.value.case_closed);
const is_presentation_finished = ref(
  studentUpdate.value.is_presentation_finished
);
const final_decision = ref(studentUpdate.value.final_decision);
const appreciation = ref(studentUpdate.value.appreciation);

// for the presentation date ------------------------------------------------------------------------------------------------------------
/* const convertedDate = computed(() => {
  const dateObject = new Date(studentUpdate.value.presentation_date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };
  return dateObject.toLocaleString(undefined, options);
}); */

/* convert the studentUpdate.presentation_date to the ISO 8601 format yyyy-MM-ddThh:mm (required by the input type datetime-local)
const convertedDate = computed(() => {
  const dateObject = new Date(studentUpdate.value.presentation_date);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };
  return dateObject.toLocaleString("undefined", options);
}); */

/* const convertedDate = computed(() => {
  const dateObject = new Date(studentUpdate.value.presentation_date);
  console.log("dateObject", dateObject);
  console.log("dateObject.toISOString()", dateObject.toISOString());
  return dateObject.toISOString();
}); */

const convertedDate = computed(() => {
  const inputDateString = studentUpdate.value.presentation_date;
  const isoFormattedDateString = inputDateString.replace(" ", "T"); // Convert space to "T" for proper ISO format

  const dateObject = new Date(isoFormattedDateString);
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");
  const hours = dateObject.getHours().toString().padStart(2, "0");
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
});

// ------------------------------------------------------------------------------------------------------------

// functions ------------------------------------------------------------------------------------------------------------
const updateStudent = async (studentUpdate) => {
  studentUpdate.case_closed = case_closed.value;
  studentUpdate.is_presentation_finished = is_presentation_finished.value;
  studentUpdate.presentation_date = convertedDate.value;
  studentUpdate.final_decision = final_decision.value;
  studentUpdate.appreciation = appreciation.value;

  const req = await $fetch("/api/student", {
    method: "PUT",
    body: studentUpdate,
  });

  if (req) {
    if (req.message) {
      alert("Erreur lors de la mise à jour");
    } else if (!req.message) {
      alert("Etudiant mis à jour avec succes");
      location.reload();
    }
  } else {
    alert("Erreur lors de la mise à jour");
  }
};
</script>
