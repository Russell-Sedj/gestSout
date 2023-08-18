import { getServerSession } from "#auth";

export default eventHandler(async (event) => {
  // get user from database student and direction
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
    return {
      id: loggedStudent.id,
      email: loggedStudent.email,
      lastname: loggedStudent.lastname,
      firstname: loggedStudent.firstname,
      role: loggedStudent.role,
    };
  } else if (loggedDirection) {
    return {
      id: loggedDirection.id,
      email: loggedDirection.email,
      role: loggedDirection.role,
      university_name: loggedDirection.university_name,
    };
  }
});
