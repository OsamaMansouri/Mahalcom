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
import { EditOutlined } from '@ant-design/icons';

// Simple PopupTransition component
const PopupTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// table data
function createData(index, _id, catg_name) {
  return { index, _id, catg_name };
}

export default function LatestOrder() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [categoryToDelete, setcategoryToDelete] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedcategory, setSelectedcategory] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedcategory, setEditedcategory] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/category/getall`, {
          headers: {
            Authorization: `${token}`
          }
        });
        const responseData = await response.json();
        setData(responseData.map((item, index) => createData(index + 1, item._id, item.catg_name)));
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
    setcategoryToDelete(_id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setcategoryToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/category/delete/${categoryToDelete}`, {
        method: 'DELETE',
        headers: {
          Authorization: `${localStorage.getItem('token')}`, // Include the token in the Authorization header
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const updatedData = data.filter((category) => category._id !== categoryToDelete);
        setData(updatedData);
        toast.success('category deleted successfully', { position: 'top-right' });
      } else {
        console.error('Error deleting category:', response.statusText);
        toast.error('Error deleting category', { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Error deleting category', { position: 'top-right' });
    }
    handleCloseDeleteDialog();
  };

  const handleViewDetails = (category) => {
    setSelectedcategory(category);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedcategory(null);
  };

  const handleEditClick = (category) => {
    setSelectedcategory(category);
    setEditedcategory({ ...category });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedcategory(null);
    setEditedcategory({});
  };

  const handleEditSave = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/category/update/${editedcategory._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedcategory)
      });

      if (response.ok) {
        const updatedData = data.map((category) => (category._id === editedcategory._id ? { ...editedcategory } : category));
        setData(updatedData);
        setOpenEditDialog(false);
        toast.success('category updated successfully', { position: 'top-right' });
      } else {
        console.error('Error updating category:', response.statusText);
        toast.error('Error updating category', { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Error updating category', { position: 'top-right' });
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedcategory((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <MainCard
      title="List of categorys"
      content={false}
      secondary={
        <Button component={RouterLink} to="/add-category" variant="contained" startIcon={<PlusOutlined />}>
          Add category
        </Button>
      }
    >
      <TableContainer>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>ID</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover key={row._id}>
                <TableCell sx={{ pl: 3 }}>{row.index}</TableCell>
                <TableCell>{row.catg_name}</TableCell>

                <TableCell align="center" sx={{ pr: 3 }}>
                  <Stack direction="row" justifyContent="center" alignItems="center">
                    <IconButton color="inherit" size="large" onClick={() => handleEditClick(row)}>
                      <EditOutlined />
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
        aria-labelledby="delete-category-title"
        aria-describedby="delete-category-description"
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
        aria-labelledby="view-category-title"
        aria-describedby="view-category-description"
      >
        <DialogContent sx={{ mt: 2, my: 1 }}>
          <Stack alignItems="center" spacing={3.5}>
            <Avatar color="primary" sx={{ width: 72, height: 72, fontSize: '1.75rem' }}>
              {selectedcategory && selectedcategory.catg_name.charAt(0).toUpperCase()}
            </Avatar>
            <Stack spacing={2}>
              <Typography variant="h4" align="center">
                {selectedcategory ? `${selectedcategory.catg_name}` : ''}
              </Typography>

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
        aria-labelledby="edit-category-details-title"
        aria-describedby="edit-category-details-description"
      >
        <DialogContent sx={{ mt: 2, my: 1 }}>
          <Stack alignItems="center" spacing={3.5}>
            <Typography variant="h4" align="center">
              Edit category Details
            </Typography>
            <TextField
              name="catg_name"
              label="Ctegory Name"
              value={editedcategory.catg_name || ''}
              onChange={handleFieldChange}
              fullWidth
            />

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
