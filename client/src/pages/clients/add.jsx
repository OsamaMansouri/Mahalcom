import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

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
  FormLabel,
  Select,
  MenuItem
} from '@mui/material';
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

  const moroccanCities = [
    'Casablanca',
    'Fez',
    'Tangier',
    'Marrakesh',
    'Salé',
    'Meknes',
    'Rabat',
    'Oujda',
    'Kenitra',
    'Agadir',
    'Tetouan',
    'Temara',
    'Safi',
    'Mohammedia',
    'Khouribga',
    'El Jadida',
    'Beni Mellal',
    'Ait Melloul',
    'Nador',
    'Dar Bouazza',
    'Taza',
    'Settat',
    'Berrechid',
    'Khemisset',
    'Inezgane',
    'Ksar El Kebir',
    'Larache',
    'Guelmim',
    'Khenifra',
    'Berkane',
    'Taourirt',
    'Sidi Slimane',
    'Sidi Kacem',
    'Al Hoceima',
    'Dcheira El Jihadia',
    'Errachidia',
    'Sefrou',
    'Youssoufia',
    'Martil',
    'Tiznit',
    'Tan-Tan',
    'Tiflet',
    'Bouskoura',
    'Essaouira',
    'Taroudant',
    'Oulad Teima',
    'Ben Guerir',
    'Fquih Ben Salah',
    'Ouarzazate',
    'Ouazzane',
    'Midelt',
    'Souk El Arbaa',
    'Skhirat',
    'Souk Larbaa El Gharb',
    'Laayoune',
    'Sidi Ifni',
    'Azrou',
    "M'Diq",
    'Tinghir',
    'Chefchaouen',
    'El Aioun Sidi Mellouk',
    'Zagora'
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
              <Grid item xs={6}>
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

              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel>Gender</InputLabel>
                  <FormControl fullWidth error={!!errors.gender}>
                    <Select
                      labelId="gender-label"
                      name="gender"
                      label="Gender"
                      value={formData.gender || ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      displayEmpty
                      required
                    >
                      <MenuItem value="" disabled>
                        Select a gender
                      </MenuItem>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                    <FormHelperText>Please enter the gender</FormHelperText>
                  </FormControl>
                </Stack>
              </Grid>

              <Grid item xs={4}>
                <Stack spacing={1}>
                  <InputLabel>City</InputLabel>
                  <FormControl fullWidth error={!!errors.city}>
                    <Select name="city" value={formData.city} onChange={handleChange} onBlur={handleBlur} displayEmpty required>
                      <MenuItem value="" disabled>
                        Select a city
                      </MenuItem>
                      {moroccanCities.map((city) => (
                        <MenuItem key={city} value={city}>
                          {city}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Please enter the city</FormHelperText>
                  </FormControl>
                </Stack>
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
              {/*<Grid item xs={12}>
                <FormControl component="fieldset" required error={!!errors.gender}>
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup row name="gender" value={formData.gender} onChange={handleChange} onBlur={handleBlur}>
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                  </RadioGroup>
                  {errors.gender && <FormHelperText error>{errors.gender}</FormHelperText>}
                </FormControl>
                    </Grid>*/}

              <Grid item xs={12}>
                <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                  <Button variant="contained" color="primary" type="submit">
                    Add Client
                  </Button>
                  <Button variant="outlined" color="secondary" component={RouterLink} to="/clients">
                    Cancel
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

export default AddClient;
