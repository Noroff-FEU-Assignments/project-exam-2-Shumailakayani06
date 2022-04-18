import * as yup from 'yup';

export const userLoginSchema = yup.object().shape({
  firstName: yup
  .string()
  .min(3)
  .required('Please enter a valid first name'),
  lastName: yup
  .string()
  .min(4)
  .required('Please enter a valid last name'),
  email: yup
    .string()
    .required('Please enter a valid email address')
    .email('Please enter a valid email address'),
  password: yup.string()
  .min(4)
  .max(15)
  .required('Please enter a valid password'),
});