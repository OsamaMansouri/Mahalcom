import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  TextField,
  Button,
  Stack,
  InputLabel,
  FormHelperText,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Box,
  Typography
} from '@mui/material';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import toast from 'react-hot-toast';
import { useStock } from 'contexts/stock/StockContext';

const StockForm = () => {
  const { addStock, suppliers, products } = useStock();
  const [formData, setFormData] = useState({
    id_supplier: '',
    name: '',
    warehouse: '',
    info: '',
    products: []
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize product data
    if (formData.products.length === 0) {
      setFormData((prev) => ({
        ...prev,
        products: [{ product_id: '', quantity: 0, name: '', price: 0, image: '' }]
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true
    }));
    validateField(name, value);
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const selectedProduct = products.find((product) => product._id === value);

    setFormData((prev) => {
      const updatedProducts = [...prev.products];
      updatedProducts[index] = {
        ...updatedProducts[index],
        product_id: value,
        name: selectedProduct.name,
        quantity: selectedProduct.quantity,
        price: selectedProduct.price,
        image: selectedProduct.image
      };
      return {
        ...prev,
        products: updatedProducts
      };
    });
  };

  const handleAddProduct = () => {
    setFormData((prev) => ({
      ...prev,
      products: [...prev.products, { product_id: '', quantity: 0, name: '', price: 0, image: '' }]
    }));
  };

  const handleRemoveProduct = (index) => {
    setFormData((prev) => {
      const updatedProducts = [...prev.products];
      updatedProducts.splice(index, 1);
      return {
        ...prev,
        products: updatedProducts
      };
    });
  };

  const validateField = (name, value) => {
    setErrors((prev) => ({
      ...prev,
      [name]: !value ? 'This field is required' : ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required';
      }
    });
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fill in all required fields', { position: 'top-right' });
      return;
    }

    await addStock(formData);
    navigate('/stocks');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <MainCard title="Add Stock">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel>Name</InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter stock name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </Stack>
                <FormHelperText>Please enter the stock name</FormHelperText>
              </Grid>

              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel>Warehouse</InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter warehouse"
                    name="warehouse"
                    value={formData.warehouse}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    error={!!errors.warehouse}
                    helperText={errors.warehouse}
                  />
                </Stack>
                <FormHelperText>Please enter the warehouse</FormHelperText>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Supplier</InputLabel>
                  <FormControl fullWidth error={!!errors.id_supplier}>
                    <Select
                      name="id_supplier"
                      value={formData.id_supplier}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      displayEmpty
                      required
                    >
                      <MenuItem value="" disabled>
                        Select a supplier
                      </MenuItem>
                      {suppliers.map((supplier) => (
                        <MenuItem key={supplier._id} value={supplier._id}>
                          {supplier.fullname}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.id_supplier && <FormHelperText>{errors.id_supplier}</FormHelperText>}
                  </FormControl>
                  <FormHelperText>Please select a supplier</FormHelperText>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Products</InputLabel>
                  {formData.products.map((product, index) => (
                    <Grid container spacing={2} alignItems="center" key={index}>
                      <Grid item xs={3}>
                        <FormControl fullWidth error={!!errors[`products[${index}].product_id`]}>
                          <Select
                            name={`products[${index}].product_id`}
                            value={product.product_id}
                            onChange={(e) => handleProductChange(index, e)}
                            displayEmpty
                            required
                          >
                            <MenuItem value="" disabled>
                              Select a product
                            </MenuItem>
                            {products.map((product) => (
                              <MenuItem key={product._id} value={product._id}>
                                {product.name}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors[`products[${index}].product_id`] && (
                            <FormHelperText>{errors[`products[${index}].product_id`]}</FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          fullWidth
                          placeholder="Quantity"
                          name={`products[${index}].quantity`}
                          value={product.quantity}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputProps={{ readOnly: true }}
                          error={!!errors[`products[${index}].quantity`]}
                          helperText={errors[`products[${index}].quantity`]}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          fullWidth
                          placeholder="Price"
                          name={`products[${index}].price`}
                          value={product.price}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputProps={{ readOnly: true }}
                          error={!!errors[`products[${index}].price`]}
                          helperText={errors[`products[${index}].price`]}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        {product.image && (
                          <img
                            src={`${import.meta.env.VITE_API_BASE_URL}/${product.image}`}
                            alt={product.name}
                            style={{ width: '50px', height: '50px' }}
                          />
                        )}
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton color="error" onClick={() => handleRemoveProduct(index)}>
                          <DeleteOutlined />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                  <Box sx={{ pt: 2.5, pr: 2.5, pb: 2.5, pl: 0 }}>
                    <Button
                      color="primary"
                      startIcon={<PlusOutlined />}
                      onClick={handleAddProduct}
                      variant="dashed"
                      sx={{ bgcolor: 'transparent !important' }}
                    >
                      Add Product
                    </Button>
                  </Box>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                  <Button variant="outlined" color="secondary" onClick={() => navigate('/stocks')}>
                    Cancel
                  </Button>
                  <Button variant="contained" color="primary" type="submit">
                    Add Stock
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </form>
  );
};

export default StockForm;
