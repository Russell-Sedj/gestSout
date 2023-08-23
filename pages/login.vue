<template>
  <div
    class="md:flex md:justify-center md:items-center mt-11 mb-9 md:mb-4 lg:mt-20"
  >
    <div class="m-3 md:w-3/4 lg:w-2/4 md:h-96">
      <h1 class="text-gray-700 font-bold text-2xl mb-10">Connectez Vous</h1>
      <form
        @submit.prevent="
          signIn('credentials', {
            email: emailStudent,
            password: passwordStudent,
            callbackUrl: callbackUrl,
          })
        "
      >
        <div class="relative z-0 w-full mb-10 group">
          <input
            type="email"
            name="floating_email_login_student"
            id="floating_email_login_student"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            v-model="emailStudent"
          />
          <label
            for="floating_email_login_student"
            class="peer-focus:font-medium absolute text-sm text-gray-600 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >Adresse email</label
          >
        </div>
        <div class="relative z-0 w-full mb-10 group">
          <input
            type="password"
            name="floating_password_login_student"
            id="floating_password_login_student"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            v-model="passwordStudent"
          />
          <label
            for="floating_password_login_student"
            class="peer-focus:font-medium absolute text-sm text-gray-600 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >Password</label
          >
        </div>
        <!-- <div class="relative z-0 w-full mb-10 group">
          <div class="flex items-center h-5">
            <label for="stay_logged" class="mr-3 text-sm text-gray-600"
              >Rester Connecter</label
            >
            <input
              id="stay_logged"
              type="checkbox"
              value=""
              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
              v-model="stay_connected"
            />
          </div>
        </div> -->
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
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});

const { signIn } = useAuth();
const emailStudent = ref("");
const passwordStudent = ref("");

// get the route where the user where going
const route = useRoute();
const url = route.fullPath;
const start = url.indexOf("callbackUrl=");
const end = url.indexOf("&error");
const x = url.substring(start, end);
const [key, callbackUrl] = x.split("=");
</script>
