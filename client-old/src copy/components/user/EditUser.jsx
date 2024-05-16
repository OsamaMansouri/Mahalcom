import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

import "../../styles/global.css";

const EditUser = () => {
  const users = {
    fname: "",
    lname: "",
    email: "",
    password: "",
  };

  const { id } = useParams();
  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect user to login page if token doesn't exist
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:8000/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, navigate]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Redirect user to login page if token doesn't exist
        navigate("/login");
        return;
      }

      await axios.put(`http://localhost:8000/api/user/update/${id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("User updated successfully", { position: "top-right" });
      navigate("/users");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user", { position: "top-right" });
    }
  };

  return (
    <div className="addUser">
      <Link to={"/"}>Back</Link>
      <h3>Edit User</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            onChange={inputChangeHandler}
            value={user.fname}
            id="fname"
            name="fname"
            autoComplete="off"
            placeholder="First Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            onChange={inputChangeHandler}
            value={user.lname}
            id="lname"
            name="lname"
            autoComplete="off"
            placeholder="Last Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Email</label>
          <input
            type="text"
            onChange={inputChangeHandler}
            value={user.email}
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
          />
        </div>
        <div className="inputGroup">
          <button type="submit"> Update User</button>
        </div>
      </form>
    </div>
  );
};
export default EditUser;
