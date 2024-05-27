import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import { FormControl,Select } from '@mui/material';
import toast from 'react-hot-toast';

// project import
import MainCard from 'components/MainCard';

// assets
import UploadOutlined from '@ant-design/icons/UploadOutlined';

// ==============================|| ADD NEW stock - MAIN ||============================== //

export default function AddNewStock() {
  const token = localStorage.getItem('token');
  const [stocks, setStocks] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/category/getall` ,
        {headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}` 
        }},
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchData();
    const fetchStocks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/stock/getall`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`
          }
        });
        const data = await response.json();
        setStocks(data);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };
    fetchStocks();
    const fetchSuppliers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/supplier/getall`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`
          }
        });
        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };
    fetchSuppliers();
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/category/getall`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`
          }
        });
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);
  
  const [formData, setFormData] = useState({
    id_supplier: '',
    name: '',
    warehouse: '',
    id_catg: '',
    type: '',
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
  
  const handleCancel = () => {
    navigate(`/stocks`);
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

   const statuss = [
    {
      value: 'true',
      label: 'In Stock'
    },
    {
      value: 'false',
      label: 'Out of Stock'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fill in all required fields', { position: 'top-right' });
      return;
    }


    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/stock/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}` 
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('stock added successfully', { position: 'top-right' });
        navigate('/stocks');
      } else {
        console.error('Error adding stock:', response.statusText);
        toast.error('Error adding stock', { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error adding stock:', error);
      toast.error('Error adding stock', { position: 'top-right' });
    }
  };

  return (
    <MainCard>
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <MainCard>
            <Grid container spacing={1} direction="column">
              <Grid item xs={12}>
                <Stack spacing={1}>
                <InputLabel sx={{ mb: 1 }}>Stock Name</InputLabel>
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
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ mb: 1 }}>Warehouse</InputLabel>
                <TextField placeholder="Enter warehouse name" fullWidth multiline name='warehouse' value={formData.warehouse} onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ mb: 1 }}>Supplier</InputLabel>
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
                      {suppliers.map((sup) => (
                        <MenuItem key={sup._id} value={sup._id}>
                          {sup.fullname}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.city && <FormHelperText>{errors.city}</FormHelperText>}
                  </FormControl>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <MainCard>
            <Grid container direction="column" spacing={2}>
              <Grid item xs={12}>
                <InputLabel sx={{ mb: 1 }}>Category</InputLabel>
                  <FormControl fullWidth error={!!errors.category}>
                    <Select
                      name="id_catg"
                      value={formData.id_catg}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      displayEmpty
                      required
                    >
                      <MenuItem value="" disabled>
                        Select a category
                      </MenuItem>
                      {categories.map((cat) => (
                        <MenuItem key={cat._id} value={cat._id}>
                          {cat.catg_name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.city && <FormHelperText>{errors.city}</FormHelperText>}
                  </FormControl>
              
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ mb: 1 }}>Type</InputLabel>
                <TextField placeholder="Enter type" fullWidth multiline  name='type' value={formData.type} onChange={handleChange} />
              </Grid>
           
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 8 }}>
                  <Button variant="outlined" color="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button type='submit' variant="contained" sx={{ textTransform: 'none' }}>
                    Add new Stock
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </form>
    </MainCard>
  );
}
