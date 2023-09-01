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
  // console.log("input_data: ----------------------\n", input_data);

  // check is the profil is completed
  const student = await prisma.student.findUnique({
    where: { id: input_data.id },
  });
  if (student) {
    // console.log("Student -------------------------\n", student);
    if (
      student.year &&
      student.password &&
      input_data.firstname &&
      input_data.lastname &&
      input_data.email &&
      input_data.telephone &&
      input_data.address &&
      input_data.field &&
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
    input_data.is_credit_enough &&
    !input_data.disableReady
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

  // case where disable ready for presentation
  else if (input_data.hasOwnProperty("disableReady")) {
    await prisma.student.update({
      where: { id: input_data.id },
      data: { is_ready_for_presentation: false },
    });
  }

  // case where shit
  else {
    console.log("Bad Request: Missing Parameters");
    createError({
      statusCode: 400,
      statusMessage: "Bad Request: Missing Parameters",
    });
    return {
      message: "Bad Request: Missing Parameters",
    };
  }
  return {
    request: request,
  };
});
