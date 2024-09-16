import * as Yup from "yup";

export const signInFormSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(8, "must contain at least 8 characters")
    .max(64)
    .required(),
});