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

  if (input_data.id) {
    await prisma.direction
      .update({
        where: {
          id: input_data.id,
        },
        data: input_data,
      })
      .then((response) => {
        request = response;
        console.log("Direction updated successfully");
      })
      .catch((e) => {
        console.log("Internal Server Error:\n" + e.message);
        createError({
          statusCode: 500,
          statusMessage: "Internal Server Error",
        });
        return { message: "Internal Server Error.\n" + e };
      });
  } else {
    console.log("Bad Request: Some parameters are missing");
    createError({
      statusCode: 400,
      statusMessage: "Bad Request: Some parameters are missing",
    });
    return { message: "Bad Request: Some parameters are missing" };
  }

  return request;
});
