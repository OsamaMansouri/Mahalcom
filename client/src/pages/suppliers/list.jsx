import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  Stack,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  Avatar,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  InputLabel,
  FormControlLabel,
  Select,
  MenuItem,
  TablePagination,
  Slide,
  Grid,
  FormHelperText,
  CardActions
} from '@mui/material';
import MainCard from 'components/MainCard';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import toast from 'react-hot-toast';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { EditOutlined } from '@ant-design/icons';

const PopupTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function createData(index, _id, fullname, address, email, phone, city, products_type, store) {
  return { index, _id, fullname, address, email, phone, city, products_type, store };
}

export default function LatestOrder() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [supplierToDelete, setsupplierToDelete] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedsupplier, setSelectedsupplier] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedsupplier, setEditedsupplier] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [emptyField, setEmptyField] = useState('');

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
    'Ben Guerir',
    'Fquih Ben Salah',
    'Ouarzazate',
    'Ouazzane',
    'Midelt',
    'Skhirat',
    'Laayoune',
    'Sidi Ifni',
    'Azrou',
    "M'Diq",
    'Tinghir',
    'Chefchaouen',
    'Zagora'
  ];

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/supplier/getall`, {
          headers: {
            Authorization: `${token}`
          }
        });
        const responseData = await response.json();
        const newData = responseData.map((row, index) =>
          createData(index + 1, row._id, row.fullname, row.address, row.email, row.phone, row.city, row.products_type, row.store)
        );
        setData(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteClick = (_id) => {
    setsupplierToDelete(_id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setsupplierToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/supplier/delete/${supplierToDelete}`, {
        method: 'DELETE',
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const updatedData = data.filter((supplier) => supplier._id !== supplierToDelete);
        setData(updatedData);
        toast.success('Supplier deleted successfully', { position: 'top-right' });
      } else {
        console.error('Error deleting supplier:', response.statusText);
        toast.error('Error deleting supplier', { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error deleting supplier:', error);
      toast.error('Error deleting supplier', { position: 'top-right' });
    }
    handleCloseDeleteDialog();
  };

  const handleViewDetails = (supplier) => {
    setSelectedsupplier(supplier);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedsupplier(null);
  };

  const handleEditClick = (supplier) => {
    setSelectedsupplier(supplier);
    setEditedsupplier(supplier);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedsupplier(null);
    setEditedsupplier({});
    setFieldErrors({});
  };

  const handleEditSave = async () => {
    if (Object.values(editedsupplier).some((value) => value === '')) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/supplier/update/${editedsupplier._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedsupplier)
      });

      if (response.ok) {
        const updatedData = data.map((supplier) => (supplier._id === editedsupplier._id ? editedsupplier : supplier));
        setData(updatedData);
        setOpenEditDialog(false);
        toast.success('Supplier updated successfully', { position: 'top-right' });
      } else {
        console.error('Error updating supplier:', response.statusText);
        toast.error('Error updating supplier', { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error updating supplier:', error);
      toast.error('Error updating supplier', { position: 'top-right' });
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedsupplier((prev) => ({ ...prev, [name]: value }));

    if (value === '') {
      setFieldErrors((prev) => ({ ...prev, [name]: 'Please fill out this field.' }));
    } else {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
      if (name === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          setFieldErrors((prev) => ({ ...prev, email: 'Please enter a valid email address.' }));
        } else {
          setFieldErrors((prev) => ({ ...prev, email: '' }));
        }
      }
    }
  };

  return (
    <MainCard
      title="List of Suppliers"
      content={false}
      secondary={
        <Button component={RouterLink} to="/add-supplier" variant="contained" startIcon={<PlusOutlined />}>
          Add Supplier
        </Button>
      }
    >
      <TableContainer>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Store</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Products Type</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover key={row._id}>
                <TableCell sx={{ pl: 3 }}>{row.index}</TableCell>
                <TableCell>{row.fullname}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.store}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.products_type}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell align="center" sx={{ pr: 3 }}>
                  <Stack direction="row" justifyContent="center" alignItems="center">
                    <IconButton color="inherit" size="large" onClick={() => handleEditClick(row)}>
                      <EditOutlined />
                    </IconButton>
                    <IconButton color="info" size="large" onClick={() => handleViewDetails(row)}>
                      <VisibilityOutlinedIcon />
                    </IconButton>
                    <IconButton color="error" size="large" onClick={() => handleDeleteClick(row._id)}>
                      <DeleteOutlinedIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Delete Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        keepMounted
        TransitionComponent={PopupTransition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent sx={{ mt: 2, my: 1 }}>
          <Stack alignItems="center" spacing={3.5}>
            <Avatar color="error" sx={{ width: 72, height: 72, fontSize: '1.75rem' }}>
              <DeleteOutlinedIcon />
            </Avatar>
            <Stack spacing={2}>
              <Typography variant="h4" align="center">
                Are you sure you want to delete?
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ width: 1 }}>
              <Button fullWidth onClick={handleCloseDeleteDialog} color="secondary" variant="outlined">
                Cancel
              </Button>
              <Button fullWidth color="error" variant="contained" onClick={handleDeleteConfirm} autoFocus>
                Delete
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog
        open={openViewDialog}
        onClose={handleCloseViewDialog}
        keepMounted
        TransitionComponent={PopupTransition}
        maxWidth="md"
        aria-labelledby="view-supplier-title"
        aria-describedby="view-supplier-description"
      >
        <DialogContent sx={{ mt: 2, my: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <MainCard title="View Supplier Details">
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel>Full Name</InputLabel>
                      <TextField
                        fullWidth
                        value={selectedsupplier ? selectedsupplier.fullname : ''}
                        InputProps={{
                          readOnly: true
                        }}
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel>Email</InputLabel>
                      <TextField
                        fullWidth
                        value={selectedsupplier ? selectedsupplier.email : ''}
                        InputProps={{
                          readOnly: true
                        }}
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel>Phone</InputLabel>
                      <TextField
                        fullWidth
                        value={selectedsupplier ? selectedsupplier.phone : ''}
                        InputProps={{
                          readOnly: true
                        }}
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel>Store</InputLabel>
                      <TextField
                        fullWidth
                        value={selectedsupplier ? selectedsupplier.store : ''}
                        InputProps={{
                          readOnly: true
                        }}
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel>Address</InputLabel>
                      <TextField
                        fullWidth
                        value={selectedsupplier ? selectedsupplier.address : ''}
                        InputProps={{
                          readOnly: true
                        }}
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel>Products Type</InputLabel>
                      <TextField
                        fullWidth
                        value={selectedsupplier ? selectedsupplier.products_type : ''}
                        InputProps={{
                          readOnly: true
                        }}
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel>City</InputLabel>
                      <TextField
                        fullWidth
                        value={selectedsupplier ? selectedsupplier.city : ''}
                        InputProps={{
                          readOnly: true
                        }}
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <CardActions>
                      <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                        <Button variant="outlined" color="secondary" onClick={handleCloseViewDialog}>
                          Close
                        </Button>
                      </Stack>
                    </CardActions>
                  </Grid>
                </Grid>
              </MainCard>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      {/* Edit Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        keepMounted
        TransitionComponent={PopupTransition}
        fullWidth
        maxWidth="md"
        aria-labelledby="edit-supplier-details-title"
        aria-describedby="edit-supplier-details-description"
      >
        <DialogContent sx={{ mt: 2, my: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <MainCard title="Edit Supplier Details">
                {emptyField && (
                  <Typography variant="body1" color="error">
                    {emptyField}
                  </Typography>
                )}
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel>Full Name</InputLabel>
                      <TextField
                        name="fullname"
                        value={editedsupplier.fullname || ''}
                        onChange={handleFieldChange}
                        error={!!fieldErrors.fullname}
                        helperText={fieldErrors.fullname}
                        fullWidth
                      />
                    </Stack>
                    <FormHelperText>Please enter the full name</FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel>Email</InputLabel>
                      <TextField
                        name="email"
                        value={editedsupplier.email || ''}
                        onChange={handleFieldChange}
                        error={!!fieldErrors.email}
                        helperText={fieldErrors.email}
                        fullWidth
                      />
                    </Stack>
                    <FormHelperText>Please enter the email</FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel>Phone Number</InputLabel>
                      <TextField
                        name="phone"
                        value={editedsupplier.phone || ''}
                        onChange={handleFieldChange}
                        error={!!fieldErrors.phone}
                        helperText={fieldErrors.phone}
                        fullWidth
                      />
                    </Stack>
                    <FormHelperText>Please enter the phone</FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel>Address</InputLabel>
                      <TextField
                        name="address"
                        value={editedsupplier.address || ''}
                        onChange={handleFieldChange}
                        error={!!fieldErrors.address}
                        helperText={fieldErrors.address}
                        fullWidth
                      />
                    </Stack>
                    <FormHelperText>Please enter the Address</FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel>Product type</InputLabel>
                      <TextField
                        name="products_type"
                        value={editedsupplier.products_type || ''}
                        onChange={handleFieldChange}
                        error={!!fieldErrors.products_type}
                        helperText={fieldErrors.products_type}
                        fullWidth
                      />
                    </Stack>
                    <FormHelperText>Please enter the product type</FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel id="city-label">City</InputLabel>
                      <Select
                        name="city"
                        value={editedsupplier.city || ''}
                        onChange={handleFieldChange}
                        error={!!fieldErrors.city}
                        fullWidth
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          Select City
                        </MenuItem>
                        {moroccanCities.map((city) => (
                          <MenuItem key={city} value={city}>
                            {city}
                          </MenuItem>
                        ))}
                      </Select>
                      {fieldErrors.city && <FormHelperText error>{fieldErrors.city}</FormHelperText>}
                    </Stack>
                    <FormHelperText>Please enter the city</FormHelperText>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel id="city-label">Store</InputLabel>
                      <Select
                        name="store"
                        value={editedsupplier.store || ''}
                        onChange={handleFieldChange}
                        error={!!fieldErrors.city}
                        fullWidth
                        displayEmpty
                      >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </Select>
                    </Stack>
                    <FormHelperText>Please enter the Store</FormHelperText>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <CardActions>
                    <Stack direction="row" justifyContent="flex-Start" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                      <Button variant="outlined" color="secondary" onClick={handleCloseEditDialog}>
                        Cancel
                      </Button>
                      <Button type="submit" variant="contained" onClick={handleEditSave} startIcon={<SaveIcon />}>
                        Update
                      </Button>
                    </Stack>
                  </CardActions>
                </Grid>
              </MainCard>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </MainCard>
  );
}
