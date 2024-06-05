import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  InputLabel,
  FormHelperText,
  FormControl,
  FormLabel
} from '@mui/material';
import MainCard from 'components/MainCard';
import toast from 'react-hot-toast';

const AddCategory = () => {
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
      if (key !== 'city' && !formData[key]) {
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

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/category/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Category added successfully', { position: 'top-right' });
        navigate('/categories');
      } else {
        console.error('Error adding Category:', response.statusText);
        toast.error('Error adding Category', { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error adding Category:', error);
      toast.error('Error adding Category', { position: 'top-right' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <MainCard title="Add Category">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Category Name</InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter catagory name"
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
                <Button variant="contained" color="primary" type="submit">
                  Add Category
                </Button>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddCategory;
