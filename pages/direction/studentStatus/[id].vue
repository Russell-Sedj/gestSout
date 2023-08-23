<template>
  <div class="md:flex md:justify-center md:items-center mt-11 mb-4 lg:mt-20">
    <div class="m-3 md:w-3/4 lg:w-2/4">
      <h1 class="text-gray-700 font-bold text-3xl mb-6">
        {{ student.lastname + " " + student.firstname }}
      </h1>

      <div class="mb-6">
        Theme:
        <strong v-if="studentUpdate.subject" class="font-bold">{{
          " " + studentUpdate.subject
        }}</strong>
        <strong v-else class="font-bold"> ???</strong>
      </div>

      <div v-if="studentUpdate.is_presentation_finished">
        <p>Presentation terminée</p>
      </div>

      <div v-if="student.final_decision">
        Decision finale:
        <strong class="font-bold">{{ studentUpdate.final_decision }}</strong>
      </div>

      <form>
        <div v-if="studentUpdate.is_presentation_finished">
          <div v-if="!student.final_decision">
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
            <p>Appreciation</p>
            <textarea
              class="border-2 border-gray-400"
              rows="4"
              cols="45"
              v-model="studentUpdate.appreciation"
            ></textarea>
          </div>
        </div>

        <div v-else>
          <div v-if="studentUpdate.is_ready_for_presentation">
            <p class="bg-green-300 inline-block px-2 py-1 rounded-md">
              Prêt pour presenter
            </p>
          </div>

          <div>
            <label
              class="bg-red-300 inline-block px-2 py-1 rounded-md"
              v-if="!studentUpdate.is_school_fees_paid"
            >
              Scolarité non close
            </label>
            <label
              class="bg-green-300 inline-block px-2 py-1 rounded-md"
              v-else
            >
              Scolarité close
            </label>
            <input
              type="checkbox"
              v-model="studentUpdate.is_school_fees_paid"
            />
          </div>

          <div>
            <label
              class="bg-red-300 inline-block px-2 py-1 rounded-md"
              v-if="!studentUpdate.is_credit_enough"
              >Crédits insufisants</label
            >
            <label class="bg-green-300 inline-block px-2 py-1 rounded-md" v-else
              >Crédits sufisants</label
            >
            <input type="checkbox" v-model="studentUpdate.is_credit_enough" />
          </div>

          <div>
            <label
              class="bg-red-300 inline-block px-2 py-1 rounded-md"
              v-if="!studentUpdate.is_profil_information_complete"
              >Informations de profil incomplets</label
            >
            <label class="bg-green-300 inline-block px-2 py-1 rounded-md" v-else
              >Informations de profil complets</label
            >
            <input
              type="checkbox"
              v-model="studentUpdate.is_profil_information_complete"
            />
          </div>
        </div>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 ease-out duration-500 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
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
const studentUpdate = student;
</script>
