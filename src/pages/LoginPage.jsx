import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../feature/auth/contexts/AuthContext";
import validateLogin from "../feature/auth/validations/validate-login";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState({});

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const validateError = validateLogin(input);
      if (validateError) {
        return setError(validateError);
      }
      await login(input);
      toast.success("login success");
    } catch (err) {
      console.log(err);
      // toast.error(err.response?.data.msg);
      toast.error(err.response?.data);
      // console.log(err.response);
    }
  };

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const { login } = useAuth();

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleSubmitForm}>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            onChange={handleChangeInput}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChangeInput}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2">
            Don't have an account yet?
            <Link className="underline font-bold" to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
