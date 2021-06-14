import * as yup from "yup";
import valid from "card-validator";

export const userSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),

  clientId: yup.string().required(),
  businessNo: yup.string().required(),
  address: yup.string().required(),
  phoneNumber: yup.string(),
});

export const mainSchema = yup.object().shape({
  name: yup
    .string()
    .required("First Name is required")
    .test("alphabets", "Name must only contain alphabets", (value) => {
      return /^[A-Za-z]+$/.test(value);
    })
    .test("length", "First Name must have more than 2 character", (value) => {
      return value && value.length > 2;
    }),
  secondName: yup
    .string()
    .required("Second Name is required")
    .test("alphabets", "Name must only contain alphabets", (value) => {
      return /^[A-Za-z]+$/.test(value);
    })
    .test("length", "Second Name must have more than 2 character", (value) => {
      return value && value.length > 2;
    }),
  email: yup.string().email().required(),
  address: yup.string(),
  amount: yup.number().integer(),
  beneficiaryFname: yup
    .string()
    .required("Name is required")
    .test("alphabets", "must only contain alphabets", (value) => {
      return /^[A-Za-z]+$/.test(value);
    })
    .test("length", "Name must have more than 2 character", (value) => {
      return value && value.length > 2;
    }),
  beneficiarySname: yup
    .string()
    .required("Name is required")
    .test("alphabets", "Name must only contain alphabets", (value) => {
      return /^[A-Za-z]+$/.test(value);
    })
    .test("length", " Name must have more than 2 character", (value) => {
      return value && value.length > 2;
    }),

  Description: yup.string(),
  number: yup
    .string()
    .test(
      "test-number",
      "Credit Card number is invalid",
      (value) => valid.number(value).isValid,
    ),
  expiry: yup
    .string()
    .test(
      "test-number",
      "expiry date is invalid",
      (value) => valid.expirationDate(value).isValid,
    ),
  cvc: yup
    .string()
    .test(
      "test-number",
      "expiry date is invalid",
      (value) => valid.cvv(value).isValid,
    ),
  email2: yup.string().email().required(),
});
