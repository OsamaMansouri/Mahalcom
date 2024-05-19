import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
  Slide
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

// table data
function createData(index, _id, fullname, address, phone, city, gender) {
  return { index, _id, fullname, address, phone, city, gender };
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

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/client/getall`, {
          headers: {
            Authorization: `${token}`
          }
        });
        const responseData = await response.json();
        setData(
          responseData.map((item, index) =>
            createData(index + 1, item._id, item.fullname, item.address, item.phone, item.city, item.gender)
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
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/client/delete/${clientToDelete}`, {
        method: 'DELETE',
        headers: {
          Authorization: `${localStorage.getItem('token')}`, // Include the token in the Authorization header
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
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
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/client/update/${editedClient._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedClient)
      });

      if (response.ok) {
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
              <TableCell>Gender</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Address</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover key={row._id}>
                <TableCell sx={{ pl: 3 }}>{row.index}</TableCell>
                <TableCell>{row.fullname}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>{row.city || '-'}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell align="center" sx={{ pr: 3 }}>
                  <Stack direction="row" justifyContent="center" alignItems="center">
                    <IconButton color="success" size="large" onClick={() => handleEditClick(row)}>
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
        maxWidth="md"
        aria-labelledby="view-client-title"
        aria-describedby="view-client-description"
      >
        <DialogContent sx={{ mt: 2, my: 1 }}>
          <Stack alignItems="center" spacing={3.5}>
            <Avatar color="primary" sx={{ width: 72, height: 72, fontSize: '1.75rem' }}>
              {selectedClient && selectedClient.fullname.charAt(0).toUpperCase()}
            </Avatar>
            <Stack spacing={2}>
              <Typography variant="h4" align="center">
                {selectedClient ? `${selectedClient.fullname}` : ''}
              </Typography>
              <Typography align="center">Phone: {selectedClient ? selectedClient.phone : ''}</Typography>
              <Typography align="center">Address: {selectedClient ? selectedClient.address : ''}</Typography>
              {/* Additional details can be displayed here */}
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
        maxWidth="md" // Adjusted width
        aria-labelledby="edit-client-details-title"
        aria-describedby="edit-client-details-description"
      >
        <DialogContent sx={{ mt: 2, my: 1 }}>
          <Stack alignItems="center" spacing={3.5}>
            <Typography variant="h4" align="center">
              Edit Client Details
            </Typography>
            <TextField name="fullname" label="Full Name" value={editedClient.fullname || ''} onChange={handleFieldChange} fullWidth />
            <TextField name="phone" label="Phone" value={editedClient.phone || ''} onChange={handleFieldChange} fullWidth />
            <TextField name="address" label="Address" value={editedClient.address || ''} onChange={handleFieldChange} fullWidth />
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              name="gender"
              label="Gender"
              value={editedClient.gender || ''}
              onChange={handleFieldChange}
              fullWidth
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
            <Stack direction="row" spacing={2} sx={{ width: 1 }}>
              <Button fullWidth onClick={handleCloseEditDialog} color="secondary" variant="outlined">
                Cancel
              </Button>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={handleEditSave}
                startIcon={<SaveIcon />} // Added Save icon
              >
                Save
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </MainCard>
  );
}
