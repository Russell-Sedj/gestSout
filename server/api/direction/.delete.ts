import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let request = null;

  if (body.id) {
    await prisma.direction
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
        return { message: "Internal Server Error.\n" + e };
      });
  } else {
    console.log("Bad Request: Missing ID");
    createError({
      statusCode: 400,
      statusMessage: "Bad Request: Missing ID",
    });
    return { message: "Bad Request: Missing ID" };
  }
  return request;
});
