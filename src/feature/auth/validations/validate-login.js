import Joi from "joi";
import validate from "../../../utils/validate";

const loginSchema = Joi.object({
  email: Joi.string().required().messages({
    "string.empty": "email is require",
  }),
  password: Joi.string().required().messages({
    "string.empty": "password is require",
  }),
});

const validateLogin = (input) => validate(loginSchema)(input);

export default validateLogin;
