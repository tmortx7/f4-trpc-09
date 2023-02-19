import type { FormikHelpers } from "formik";
import { Formik, Form } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { TextField } from "./TextField";

const RegisterSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(4),
});

type IRegister = z.infer<typeof RegisterSchema>;

export const RegisterForm = () => {
  return (
    <div className="mt-[100px] flex w-full flex-row justify-center">
      <div className="p-[50px] shadow">
        <p className="text-5xl mb-6 font-sans">Register!!</p>
        <Formik<IRegister>
          validateOnBlur={false}
          validateOnChange={true}
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={toFormikValidationSchema(RegisterSchema)}
          onSubmit={(
            values: IRegister,
            { setSubmitting, resetForm }: FormikHelpers<IRegister>
          ) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
              resetForm()
            }, 500);
          }}
        >
          <Form>
            <TextField name="name" label="Name" autoComplete="off" />
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
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
