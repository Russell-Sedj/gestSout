<template>
  <div>
    <div
      v-if="student"
      class="md:flex md:justify-center md:items-center mt-11 mb-4 lg:mt-20"
    >
      <div class="m-3 md:w-3/4 lg:w-2/4">
        <h1 class="text-gray-700 font-bold text-2xl mb-6">Profil Etudiant</h1>
        <form @submit.prevent="editStudent(student)">
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-8 group">
              <input
                type="text"
                name="floating_last_name"
                id="floating_last_name"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                v-model="student.lastname"
              />
              <label
                for="floating_last_name"
                class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                >Nom</label
              >
            </div>
            <div class="relative z-0 w-full mb-8 group">
              <input
                type="text"
                name="floating_first_name"
                id="floating_first_name"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                v-model="student.firstname"
              />
              <label
                for="floating_first_name"
                class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                >Prenom</label
              >
            </div>
          </div>
          <div class="relative z-0 w-full mb-8 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              v-model="student.email"
            />
            <label
              for="floating_email"
              class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
              >Adresse email</label
            >
          </div>

          <div class="relative z-0 w-full mb-8 group grid grid-cols-12 gap-2">
            <div class="w-auto col-span-10 md:col-span-11">
              <input
                :type="showPassword ? 'text' : 'password'"
                name="floating_password"
                id="floating_password"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                v-model="student.password"
              />
              <label
                for="floating_password"
                class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                >Mot de passe</label
              >
            </div>

            <div
              class="bg-gray-300 rounded flex items-center justify-center col-span-2 md:col-span-1 h-auto"
              @click="showPassword = !showPassword"
            >
              <span v-if="showPassword">•</span>
              <span v-else>A-Z</span>
            </div>
          </div>

          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-8 group">
              <input
                type="tel"
                name="floating_phone"
                id="floating_phone"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                v-model="student.telephone"
              />
              <label
                for="floating_phone"
                class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                >Numero de telephone</label
              >
            </div>

            <div class="relative z-0 w-full mb-8 group">
              <input
                type="text"
                name="floating_address"
                id="floating_address"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                v-model="student.address"
              />
              <label
                for="floating_address"
                class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                >Adresse</label
              >
            </div>
          </div>
          <div class="relative z-0 w-full mb-8 group">
            <input
              type="text"
              name="floating_filiere"
              id="floating_filiere"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              v-model="student.field"
            />
            <label
              for="floating_filiere"
              class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
              >Filiere</label
            >
          </div>
          <div class="relative z-0 w-full mb-8 group">
            <input
              type="text"
              name="floating_subject"
              id="floating_subject"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              v-model="student.subject"
            />
            <label
              for="floating_subject"
              class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
              >Theme</label
            >
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-8 group">
              <input
                type="text"
                name="floating_master"
                id="floating_master"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                v-model="student.master"
              />
              <label
                for="floating_master"
                class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                >Maitre Memoire</label
              >
            </div>
            <div class="relative z-0 w-full mb-8 group">
              <input
                type="text"
                name="floating_intern_master"
                id="floating_intern_master"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                v-model="student.internMaster"
              />
              <label
                for="floating_intern_master"
                class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                >Maitre de stage</label
              >
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
    <div v-else>
      <Loading />
    </div>
  </div>
</template>

<script setup>
const currentUser = ref(null);
currentUser.value = await $fetch("/api/me");

useHead({
  title: "Profil Etudiant",
  meta: [
    {
      name: "description",
      content: "Profil Etudiant",
    },
  ],
});

const showPassword = ref(false);

const student = ref({
  id: currentUser.value.id,
  lastname: currentUser.value.lastname,
  firstname: currentUser.value.firstname,
  email: currentUser.value.email,
  password: currentUser.value.password,
  telephone: currentUser.value.telephone,
  address: currentUser.value.address,
  field: currentUser.value.field,
  subject: currentUser.value.subject,
  master: currentUser.value.master,
  internMaster: currentUser.value.internMaster,
});

// ----------------------------function------------------------------
async function editStudent(student) {
  let req = null;

  if (
    student.id &&
    student.firstname &&
    student.lastname &&
    student.email &&
    student.password &&
    student.telephone &&
    student.address &&
    student.field
  ) {
    req = await $fetch("/api/student/", {
      method: "PUT",
      body: student,
    });
    if (req) {
      if (req.message) {
        alert("Erreur lors de la modification du profil");
      } else if (!req.message) {
        alert("Profil modifié avec succès");
        await navigateTo("/student/");
      }
    } else {
      alert("Erreur lors de la modification du profil");
    }
  } else {
    alert("Veuillez remplir tous les champs");
  }
}
</script>
