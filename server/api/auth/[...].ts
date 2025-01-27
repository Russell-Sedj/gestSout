// file: ~/server/api/auth/[...].ts
import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NuxtAuthHandler({
  pages: {
    // Change the default behavior to use `/login` as the path for the sign-in page
    signIn: "/login",
  },

  session: {
    // 2hours
    // maxAge: 2 * 60 * 60,
  },

  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: "Credentials",
      async authorize(credentials: any) {
        // console.log("credentials ----------------------------", credentials);

        const student_list = await $fetch("/api/student/");
        const direction_list = await $fetch("/api/direction/");
        const admin_list = await $fetch("/api/admin/");

        const userStudent = student_list.find(
          (userStudent) =>
            userStudent.email === credentials.email &&
            userStudent.password === credentials.password
        );
        const userDirection = direction_list.find(
          (userDirection) =>
            userDirection.email === credentials.email &&
            userDirection.password === credentials.password
        );
        const userAdmin = admin_list.find(
          (userAdmin) =>
            userAdmin.email === credentials.email &&
            userAdmin.password === credentials.password
        );

        if (
          userStudent &&
          credentials?.email === userStudent.email &&
          credentials?.password === userStudent.password
        ) {
          return userStudent;
        } else if (
          userDirection &&
          credentials?.email === userDirection.email &&
          credentials?.password === userDirection.password
        ) {
          return userDirection;
        } else if (
          userAdmin &&
          credentials?.email === userAdmin.email &&
          credentials?.password === userAdmin.password
        ) {
          return userAdmin;
        } else {
          console.error(
            "Warning: Malicious login attempt registered, bad credentials provided"
          );

          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        }
      },
    }),
  ],
});
