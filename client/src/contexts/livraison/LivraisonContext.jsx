import React, { createContext, useContext, useState, useEffect } from 'react';
import api from 'utils/api';
import toast from 'react-hot-toast';

const LivraisonContext = createContext();

export const useLivraison = () => {
  return useContext(LivraisonContext);
};

export const LivraisonProvider = ({ children }) => {
  const [livraisons, setLivraisons] = useState([]);
  const [livreurs, setLivreurs] = useState([]);

  useEffect(() => {
    fetchLivraisons();
    fetchLivreurs();
  }, []);

  const fetchLivraisons = async () => {
    try {
      const response = await api.get('/api/livraison/getUndelivered');
      setLivraisons(response.data);
    } catch (error) {
      console.error('Error fetching livraisons:', error);
    }
  };

  const fetchLivreurs = async () => {
    try {
      const response = await api.get('/api/livreur/getall');
      setLivreurs(response.data);
    } catch (error) {
      console.error('Error fetching livreurs:', error);
    }
  };

  const addLivraison = async (livraison) => {
    try {
      const response = await api.post('/api/livraison/create', livraison);
      toast.success('Livraison added successfully', { position: 'top-right' });

      setLivraisons((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Error adding livraison:', error);
      toast.error('Error adding livraison');
    }
  };

  const deleteLivraison = async (id) => {
    try {
      await api.delete(`/api/livraison/delete/${id}`);
      setLivraisons((prev) => prev.filter((livraison) => livraison._id !== id));
    } catch (error) {
      console.error('Error deleting livraison:', error);
      toast.error('Error deleting livraison');
    }
  };

  const updateLivraison = async (id, updatedLivraison) => {
    try {
      const response = await api.put(`/api/livraison/update/${id}`, updatedLivraison);
      const updatedLivraisons = livraisons.map((livraison) => (livraison._id === id ? response.data : livraison));
      setLivraisons(updatedLivraisons);
    } catch (error) {
      console.error('Error updating livraison:', error);
      toast.error('Error updating livraison');
    }
  };

  return (
    <LivraisonContext.Provider value={{ livraisons, livreurs, addLivraison, deleteLivraison, updateLivraison }}>
      {children}
    </LivraisonContext.Provider>
  );
};
