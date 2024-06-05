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

  useEffect(() => {
    fetchUsers();
    fetchRoles(); // Fetch roles when the component mounts
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
      fetchUsers(); // Fetch updated list of users
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

  return (
    <UserContext.Provider
      value={{
        users,
        roles,
        fetchUsers,
        addUser,
        updateUser,
        deleteUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
