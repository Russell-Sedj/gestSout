<template>
  <div class="bg-green-200 h-screen">
    <div class="flex justify-center items-center">
      <div class="mt-32 bg-green-300 rounded-lg inline-block p-4 font-bold">
        <h1>Commencez a importer vos données a partir d'un fichier CSV</h1>
        <div class="text-center m-3">
          <usecsv-button
            importerKey="80dad6e1-b8c2-4505-86a0-2ec0a7323ea9"
            :user="{
              userId: 'Service examen',
            }"
            :onData="onData"
          >
            Importer les données
          </usecsv-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const currentUser = ref(null);
currentUser.value = await $fetch("/api/me");
const currentYear = "2023-2024";

import UseCSVButton from "@usecsv/vuejs3";

export default {
  name: "App",
  components: { "usecsv-button": UseCSVButton },
  methods: {
    onData: function (data) {
      // console.log("Data:", data);

      for (let i = 0; i < data.importedRowsCount; i++) {
        this.addStudent(data.rows[i], i);
      }
    },

    addStudent: async function (data, index) {
      let req = null;

      const student = {
        role: "student",
        firstname: data.Prenom,
        lastname: data.Nom,
        email: data.Email,
        telephone: data.Telephone,
        address: data.Addresse,
        field: data.Filiere,
        year: currentYear,
        directionId: currentUser.value.id,
      };
      if (data["Maitre memoire"]) {
        student.master = data["Maitre memoire"];
      }
      if (data["Maitre de stage"]) {
        student.internMaster = data["Maitre de stage"];
      }

      // here we go
      if (
        student.lastname &&
        student.firstname &&
        student.email &&
        student.telephone &&
        student.address &&
        student.field
      ) {
        req = await $fetch("/api/student/", {
          method: "POST",
          body: student,
        });
        if (req) {
          if (!req.message) {
            console.log(
              "Index: ",
              index,
              ", ",
              student.firstname?.toString(),
              student.lastname?.toString(),
              ", Etudiant ajouté avec succes"
            );
          } else if (req.message) {
            console.log(
              "Index: ",
              index,
              student.firstname?.toString(),
              student.lastname?.toString()
            );
            console.log("Erreur lors de l'ajout de l'étudiant");
          }
        } else {
          console.log(
            "Index: ",
            index,
            student.firstname?.toString(),
            student.lastname?.toString()
          );
          console.log("Erreur lors de l'ajout de l'étudiant");
        }
      } else {
        console.log(
          "Index: ",
          index,
          student.firstname?.toString(),
          student.lastname?.toString()
        );
        console.log(
          "Les champs 'Nom', 'Prenom', 'Eamil', 'Telephone', 'Addresse', 'Field' sont obligatoires"
        );
      }
    },
  },
};
</script>
