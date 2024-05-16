import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import AuthLayout from "../../layouts/AuthLayout";
import { Helmet } from "react-helmet";
import logoImage from "../../assets/logo.png"; // Import your logo image

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
      localStorage.setItem("token", token);
      toast.success("Login successful", { position: "top-right" });
    } catch (error) {
      toast.error("Login failed", { position: "top-right" });
    }
  };

  return (
    <AuthLayout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login - MAHALCOM</title>
      </Helmet>

      <div className="content-body">
        <div className="auth-wrapper auth-v1 px-2">
          <div className="auth-inner py-2">
            <div className="card mb-0">
              <div className="card-body">
                <a href="#" className="brand-logo">
                  <img src={logoImage} alt="Logo" style={{ width: "165px" }} />
                </a>

                <h4 className="card-title mb-1">Log In! 👋</h4>
                <p className="card-text mb-2">
                  Please sign-in to your account and start the adventure
                </p>

                <form
                  className="auth-login-form mt-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                  }}
                >
                  <div className="form-group">
                    <label htmlFor="login-email" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="login-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      aria-describedby="login-email"
                      autoFocus
                    />
                  </div>

                  <div className="form-group">
                    <div className="d-flex justify-content-between">
                      <label htmlFor="login-password">Password</label>
                      <a href="">
                        <small>Forgot Password?</small>
                      </a>
                    </div>
                    <div className="input-group input-group-merge form-password-toggle">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control form-control-merge"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="Password"
                      />
                      <div
                        className="input-group-append"
                        onClick={togglePasswordVisibility}
                      >
                        <span className="input-group-text cursor-pointer">
                          {showPassword ? (
                            <i data-feather="eye-off"></i>
                          ) : (
                            <i data-feather="eye"></i>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="remember-me"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="remember-me"
                      >
                        Remember Me
                      </label>
                    </div>
                  </div>
                  <button className="btn btn-primary btn-block" type="submit">
                    Sign in
                  </button>
                </form>

                <p className="text-center mt-2">
                  <span>New on our platform?</span>
                  <Link to="/register">
                    <span>Create an account</span>
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

export default Login;
