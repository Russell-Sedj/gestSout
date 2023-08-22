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

  if (
    input_data.firstname &&
    input_data.lastname &&
    input_data.email &&
    input_data.telephone &&
    input_data.address &&
    input_data.field &&
    input_data.year
  ) {
    await prisma.student
      .create({
        data: input_data,
      })
      .then((response) => {
        request = response;
      })
      .catch((e) => {
        console.log("Internal Server Error:\n" + e.message);
        return { message: "Internal Server Error:\n" + e.message };
      });
  } else if (
    input_data.hasOwnProperty("directionId") &&
    input_data.hasOwnProperty("year")
  ) {
    await prisma.student
      .findMany({
        where: {
          directionId: input_data.directionId,
          year: input_data.year,
        },
      })
      .then((response) => {
        request = response;
      })
      .catch((e) => {
        console.log("Internal Server Error:\n" + e.message);
        return { message: "Internal Server Error:\n" + e.message };
      });
  } else {
    console.log(
      "Bad Request: Missing parameters"
      // "Bad Request: Missing nom or prenom or email or telephone or field"
    );
    return {
      message: "Bad Request: Missing parameters",
      // "Bad Request: Missing nom or prenom or email or password or telephone or field",
    };
  }
  return {
    request: request,
  };
});
