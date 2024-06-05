import React from 'react';
import { Formik } from 'formik';

import {
    Grid,
    TextField,
    Button,
    Stack,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    FormHelperText,
    Box,
    FormControlLabel,
    Checkbox
} from '@mui/material';

import { useLivreur } from 'contexts/livreur/LivreurContext';
import { useOrder } from 'contexts/order/OrderContext';
import MainCard from 'components/MainCard';
import toast from 'react-hot-toast';

const LivraisonForm = () => {
    const { livreures } = useLivreur();
    const { orders } = useOrder();

    // Add check to ensure livreures and orders are defined before mapping over them
    if (!livreures || !orders) {
        return <div>Loading...</div>;
    }

    return (
        <Formik
            initialValues={{
                id_livreur: '',
                id_order: '',
                city: '',
                address: '',
                status: '',
                message: '',
                date: '',

                notes: '',

            }}

            onSubmit={async (values, { setSubmitting }) => {
                try {
                    await orders(values);
                    // Handle successful submission, e.g., redirect or display a success message
                } catch (error) {
                    console.error('Error adding livraison:', error);
                    toast.error('Error adding livraison. Please try again later.');
                }
                setSubmitting(false);
            }}
        >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <MainCard title="Add Livraison">
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel>Livreur</InputLabel>
                                    <FormControl fullWidth error={touched.id_livreur && !!errors.id_livreur}>
                                        <Select
                                            name="id_livreur"
                                            value={values.id_livreur}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            displayEmpty
                                        >
                                            <MenuItem value="" disabled>
                                                Select a livreur
                                            </MenuItem>
                                            {livreures.map((livreur) => (
                                                <MenuItem key={livreur._id} value={livreur._id}>
                                                    {livreur.fname}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {touched.id_livreur && errors.id_livreur && <FormHelperText>{errors.id_livreur}</FormHelperText>}
                                    </FormControl>
                                </Stack>
                            </Grid>

                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel>Order</InputLabel>
                                    <FormControl fullWidth error={touched.id_order && !!errors.id_order}>
                                        <Select
                                            name="id_order"
                                            value={values.id_order}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            displayEmpty
                                        >
                                            <MenuItem value="" disabled>
                                                Select an order
                                            </MenuItem>
                                            {orders.map((order) => (
                                                <MenuItem key={order._id} value={order._id}>
                                                    {order._id}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {touched.id_order && errors.id_order && <FormHelperText>{errors.id_order}</FormHelperText>}
                                    </FormControl>
                                </Stack>
                            </Grid>

                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel>Status</InputLabel>
                                    <TextField
                                        fullWidth
                                        placeholder="Enter status"
                                        name="status"
                                        value={values.status}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        error={touched.status && !!errors.status}
                                        helperText={touched.status && errors.status}
                                    />
                                </Stack>
                            </Grid>

                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel>Message</InputLabel>
                                    <TextField
                                        fullWidth
                                        placeholder="Enter message"
                                        name="message"
                                        value={values.message}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Stack>
                            </Grid>

                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel>Date</InputLabel>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        name="date"
                                        value={values.date}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        error={touched.date && !!errors.date}
                                        helperText={touched.date && errors.date}
                                    />
                                </Stack>
                            </Grid>

                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel>City</InputLabel>
                                    <TextField
                                        fullWidth
                                        placeholder="Enter city"
                                        name="city"
                                        value={values.city}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        error={touched.city && !!errors.city}
                                        helperText={touched.city && errors.city}
                                    />
                                </Stack>
                            </Grid>

                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel>Address</InputLabel>
                                    <TextField
                                        fullWidth
                                        placeholder="Enter address"
                                        name="address"
                                        value={values.address}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        error={touched.address && !!errors.address}
                                        helperText={touched.address && errors.address}
                                    />
                                </Stack>
                            </Grid>

                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel>Recipient</InputLabel>
                                    <TextField
                                        fullWidth
                                        placeholder="Enter recipient"
                                        name="recipient"
                                        value={values.recipient}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        error={touched.recipient && !!errors.recipient}
                                        helperText={touched.recipient && errors.recipient}
                                    />
                                </Stack>
                            </Grid>

                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel>Notes</InputLabel>
                                    <TextField
                                        fullWidth
                                        placeholder="Enter notes"
                                        name="notes"
                                        value={values.notes}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Stack>
                            </Grid>

                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={values.sendNotif}
                                                onChange={handleChange}
                                                name="sendNotif"
                                                color="primary"
                                            />
                                        }
                                        label="Send Notification"
                                    />
                                </Stack>
                            </Grid>
                        </Grid>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button variant="outlined" color="secondary" sx={{ mr: 2 }}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                Save
                            </Button>
                        </Box>
                    </MainCard>
                </form>
            )}
        </Formik>
    );
};

export default LivraisonForm;
