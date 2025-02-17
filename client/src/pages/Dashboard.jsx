import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';

const Dashboard = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to the Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="primary" fullWidth>
            Action 1
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="secondary" fullWidth>
            Action 2
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 