import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './css/login.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleUserIdChange = (e) => setUserId(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !password) {
      alert("Please fill in both fields.");
      return;
    }

    const data = { userId, password };

    try {
      const response = await axios.post("http://localhost:8082/loginUser", data);
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("authToken", token);
        alert("Login Successful");
        navigate("/home");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          alert("Invalid credentials. Please try again.");
        } else if (error.response.status === 500) {
          alert("Server error. Please try again later.");
        } else {
          alert(`Unexpected error: ${error.response.statusText}`);
        }
      } else {
        console.error("Login error: ", error);
        alert("Network error. Please check your connection");
      }
    }
  };

  const goToRegister = () => navigate("/register");

  return (
    <div className="container">
      <div className="logo-container">
        <img src="/task-manager-logo.png" alt="Task Manager Logo" className="logo" />
        <h1>Welcome Back</h1>
        <p className="subtitle">Sign in to continue managing your tasks</p>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="userId">User ID:</label>
        <input
          id="userId"
          type="email"
          placeholder="Enter your User ID"
          value={userId}
          onChange={handleUserIdChange}
        />

        <label htmlFor="password">Password:</label>
        <div className="password-wrapper">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button type="submit">Login</button>
        <button type="button" onClick={goToRegister}>
          Don't have an account? Sign Up
        </button>
      </form>
    </div>
  );
}

export default Login;
