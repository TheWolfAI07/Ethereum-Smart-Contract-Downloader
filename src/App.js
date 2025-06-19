import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  AppBar, 
  Toolbar, 
  Paper, 
  CssBaseline,
  ThemeProvider,
  createTheme
} from '@mui/material';
import ContractForm from './components/ContractForm';
import ContractResults from './components/ContractResults';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      console.log('Form data submitted:', formData);

      // Call the backend API
      const response = await fetch('/api/contracts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: formData.url,
          blocks: formData.blocks,
          api: formData.api
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contracts = await response.json();
      setContracts(contracts);
    } catch (err) {
      setError('Failed to fetch contracts. Please check your configuration and try again.');
      console.error('Error fetching contracts:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Ethereum Smart Contract Downloader
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Extract Smart Contracts
            </Typography>
            <Typography variant="body1" paragraph>
              Configure the parameters below to extract smart contracts from the Ethereum blockchain.
            </Typography>

            <ContractForm onSubmit={handleFormSubmit} isLoading={loading} />
          </Paper>

          {contracts.length > 0 && (
            <ContractResults contracts={contracts} />
          )}

          {error && (
            <Paper sx={{ p: 3, mb: 4, bgcolor: 'error.light' }}>
              <Typography color="error">{error}</Typography>
            </Paper>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
