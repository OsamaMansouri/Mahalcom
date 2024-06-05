import React from 'react';
import { useCategory } from 'contexts/category/CategoryContext';
import CategoryForm from 'components/category/CategoryForm';
import MainCard from 'components/MainCard';

const AddCategory = () => {
  const { addCategory } = useCategory();

  return (
    <MainCard title="Add Category">
      <CategoryForm onSubmit={addCategory} />
    </MainCard>
  );
};

export default AddCategory;
