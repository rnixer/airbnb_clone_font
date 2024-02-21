import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../feature/auth/contexts/AuthContext";
import validateLogin from "../feature/auth/validations/validate-login";
import { toast } from "react-toastify";
import Input from "../component/input";
import { usePlace } from "../contexts/PlaceContext";
import Spinner from "../component/Spinner";

export default function LoginPage() {
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  // const {
  //   // setOnFetch,
  //   setConditionBooking,
  // } = usePlace();

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const validateError = validateLogin(input);
      if (validateError) {
        return setError(validateError);
      }
      setLoading(true);
      await login(input);
      window.location.reload();
      // setOnFetch((c) => !c);
      toast.success("login success");
    } catch (err) {
      toast.error(err.response?.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const { login } = useAuth();

  return (
    <>
      {loading && <Spinner />}

      <div className=" grow flex items-center justify-around">
        <div className="my-64">
          <h1 className="text-4xl text-center mb-4">Login</h1>
          <form className="max-w-md mx-auto" onSubmit={handleSubmitForm}>
            <Input
              type="email"
              name="email"
              placeholder="E-mail"
              onChange={handleChangeInput}
              value={input.email}
              errorMessage={error.email}
            />
            <Input
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChangeInput}
              value={input.password}
              errorMessage={error.password}
            />

            <button className="primary  hover:bg-hv">Login</button>

            <div className="text-center py-2">
              Don't have an account yet?
              <Link className="underline font-bold" to={"/register"}>
                Register now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
