<template>
  <div
    class="md:flex md:justify-center md:items-center mt-11 mb-9 md:mb-4 lg:mt-20"
  >
    <div class="m-3 md:w-3/4 lg:w-2/4">
      <h1 class="text-gray-700 font-bold text-2xl mb-6">
        Inscription Administrateur
      </h1>
      <form @submit.prevent="addAdmin(admin)">
        <div class="relative z-0 w-full mb-8 group">
          <input
            type="text"
            name="floating_name"
            id="floating_name"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            v-model="admin.name"
          />
          <label
            for="floating_name"
            class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >Nom</label
          >
        </div>
        <div class="relative z-0 w-full mb-8 group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            v-model="admin.email"
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
            v-model="admin.password"
          />
          <label
            for="floating_password"
            class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >Mot de passe</label
          >
        </div>

        <div class="relative z-0 w-full mb-8 group">
          <input
            type="tel"
            name="floating_phone"
            id="floating_phone"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            v-model="admin.telephone"
          />
          <label
            for="floating_phone"
            class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >Numero de telephone</label
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

if (
  currentUser.value.role === "direction" ||
  currentUser.value.role === "student"
) {
  await navigateTo("/");
}

useHead({
  title: "Inscription Administrateur",
  meta: [
    {
      name: "description",
      content: "Inscription Administrateur",
    },
  ],
});

const admin = ref({
  name: null,
  email: null,
  password: null,
  telephone: null,
});

function resetAdmin() {
  admin.value = {
    name: null,
    email: null,
    password: null,
    telephone: null,
  };
}

async function addAdmin(admin) {
  let req = null;

  if (admin.name && admin.email && admin.password && admin.telephone) {
    req = await $fetch("/api/admin/", {
      method: "POST",
      body: admin,
    });
    if (req) {
      if (!req.message) {
        alert("Admin ajouté avec succès");
        resetAdmin();
      } else if (req.message) {
        alert("Erreur lors de l'ajout du Admin");
      }
    } else {
      alert("Erreur lors de l'ajout du Admin");
    }
  } else {
    alert("Veuillez remplir tous les champs");
  }
}
</script>
