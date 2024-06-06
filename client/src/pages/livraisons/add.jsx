import React from 'react';
import { useLivraison } from 'contexts/livraison/LivraisonContext';
import MainCard from 'components/MainCard';
import LivraisonForm from 'components/livraison/LivraisonForm';

const AddLivraison = () => {
  const { addLivraison } = useLivraison();

  return (
    <MainCard title="Add Livraison">
      <LivraisonForm onSubmit={addLivraison} />
    </MainCard>
  );
};

export default AddLivraison;
