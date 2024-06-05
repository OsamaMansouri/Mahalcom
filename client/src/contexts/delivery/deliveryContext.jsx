import React, { createContext, useContext, useEffect, useState } from 'react';
import api from 'utils/api'; // Make sure this is correctly pointing to your API utility
import toast from 'react-hot-toast';

const LivraisonContext = createContext();

export const useLivraison = () => {
    return useContext(LivraisonContext);
};

export const LivraisonProvider = ({ children }) => {
    const [livraisons, setLivraisons] = useState([]);

    useEffect(() => {
        fetchLivraisons();
    }, []);

    const fetchLivraisons = async () => {
        try {
            const response = await api.get('/api/livraison/getall');
            setLivraisons(response.data);
        } catch (error) {
            console.error('Error fetching livraisons:', error);
            toast.error('Error fetching livraisons', { position: 'top-right' });
        }
    };

    const addLivraison = async (livraisonData) => {
        try {
            const response = await api.post('/api/livraison/create', livraisonData);
            setLivraisons((prevLivraisons) => [...prevLivraisons, response.data]);
            toast.success('Livraison added successfully', { position: 'top-right' });
        } catch (error) {
            console.error('Error adding livraison:', error);
            toast.error('Error adding livraison', { position: 'top-right' });
        }
    };

    const updateLivraison = async (id, livraisonData) => {
        try {
            const response = await api.put(`/api/livraison/update/${id}`, livraisonData);
            setLivraisons((prevLivraisons) => prevLivraisons.map((livraison) => (livraison._id === id ? response.data : livraison)));
            toast.success('Livraison updated successfully', { position: 'top-right' });
        } catch (error) {
            console.error('Error updating livraison:', error);
            toast.error('Error updating livraison', { position: 'top-right' });
        }
    };

    const deleteLivraison = async (id) => {
        try {
            await api.delete(`/api/livraison/delete/${id}`);
            setLivraisons((prevLivraisons) => prevLivraisons.filter((livraison) => livraison._id !== id));
            toast.success('Livraison deleted successfully', { position: 'top-right' });
        } catch (error) {
            console.error('Error deleting livraison:', error);
            toast.error('Error deleting livraison', { position: 'top-right' });
        }
    };

    return (
        <LivraisonContext.Provider
            value={{
                livraisons,
                fetchLivraisons,
                addLivraison,
                updateLivraison,
                deleteLivraison
            }}
        >
            {children}
        </LivraisonContext.Provider>
    );
};
