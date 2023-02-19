import { Formik, Form } from "formik";
import { signIn } from "next-auth/react";
import router from "next/router";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Meta from "./Meta";
import { TextField } from "./TextField";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

type ILogin = z.infer<typeof LoginSchema>;

export const LoginForm = () => {
  return (
    <>
      <Meta title="login" description="login" image="/favicon.png" />
      <div className="mt-[100px] flex w-full flex-row justify-center">
        <div className="p-[50px] shadow">
          <p className="mb-6 font-sans text-4xl">Signin</p>
          <Formik<ILogin>
            validateOnBlur={false}
            validateOnChange={true}
            initialValues={{
              email: " ",
              password: "",
            }}
            validationSchema={toFormikValidationSchema(LoginSchema)}
            onSubmit={async (values: ILogin) => {
              try {
                await signIn("credentials", {
                  email: values.email,
                  password: values.password,
                  redirect: true,
                });
              } catch (e) {
                console.log(e);
              }
            }}
          >
            <Form>
              <TextField
                name="email"
                label="Email"
                type="email"
                autoComplete="off"
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                autoComplete="off"
              />

              <button className="btn mt-4 w-full max-w-xs" type="submit">
                Continue
              </button>
            </Form>
          </Formik>
          <div className="divider mt-10">New to CSS??</div>
          <button
            className="btn-info btn"
            onClick={() => router.push("/user/new")}
          >
            Create your Account
          </button>
        </div>
      </div>
    </>
  );
};
