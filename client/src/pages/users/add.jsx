import React from 'react';
import { UserProvider, useUser } from 'contexts/user/UserContext';
import UserForm from 'components/user/UserForm';
import MainCard from 'components/MainCard';

const AddUser = () => {
  const { addUser } = useUser();

  return (
    <MainCard title="Add User">
      <UserForm onSubmit={addUser} />
    </MainCard>
  );
};

export default AddUser;
