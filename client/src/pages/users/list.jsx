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
  Select,
  MenuItem,
  InputLabel,
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
function createData(_id, fname, lname, email, role) {
  return { _id, fname, lname, email, role };
}

export default function LatestOrder() {
  const [data, setData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/getall`, {
          headers: {
            Authorization: `${token}`
          }
        });
        const responseData = await response.json();
        // Add unique IDs to each row and fetch role names
        const newData = await Promise.all(
          responseData.map(async (row) => {
            const roleResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/role/${row.id_role}`, {
              headers: {
                Authorization: `${token}`
              }
            });
            const roleData = await roleResponse.json();
            return { _id: row._id, ...row, role: roleData.role_name };
          })
        );
        setData(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchRoles = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/role/getall`, {
          headers: {
            Authorization: `${token}`
          }
        });
        const responseData = await response.json();
        setRoles(responseData);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchData();
    fetchRoles();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteClick = (_id) => {
    setUserToDelete(_id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setUserToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/delete/${userToDelete}`, {
        method: 'DELETE',
        headers: {
          Authorization: `${localStorage.getItem('token')}`, // Include the token in the Authorization header
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const updatedData = data.filter((user) => user._id !== userToDelete);
        setData(updatedData);
        toast.success('User deleted successfully', { position: 'top-right' });
      } else {
        console.error('Error deleting user:', response.statusText);
        toast.error('Error deleting user', { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user', { position: 'top-right' });
    }
    handleCloseDeleteDialog();
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedUser(null);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditedUser({ ...user });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedUser(null);
    setEditedUser({});
  };

  const handleEditSave = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/update/${editedUser._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedUser)
      });

      if (response.ok) {
        const roleResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/role/${editedUser.id_role}`, {
          headers: {
            Authorization: `${localStorage.getItem('token')}`
          }
        });
        const roleData = await roleResponse.json();
        const updatedData = data.map((user) => (user._id === editedUser._id ? { ...editedUser, role: roleData.role_name } : user));
        setData(updatedData);
        setOpenEditDialog(false);
        toast.success('User updated successfully', { position: 'top-right' });
      } else {
        console.error('Error updating user:', response.statusText);
        toast.error('Error updating user', { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Error updating user', { position: 'top-right' });
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e) => {
    setEditedUser((prev) => ({ ...prev, id_role: e.target.value }));
  };

  return (
    <MainCard
      title="List of users"
      content={false}
      secondary={
        <Button component={RouterLink} to="/add-user" variant="contained" startIcon={<PlusOutlined />}>
          Add User
        </Button>
      }
    >
      <TableContainer>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover key={row._id}>
                <TableCell sx={{ pl: 3 }}>{row._id}</TableCell>
                <TableCell>{row.fname}</TableCell>
                <TableCell>{row.lname}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role || 'N/A'}</TableCell>
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
        aria-labelledby="delete-user-title"
        aria-describedby="delete-user-description"
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
              <Typography align="center">By deleting the user, all tasks assigned to that user will also be deleted.</Typography>
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
        aria-labelledby="view-user-title"
        aria-describedby="view-user-description"
      >
        <DialogContent sx={{ mt: 2, my: 1 }}>
          <Stack alignItems="center" spacing={3.5}>
            <Avatar color="primary" sx={{ width: 72, height: 72, fontSize: '1.75rem' }}>
              {selectedUser && selectedUser.fname.charAt(0).toUpperCase()}
            </Avatar>
            <Stack spacing={2}>
              <Typography variant="h4" align="center">
                {selectedUser ? `${selectedUser.fname} ${selectedUser.lname}` : ''}
              </Typography>
              <Typography align="center">Email: {selectedUser ? selectedUser.email : ''}</Typography>
              <Typography align="center">Role: {selectedUser ? selectedUser.role : 'N/A'}</Typography>
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
        aria-labelledby="edit-user-details-title"
        aria-describedby="edit-user-details-description"
      >
        <DialogContent sx={{ mt: 2, my: 1 }}>
          <Stack alignItems="center" spacing={3.5}>
            <Typography variant="h4" align="center">
              Edit User Details
            </Typography>
            <TextField name="fname" label="First Name" value={editedUser.fname || ''} onChange={handleFieldChange} fullWidth />
            <TextField name="lname" label="Last Name" value={editedUser.lname || ''} onChange={handleFieldChange} fullWidth />
            <TextField name="email" label="Email" value={editedUser.email || ''} onChange={handleFieldChange} fullWidth />
            <InputLabel id="role-label">Role</InputLabel>
            <Select labelId="role-label" name="id_role" value={editedUser.id_role || ''} onChange={handleRoleChange} fullWidth>
              {roles.map((role) => (
                <MenuItem key={role._id} value={role._id}>
                  {role.role_name}
                </MenuItem>
              ))}
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
