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
  Chip
} from '@mui/material';
import MainCard from 'components/MainCard';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useLivraison } from 'contexts/livraison/LivraisonContext';
import { useLivreur } from 'contexts/livreur/LivreurContext';
import { Link as RouterLink } from 'react-router-dom';
import toast from 'react-hot-toast';

const PopupTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LivraisonList() {
  const { livraisons, deleteLivraison, updateLivraison } = useLivraison();
  const { livreurs } = useLivreur();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [livraisonToDelete, setLivraisonToDelete] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedLivraison, setSelectedLivraison] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedLivraison, setEditedLivraison] = useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteClick = (_id) => {
    setLivraisonToDelete(_id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setLivraisonToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    await deleteLivraison(livraisonToDelete);
    handleCloseDeleteDialog();
  };

  const handleViewDetails = (livraison) => {
    setSelectedLivraison(livraison);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedLivraison(null);
  };

  const handleEditClick = (livraison) => {
    setSelectedLivraison(livraison);
    setEditedLivraison({
      ...livraison,
      id_user: livraison.id_user?._id || ''
    });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedLivraison(null);
    setEditedLivraison({});
  };

  const handleEditSave = async () => {
    await updateLivraison(editedLivraison._id, editedLivraison);
    handleCloseEditDialog();
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedLivraison((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <MainCard title="List of deliveries" content={false}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>#</TableCell>
              <TableCell>Livreur</TableCell>
              <TableCell>Delivery Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Delivery Address</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {livraisons.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow hover key={row._id}>
                <TableCell sx={{ pl: 3 }}>{index + 1}</TableCell>
                <TableCell>{row.id_user?.fname || '-'}</TableCell>
                <TableCell>{new Date(row.delivery_date).toLocaleDateString()}</TableCell>
                <TableCell>
                  {(() => {
                    switch (row.livraisonStatus) {
                      case 'Pending':
                        return <Chip color="warning" label="Pending" size="small" variant="light" />;
                      case 'In Transit':
                        return <Chip color="primary" label="In Transit" size="small" variant="light" />;
                      case 'Delivered':
                        return <Chip color="success" label="Delivered" size="small" variant="light" />;
                      case 'Cancelled':
                        return <Chip color="error" label="Cancelled" size="small" variant="light" />;
                      default:
                        return <Chip label={row.livraisonStatus} size="small" variant="light" />;
                    }
                  })()}
                </TableCell>
                <TableCell>{row.deliveryAddress}</TableCell>
                <TableCell align="center" sx={{ pr: 3 }}>
                  <Stack direction="row" justifyContent="center" alignItems="center">
                    <IconButton color="secondary" size="large" onClick={() => handleViewDetails(row)}>
                      <VisibilityOutlinedIcon />
                    </IconButton>
                    <IconButton color="primary" size="large" onClick={() => handleEditClick(row)}>
                      <EditOutlined />
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
        count={livraisons.length}
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
        aria-labelledby="delete-livraison-title"
        aria-describedby="delete-livraison-description"
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
        aria-labelledby="view-livraison-title"
        aria-describedby="view-livraison-description"
      >
        <DialogContent sx={{ mt: 2, my: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <MainCard title="Afficher les détails de la livraison">
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={8}>
                    <Stack spacing={1}>
                      <InputLabel>Livreur</InputLabel>
                      <TextField fullWidth name="livreur" value={selectedLivraison?.id_user?.fname || ''} readOnly />
                    </Stack>
                  </Grid>
                  <Grid item xs={4}>
                    <Stack spacing={1}>
                      <InputLabel>Delivery Date</InputLabel>
                      <TextField
                        fullWidth
                        name="delivery_date"
                        value={selectedLivraison ? new Date(selectedLivraison.delivery_date).toLocaleDateString() : ''}
                        readOnly
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={4}>
                    <Stack spacing={1}>
                      <InputLabel>Status</InputLabel>
                      <TextField fullWidth name="status" value={selectedLivraison?.livraisonStatus || ''} readOnly />
                    </Stack>
                  </Grid>
                  <Grid item xs={8}>
                    <Stack spacing={1}>
                      <InputLabel>Delivery Address</InputLabel>
                      <TextField fullWidth name="deliveryAddress" value={selectedLivraison?.deliveryAddress || ''} readOnly />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">Orders</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Client</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Total Quantity</TableCell>
                            <TableCell>Total Price</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedLivraison?.orders?.map((order, index) => (
                            <TableRow key={index}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{order.client_id?.fullname || '-'}</TableCell>
                              <TableCell>
                                {order.products.map((product, productIndex) => (
                                  <img
                                    key={productIndex}
                                    src={`${import.meta.env.VITE_API_BASE_URL}/${product.product_id?.image}`}
                                    style={{ width: '50px', height: '50px', marginRight: '5px' }}
                                    alt={product.product_id?.name}
                                  />
                                ))}
                              </TableCell>
                              <TableCell>{order.totalQuantity}</TableCell>
                              <TableCell>{order.price}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
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
        aria-labelledby="edit-livraison-title"
        aria-describedby="edit-livraison-description"
      >
        <DialogContent sx={{ mt: 2, my: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <MainCard title="Modifier les détails de la livraison">
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={8}>
                    <Stack spacing={1}>
                      <InputLabel>Livreur</InputLabel>
                      <FormControl fullWidth>
                        <Select name="id_user" value={editedLivraison.id_user || ''} readOnly>
                          {livreurs.map((livreur) => (
                            <MenuItem key={livreur._id} value={livreur._id}>
                              {livreur.fname}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Stack>
                  </Grid>
                  <Grid item xs={4}>
                    <Stack spacing={1}>
                      <InputLabel>Delivery Date</InputLabel>
                      <TextField fullWidth readOnly name="delivery_date" value={editedLivraison.delivery_date || ''} />
                    </Stack>
                  </Grid>
                  <Grid item xs={4}>
                    <Stack spacing={1}>
                      <InputLabel>Status</InputLabel>
                      <FormControl fullWidth>
                        <Select
                          name="livraisonStatus"
                          value={editedLivraison.livraisonStatus || ''}
                          onChange={handleFieldChange}
                          displayEmpty
                        >
                          <MenuItem value="" disabled>
                            Select status
                          </MenuItem>
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="In Transit">In Transit</MenuItem>
                          <MenuItem value="Delivered">Delivered</MenuItem>
                          <MenuItem value="Cancelled">Cancelled</MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>
                  </Grid>
                  <Grid item xs={8}>
                    <Stack spacing={1}>
                      <InputLabel>Delivery Address</InputLabel>
                      <TextField fullWidth readOnly name="deliveryAddress" value={editedLivraison.deliveryAddress || ''} />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">Orders</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Client</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Total Quantity</TableCell>
                            <TableCell>Total Price</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {editedLivraison.orders?.map((order, index) => (
                            <TableRow key={index}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{order.client_id?.fullname || '-'}</TableCell>
                              <TableCell>
                                {order.products.map((product, productIndex) => (
                                  <img
                                    key={productIndex}
                                    src={`${import.meta.env.VITE_API_BASE_URL}/${product.product_id?.image}`}
                                    style={{ width: '50px', height: '50px', marginRight: '5px' }}
                                    alt={product.product_id?.name}
                                  />
                                ))}
                              </TableCell>
                              <TableCell>{order.totalQuantity}</TableCell>
                              <TableCell>{order.price}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <CardActions>
                    <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                      <Button variant="outlined" color="secondary" onClick={handleCloseEditDialog}>
                        Cancel
                      </Button>
                      <Button type="submit" variant="contained" onClick={handleEditSave} startIcon={<SaveIcon />}>
                        Edit
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
