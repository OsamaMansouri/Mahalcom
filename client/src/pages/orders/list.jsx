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
  TextField,
  CardActions,
  Box,
  Chip,
  InputLabel
} from '@mui/material';
import MainCard from 'components/MainCard';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { useOrder } from 'contexts/order/OrderContext';
import { Link as RouterLink } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';

const PopupTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ListOrders() {
  const { orders, deleteOrder } = useOrder();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteClick = (id) => {
    setOrderToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setOrderToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    await deleteOrder(orderToDelete);
    handleCloseDeleteDialog();
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedOrder(null);
  };

  return (
    <MainCard
      title="List of Orders"
      content={false}
      secondary={
        <Button component={RouterLink} to="/add-order" variant="contained" startIcon={<PlusOutlined />}>
          Add Order
        </Button>
      }
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>#</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Total Quantity</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => (
              <TableRow hover key={order._id}>
                <TableCell sx={{ pl: 3 }}>{index + 1}</TableCell>
                <TableCell>{order.client_id.fullname}</TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  {order.products.map((product) => (
                    <div key={product.product_id}>
                      {product.name} (x{product.quantity})
                    </div>
                  ))}
                </TableCell>
                <TableCell>{order.totalQuantity}</TableCell>
                <TableCell>{order.price}</TableCell>
                <TableCell>
                  {order.paymentStatus === 'Paid' ? (
                    <Chip color="success" label="Paid" size="small" variant="light" />
                  ) : (
                    <Chip color="error" label={order.paymentStatus} size="small" variant="light" />
                  )}
                </TableCell>
                <TableCell align="center" sx={{ pr: 2 }}>
                  <Stack direction="row" justifyContent="center" alignItems="center">
                    <IconButton color="secondary" size="large" onClick={() => handleViewDetails(order)}>
                      <VisibilityOutlinedIcon />
                    </IconButton>
                    <IconButton color="error" size="large" onClick={() => handleDeleteClick(order._id)}>
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
        count={orders.length}
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
        aria-labelledby="delete-order-title"
        aria-describedby="delete-order-description"
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
        aria-labelledby="view-order-title"
        aria-describedby="view-order-description"
      >
        <DialogContent sx={{ mt: 2, my: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <MainCard title="Order Details">
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <Stack spacing={1}>
                      <InputLabel>Client</InputLabel>
                      <TextField fullWidth name="client" value={selectedOrder?.client_id?.fullname || ''} readOnly />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                      <InputLabel>Order Date</InputLabel>
                      <TextField
                        fullWidth
                        name="order_date"
                        value={selectedOrder ? new Date(selectedOrder.date).toLocaleDateString() : ''}
                        readOnly
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                      <InputLabel>Payment Status</InputLabel>
                      <TextField fullWidth name="payment_status" value={selectedOrder?.paymentStatus || ''} readOnly />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                      <InputLabel>Payment Method</InputLabel>
                      <TextField fullWidth name="payment_method" value={selectedOrder?.paymentMethod || ''} readOnly />
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                      <InputLabel>Total Price</InputLabel>
                      <TextField fullWidth name="total_price" value={selectedOrder?.price || ''} readOnly />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                      <InputLabel>Total Quantity</InputLabel>
                      <TextField fullWidth name="total_quantity" value={selectedOrder?.totalQuantity || ''} readOnly />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">Products</Typography>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Price</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedOrder?.products.map((product, index) => (
                            <TableRow key={index}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{product.name}</TableCell>
                              <TableCell>{product.quantity}</TableCell>
                              <TableCell>{product.price}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel>Notes</InputLabel>
                      <TextField fullWidth name="notes" value={selectedOrder?.notes || ''} readOnly />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <CardActions>
                      <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                        <Button variant="outlined" color="secondary" onClick={handleCloseViewDialog}>
                          Cancel
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
    </MainCard>
  );
}
