<template>
  <div
    class="md:flex md:justify-center md:items-center mt-11 mb-9 md:mb-4 lg:mt-20"
  >
    <div class="m-3 md:w-3/4 lg:w-2/4">
      <h1 class="text-gray-700 font-bold text-2xl mb-6">
        Inscription Etudiant
      </h1>
      <form @submit.prevent="addStudent(student)">
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
          <label for="floating_year" class="text-gray-600 mr-4"
            >Année académique</label
          >
          <select v-model="student.year" id="floating_year" required>
            <option value="2023-2024" selected>2023-2024</option>
            <option value="2022-2023">2022-2023</option>
          </select>
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
// get current user
const currentUser = ref(null);
currentUser.value = await $fetch("/api/me");

// redirect if not admin or direction
if (currentUser.value.role === "student") {
  navigateTo("/");
}

useHead({
  title: "Inscription Etudiant",
  meta: [
    {
      name: "description",
      content: "Inscription Etudiant",
    },
  ],
});

const student = ref({
  firstname: null,
  lastname: null,
  email: null,
  telephone: null,
  address: null,
  field: null,
  year: "2023-2024",
  directionId: currentUser.value.id,
});

function resetStudent() {
  student.value = {
    firstname: null,
    lastname: null,
    email: null,
    telephone: null,
    address: null,
    field: null,
    year: null,
    directionId: currentUser.value.id,
  };
}

async function addStudent(student) {
  let req = null;

  if (
    student.firstname &&
    student.lastname &&
    student.email &&
    student.telephone &&
    student.address &&
    student.field &&
    student.year
  ) {
    req = await $fetch("/api/student/", {
      method: "POST",
      body: student,
    });
    if (req) {
      if (!req.message) {
        alert("Etudiant ajouté avec succès");
        resetStudent();
      } else if (req.message) {
        alert("Erreur lors de l'ajout de l'étudiant");
      }
    } else {
      alert("Erreur lors de l'ajout de l'étudiant");
    }
  } else {
    alert("Veuillez remplir tous les champs");
  }
}
</script>
