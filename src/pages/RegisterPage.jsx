import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../feature/auth/contexts/AuthContext";
import validateRegister from "../feature/auth/validations/validate-register";
import { toast } from "react-toastify";
import Input from "../component/input";

const initial = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterPage() {
  const [input, setInput] = useState(initial); // {firstName : 'aaa'}
  const [error, setError] = useState({});
  const { register } = useAuth();

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();

      const validateError = validateRegister(input);
      if (validateError) {
        return setError(validateError);
      }

      await register(input);
      toast.success("register succuss");
    } catch (error) {
      if (error.response?.data.message === "EMAIL_IN_USE")
        return setError({ email: "already in use" });
      toast.error("interal server error");
    }
  };

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={handleFormSubmit}>
          <Input
            type="name"
            name="name"
            placeholder="Firstname and Lastname"
            value={input.name}
            onChange={handleChangeInput}
            errorMessage={error.name}
          />
          <Input
            type="email"
            placeholder="E-mail"
            name="email"
            value={input.email}
            onChange={handleChangeInput}
            errorMessage={error.email}
          />
          <Input
            type="password"
            name="password"
            placeholder="password"
            value={input.password}
            onChange={handleChangeInput}
            errorMessage={error.password}
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="confirmPassword"
            value={input.confirmPassword}
            onChange={handleChangeInput}
            errorMessage={error.confirmPassword}
          />
          <button className="primary">Register</button>
          <div className="text-center py-2">
            Don't have an account yet?{" "}
            <Link className="underline font-bold" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
