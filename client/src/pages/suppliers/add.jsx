import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid, TextField, Button, RadioGroup, FormControlLabel, Radio, Stack, InputLabel, FormHelperText, FormControl, FormLabel, Select, MenuItem
} from '@mui/material';
import MainCard from 'components/MainCard';
import toast from 'react-hot-toast';

const AddSupplier = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    email: '',
    address: '',
    store: '',
    products_type: '',
    city: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  const moroccanCities = [
    "Casablanca", "Fez", "Tangier", "Marrakesh", "Salé", "Meknes", "Rabat", "Oujda", "Kenitra", "Agadir",
    "Tetouan", "Temara", "Safi", "Mohammedia", "Khouribga", "El Jadida", "Beni Mellal", "Ait Melloul", "Nador",
    "Dar Bouazza", "Taza", "Settat", "Berrechid", "Khemisset", "Inezgane", "Ksar El Kebir", "Larache", "Guelmim",
    "Khenifra", "Berkane", "Taourirt", "Sidi Slimane", "Sidi Kacem", "Al Hoceima", "Errachidia",
    "Sefrou", "Youssoufia", "Martil", "Tiznit", "Tan-Tan", "Tiflet", "Bouskoura", "Essaouira", "Taroudant",
    "Ben Guerir", "Fquih Ben Salah", "Ouarzazate", "Ouazzane", "Midelt", "Skhirat",
    "Laayoune", "Sidi Ifni", "Azrou", "M'Diq", "Tinghir", "Chefchaouen", "Zagora"
  ];

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
    let error = '';
    if (!value) {
      error = 'This field is required';
    } else if (name === 'email' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      error = 'Invalid email address';
    }
    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required';
      } else if (key === 'email' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData[key])) {
        newErrors[key] = 'Invalid email address';
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
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/supplier/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Supplier added successfully', { position: 'top-right' });
        navigate('/suppliers');
      } else {
        console.error('Error adding supplier:', response.statusText);
        toast.error('Error adding supplier', { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error adding supplier:', error);
      toast.error('Error adding supplier', { position: 'top-right' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <MainCard title="Add Supplier">
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
                    error={!!errors.fullname}
                    helperText={errors.fullname}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Address</InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors.address}
                    helperText={errors.address}
                  />
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel>Email</InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel>Phone Number</InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter phone number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors.phone}
                    helperText={errors.phone}
                  />
                </Stack>
              </Grid>
              <Grid item xs={5}>
                <Stack spacing={1}>
                  <InputLabel>Industry</InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter products type"
                    name="products_type"
                    value={formData.products_type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors.products_type}
                    helperText={errors.products_type}
                  />
                </Stack>
              </Grid>
              <Grid item xs={7}>
                <Stack spacing={1}>
                  <InputLabel>City</InputLabel>
                  <FormControl fullWidth error={!!errors.city}>
                    <Select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        Select a city
                      </MenuItem>
                      {moroccanCities.map((city) => (
                        <MenuItem key={city} value={city}>
                          {city}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.city && <FormHelperText>{errors.city}</FormHelperText>}
                  </FormControl>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset" error={!!errors.store}>
                  <FormLabel component="legend">Does he have an actual store?</FormLabel>
                  <RadioGroup
                    row
                    name="store"
                    value={formData.store}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                  {errors.store && <FormHelperText error>{errors.store}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Add Supplier
                </Button>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddSupplier;
