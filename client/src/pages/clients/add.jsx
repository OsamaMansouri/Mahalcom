import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, TextField, Button, RadioGroup, FormControlLabel, Radio, Stack, InputLabel, FormHelperText, FormControl, FormLabel } from '@mui/material';
import MainCard from 'components/MainCard';
import toast from 'react-hot-toast';

const AddClient = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    address: '',
    gender: '',
    city: '' 
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
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/client/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}` 
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Client added successfully', { position: 'top-right' });
        navigate('/clients');
      } else {
        console.error('Error adding client:', response.statusText);
        toast.error('Error adding client', { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error adding client:', error);
      toast.error('Error adding client', { position: 'top-right' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <MainCard title="Add Client">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Full Name</InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter full name"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    error={!!errors.fullname}
                    helperText={errors.fullname}
                  />
                </Stack>
                <FormHelperText>Please enter the full name</FormHelperText>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={1}>
                  <InputLabel>City</InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </Stack>
                <FormHelperText>Please enter your city</FormHelperText>
              </Grid>
              <Grid item xs={8}>
                <Stack spacing={1}>
                  <InputLabel>Address</InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter your address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    error={!!errors.address}
                    helperText={errors.address}
                  />
                </Stack>
                <FormHelperText>Please enter your address</FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Phone Number</InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter phone number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    error={!!errors.phone}
                    helperText={errors.phone}
                  />
                </Stack>
                <FormHelperText>Please enter your phone number</FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset" required error={!!errors.gender}>
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    row
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                  </RadioGroup>
                  {errors.gender && <FormHelperText error>{errors.gender}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Add Client
                </Button>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddClient;
