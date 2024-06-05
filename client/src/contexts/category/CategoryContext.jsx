import React, { createContext, useContext, useEffect, useState } from 'react';
import api from 'utils/api';
import toast from 'react-hot-toast';

const CategoryContext = createContext();

export const useCategory = () => {
  return useContext(CategoryContext);
};

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/api/category/getall');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Error fetching categories', { position: 'top-right' });
    }
  };

  const addCategory = async (categoryData) => {
    try {
      const response = await api.post('/api/category/create', categoryData);
      setCategories((prevCategories) => [...prevCategories, response.data]);
      toast.success('Category added successfully', { position: 'top-right' });
      fetchCategories(); // Fetch updated list of categories
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error('Error adding category', { position: 'top-right' });
    }
  };

  const updateCategory = async (categoryData) => {
    try {
      const response = await api.put(`/api/category/update/${categoryData._id}`, categoryData);
      await fetchCategories();
      toast.success('Category updated successfully', { position: 'top-right' });
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Error updating category', { position: 'top-right' });
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      await api.delete(`/api/category/delete/${categoryId}`);
      setCategories((prevCategories) => 
        prevCategories.filter((cat) => cat._id !== categoryId)
      );
      toast.success('Category deleted successfully', { position: 'top-right' });
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Error deleting category', { position: 'top-right' });
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        fetchCategories,
        addCategory,
        updateCategory,
        deleteCategory
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
