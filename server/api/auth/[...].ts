// file: ~/server/api/auth/[...].ts
import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NuxtAuthHandler({
  pages: {
    // Change the default behavior to use `/login` as the path for the sign-in page
    signIn: "/login",
  },

  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: "Credentials",
      async authorize(credentials: any) {
        // const user = {
        //   email: "user@example.com",
        //   password: "123",
        // };

        const student_list = await $fetch("/api/student/");
        console.log(
          "student: ---------------------------------\n",
          student_list
        );

        // const userWithEmail = users.find((user) => user.email === "abc@gmail.com");
        const user = student_list.find(
          (user) =>
            user.email === credentials.email &&
            user.password === credentials.password
        );

        console.log(credentials);
        if (
          user &&
          credentials?.email === user.email &&
          credentials?.password === user.password
        ) {
          return user;
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
