import React, { useState } from 'react';
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
  TablePagination,
  Slide,
  Grid,
  FormControl,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormHelperText,
  CardActions,
  FormControlLabel,
  Checkbox,
  Chip
} from '@mui/material';
import MainCard from 'components/MainCard';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useProduct } from 'contexts/product/ProductContext';
import { Link as RouterLink } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';

const PopupTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductList() {
  const { products, deleteProduct, updateProduct, categories, stocks } = useProduct();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});

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
    await deleteProduct(productToDelete);
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
    setEditedProduct({
      ...product,
      id_catg: product.id_catg?._id || '',
      id_stock: product.id_stock?._id || ''
    });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedProduct(null);
    setEditedProduct({});
  };

  const handleEditSave = async () => {
    const formData = new FormData();
    Object.keys(editedProduct).forEach((key) => {
      formData.append(key, editedProduct[key]);
    });

    await updateProduct(editedProduct._id, formData);
    handleCloseEditDialog();
  };

  const handleFieldChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : files ? files[0] : value
    }));
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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>#</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow hover key={row._id}>
                <TableCell sx={{ pl: 3 }}>{index + 1}</TableCell>
                <TableCell sx={{ pl: 3 }}>
                  <Grid container spacing={2} alignItems="center" sx={{ flexWrap: 'nowrap' }}>
                    <Grid item>
                      {row.image && (
                        <img
                          src={`${import.meta.env.VITE_API_BASE_URL}/${row.image}`}
                          alt={row.name}
                          style={{ width: '50px', height: '50px' }}
                        />
                      )}
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <Typography variant="subtitle1">{row.name}</Typography>
                      <Typography variant="caption" color="secondary">
                        {row.id_catg?.catg_name || '-'}
                      </Typography>
                    </Grid>
                  </Grid>
                </TableCell>

                <TableCell>{row.price} MAD</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>
                  {(() => {
                    if (row.inStock) {
                      return <Chip color="success" label="In Stock" size="small" variant="light" />;
                    } else {
                      return <Chip color="error" label="Out of Stock" size="small" variant="light" />;
                    }
                  })()}
                </TableCell>

                <TableCell align="center" sx={{ pr: 3 }}>
                  <Stack direction="row" justifyContent="center" alignItems="center">
                    <IconButton color="secondary" size="large" onClick={() => handleViewDetails(row)}>
                      <VisibilityOutlinedIcon />
                    </IconButton>
                    <IconButton color="primary" size="large" onClick={() => handleEditClick(row)}>
                      <EditOutlined />
                    </IconButton>

                    <IconButton color="error" size="large" onClick={() => handleDeleteClick(row._id)}>
                      <DeleteOutlined />
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
        count={products.length}
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
        fullWidth
        maxWidth="md"
        aria-labelledby="view-product-title"
        aria-describedby="view-product-description"
      >
        <DialogContent sx={{ mt: 2, my: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <MainCard title="View Product Details">
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel>Name</InputLabel>
                      <TextField
                        fullWidth
                        placeholder="Enter product name"
                        name="name"
                        value={selectedProduct ? selectedProduct.name : ''}
                        readOnly
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel>Description</InputLabel>
                      <TextField
                        fullWidth
                        placeholder="Enter product description"
                        name="description"
                        value={selectedProduct ? selectedProduct.description : ''}
                        readOnly
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel>Brand</InputLabel>
                      <TextField
                        fullWidth
                        placeholder="Enter brand"
                        name="brand"
                        value={selectedProduct ? selectedProduct.brand : ''}
                        readOnly
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel>Category</InputLabel>
                      <FormControl fullWidth>
                        <Select name="id_catg" value={selectedProduct ? selectedProduct.id_catg?._id : ''} readOnly>
                          {categories.map((category) => (
                            <MenuItem key={category._id} value={category._id}>
                              {category.catg_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel>Price</InputLabel>
                      <TextField
                        fullWidth
                        placeholder="Enter price"
                        name="price"
                        value={selectedProduct ? selectedProduct.price : ''}
                        readOnly
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel>Quantity</InputLabel>
                      <TextField
                        fullWidth
                        placeholder="Enter quantity"
                        name="quantity"
                        value={selectedProduct ? selectedProduct.quantity : ''}
                        readOnly
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel>Stock</InputLabel>
                      <FormControl fullWidth>
                        <Select name="id_stock" value={selectedProduct ? selectedProduct.id_stock?._id : ''} readOnly>
                          {stocks.map((stock) => (
                            <MenuItem key={stock._id} value={stock._id}>
                              {stock.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={selectedProduct ? selectedProduct.inStock : false} name="inStock" color="primary" readOnly />
                      }
                      label="In Stock"
                    />
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
        maxWidth="md"
        aria-labelledby="edit-product-title"
        aria-describedby="edit-product-description"
      >
        <DialogContent sx={{ mt: 2, my: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <MainCard title="Edit Product Details">
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel>Name</InputLabel>
                      <TextField
                        fullWidth
                        placeholder="Enter product name"
                        name="name"
                        value={editedProduct.name || ''}
                        onChange={handleFieldChange}
                      />
                    </Stack>
                    <FormHelperText>Please enter the product name</FormHelperText>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel>Description</InputLabel>
                      <TextField
                        fullWidth
                        placeholder="Enter product description"
                        name="description"
                        value={editedProduct.description || ''}
                        onChange={handleFieldChange}
                      />
                    </Stack>
                    <FormHelperText>Please enter the product description</FormHelperText>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel>Brand</InputLabel>
                      <TextField
                        fullWidth
                        placeholder="Enter brand"
                        name="brand"
                        value={editedProduct.brand || ''}
                        onChange={handleFieldChange}
                      />
                    </Stack>
                    <FormHelperText>Please enter the brand</FormHelperText>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel>Category</InputLabel>
                      <FormControl fullWidth>
                        <Select name="id_catg" value={editedProduct.id_catg || ''} onChange={handleFieldChange}>
                          {categories.map((category) => (
                            <MenuItem key={category._id} value={category._id}>
                              {category.catg_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Stack>
                    <FormHelperText>Please enter the category</FormHelperText>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel>Price</InputLabel>
                      <TextField
                        fullWidth
                        placeholder="Enter price"
                        name="price"
                        type="number"
                        value={editedProduct.price || ''}
                        onChange={handleFieldChange}
                      />
                    </Stack>
                    <FormHelperText>Please enter the price</FormHelperText>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel>Quantity</InputLabel>
                      <TextField
                        fullWidth
                        placeholder="Enter quantity"
                        name="quantity"
                        type="number"
                        value={editedProduct.quantity || ''}
                        onChange={handleFieldChange}
                      />
                    </Stack>
                    <FormHelperText>Please enter the quantity</FormHelperText>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <InputLabel>Stock</InputLabel>
                      <FormControl fullWidth>
                        <Select name="id_stock" value={editedProduct.id_stock || ''} onChange={handleFieldChange}>
                          {stocks.map((stock) => (
                            <MenuItem key={stock._id} value={stock._id}>
                              {stock.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Stack>
                    <FormHelperText>Please enter the stock</FormHelperText>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={editedProduct.inStock || false} onChange={handleFieldChange} name="inStock" color="primary" />
                      }
                      label="In Stock"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel>Image</InputLabel>
                      <input type="file" name="image" onChange={handleFieldChange} />
                      {editedProduct.image && (
                        <img
                          src={`${import.meta.env.VITE_API_BASE_URL}/${editedProduct.image}`}
                          alt="Product"
                          style={{ width: '100px', height: '100px' }}
                        />
                      )}
                    </Stack>
                    <FormHelperText>Please upload an image</FormHelperText>
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
