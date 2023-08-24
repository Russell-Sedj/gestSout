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
      input_data.firstname &&
      input_data.lastname &&
      input_data.email &&
      input_data.password &&
      input_data.telephone &&
      input_data.address &&
      input_data.field &&
      input_data.year &&
      input_data.master &&
      input_data.internMaster &&
      input_data.subject
    ) {
      input_data.is_profil_information_complete = true;
    } else {
      input_data.is_profil_information_complete = false;
    }
  }

  // check if the student is ready for presentation
  if (
    input_data.is_profil_information_complete &&
    input_data.is_school_fees_paid &&
    input_data.is_credit_enough
  ) {
    input_data.is_ready_for_presentation = true;
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
        console.log("Student updated");
        request = response;
      })
      .catch((e) => {
        console.log("Internal Server Error:\n" + e.message);
        createError({
          statusCode: 500,
          statusMessage: "Internal Server Error",
        });
        return { message: "Internal Server Error:\n" + e.message };
      });
  }

  // case where shit
  else {
    console.log(
      "Bad Request: Missing nom or prenom or email or telephone or field"
    );
    createError({
      statusCode: 400,
      statusMessage:
        "Bad Request: Missing nom or prenom or email or telephone or field",
    });
    return {
      message:
        "Bad Request: Missing nom or prenom or email or password or telephone or field",
    };
  }
  return {
    request: request,
  };
});
