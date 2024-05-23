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
function createData(index, _id, name, description, address, brand, id_catg, price, quantity, id_stock, inStock) {
  return { index, _id, name, description, address, brand, id_catg, price, quantity, id_stock, inStock };
}

export default function LatestOrder() {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/product/getall`, {
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
              item.description,
              item.address,
              item.brand,
              item.id_catg,
              item.price,
              item.quantity,
              item.id_stock,
              item.inStock
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
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteClick = (_id) => {
    setProductToDelete(_id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setProductToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/product/delete/${productToDelete}`, {
        method: 'DELETE',
        headers: {
          Authorization: `${localStorage.getItem('token')}`, // Include the token in the Authorization header
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const updatedData = data.filter((product) => product._id !== productToDelete);
        setData(updatedData);
        toast.success('Product deleted successfully', { position: 'top-right' });
      } else {
        console.error('Error deleting product:', response.statusText);
        toast.error('Error deleting product', { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product', { position: 'top-right' });
    }
    handleCloseDeleteDialog();
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedProduct(null);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditedProduct({ ...product });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedProduct(null);
    setEditedProduct({});
  };

  const handleEditSave = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/product/update/${editedProduct._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedProduct)
      });

      if (response.ok) {
        const updatedData = data.map((product) => (product._id === editedProduct._id ? { ...editedProduct } : product));
        setData(updatedData);
        setOpenEditDialog(false);
        toast.success('Product updated successfully', { position: 'top-right' });
      } else {
        console.error('Error updating product:', response.statusText);
        toast.error('Error updating product', { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Error updating product', { position: 'top-right' });
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <MainCard
      title="List of Products"
      content={false}
      secondary={
        <Button component={RouterLink} to="/add-product" variant="contained" startIcon={<PlusOutlined />}>
          Add Product
        </Button>
      }
    >
      <TableContainer>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>In Stock</TableCell>

              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover key={row._id}>
                <TableCell sx={{ pl: 3 }}>{row.index}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  {categories
                    .filter((cat) => cat._id === row.id_catg)
                    .map((cat) => (
                      <p>{cat.catg_name}</p>
                    ))}
                </TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.id_stock}</TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={row.inStock ? 'In Stock' : 'Out of Stock'}
                    sx={{
                      width: 'fit-content',
                      borderRadius: '4px',
                      color: row.inStock ? 'success.main' : 'error.main',
                      bgcolor: row.inStock ? 'success.lighter' : 'error.lighter'
                    }}
                  />
                  {/* {row.inStock===true? 'instock' : 'outstock'} */}
                </TableCell>

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
        aria-labelledby="delete-product-title"
        aria-describedby="delete-product-description"
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
        aria-labelledby="view-product-title"
        aria-describedby="view-product-description"
      >
        <DialogContent sx={{ mt: 2, my: 1 }}>
          <Stack alignItems="center" spacing={3.5}>
            <Avatar color="primary" sx={{ width: 72, height: 72, fontSize: '1.75rem' }}>
              {selectedProduct && selectedProduct.name.charAt(0).toUpperCase()}
            </Avatar>
            <Stack spacing={2}>
              <Typography variant="h4" align="center">
                {selectedProduct ? `${selectedProduct.name}` : ''}
              </Typography>
              <Typography align="center">Phone: {selectedProduct ? selectedProduct.phone : ''}</Typography>
              <Typography align="center">Address: {selectedProduct ? selectedProduct.address : ''}</Typography>
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
        aria-labelledby="edit-product-details-title"
        aria-describedby="edit-product-details-description"
      >
        <DialogContent sx={{ mt: 2, my: 1 }}>
          <Stack alignItems="center" spacing={3.5}>
            <Typography variant="h4" align="center">
              Edit Product Details
            </Typography>
            <TextField name="name" label="Name" value={editedProduct.name || ''} onChange={handleFieldChange} fullWidth />
            <TextField
              name="description"
              label="description"
              value={editedProduct.description || ''}
              onChange={handleFieldChange}
              fullWidth
            />
            <TextField name="brand" label="brand" value={editedProduct.brand || ''} onChange={handleFieldChange} fullWidth />
            <TextField name="price" label="price" value={editedProduct.price || ''} onChange={handleFieldChange} fullWidth />
            <TextField name="quantity" label="quantity" value={editedProduct.quantity || ''} onChange={handleFieldChange} fullWidth />
            <TextField name="id_stock" label="stock id" value={editedProduct.id_stock || ''} onChange={handleFieldChange} fullWidth />

            <InputLabel id="gender-label">category</InputLabel>
            <Select
              labelId="gender-label"
              name="id_catg"
              label="categorie"
              value={editedProduct.id_catg || ''}
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
