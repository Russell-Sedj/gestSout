import { getServerSession } from "#auth";

const userStudent = await $fetch("api/student");
const userDirection = await $fetch("api/direction");
const users = userStudent.concat(userDirection);

export default eventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    return { status: "unauthenticated!" };
  }

  const user = users.find((user) => user.email === session.user?.email);
  return { id: user?.id, email: user?.email };
});
