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

  if (
    input_data.name &&
    input_data.email &&
    input_data.telephone &&
    input_data.password
  ) {
    await prisma.admin
      .update({
        where: { id: input_data.id },
        data: input_data,
      })
      .then((response) => {
        console.log("Admin updated");
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
