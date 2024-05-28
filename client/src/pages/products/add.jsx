import React from 'react';
import { useProduct } from 'contexts/product/ProductContext';
import MainCard from 'components/MainCard';
import ProductForm from 'components/product/ProductForm';

const AddProduct = () => {
  const { addProduct } = useProduct();

  return (
    <MainCard title="Add Product">
      <ProductForm onSubmit={addProduct} />
    </MainCard>
  );
};

export default AddProduct;
