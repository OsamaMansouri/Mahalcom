import React from 'react';
import { useLivraison } from 'contexts/delivery/deliveryContext'; // Importez le bon contexte pour les livraisons
import MainCard from 'components/MainCard';
import LivraisonForm from 'components/livraison/LivraisonForm'; // Assurez-vous d'importer le bon composant de formulaire de livraison

const AddLivraison = () => {
    const { addLivraison } = useLivraison(); // Utilisez le bon hook pour accéder au contexte des livraisons

    return (
        <MainCard title="Add Livraison">
            <LivraisonForm onSubmit={addLivraison} /> {/* Assurez-vous de passer la bonne fonction onSubmit pour ajouter la livraison */}
        </MainCard>
    );
};

export default AddLivraison;