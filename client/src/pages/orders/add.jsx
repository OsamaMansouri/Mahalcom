import React from 'react';
import { useOrder } from 'contexts/order/OrderContext';
import MainCard from 'components/MainCard';
import OrderForm from 'components/order/FormOrder';

const AddOrder = () => {
  const { addOrder } = useOrder();

  return (
    <MainCard title="Add Order">
      <OrderForm onSubmit={addOrder} />
    </MainCard>
  );
};

export default AddOrder;
