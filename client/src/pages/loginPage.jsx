import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login, authUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [state, setState] = useState("login");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser, navigate]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await login(state, formData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/bgImage.svg')" }}
    >
      <div className="w-full max-w-md">
        <form
          onSubmit={onSubmitHandler}
          className="bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-8"
        >
          <h1 className="text-3xl font-bold text-center text-white mb-2">
            {state === "login" ? "Welcome Back" : "Create Account"}
          </h1>

          <p className="text-center text-white/80 mb-6">
            {state === "login"
              ? "Login to continue chatting"
              : "Create your new account"}
          </p>

          {state === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-xl mb-4 bg-white/80 outline-none"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl mb-4 bg-white/80 outline-none"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-xl mb-6 bg-white/80 outline-none"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-3 rounded-xl font-semibold"
          >
            {state === "login" ? "Login" : "Create Account"}
          </button>

          <p className="text-center text-white mt-6">
            {state === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <span
              onClick={() =>
                setState(state === "login" ? "signup" : "login")
              }
              className="ml-2 text-yellow-300 font-semibold cursor-pointer hover:underline"
            >
              {state === "login" ? "Create Account" : "Login"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;