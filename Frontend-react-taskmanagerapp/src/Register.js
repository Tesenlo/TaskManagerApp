import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './css/Register.css';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill in all the fields!");
      return;
    }

    const data = { name, email, password };

    try {
      const response = await axios.post("http://localhost:8082/addUser", data);
      if (response.status === 201) {
        alert("Registration Successful!");
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data);
      } else {
        console.error("Registration error: ", error);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <div className="logo-container">
        <img src="/task-manager-logo.png" alt="Task Manager Logo" className="logo" />
        <h1>Create Account</h1>
        <p className="subtitle">Sign up to start managing your tasks</p>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name:</label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email Address:</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
        <button type="button" onClick={() => navigate("/login")}>Already have an account? Login</button>
      </form>
    </div>
  );
}

export default Register;
