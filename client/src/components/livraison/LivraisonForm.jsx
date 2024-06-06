import React from 'react';
import { Formik, FieldArray } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import {
  Grid,
  TextField,
  Button,
  Stack,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormHelperText,
  Box,
  IconButton,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import PlusOutlined from '@ant-design/icons/PlusOutlined';

import { useLivreur } from 'contexts/livreur/LivreurContext';
import { useOrder } from 'contexts/order/OrderContext';
import MainCard from 'components/MainCard';
import toast from 'react-hot-toast';

const LivraisonForm = ({ onSubmit }) => {
  const { livreurs } = useLivreur();
  const { orders } = useOrder();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        id_livreur: '',
        orders: [{ order_id: '' }],
        delivery_date: '',
        deliveryAddress: '',
        message: '',
        livraisonStatus: ''
      }}
      validationSchema={Yup.object().shape({
        id_livreur: Yup.string().required('Livreur is required'),
        orders: Yup.array()
          .of(
            Yup.object().shape({
              order_id: Yup.string().required('Order is required')
            })
          )
          .min(1, 'At least one order is required'),
        delivery_date: Yup.date().required('Delivery date is required'),
        deliveryAddress: Yup.string().required('Delivery address is required'),
        livraisonStatus: Yup.string().required('Status is required')
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await onSubmit(values);
          navigate('/deliveries');
        } catch (error) {
          console.error('Error adding livraison:', error);
        }
        setSubmitting(false);
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Stack spacing={1}>
                <InputLabel>Livreur</InputLabel>
                <FormControl fullWidth error={touched.id_livreur && !!errors.id_livreur}>
                  <Select name="id_livreur" value={values.id_livreur} onChange={handleChange} onBlur={handleBlur} displayEmpty>
                    <MenuItem value="" disabled>
                      Select a livreur
                    </MenuItem>
                    {livreurs.map((livreur) => (
                      <MenuItem key={livreur._id} value={livreur._id}>
                        {livreur.fname}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.id_livreur && errors.id_livreur && <FormHelperText>{errors.id_livreur}</FormHelperText>}
                </FormControl>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack spacing={1}>
                <InputLabel>Delivery Date</InputLabel>
                <TextField
                  fullWidth
                  type="date"
                  name="delivery_date"
                  value={values.delivery_date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.delivery_date && !!errors.delivery_date}
                  helperText={touched.delivery_date && errors.delivery_date}
                />
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack spacing={1}>
                <InputLabel>Status</InputLabel>
                <FormControl fullWidth error={touched.livraisonStatus && !!errors.livraisonStatus}>
                  <Select name="livraisonStatus" value={values.livraisonStatus} onChange={handleChange} onBlur={handleBlur} displayEmpty>
                    <MenuItem value="" disabled>
                      Select status
                    </MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="In Transit">In Transit</MenuItem>
                    <MenuItem value="Delivered">Delivered</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                  </Select>
                  {touched.livraisonStatus && errors.livraisonStatus && <FormHelperText>{errors.livraisonStatus}</FormHelperText>}
                </FormControl>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel>Delivery Address</InputLabel>
                <TextField
                  fullWidth
                  name="deliveryAddress"
                  value={values.deliveryAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.deliveryAddress && !!errors.deliveryAddress}
                  helperText={touched.deliveryAddress && errors.deliveryAddress}
                />
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h5">Orders</Typography>
            </Grid>
            <Grid item xs={12}>
              <FieldArray
                name="orders"
                render={({ remove, push }) => (
                  <>
                    <TableContainer>
                      <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                          <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Order ID</TableCell>
                            <TableCell align="center">Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {values.orders.map((order, index) => (
                            <TableRow key={index}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>
                                <FormControl
                                  fullWidth
                                  error={
                                    touched.orders &&
                                    touched.orders[index] &&
                                    touched.orders[index].order_id &&
                                    !!errors.orders &&
                                    !!errors.orders[index] &&
                                    !!errors.orders[index].order_id
                                  }
                                >
                                  <Select
                                    name={`orders[${index}].order_id`}
                                    value={order.order_id}
                                    onChange={(e) => {
                                      setFieldValue(`orders[${index}].order_id`, e.target.value);
                                    }}
                                    onBlur={handleBlur}
                                    displayEmpty
                                  >
                                    <MenuItem value="" disabled>
                                      Select an order
                                    </MenuItem>
                                    {orders
                                      .filter((order) => order.paymentStatus === 'Unpaid')
                                      .map((orderItem) => (
                                        <MenuItem key={orderItem._id} value={orderItem._id}>
                                          {orderItem._id}
                                        </MenuItem>
                                      ))}
                                  </Select>
                                  {touched.orders &&
                                    touched.orders[index] &&
                                    touched.orders[index].order_id &&
                                    !!errors.orders &&
                                    !!errors.orders[index] &&
                                    !!errors.orders[index].order_id && <FormHelperText>{errors.orders[index].order_id}</FormHelperText>}
                                </FormControl>
                              </TableCell>
                              <TableCell align="center">
                                <IconButton color="error" onClick={() => remove(index)}>
                                  <DeleteOutlined />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <Box sx={{ pt: 2.5, pr: 2.5, pb: 2.5, pl: 0 }}>
                      <Button
                        color="primary"
                        startIcon={<PlusOutlined />}
                        onClick={() => push({ order_id: '' })}
                        variant="dashed"
                        sx={{ bgcolor: 'transparent !important' }}
                      >
                        Add Order
                      </Button>
                    </Box>
                  </>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel>Message</InputLabel>
                <TextField
                  fullWidth
                  placeholder="Message"
                  name="message"
                  multiline
                  rows={3}
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.message && !!errors.message}
                  helperText={touched.message && errors.message}
                />
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="outlined" color="secondary" sx={{ mr: 2 }}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default LivraisonForm;
