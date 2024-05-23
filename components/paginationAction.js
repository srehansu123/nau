import React from 'react';
import { Grid, Button, TablePagination } from '@mui/material';

const PaginationActions = ({ count, page, rowsPerPage, onPageChange, onRowsPerPageChange, handleSort }) => (
  <Grid container alignItems="center" justifyContent="space-between">
    <Grid item>
      <Button variant="contained" color="primary" onClick={() => handleSort('asc')}>
        Ascending
      </Button>
      <Button variant="contained" color="secondary" onClick={() => handleSort('desc')} sx={{ ml: 2 }}>
        Descending
      </Button>
    </Grid>
    <Grid item>
      <TablePagination
        component="div"
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[10, 25, 50, 100]}
      />
    </Grid>
  </Grid>
);

export default PaginationActions;
