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

  // ✅ Redirect after login/signup success
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white shadow-lg rounded-lg p-8 w-[400px]"
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          {state === "login" ? "Login" : "Create Account"}
        </h1>

        {state === "signup" && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded mb-4"
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
          className="w-full border p-3 rounded mb-4"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
        >
          {state === "login" ? "Login" : "Create Account"}
        </button>

        <p className="text-center mt-4">
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span
            onClick={() =>
              setState(state === "login" ? "signup" : "login")
            }
            className="text-blue-500 cursor-pointer ml-2"
          >
            {state === "login" ? "Create Account" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;