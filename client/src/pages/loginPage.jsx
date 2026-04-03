import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  // Added 'loading' and 'error' which are common in AuthContexts
  const { login, authUser, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const [state, setState] = useState("login");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // Redirect if user is already authenticated
  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser, navigate]);

  // Generic change handler to reduce repetitive code
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await login(state, formData);
    } catch (err) {
      console.error("Authentication failed:", err);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 bg-cover bg-center"
      style={{ backgroundImage: "url('/bgImage.svg')" }}
    >
      <form
        onSubmit={onSubmitHandler}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md transition-all"
      >
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          {state === "login" ? "Welcome Back" : "Join Us"}
        </h1>
        <p className="text-center text-gray-500 mb-8">
          {state === "login" ? "Enter your details to login" : "Sign up for a new account"}
        </p>

        {/* Display context errors if they exist */}
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded mb-4 text-sm border border-red-200">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {state === "signup" && (
            <input
              name="fullName"
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.fullName}
              onChange={onChangeHandler}
              required
            />
          )}

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.email}
            onChange={onChangeHandler}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.password}
            onChange={onChangeHandler}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-6 p-3 rounded-lg font-semibold text-white transition-colors ${
            loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing..." : state === "login" ? "Login" : "Create Account"}
        </button>

        <p className="text-center mt-6 text-gray-600">
          {state === "login" ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={() => setState(state === "login" ? "signup" : "login")}
            className="text-blue-600 font-medium hover:underline ml-2"
          >
            {state === "login" ? "Sign Up" : "Log In"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;