import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Grid,
  TextField,
  Button,
  Stack,
  InputLabel,
  FormHelperText
} from '@mui/material';
import toast from 'react-hot-toast';

const CategoryForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    catg_name: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

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

    await onSubmit(formData);
    navigate('/categories')
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel>Category Name</InputLabel>
            <TextField
              fullWidth
              placeholder="Enter category name"
              name="catg_name"
              value={formData.catg_name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              error={!!errors.catg_name}
              helperText={errors.catg_name}
            />
          </Stack>
          <FormHelperText>Please enter the category name</FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
            <Button variant="contained" color="primary" type="submit" >
              Add Category
            </Button>
            <Button variant="outlined" color="secondary" component={RouterLink} to="/categories">
              Cancel
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default CategoryForm;
