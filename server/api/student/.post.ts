import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { getServerSession } from "#auth";

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

  // show log of the user who make the request
  // if (
  //   !input_data.hasOwnProperty("listDirectionId") &&
  //   !input_data.hasOwnProperty("uniqueId")
  // ) {
  //   await getServerSession(event).then((res) => {
  //     console.log("--------------------POST request-----------------------");
  //     console.log("By: ", res?.user?.email, "---------------------->");
  //   });
  // }

  // case where we want to create a student
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
        console.log("Student created successfully");
      })
      .catch((e) => {
        console.log("Internal Server Error:\n" + e.message);
        return { message: "Internal Server Error:\n" + e.message };
      });
  }

  // case where we want to get all students
  else if (
    input_data.hasOwnProperty("listDirectionId") &&
    input_data.hasOwnProperty("year")
  ) {
    await prisma.student
      .findMany({
        where: {
          directionId: input_data.listDirectionId,
          year: input_data.year,
        },
      })
      .then((response) => {
        request = response;
        console.log("All students retrieved successfully");
      })
      .catch((e) => {
        console.log("Internal Server Error:\n" + e.message);
        return { message: "Internal Server Error:\n" + e.message };
      });
  }

  // case where we get one unique student
  else if (input_data.hasOwnProperty("uniqueId")) {
    await prisma.student
      .findUnique({
        where: {
          id: input_data.uniqueId,
        },
      })
      .then((response) => {
        request = response;
        console.log("Student retrieved successfully");
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
