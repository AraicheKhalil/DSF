import * as Yup from "yup";

const getCharacterValidationError = (str) => {
  return `Your password must have at least 1 ${str} `;
};

const stringValidation = (message = "Field is required") =>
  Yup.string().required(message);

export const loginSchema = Yup.object({
  email: stringValidation().email(),
  password: stringValidation(),
});
// export const emailSchema = Yup.object({
//   email: loginSchema.fields.email,
// });

// export const passwordSchema = Yup.object({
//   password: stringValidation("Password is required")
//     .min(6, "Password must be at least 6 characters")
//     .matches(/[0-9]/, getCharacterValidationError("digit"))
//     .matches(/[a-z]/, getCharacterValidationError("lowercase character"))
//     .matches(/[A-Z]/, getCharacterValidationError("uppercase character")),
//   confirmPassword: stringValidation("Confirm password is required").oneOf(
//     [Yup.ref("password"), null],
//     "Passwords must match"
//   ),
// });

export const signupSchema = Yup.object({
  firstName: stringValidation("First name is required"),
  lastName: stringValidation("Last name is required"),
  email: stringValidation("Email is required").email(),
  password: stringValidation("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase character"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase character")),
});

export const emailSchema = Yup.object({
  email: loginSchema.fields.email,
});

export const passwordSchema = Yup.object({
  password: stringValidation("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase character"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase character")),
  confirmPassword: stringValidation("Confirm password is required").oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
