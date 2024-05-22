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

// ==============================|| ADD NEW PRODUCT - MAIN ||============================== //

export default function AddNewProduct() {
  const token = localStorage.getItem('token');
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
  }, []);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    brand: '',
    id_catg: '',
    price: 0,
    quantity: 0,
    // id_stock: '',
    inStock:false
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
    navigate(`/products`);
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
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/product/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}` 
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('product added successfully', { position: 'top-right' });
        navigate('/products');
      } else {
        console.error('Error adding product:', response.statusText);
        toast.error('Error adding product', { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error adding product', { position: 'top-right' });
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
                <InputLabel sx={{ mb: 1 }}>Product Name</InputLabel>
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
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ mb: 1 }}>Product Description</InputLabel>
                <TextField placeholder="Enter product description" fullWidth multiline rows={3} name='description' value={formData.description} onChange={handleChange} />
              </Grid>
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
                <InputLabel sx={{ mb: 1 }}>Brand</InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter the brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    error={!!errors.brand}
                    helperText={errors.brand}
                  />
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ mb: 1 }}>Price</InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    error={!!errors.price}
                    helperText={errors.price}
                  />
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <MainCard>
            <Grid container direction="column" spacing={2}>
              <Grid item xs={12}>
                <InputLabel sx={{ mb: 1 }}>Quantity</InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    error={!!errors.quantity}
                    helperText={errors.quantity}
                  />
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ mb: 1 }}>Status</InputLabel>
                <TextField placeholder="Select status" fullWidth select name='inStock' value={formData.inStock} onChange={handleChange}>
                  {statuss.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              {/* {formData.inStock && (  
                <Grid item xs={12}>
                <InputLabel sx={{ mb: 1 }}>Stock</InputLabel>
                  <TextField
                    fullWidth
                    placeholder="Enter stock id"
                    name="id_stock"
                    value={formData.id_stock}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    error={!!errors.id_stock}
                    helperText={errors.id_stock}
                  />
              </Grid>
              )} */}

              {/* <Grid item xs={12}>
                <Typography color="error.main">
                  *{' '}
                  <Typography component="span" color="text.secondary">
                    Recommended resolution is 640*640 with file size
                  </Typography>
                </Typography>
                <Button variant="outlined" color="secondary" startIcon={<UploadOutlined />} sx={{ mt: 1, textTransform: 'none' }}>
                  Click to Upload
                </Button>
              </Grid>  */}
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 8 }}>
                  <Button variant="outlined" color="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button type='submit' variant="contained" sx={{ textTransform: 'none' }}>
                    Add new Product
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
