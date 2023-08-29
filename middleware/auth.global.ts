export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data: currentUser } = await useFetch("/api/me");

  if (currentUser) {
    // if going to a direction page
    if (to.path.startsWith("/direction")) {
      // if user is not direction or admin
      if (
        currentUser.value.role !== "direction" &&
        currentUser.value.role !== "admin"
      ) {
        return navigateTo("/");
      }

      // if user is direction
      else if (currentUser.value.role === "direction") {
        // if going to student profile page
        if (to.path.startsWith("/direction/student/profil")) {
          const { data: student } = await useFetch("/api/student", {
            method: "POST",
            body: { uniqueId: to.params.id },
          });

          // if case is closed
          if (student.value.request.case_closed) {
            const studentUrl = "/direction/student/" + to.params.id;
            return navigateTo(studentUrl);
          }
        }
      }
    }

    // if going to a student page
    else if (to.path.startsWith("/student")) {
      // if user is not student or admin
      if (
        currentUser.value.role !== "student" &&
        currentUser.value.role !== "admin"
      ) {
        return navigateTo("/");
      } else if (currentUser.value.role === "student") {
        // if going to student profile page
        if (to.path === "/student/profilStudent") {
          // if case is closed
          if (currentUser.value.case_closed) {
            return navigateTo("/student/");
          }
        }
      }
    }

    // if going to registerDirection
    else if (to.path === "/registerDirection") {
      // if user is not admin
      if (currentUser.value.role !== "admin") {
        return navigateTo("/");
      }
    }

    // if going to a admin page
    else if (to.path.startsWith("admin")) {
      // if user is not admin
      if (currentUser.value.role !== "admin") {
        return navigateTo("/");
      }
    }
  }
});
