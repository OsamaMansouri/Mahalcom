import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';

export default function DashboardDefault() {
  const [data, setData] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'fname', headerName: 'First Name', flex: 1, editable: false },
    { field: 'lname', headerName: 'Last Name', flex: 1, editable: false },
    { field: 'email', headerName: 'Email', flex: 1, editable: false },
    { field: 'password', headerName: 'Password', flex: 1, editable: false },
    {
      field: 'actions',
      headerName: '',
      width: 250,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '8px', padding: '8px' }}>
          <Button variant="contained" color="primary" size="small" startIcon={<EditIcon />} onClick={() => handleEdit(params.row.id)}>
            Edit
          </Button>
          <Button variant="contained" color="info" size="small" startIcon={<VisibilityIcon />} onClick={() => handleShow(params.row.id)}>
            Show
          </Button>
          <Button variant="contained" color="error" size="small" startIcon={<DeleteIcon />} onClick={() => handleDelete(params.row.id)}>
            Delete
          </Button>
        </Box>
      )
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:8000/api/user/getall', {
          headers: {
            Authorization: `${token}`
          }
        });
        const responseData = await response.json();
        // Add unique IDs to each row
        const newData = responseData.map((row, index) => ({ id: index + 1, ...row }));
        setData(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit action triggered for ID: ${id}`);
  };

  const handleShow = (id) => {
    console.log(`Show action triggered for ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete action triggered for ID: ${id}`);
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} md={12} lg={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Recent Orders</Typography>
          </Grid>
        </Grid>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid rows={data} columns={columns} pageSize={5} rowsPerPageOptions={[5, 10, 20]} disableSelectionOnClick />
        </Box>
      </Grid>
    </Grid>
  );
}
