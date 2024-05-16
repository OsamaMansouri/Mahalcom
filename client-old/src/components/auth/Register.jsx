import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import AuthLayout from "../../layouts/AuthLayout";
import { Helmet } from "react-helmet";
import logoImage from "../../assets/logo.png"; // Import your logo image

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
    <AuthLayout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register - MAHALCOM</title>
      </Helmet>

      <div className="content-body">
        <div className="auth-wrapper auth-v1 px-2">
          <div className="auth-inner py-2">
            <div className="card mb-0">
              <div className="card-body">
                <a href="#" className="brand-logo">
                  <img src={logoImage} alt="Logo" style={{ width: "165px" }} />
                </a>

                <h4 className="card-title mb-1">Adventure starts here 🚀</h4>
                <p className="card-text mb-2">
                  Make your app management easy and fun!
                </p>

                <form className="auth-login-form mt-2" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="fname" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fname"
                      name="fname"
                      value={formData.fname}
                      onChange={handleChange}
                      placeholder="First Name"
                      autoComplete="off"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="lname" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lname"
                      name="lname"
                      value={formData.lname}
                      onChange={handleChange}
                      placeholder="Last Name"
                      autoComplete="off"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      autoComplete="off"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      autoComplete="off"
                    />
                  </div>

                  <div className="form-group">
                    <button className="btn btn-primary btn-block" type="submit">
                      Register
                    </button>
                  </div>
                </form>

                <p className="text-center mt-2">
                  <span>Already have an account?</span>
                  <Link to="/login">
                    <span>Sign in</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
