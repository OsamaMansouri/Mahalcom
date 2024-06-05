import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
    TextField,
    TablePagination,
    Slide,
    Grid,
    FormHelperText,
    CardActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import MainCard from 'components/MainCard';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { useLivraison } from 'contexts/delivery/deliveryContext';

const PopupTransition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const moroccanCities = [
    'Casablanca', 'Fez', 'Tangier', 'Marrakesh', 'Salé', 'Meknes', 'Rabat', 'Oujda', 'Kenitra', 'Agadir',
    'Tetouan', 'Temara', 'Safi', 'Mohammedia', 'Khouribga', 'El Jadida', 'Beni Mellal', 'Ait Melloul', 'Nador',
    'Dar Bouazza', 'Taza', 'Settat', 'Berrechid', 'Khemisset', 'Inezgane', 'Ksar El Kebir', 'Larache', 'Guelmim',
    'Khenifra', 'Berkane', 'Taourirt', 'Sidi Slimane', 'Sidi Kacem', 'Al Hoceima', 'Dcheira El Jihadia', 'Errachidia',
    'Sefrou', 'Youssoufia', 'Martil', 'Tiznit', 'Tan-Tan', 'Tiflet', 'Bouskoura', 'Essaouira', 'Taroudant', 'Oulad Teima',
    'Ben Guerir', 'Fquih Ben Salah', 'Ouarzazate', 'Ouazzane', 'Midelt', 'Souk El Arbaa', 'Skhirat', 'Souk Larbaa El Gharb',
    'Laayoune', 'Sidi Ifni', 'Azrou', "M'Diq", 'Tinghir', 'Chefchaouen', 'El Aioun Sidi Mellouk', 'Zagora'
];

export default function LivraisonList() {
    const { livraisons, fetchLivraisons, deleteLivraison, updateLivraison } = useLivraison();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [livraisonToDelete, setLivraisonToDelete] = useState(null);
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [selectedLivraison, setSelectedLivraison] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editedLivraison, setEditedLivraison] = useState({});
    const [fieldErrors, setFieldErrors] = useState({});

    useEffect(() => {
        fetchLivraisons();
    }, []);

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
        setEditedLivraison({ ...livraison });
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
        setEditedLivraison((prev) => ({ ...prev, [name]: value }));

        if (value === '') {
            setFieldErrors((prev) => ({ ...prev, [name]: 'Please fill out this field.' }));
        } else {
            setFieldErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <MainCard
            title="List of Livraisons"
            content={false}
            secondary={
                <Button component={RouterLink} to="/add-livraison" variant="contained" startIcon={<PlusOutlined />}>
                    Add Livraison
                </Button>
            }
        >
            <TableContainer>
                <Table sx={{ minWidth: 350 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: 3 }}>ID</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {livraisons.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRow hover key={row._id}>
                                <TableCell sx={{ pl: 3 }}>{index + 1}</TableCell>
                                <TableCell>{row.address}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>{row.city || '-'}</TableCell>
                                <TableCell align="center" sx={{ pr: 3 }}>
                                    <Stack direction="row" justifyContent="center" alignItems="center">
                                        <IconButton color="inherit" size="large" onClick={() => handleEditClick(row)}>
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
                TransitionComponent={PopupTransition}
                keepMounted
                maxWidth="sm"
                fullWidth
            >
                <DialogContent>
                    <Stack spacing={2}>
                        <Typography variant="h4">Livraison Details</Typography>
                        <Typography>ID: {selectedLivraison?._id}</Typography>
                        <Typography>Address: {selectedLivraison?.address}</Typography>
                        <Typography>Status: {selectedLivraison?.status}</Typography>
                        <Typography>City: {selectedLivraison?.city || '-'}</Typography>
                    </Stack>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog
                open={openEditDialog}
                onClose={handleCloseEditDialog}
                TransitionComponent={PopupTransition}
                keepMounted
                maxWidth="sm"
                fullWidth
            >
                <DialogContent>
                    <Stack spacing={2}>
                        <Typography variant="h4">Edit Livraison</Typography>
                        <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            value={editedLivraison.address || ''}
                            onChange={handleFieldChange}
                            error={!!fieldErrors.address}
                            helperText={fieldErrors.address}
                        />
                        <TextField
                            fullWidth
                            label="Status"
                            name="status"
                            value={editedLivraison.status || ''}
                            onChange={handleFieldChange}
                            error={!!fieldErrors.status}
                            helperText={fieldErrors.status}
                        />
                        <FormControl fullWidth error={!!fieldErrors.city}>
                            <InputLabel>City</InputLabel>
                            <Select
                                name="city"
                                value={editedLivraison.city || ''}
                                onChange={handleFieldChange}
                                label="City"
                            >
                                {moroccanCities.map((city) => (
                                    <MenuItem key={city} value={city}>
                                        {city}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{fieldErrors.city}</FormHelperText>
                        </FormControl>
                    </Stack>
                    <CardActions>
                        <Grid container justifyContent="flex-end" spacing={0}>
                            <Grid item>
                                <Button variant="outlined" color="secondary" onClick={handleCloseEditDialog}>
                                    Cancel
                                </Button>
                                <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleEditSave}>
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </DialogContent>
            </Dialog>
        </MainCard>
    );
}
