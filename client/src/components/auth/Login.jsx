import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/global.css";
import { toast } from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        formData
      );
      const token = response.data.token;
      localStorage.setItem("token", token); // Store the token in local storage
      toast.success("Login successful", { position: "top-right" });
      // Handle successful login, such as redirecting to another page or updating the UI
    } catch (error) {
      toast.error("Login failed", { position: "top-right" });
    }
  };

  return (
    <div className="addUser">
      <Link to={"/"}>Back</Link>
      <h3>Login</h3>
      <form
        className="addUserForm"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Email"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Password"
          />
        </div>
        <div className="inputGroup">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
