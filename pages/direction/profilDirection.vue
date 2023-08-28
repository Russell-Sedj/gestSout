<template>
  <div>
    <div
      v-if="direction"
      class="md:flex md:justify-center md:items-center mt-11 mb-4 lg:mt-20"
    >
      <div class="m-3 md:w-3/4 lg:w-2/4">
        <h1 class="text-gray-700 font-bold text-2xl mb-6">
          Profil Service Examen
        </h1>

        <form @submit.prevent="editDirection(direction)">
          <div class="relative z-0 w-full mb-8 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              v-model="direction.email"
            />
            <label
              for="floating_email"
              class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
              >Adresse email</label
            >
          </div>

          <div class="relative z-0 w-full mb-8 group">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              v-model="direction.password"
            />
            <label
              for="floating_password"
              class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
              >Mot de passe</label
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
                v-model="direction.telephone"
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
                v-model="direction.address"
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
              name="floating_university_name"
              id="floating_university_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              v-model="direction.university_name"
            />
            <label
              for="floating_email"
              class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
              >Nom de l'université</label
            >
          </div>

          <div class="relative z-0 w-full mb-8 group">
            <input
              type="date"
              name="floating_limit_date"
              id="floating_limit_date"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              v-model="direction.limit_date"
            />
            <label
              for="floating_limit_date"
              class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
              >Date limite</label
            >
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

if (currentUser.value.role === "student") {
  navigateTo("/");
}

useHead({
  title: "Profil Service Examen",
  meta: [
    {
      name: "description",
      content: "Profil Service Examen",
    },
  ],
});

const direction = ref({
  id: currentUser.value.id,
  email: currentUser.value.email,
  password: currentUser.value.password,
  telephone: currentUser.value.telephone,
  address: currentUser.value.address,
  university_name: currentUser.value.university_name,
  limit_date: currentUser.value.limit_date,
});

const convertedDate = computed(() => {
  const inputDateString = direction.value.limit_date;
  const isoFormattedDateString = inputDateString.replace(" ", "T");

  const dateObject = new Date(isoFormattedDateString);
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
});

// functions

async function editDirection(direction) {
  let req = null;

  if (
    direction.id &&
    direction.email &&
    direction.password &&
    direction.university_name &&
    direction.telephone
  ) {
    direction.limit_date = convertedDate.value;

    req = await $fetch("/api/direction/", {
      method: "PUT",
      body: direction,
    });
    if (req) {
      if (req.message) {
        alert("Erreur lors de la modification du profil");
      } else if (!req.message) {
        alert("Profil modifié avec succès");
        navigateTo("/direction/");
      }
    } else {
      alert("Erreur lors de la modification du profil");
    }
  } else {
    alert("Veuillez remplir tous les champs");
  }
}
</script>
