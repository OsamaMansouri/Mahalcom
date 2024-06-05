import React, { createContext, useContext, useState, useEffect } from 'react';
import api from 'utils/api';
import toast from 'react-hot-toast';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchUserDetails();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/api/user/getall');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Error fetching users', { position: 'top-right' });
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/role/getall`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setRoles(data);
      } else {
        console.error('Unexpected response format:', data);
        toast.error('Error fetching roles', { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
      toast.error('Error fetching roles', { position: 'top-right' });
    }
  };

  const addUser = async (userData) => {
    try {
      const response = await api.post('/api/user/create', userData);
      setUsers((prevUsers) => [...prevUsers, response.data]);
      toast.success('User added successfully', { position: 'top-right' });
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error('Error adding user', { position: 'top-right' });
    }
  };

  const updateUser = async (id, userData) => {
    try {
      const response = await api.put(`/api/user/update/${id}`, userData);
      await fetchUsers();
      toast.success('User updated successfully', { position: 'top-right' });
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Error updating user', { position: 'top-right' });
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/api/user/delete/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      toast.success('User deleted successfully', { position: 'top-right' });
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user', { position: 'top-right' });
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await api.get('/api/auth/details');
      setUserDetails(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const updateUserDetails = async (userData) => {
    try {
      const response = await api.put('/api/auth/update', userData);
      setUserDetails(response.data);
      toast.success('User details updated successfully', { position: 'top-right' });
    } catch (error) {
      console.error('Error updating user details:', error);
      toast.error('Error updating user details', { position: 'top-right' });
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    try {
      await api.put('/api/auth/change-password', { oldPassword, newPassword });
      toast.success('Password changed successfully', { position: 'top-right' });
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.msg, { position: 'top-right' });
      } else {
        toast.error('An error occurred', { position: 'top-right' });
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        roles,
        userDetails,
        fetchUsers,
        addUser,
        updateUser,
        deleteUser,
        fetchUserDetails,
        updateUserDetails,
        changePassword
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
