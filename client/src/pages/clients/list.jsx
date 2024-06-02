import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  CardMedia,
  Chip,
  Link,
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
  Select,
  MenuItem,
  TablePagination,
  Slide,
  Grid,
  FormHelperText,
  CardActions,
  FormControl
} from '@mui/material';
import MainCard from 'components/MainCard';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import toast from 'react-hot-toast';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { EditOutlined } from '@ant-design/icons';
import api from 'utils/api';

// Simple PopupTransition component
const PopupTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// table data
function createData(index, _id, fullname, email, address, phone, city, gender) {
  return { index, _id, fullname, email, address, phone, city, gender };
}

export default function LatestOrder() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedClient, setEditedClient] = useState({});

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/client/getall');
        const responseData = response.data;
        setData(
          responseData.map((item, index) =>
            createData(index + 1, item._id, item.fullname, item.email, item.address, item.phone, item.city, item.gender)
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
    setClientToDelete(_id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setClientToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await api.delete(`/api/client/delete/${clientToDelete}`);

      if (response.status === 200) {
        const updatedData = data.filter((client) => client._id !== clientToDelete);
        setData(updatedData);
        toast.success('Client deleted successfully', { position: 'top-right' });
      } else {
        console.error('Error deleting client:', response.statusText);
        toast.error('Error deleting client', { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error deleting client:', error);
      toast.error('Error deleting client', { position: 'top-right' });
    }
    handleCloseDeleteDialog();
  };

  const handleViewDetails = (client) => {
    setSelectedClient(client);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedClient(null);
  };

  const handleEditClick = (client) => {
    setSelectedClient(client);
    setEditedClient({ ...client });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedClient(null);
    setEditedClient({});
  };

  const handleEditSave = async () => {
    try {
      const response = await api.put(`/api/client/update/${editedClient._id}`, editedClient);

      if (response.status === 200) {
        const updatedData = data.map((client) => (client._id === editedClient._id ? { ...editedClient } : client));
        setData(updatedData);
        setOpenEditDialog(false);
        toast.success('Client updated successfully', { position: 'top-right' });
      } else {
        console.error('Error updating client:', response.statusText);
        toast.error('Error updating client', { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error updating client:', error);
      toast.error('Error updating client', { position: 'top-right' });
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedClient((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <MainCard
      title="List of Clients"
      content={false}
      secondary={
        <Button component={RouterLink} to="/add-client" variant="contained" startIcon={<PlusOutlined />}>
          Add Client
        </Button>
      }
    >
      <TableContainer>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover key={row._id}>
                <TableCell sx={{ pl: 3 }}>{row.index}</TableCell>
                <TableCell>{row.fullname}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.city || '-'}</TableCell>
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
        aria-labelledby="delete-client-title"
        aria-describedby="delete-client-description"
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
        fullWidth
        maxWidth="md" // Adjusted width
        aria-labelledby="view-client-title"
        aria-describedby="view-client-description"
      >
        <DialogContent sx={{ mt: 2, my: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <MainCard title="View Client Details">
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={8}>
                    <Stack spacing={1}>
                      <InputLabel>Full Name</InputLabel>
                      <TextField
                        fullWidth
                        placeholder="Enter full name"
                        name="fullname"
                        value={selectedClient ? `${selectedClient.fullname}` : ''}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={4}>
                    <Stack spacing={1}>
                      <InputLabel>Email</InputLabel>
                      <TextField fullWidth placeholder="Enter email" name="email" value={selectedClient ? `${selectedClient.email}` : ''} />
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel>Phone</InputLabel>
                      <TextField
                        fullWidth
                        placeholder="Enter phone number"
                        name="phone"
                        value={selectedClient ? selectedClient.phone : ''}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel>Gender</InputLabel>
                      <Select labelId="gender-label" name="gender" label="Gender" value={selectedClient ? selectedClient.gender : ''}>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </Select>
                    </Stack>
                  </Grid>

                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel>City</InputLabel>
                      <FormControl fullWidth error={!!errors.city}>
                        <Select name="city" value={selectedClient ? selectedClient.city : ''}>
                          {moroccanCities.map((city) => (
                            <MenuItem key={city} value={city}>
                              {city}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Stack>
                  </Grid>

                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel>Address</InputLabel>
                      <TextField
                        fullWidth
                        placeholder="Enter address"
                        name="address"
                        value={selectedClient ? selectedClient.address : ''}
                      />
                    </Stack>
                  </Grid>

                  <CardActions>
                    <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                      <Button variant="outlined" color="secondary" onClick={handleCloseViewDialog}>
                        Cancel
                      </Button>
                    </Stack>
                  </CardActions>
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
        maxWidth="md" // Adjusted width
        aria-labelledby="edit-user-details-title"
        aria-describedby="edit-user-details-description"
      >
        <DialogContent sx={{ mt: 2, my: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <MainCard title="Edit Client Details">
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={8}>
                    <Stack spacing={1}>
                      <InputLabel>Full Name</InputLabel>
                      <TextField
                        fullWidth
                        placeholder="Enter full name"
                        name="fullname"
                        value={editedClient.fullname || ''}
                        onChange={handleFieldChange}
                      />
                    </Stack>
                    <FormHelperText>Please enter the full name</FormHelperText>
                  </Grid>
                  <Grid item xs={4}>
                    <Stack spacing={1}>
                      <InputLabel>Email</InputLabel>
                      <TextField
                        fullWidth
                        placeholder="Enter email"
                        name="email"
                        value={editedClient.email || ''}
                        onChange={handleFieldChange}
                      />
                    </Stack>
                    <FormHelperText>Please enter email</FormHelperText>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel>Phone</InputLabel>
                      <TextField
                        fullWidth
                        placeholder="Enter phone number"
                        name="phone"
                        value={editedClient.phone || ''}
                        onChange={handleFieldChange}
                      />
                    </Stack>
                    <FormHelperText>Please enter the phone</FormHelperText>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel>Gender</InputLabel>
                      <Select
                        labelId="gender-label"
                        name="gender"
                        label="Gender"
                        value={editedClient.gender || ''}
                        onChange={handleFieldChange}
                        fullWidth
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </Select>
                    </Stack>
                    <FormHelperText>Please enter the gender</FormHelperText>
                  </Grid>

                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel>City</InputLabel>
                      <FormControl fullWidth error={!!errors.city}>
                        <Select name="city" value={editedClient.city || ''} onChange={handleFieldChange}>
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

                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel>Address</InputLabel>
                      <TextField
                        fullWidth
                        placeholder="Enter address"
                        name="address"
                        value={editedClient.address || ''}
                        onChange={handleFieldChange}
                      />
                    </Stack>
                    <FormHelperText>Please enter the address</FormHelperText>
                  </Grid>

                  <CardActions>
                    <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
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
