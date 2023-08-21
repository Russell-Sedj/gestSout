import { getServerSession } from "#auth";

export default eventHandler(async (event) => {
  const userStudent = await $fetch("/api/student/");
  const userDirection = await $fetch("/api/direction/");

  const session = await getServerSession(event);
  if (!session) {
    return { status: "unauthenticated!" };
  }

  const loggedStudent = userStudent.find(
    (user) => user.email === session.user?.email
  );
  const loggedDirection = userDirection.find(
    (user) => user.email === session.user?.email
  );

  if (loggedStudent) {
    return loggedStudent;
  } else if (loggedDirection) {
    return loggedDirection;
  }
  // else if none of them, logout
  else {
    return { status: "Unknown user!!!" };
  }
});
