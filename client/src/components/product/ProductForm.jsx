import React, { useState } from 'react';
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
  FormControlLabel,
  Checkbox
} from '@mui/material';
import MainCard from 'components/MainCard';
import toast from 'react-hot-toast';
import { useProduct } from 'contexts/product/ProductContext';
import ReactDraft from 'sections/forms/plugins/ReactDraft';

const ProductForm = () => {
  const { addProduct, categories, stocks } = useProduct();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    brand: '',
    image: null,
    id_catg: '',
    price: '',
    quantity: '',
    inStock: false
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true
    }));
    validateField(name, value);
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
      if (!formData[key] && key !== 'image' && key !== 'inStock') {
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

    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });

    await addProduct(formDataToSubmit);
    navigate('/products');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Stack spacing={1}>
            <InputLabel>Name</InputLabel>
            <TextField
              fullWidth
              placeholder="Enter product name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              error={!!errors.name}
              helperText={errors.name}
            />
          </Stack>
          <FormHelperText>Please enter the product name</FormHelperText>
        </Grid>

        <Grid item xs={4}>
          <Stack spacing={1}>
            <InputLabel>Category</InputLabel>
            <FormControl fullWidth error={!!errors.id_catg}>
              <Select name="id_catg" value={formData.id_catg} onChange={handleChange} onBlur={handleBlur} displayEmpty required>
                <MenuItem value="" disabled>
                  Select a category
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.catg_name}
                  </MenuItem>
                ))}
              </Select>
              {errors.id_catg && <FormHelperText>{errors.id_catg}</FormHelperText>}
            </FormControl>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel>Description</InputLabel>
            <TextField
              fullWidth
              placeholder="Enter product description"
              name="description"
              multiline
              rows={3}
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              error={!!errors.description}
              helperText={errors.description}
            />
          </Stack>
          <FormHelperText>Please enter the product description</FormHelperText>
        </Grid>

        <Grid item xs={6}>
          <Stack spacing={1}>
            <InputLabel>Brand</InputLabel>
            <TextField
              fullWidth
              placeholder="Enter brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              error={!!errors.brand}
              helperText={errors.brand}
            />
          </Stack>
          <FormHelperText>Please enter the brand</FormHelperText>
        </Grid>

        <Grid item xs={6}>
          <Stack spacing={1}>
            <InputLabel>Image</InputLabel>
            <input type="file" name="image" onChange={handleFileChange} />
            {errors.image && <FormHelperText error>{errors.image}</FormHelperText>}
          </Stack>
          <FormHelperText>Please select an image</FormHelperText>
        </Grid>

        <Grid item xs={6}>
          <Stack spacing={1}>
            <InputLabel>Price</InputLabel>
            <TextField
              fullWidth
              placeholder="Enter price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              error={!!errors.price}
              helperText={errors.price}
            />
          </Stack>
          <FormHelperText>Please enter the price</FormHelperText>
        </Grid>

        <Grid item xs={6}>
          <Stack spacing={1}>
            <InputLabel>Quantity</InputLabel>
            <TextField
              fullWidth
              placeholder="Enter quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              error={!!errors.quantity}
              helperText={errors.quantity}
            />
          </Stack>
          <FormHelperText>Please enter the quantity</FormHelperText>
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox checked={formData.inStock} onChange={handleChange} name="inStock" color="primary" />}
            label="In Stock"
          />
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
            <Button variant="outlined" color="secondary" onClick={() => navigate('/products')}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Add Product
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;
