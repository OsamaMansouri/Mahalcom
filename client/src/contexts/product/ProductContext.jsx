import React, { createContext, useContext, useState, useEffect } from 'react';
import api from 'utils/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stocks, setStocks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await api.get('/api/product/getall');
        setProducts(productResponse.data);

        const categoryResponse = await api.get('/api/category/getall');
        setCategories(categoryResponse.data);

        const stockResponse = await api.get('/api/stock/getall');
        setStocks(stockResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const addProduct = async (newProduct) => {
    try {
      const response = await api.post('/api/product/create', newProduct);
      setProducts([...products, response.data]);
      toast.success('Product added successfully', { position: 'top-right' });
      navigate('/products');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error adding product', { position: 'top-right' });
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/api/product/delete/${id}`);
      setProducts(products.filter((product) => product._id !== id));
      toast.success('Product deleted successfully', { position: 'top-right' });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product', { position: 'top-right' });
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const response = await api.put(`/api/product/update/${id}`, updatedProduct);
      setProducts(products.map((product) => (product._id === id ? response.data : product)));
      toast.success('Product updated successfully', { position: 'top-right' });
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Error updating product', { position: 'top-right' });
    }
  };

  return (
    <ProductContext.Provider value={{ products, categories, stocks, addProduct, deleteProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
