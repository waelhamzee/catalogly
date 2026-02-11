import { BadRequestError } from "./errors.js";

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_UPPERCASE_REGEX = /[A-Z]/;
const PASSWORD_NUMBER_REGEX = /[0-9]/;
const PASSWORD_SPECIAL_REGEX = /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/;

export function validatePassword(password: string): true {
  if (password.length < PASSWORD_MIN_LENGTH) {
    throw new BadRequestError("Password must be at least 8 characters");
  }
  if (!PASSWORD_UPPERCASE_REGEX.test(password)) {
    throw new BadRequestError("Password must include an uppercase letter");
  }
  if (!PASSWORD_NUMBER_REGEX.test(password)) {
    throw new BadRequestError("Password must include a number");
  }
  if (!PASSWORD_SPECIAL_REGEX.test(password)) {
    throw new BadRequestError("Password must include a special character");
  }
  return true;
}
