import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Grid, TextField, Button, Stack, InputLabel, FormHelperText, Select, MenuItem } from '@mui/material';
import MainCard from 'components/MainCard';
import toast from 'react-hot-toast';
import { useUser } from 'contexts/user/UserContext';

const UserForm = ({ onSubmit }) => {
  const { roles } = useUser(); // Accessing roles from the context
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    id_role: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      id_role: '' // Set the default role to the first role from the fetched roles
    }));
  }, [roles]);

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
    navigate('/users');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>First Name</InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter first name"
                    name="fname"
                    value={formData.fname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors.fname}
                    helperText={errors.fname}
                  />
                </Stack>
                <FormHelperText>Please enter the first name</FormHelperText>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel>Last Name</InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter last name"
                    name="lname"
                    value={formData.lname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors.lname}
                    helperText={errors.lname}
                  />
                </Stack>
                <FormHelperText>Please enter the last name</FormHelperText>
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
                <FormHelperText>Please enter the email</FormHelperText>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel>Password</InputLabel>
                  <TextField
                    type="password"
                    fullWidth
                    placeholder="Enter password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors.password}
                    helperText={errors.password}
                  />
                </Stack>
                <FormHelperText>Please enter the password</FormHelperText>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Role</InputLabel>
                  <Select
                    labelId="role-label"
                    name="id_role"
                    value={formData.id_role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors.id_role}
                    sx={{ borderColor: errors.id_role ? 'red' : 'inherit' }}
                  >
                    {roles.map((role) => (
                      <MenuItem key={role._id} value={role._id}>
                        {role.role_name}
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
                {errors.id_role && <FormHelperText error>{errors.id_role}</FormHelperText>}
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                  <Button variant="contained" color="primary" type="submit">
                    Add user
                  </Button>
                  <Button variant="outlined" color="secondary" component={RouterLink} to="/users">
                    Cancel
                  </Button>
                </Stack>
              </Grid>
            </Grid>
    </form>
  );
};

export default UserForm;
