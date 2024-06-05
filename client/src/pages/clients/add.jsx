import React from 'react';
import { useClient } from 'contexts/client/ClientContext';
import MainCard from 'components/MainCard';
import ClientForm from 'components/client/ClientForm';

const AddClient = () => {
  const { addClient } = useClient();

  return (
    <MainCard title="Add Client">
      <ClientForm onSubmit={addClient} />
    </MainCard>
  );
};

export default AddClient;
