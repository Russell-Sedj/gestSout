<template>
  <div>
    <button @click="exportDataToCsv">Click</button>
  </div>
</template>

<script setup>
const converToCsv = (data) => {
  const headers = Object.keys(data[0]);
  const rows = data.map((obj) => headers.map((header) => obj[header]));
  const headerRow = headers.join(",");
  const csvRows = [headerRow, ...rows.map((row) => row.join(","))];
  return csvRows.join("\n");
};

const exportDataToCsv = () => {
  const data = [
    {
      name: "John",
      age: 24,
      city: "New York",
      country: "USA",
    },
    {
      name: "Mary",
      age: 32,
      city: "Paris",
      country: "France",
    },
  ];

  const csvContent = converToCsv(data);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "export_data.csv");
  link.click();
};
</script>
