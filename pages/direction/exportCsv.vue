<template>
  <div>
    <p>
      Si le telechargement ne se lance pas automatiquement, cliquez
      <span
        class="text-blue-500 cursor-pointer"
        @click="exportDataToCsv(studentList)"
        >ici</span
      >
    </p>
  </div>
</template>

<script setup>
// get student list
const currentUser = ref(null);
currentUser.value = await $fetch("/api/me");

const runtimeConfig = useRuntimeConfig();
const currentYear = runtimeConfig.public.currentYear;

// convert data to csv
const convertToCsv = (data) => {
  const headers = Object.keys(data[0]);
  const rows = data.map((obj) => headers.map((header) => obj[header]));
  const headerRow = headers.join(",");
  const csvRows = [headerRow, ...rows.map((row) => row.join(","))];
  return csvRows.join("\n");
};

const exportDataToCsv = (data) => {
  const csvContent = convertToCsv(data);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "export_data.csv");
  link.click();
  window.location.href = "/direction/";
};

// convert in a good csv format
function escapeCsvText(text) {
  // Escape double quotes by doubling them up
  const escapedText = text.replace(/"/g, '""');
  // Wrap the text in double quotes if it contains special characters or commas
  if (escapedText.includes(",") || escapedText.includes("\n")) {
    return `"${escapedText}"`;
  }
  return escapedText;
}

const removeAccents = (input) => {
  return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const deleteUselessProperties = (student) => {
  delete student.id;
  delete student.created_at;
  delete student.updated_at;
  delete student.role;
  delete student.password;
  delete student.year;
  delete student.is_school_fees_paid;
  delete student.is_credit_enough;
  delete student.is_profil_information_complete;
  delete student.is_ready_for_presentation;
  delete student.is_presentation_finished;
  delete student.case_closed;
  delete student.directionId;
};

const formatDate = (studentDate) => {
  const date = new Date(studentDate);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };
  return date.toLocaleDateString("fr-FR", options);
};

// format some property of the object i got from the api
const formatStudentList = () => {
  studentList.forEach((student, index) => {
    // student.appreciation = student.appreciation
    //   ? escapeCsvText(student.appreciation)
    //   : "";

    deleteUselessProperties(student);
    if (student.presentation_date) {
      student.presentation_date = formatDate(student.presentation_date);
    }

    for (const prop in student) {
      if (student[prop] && typeof student[prop] === "string") {
        studentList[index][prop] = escapeCsvText(removeAccents(student[prop]));
      }
    }
  });
};

// get list of student
let studentList = [];
await $fetch("/api/student/", {
  method: "POST",
  body: { listDirectionId: currentUser.value.id, year: currentYear },
}).then((data) => {
  studentList = data.request;
});

onMounted(() => {
  formatStudentList();
  exportDataToCsv(studentList);
});
</script>
