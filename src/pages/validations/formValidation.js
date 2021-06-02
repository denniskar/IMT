import * as yup from "yup";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const userSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),

  clientId: yup.string().required(),
  businessNo: yup.string().required(),
  address: yup.string().required(),
  phoneNumber: yup.string(),
});

export const mainSchema = yup.object().shape({
  firstName: yup.string().required(),
  secondName: yup.string().required(),
  email: yup.string().email().required(),
  address: yup.string().required(),
  amount: yup.number().integer(),
  beneficiaryFname: yup.string().required(),
  beneficiarySname: yup.string().required(),
  email: yup.string().required(),
  Description: yup.string().required(),
});
