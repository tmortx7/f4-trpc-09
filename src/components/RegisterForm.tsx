import type { FormikHelpers } from 'formik';
import { Formik, Form } from 'formik';
import { z } from 'zod';
import { TextField } from './TextField';

const RegisterSchema = z.object({
  name: z.string(),
  email: z.string().email().min(2),
  password: z.string().min(4),
})

type IRegister = z.infer<typeof RegisterSchema>


export const RegisterForm = () => {
  return (
    <div className="flex flex-row justify-center w-full mt-[100px]">
      <h1>Register</h1>
      <Formik<IRegister>
        initialValues={{
          name: '',
          email: '',
          password: ""
        }}
        onSubmit={(
          values:IRegister,
          { setSubmitting }: FormikHelpers<IRegister>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form>
          <TextField name="name" label="Name" autoComplete='off' />
          <TextField name="email" label="Email" type="email" autoComplete='off'/>
          <TextField name="password" label="Password" type="password" autoComplete='off'/>

          <button className="btn w-full max-w-xs mt-4" type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};