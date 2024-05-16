import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Users from "./components/dashboard/users/Users";
import Home from "./components/dashboard/sections/Home.jsx";
import AddUser from "./components/dashboard/users/AddUser";
import EditUser from "./components/dashboard/users/EditUser";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <Home />
              </DashboardLayout>
            }
          />
          <Route
            path="/users"
            element={
              <DashboardLayout>
                <Users />
              </DashboardLayout>
            }
          />
          <Route
            path="/user/add"
            element={
              <DashboardLayout>
                <AddUser />
              </DashboardLayout>
            }
          />
          <Route
            path="/user/edit/:id"
            element={
              <DashboardLayout>
                <EditUser />
              </DashboardLayout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
