import Joi from "joi";
import validate from "../../../utils/validate";

const registerSchema = Joi.object({
  name: Joi.string().required().trim().messages({
    "string.empty": "last name is require",
  }),
  email: Joi.string().email({ tlds: false }).required().messages({
    "alternatives.match": "invalid email address or mobile number",
  }),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,}$/)
    .required()
    .messages({
      "string.empty": "password is required",
      "string.pattern.base":
        "password must be at least 6 characters and contain only alphabet and number",
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .strip() //เพื่อลบค่าconfirmPassword หลัง validate เสร็จ
    .messages({
      "string.empty": "password is required",
      "any.only": "password and confirm password did not match",
    }),
});

const validateRegister = (input) => validate(registerSchema)(input);

export default validateRegister;
