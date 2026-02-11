import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const signupSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must include an uppercase letter")
    .matches(/[0-9]/, "Password must include a number")
    .matches(
      /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/,
      "Password must include a special character",
    )
    .required("Password is required"),
});
