import { getServerSession } from "#auth";

export default eventHandler(async (event) => {
  const userStudent = await $fetch("/api/student/");
  const userDirection = await $fetch("/api/direction/");
  const userAdmin = await $fetch("/api/admin/");

  // get the current session
  const session = await getServerSession(event);

  // if there's no session
  if (!session) {
    return { status: "unauthenticated!" };
  }

  // find the corresponding user
  const loggedStudent = userStudent.find(
    (user) => user.email === session.user?.email
  );
  const loggedDirection = userDirection.find(
    (user) => user.email === session.user?.email
  );
  const loggedAdmin = userAdmin.find(
    (user) => user.email === session.user?.email
  );

  // return the corresponding user
  if (loggedStudent) {
    return loggedStudent;
  } else if (loggedDirection) {
    return loggedDirection;
  } else if (loggedAdmin) {
    return loggedAdmin;
  }
  // else if none of them, logout
  else {
    return { status: "Unknown user!!!" };
  }
});
