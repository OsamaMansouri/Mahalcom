import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/global.css";
import { toast } from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        formData
      );
      toast.success(response.data.msg, { position: "top-right" });
      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      toast.error("Registration failed", { position: "top-right" });
    }
  };

  return (
    <div className="addUser">
      <Link to={"/"}>Back</Link>
      <h3>Register</h3>
      <form className="addUserForm" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            autoComplete="off"
            placeholder="First Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Last Name"
          />
        </div>
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
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
