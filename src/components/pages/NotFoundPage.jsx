import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';

const NotFound = () => (
  <Box 
    sx={{ 
      textAlign: 'center', 
      p: 4, 
      backgroundColor: '#f5f5f5', 
      borderRadius: '8px', 
      maxWidth: 600, 
      margin: 'auto', 
      mt: 4 
    }}
  >
    <Typography variant="h4" sx={{ mb: 2, color: '#ff0000' }}>
      404 - Page Not Found
    </Typography>

    <Typography variant="body1" sx={{ mb: 3 }}>
      The page you're looking for does not exist.
    </Typography>

    <Button 
      variant="contained" 
      color="secondary" 
      component={Link} 
      to="/"
    >
      Go to Home
    </Button>
  </Box>
);

export default NotFound;
