import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Users from "./components/user/Users";
import AddUser from "./components/user/AddUser";
import EditUser from "./components/user/EditUser";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

function App() {
  const route = createBrowserRouter([
    {
      path: "/users",
      element: <Users />,
    },
    {
      path: "/user/add",
      element: <AddUser />,
    },
    {
      path: "/user/edit/:id",
      element: <EditUser />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
