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
function createData(index, _id, name, id_supplier, warehouse, category, type) {
  return { index, _id, name, id_supplier, warehouse, category, type};
}

export default function LatestOrder() {
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [stockToDelete, setStockToDelete] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedStock, setEditedStock] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/stock/getall`, {
          headers: {
            Authorization: `${token}`
          }
        });
        const responseData = await response.json();
        setData(
          responseData.map((item, index) =>
            createData(
              index + 1,
              item._id,
              item.name,
              item.id_supplier,
              item.warehouse,
              item.category,
              item.type
            )
          )
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

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
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteClick = (_id) => {
    setStockToDelete(_id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setStockToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/stock/delete/${stockToDelete}`, {
        method: 'DELETE',
        headers: {
          Authorization: `${localStorage.getItem('token')}`, // Include the token in the Authorization header
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const updatedData = data.filter((stock) => stock._id !== stockToDelete);
        setData(updatedData);
        toast.success('Stock deleted successfully', { position: 'top-right' });
      } else {
        console.error('Error deleting stock:', response.statusText);
        toast.error('Error deleting stock', { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error deleting stock:', error);
      toast.error('Error deleting stock', { position: 'top-right' });
    }
    handleCloseDeleteDialog();
  };

  const handleViewDetails = (stock) => {
    setSelectedStock(stock);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedStock(null);
  };

  const handleEditClick = (stock) => {
    setSelectedStock(stock);
    setEditedStock({ ...stock });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedStock(null);
    setEditedStock({});
  };

  const handleEditSave = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/stock/update/${editedStock._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedStock)
      });

      if (response.ok) {
        const updatedData = data.map((stock) => (stock._id === editedStock._id ? { ...editedStock } : stock));
        setData(updatedData);
        setOpenEditDialog(false);
        toast.success('Stock updated successfully', { position: 'top-right' });
      } else {
        console.error('Error updating stock:', response.statusText);
        toast.error('Error updating stock', { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error updating stock:', error);
      toast.error('Error updating stock', { position: 'top-right' });
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedStock((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <MainCard
      title="List of Stocks"
      content={false}
      secondary={
        <Button component={RouterLink} to="/add-stock" variant="contained" startIcon={<PlusOutlined />}>
          Add Stock
        </Button>
      }
    >
      <TableContainer>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Warehouse</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Type</TableCell>

              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover key={row._id}>
                <TableCell sx={{ pl: 3 }}>{row.index}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  {suppliers
                    .filter((s) => s._id === row.id_supplier)
                    .map((s) => (
                      <p>{s.fullname}</p>
                    ))}
                </TableCell>
                <TableCell>{row.warehouse}</TableCell>
                <TableCell>
                  {categories
                    .filter((c) => c._id === row.category)
                    .map((c) => (
                      <p>{c.catg_name}</p>
                    ))}
                </TableCell>
                <TableCell>{row.type}</TableCell>

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
        aria-labelledby="delete-stock-title"
        aria-describedby="delete-stock-description"
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
        aria-labelledby="view-stock-title"
        aria-describedby="view-stock-description"
      >
        <DialogContent sx={{ mt: 2, my: 1 }}>
          <Stack alignItems="center" spacing={3.5}>
            <Avatar color="primary" sx={{ width: 72, height: 72, fontSize: '1.75rem' }}>
              {selectedStock && selectedStock.name.charAt(0).toUpperCase()}
            </Avatar>
            <Stack spacing={2}>
              <Typography variant="h4" align="center">
                {selectedStock ? `${selectedStock.name}` : ''}
              </Typography>
              <Typography align="center">Description : {selectedStock ? selectedStock.description : ''}</Typography>
              <Typography align="center">Brand : {selectedStock ? selectedStock.brand : ''}</Typography>
              <Typography align="center">Category : {
                selectedStock ? categories.filter((cat) => cat._id === selectedStock.id_catg)[0].catg_name : ''
              }
              </Typography>
              <Typography align="center">Price : {selectedStock ? selectedStock.price : ''}</Typography>
              <Typography align="center">Quantity : {selectedStock ? selectedStock.quantity : ''}</Typography>
              <Typography align="center">Stock : {
                selectedStock ? stocks.filter((st) => st._id === selectedStock.id_stock)[0].name : ''
              }</Typography>
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
        aria-labelledby="edit-stock-details-title"
        aria-describedby="edit-stock-details-description"
      >
        <DialogContent sx={{ mt: 2, my: 1 }}>
          <Stack alignItems="center" spacing={3.5}>
            <Typography variant="h4" align="center">
              Edit Stock Details
            </Typography>
            <TextField name="name" label="Name" value={editedStock.name || ''} onChange={handleFieldChange} fullWidth />
            <TextField
              name="description"
              label="description"
              value={editedStock.description || ''}
              onChange={handleFieldChange}
              fullWidth
            />
            <TextField name="brand" label="brand" value={editedStock.brand || ''} onChange={handleFieldChange} fullWidth />
            <TextField name="price" label="price" value={editedStock.price || ''} onChange={handleFieldChange} fullWidth />
            <TextField name="quantity" label="quantity" value={editedStock.quantity || ''} onChange={handleFieldChange} fullWidth />
            {/* <TextField name="id_stock" label="stock" value={editedStock.id_stock || ''} onChange={handleFieldChange} fullWidth /> */}
           

            <InputLabel id="gender-label">category</InputLabel>
            <Select
              labelId="gender-label"
              name="id_catg"
              label="categorie"
              value={editedStock.id_catg || ''}
              onChange={handleFieldChange}
              fullWidth
            >
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.catg_name}
                </MenuItem>
              ))}
            </Select>

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
