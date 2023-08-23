import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let request = null;

  const input_data: any = {};
  for (const key in body) {
    if (body.hasOwnProperty(key)) {
      input_data[key] = body[key];
    }
  }

  // check is the profil is completed
  const student = await prisma.student.findUnique({
    where: { id: input_data.id },
  });
  if (student) {
    if (
      student.firstname &&
      student.lastname &&
      student.email &&
      student.password &&
      student.telephone &&
      student.address &&
      student.field &&
      student.year &&
      student.master &&
      student.internMaster &&
      student.subject
    ) {
      input_data.is_profil_information_complete = true;
    } else {
      input_data.is_profil_information_complete = false;
    }
  }

  // now the job start!!
  if (
    input_data.id &&
    input_data.firstname &&
    input_data.lastname &&
    input_data.email &&
    input_data.telephone &&
    input_data.address &&
    input_data.field
  ) {
    await prisma.student
      .update({
        where: { id: input_data.id },
        data: input_data,
      })
      .then((response) => {
        request = response;
      })
      .catch((e) => {
        console.log("Internal Server Error:\n" + e.message);
        return { message: "Internal Server Error:\n" + e.message };
      });
  }

  // case where shit
  else {
    console.log(
      "Bad Request: Missing nom or prenom or email or telephone or field"
    );
    return {
      message:
        "Bad Request: Missing nom or prenom or email or password or telephone or field",
    };
  }
  return {
    request: request,
  };
});
