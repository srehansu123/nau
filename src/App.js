import React from 'react';
import { Container, Box, CssBaseline, Typography } from '@mui/material';
import BookTable from './components/BookTable';

function App() {
  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <BookTable />
      </Box>
    </Container>
  );
}

export default App;
