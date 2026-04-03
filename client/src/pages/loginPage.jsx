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

  // Redirect if user is already logged in
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
      className="min-h-screen flex items-center justify-center bg-gray-100 bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1000')" }} // Swapped for a working URL
    >
      <form
        onSubmit={onSubmitHandler}
        className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-[400px] border border-gray-100"
      >
        <h1 className="text-3xl font-extrabold text-center mb-2 text-gray-800">
          {state === "login" ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-gray-500 text-center mb-8">
            {state === "login" ? "Enter your details to sign in" : "Join us to get started"}
        </p>

        {state === "signup" && (
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1 text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-gray-700">Email Address</label>
          <input
            type="email"
            placeholder="name@example.com"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1 text-gray-700">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transform transition-active active:scale-95"
        >
          {state === "login" ? "Login" : "Sign Up"}
        </button>

        <p className="text-center mt-6 text-sm text-gray-600">
          {state === "login" ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => setState(state === "login" ? "signup" : "login")}
            className="text-blue-600 font-bold cursor-pointer ml-2 hover:underline"
          >
            {state === "login" ? "Create Account" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;