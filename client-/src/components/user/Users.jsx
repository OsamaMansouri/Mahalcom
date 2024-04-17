import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

import "../../styles/global.css";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Redirect user to login page if token doesn't exist
          window.location.href = "/login";
          return;
        }
        const response = await axios.get(
          "http://localhost:8000/api/user/getall",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        // Handle error, such as unauthorized access
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/user/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success("User deleted successfully", { position: "top-right" });
    } catch (error) {
      // Handle error
      console.error(error);
      toast.error("Failed to delete user", { position: "top-right" });
    }
  };

  return (
    <div className="userTable">
      <Link to={"/user/add"} className="addButton">
        Add User
      </Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>User name</th>
            <th>User Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>
                {user.fname} {user.lname}
              </td>
              <td>{user.email}</td>
              <td className="actionButtons">
                <Link to={`/user/edit/${user._id}`}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
                <button onClick={() => deleteUser(user._id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
