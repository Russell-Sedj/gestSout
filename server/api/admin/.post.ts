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

  // case where we want to create a student
  if (
    input_data.name &&
    input_data.email &&
    input_data.telephone &&
    input_data.password
  ) {
    await prisma.admin
      .create({
        data: input_data,
      })
      .then((response) => {
        request = response;
        console.log("Admin created successfully");
      })
      .catch((e) => {
        console.log("Internal Server Error:\n" + e.message);
        return { message: "Internal Server Error:\n" + e.message };
      });
  }

  // case where shit
  else {
    console.log("Bad Request: Missing parameters");
    createError({
      statusCode: 400,
      statusMessage: "Bad Request: Missing parameters",
    });
    return {
      message: "Bad Request: Missing parameters",
    };
  }
  return {
    request: request,
  };
});
