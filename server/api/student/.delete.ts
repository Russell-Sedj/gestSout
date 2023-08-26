import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let request = null;

  if (body.id) {
    await prisma.student
      .delete({
        where: {
          id: body.id,
        },
      })
      .then((response) => {
        request = response;
      })
      .catch((e) => {
        console.log("Internal Server Error:\n" + e.message);
        createError({
          statusCode: 500,
          statusMessage: "Internal Server Error.\n" + e,
        });
        return { message: "Internal Server Error:\n" + e.message };
      });
  } else {
    console.log("Bad Request: Missing Id");
    createError({
      statusCode: 400,
      statusMessage: "Bad Request: Missing ID",
    });
    return { message: "Bad Request: Missing Id" };
  }
  return request;
});
