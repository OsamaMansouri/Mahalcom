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
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  TablePagination,
  Slide,
  MenuItem,
  Select,
  FormControl
} from '@mui/material';
import MainCard from 'components/MainCard';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import toast from 'react-hot-toast';
import PlusOutlined from '@ant-design/icons/PlusOutlined';

// Simple PopupTransition component
const PopupTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// List of Moroccan cities
const cities = [
  'Casablanca',
  'Rabat',
  'Fes',
  'Marrakech',
  'Tangier',
  'Agadir',
  'Meknes',
  'Oujda',
  'Kenitra',
  'Tetouan',
  'Safi',
  'Khouribga',
  'El Jadida',
  'Nador',
  'Beni Mellal',
  'Taza',
  'Mohammedia',
  'Ksar El Kebir',
  'Laayoune',
  'Khenifra',
  'Settat',
  'Larache',
  'Khemisset',
  'Guelmim',
  'Berrechid',
  'Inezgane',
  'Sidi Kacem',
  'Tiznit',
  'Ouarzazate',
  'Fquih Ben Salah',
  'Dakhla',
  'Azrou',
  'Oulad Teima',
  'Essaouira',
  'Tifelt',
  'Sidi Slimane',
  'Boujdour',
  'Errachidia',
  'Ben Guerir',
  'Tan-Tan'
];

// Table data
function createData(index, _id, fullname, phone, email, store, address, products_type, city) {
  return { index, _id, fullname, phone, email, store, address, products_type, city };
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
  const [emptyField, setEmptyField] = useState('');

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
        setData(
          responseData.map((item, index) =>
            createData(index + 1, item._id, item.fullname, item.phone, item.email, item.store, item.address, item.products_type, item.city)
          )
        );
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
          Authorization: `${localStorage.getItem('token')}`, // Include the token in the Authorization header
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
    setEditedsupplier({ ...supplier });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedsupplier(null);
    setEditedsupplier({});
  };

  const isValidEmail = (email) => {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleEditSave = async () => {
    // Check if any required field is empty
    const requiredFields = ['fullname', 'phone', 'email', 'address', 'products_type', 'city'];
    const emptyField = requiredFields.find((field) => !editedsupplier[field]);
    if (emptyField) {
      setEmptyField(emptyField);
      return;
    }

    // Check if email is in the correct format
    if (!isValidEmail(editedsupplier.email)) {
      setEmptyField('email');
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
        const updatedData = data.map((supplier) => (supplier._id === editedsupplier._id ? { ...editedsupplier } : supplier));
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
    if (emptyField === name) {
      setEmptyField('');
    }
  };

  return (
    <MainCard
      title="List of suppliers"
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
                      <EditOutlinedIcon />
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
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Delete Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        keepMounted
        TransitionComponent={PopupTransition}
        maxWidth="xs"
        aria-labelledby="delete-supplier-title"
        aria-describedby="delete-supplier-description"
      >
        <DialogContent sx={{ mt: 2, my: 1 }}>
          <Stack alignItems="center" spacing={3.5}>
            <Avatar sx={{ width: 72, height: 72, fontSize: '1.75rem', bgcolor: 'error.main' }}>
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
          <Stack alignItems="center" spacing={3.5}>
            <Avatar sx={{ width: 72, height: 72, fontSize: '1.75rem', bgcolor: 'primary.main' }}>
              {selectedsupplier && selectedsupplier.fullname.charAt(0).toUpperCase()}
            </Avatar>
            <Stack spacing={2}>
              <Typography variant="h4" align="center">
                {selectedsupplier ? selectedsupplier.fullname : ''}
              </Typography>
              <Typography align="center">Phone: {selectedsupplier ? selectedsupplier.phone : ''}</Typography>
              <Typography align="center">Email: {selectedsupplier ? selectedsupplier.email : ''}</Typography>
              <Typography align="center">Store: {selectedsupplier ? selectedsupplier.store : ''}</Typography>
              <Typography align="center">Address: {selectedsupplier ? selectedsupplier.address : ''}</Typography>
              <Typography align="center">Products Type: {selectedsupplier ? selectedsupplier.products_type : ''}</Typography>
              <Typography align="center">City: {selectedsupplier ? selectedsupplier.city : ''}</Typography>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ width: 1 }}>
              <Button fullWidth onClick={handleCloseViewDialog} color="primary" variant="contained">
                Close
              </Button>
            </Stack>
          </Stack>
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
          <Stack alignItems="center" spacing={3.5}>
            <Typography variant="h4" align="center">
              Edit Supplier Details
            </Typography>
            <TextField
              name="fullname"
              label="Full Name"
              value={editedsupplier.fullname || ''}
              onChange={handleFieldChange}
              error={emptyField === 'fullname'}
              helperText={emptyField === 'fullname' && 'Please fill all the required fields'}
              fullWidth
              onBlur={() => !editedsupplier.fullname && setEmptyField('fullname')}
            />
            <TextField
              name="phone"
              label="Phone"
              value={editedsupplier.phone || ''}
              onChange={handleFieldChange}
              error={emptyField === 'phone'}
              helperText={emptyField === 'phone' && 'Please fill all the required fields'}
              fullWidth
              onBlur={() => !editedsupplier.phone && setEmptyField('phone')}
            />
            <TextField
              name="email"
              label="Email"
              value={editedsupplier.email || ''}
              onChange={handleFieldChange}
              error={emptyField === 'email' || (editedsupplier.email && !isValidEmail(editedsupplier.email))}
              helperText={
                (emptyField === 'email' && 'Please fill all the required fields') ||
                (editedsupplier.email && !isValidEmail(editedsupplier.email) && 'Please enter a valid email address')
              }
              fullWidth
              onBlur={() => (!editedsupplier.email || !isValidEmail(editedsupplier.email)) && setEmptyField('email')}
            />
            <TextField
              name="address"
              label="Address"
              value={editedsupplier.address || ''}
              onChange={handleFieldChange}
              error={emptyField === 'address'}
              helperText={emptyField === 'address' && 'Please fill all the required fields'}
              fullWidth
              onBlur={() => !editedsupplier.address && setEmptyField('address')}
            />
            <TextField
              name="products_type"
              label="Products Type"
              value={editedsupplier.products_type || ''}
              onChange={handleFieldChange}
              error={emptyField === 'products_type'}
              helperText={emptyField === 'products_type' && 'Please fill all the required fields'}
              fullWidth
              onBlur={() => !editedsupplier.products_type && setEmptyField('products_type')}
            />
            <FormControl fullWidth error={emptyField === 'city'}>
              <InputLabel id="city-label">City</InputLabel>
              <Select
                labelId="city-label"
                name="city"
                value={editedsupplier.city || ''}
                onChange={handleFieldChange}
                onBlur={() => !editedsupplier.city && setEmptyField('city')}
              >
                {cities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
              {emptyField === 'city' && (
                <Typography color="error" variant="caption">
                  Please select a city
                </Typography>
              )}
            </FormControl>
            <InputLabel id="store-label">Store</InputLabel>
            <RadioGroup aria-labelledby="store-label" name="store" value={editedsupplier.store || ''} onChange={handleFieldChange} row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
            <Stack direction="row" spacing={2} sx={{ width: 1 }}>
              <Button fullWidth onClick={handleCloseEditDialog} color="secondary" variant="outlined">
                Cancel
              </Button>
              <Button fullWidth color="primary" variant="contained" onClick={handleEditSave} startIcon={<SaveIcon />}>
                Save
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </MainCard>
  );
}
