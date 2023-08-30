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
  // console.log("input_data:-------------------------------", input_data);

  if (body.email && body.password) {
    await prisma.direction
      .create({
        data: input_data,
      })
      .then((response) => {
        request = response;
        console.log("Direction created successfully");
      })
      .catch((e) => {
        console.log("Internal Server Error:\n" + e.message);
        createError({
          statusCode: 500,
          statusMessage: "Internal Server Error",
        });
        return { message: "Internal Server Error.\n" + e };
      });
  }

  // case where we get one unique student
  else if (input_data.hasOwnProperty("uniqueId")) {
    await prisma.direction
      .findUnique({
        where: {
          id: input_data.uniqueId,
        },
      })
      .then((response) => {
        request = response;
        console.log("Direction retrieved successfully");
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
    console.log("Bad Request: Missing Parameter");
    createError({
      statusCode: 400,
      statusMessage: "Bad Request: Missing Parameter",
    });
    return { message: "Bad Request: Missing Parameter" };
  }

  return request;
});
