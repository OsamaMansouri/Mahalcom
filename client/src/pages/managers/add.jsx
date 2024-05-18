import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, TextField, Button, RadioGroup, FormControlLabel, Radio, Stack, Typography, InputLabel, FormHelperText } from '@mui/material';
import MainCard from 'components/MainCard';
import toast from 'react-hot-toast';

const AddManager = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    id_role: '' // Updated to use id_role for role foreign key
  });
  const [roles, setRoles] = useState([]); // Initialize roles as an empty array
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch roles from the backend
    const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/role/getall'); // Update this to your actual endpoint
        const data = await response.json();
        if (Array.isArray(data)) {
          setRoles(data); // Assuming data is an array of roles
        } else {
          console.error('Unexpected response format:', data);
          toast.error('Error fetching roles', { position: 'top-right' });
        }
      } catch (error) {
        console.error('Error fetching roles:', error);
        toast.error('Error fetching roles', { position: 'top-right' });
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      id_role: e.target.value // Updated to set the id_role
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:8000/api/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}` // Ensure Bearer prefix is used
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Manager added successfully', { position: 'top-right' });
        navigate('/managers');
      } else {
        console.error('Error adding manager:', response.statusText);
        toast.error('Error adding manager', { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error adding manager:', error);
      toast.error('Error adding manager', { position: 'top-right' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <MainCard title="Add Manager">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>First Name</InputLabel>
                  <TextField fullWidth placeholder="Enter first name" name="fname" value={formData.fname} onChange={handleChange} />
                </Stack>
                <FormHelperText>Please enter the first name</FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Last Name</InputLabel>
                  <TextField fullWidth placeholder="Enter last name" name="lname" value={formData.lname} onChange={handleChange} />
                </Stack>
                <FormHelperText>Please enter the last name</FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Email</InputLabel>
                  <TextField fullWidth placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
                </Stack>
                <FormHelperText>Please enter the email</FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Password</InputLabel>
                  <TextField
                    type="password"
                    fullWidth
                    placeholder="Enter password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Stack>
                <FormHelperText>Please enter the password</FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Role</InputLabel>
                <RadioGroup name="id_role" value={formData.id_role} onChange={handleRoleChange}>
                  {roles.map((role) => (
                    <FormControlLabel key={role._id} value={role._id} control={<Radio />} label={role.role_name} />
                  ))}
                </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Add Manager
                </Button>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddManager;
