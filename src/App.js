import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  AppBar,
  Box,
  Chip,
  Container,
  createTheme,
  CssBaseline,
  FormControlLabel,
  LinearProgress,
  Paper,
  Stack,
  Switch,
  ThemeProvider,
  Toolbar,
  Typography,
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
  const [status, setStatus] = useState('');
  const [realTimeMode, setRealTimeMode] = useState(false);
  const [progress, setProgress] = useState(0);
  const eventSourceRef = useRef(null);
  
  useEffect(() => {
    // Cleanup event source on unmount
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);
  
  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setContracts([]);
    setStatus('');
    setProgress(0);
    
    try {
      console.log('Form data submitted:', formData);
      
      if (realTimeMode) {
        // Use real-time extraction with SSE
        await handleRealTimeExtraction(formData);
      } else {
        // Use traditional synchronous extraction
        await handleSyncExtraction(formData);
      }
    } catch (err) {
      setError('Failed to fetch contracts. Please check your configuration and try again.');
      console.error('Error fetching contracts:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSyncExtraction = async (formData) => {
    const response = await fetch('/api/contracts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: formData.url,
        blocks: formData.blocks,
        api: formData.api,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contracts = await response.json();
    setContracts(contracts);
    setStatus(`Found ${contracts.length} contracts`);
  };
  
  const handleRealTimeExtraction = async (formData) => {
    // Close existing event source if any
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }
    
    // Start async extraction
    const response = await fetch('/api/contracts/extract-async', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: formData.url,
        blocks: formData.blocks,
        api: formData.api,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Set up SSE connection for real-time updates
    eventSourceRef.current = new EventSource('/api/contracts/stream');
    
    eventSourceRef.current.onmessage = (event) => {
      console.log('SSE message:', event);
    };
    
    eventSourceRef.current.addEventListener('contract', (event) => {
      const contract = JSON.parse(event.data);
      setContracts((prev) => [...prev, contract]);
      setProgress((prev) => prev + 10); // Increment progress
    });
    
    eventSourceRef.current.addEventListener('status', (event) => {
      setStatus(event.data);
    });
    
    eventSourceRef.current.addEventListener('error', (event) => {
      setError(event.data);
      setLoading(false);
    });
    
    eventSourceRef.current.onerror = (error) => {
      console.error('SSE error:', error);
      if (eventSourceRef.current.readyState === EventSource.CLOSED) {
        setLoading(false);
        setStatus('Connection closed');
      }
    };
    
    // Auto-close after 30 seconds to prevent hanging connections
    setTimeout(() => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        setLoading(false);
        if (!status.includes('completed')) {
          setStatus('Extraction timeout - connection closed');
        }
      }
    }, 30000);
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
            <FormControlLabel
              control={
                <Switch
                  checked={realTimeMode}
                  onChange={(e) => setRealTimeMode(e.target.checked)}
                  color="secondary"
                />
              }
              label="Real-time Mode"
              sx={{ color: 'white' }}
            />
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Extract Smart Contracts
            </Typography>
            <Typography variant="body1" paragraph>
              Configure the parameters below to extract smart contracts from the Ethereum
              blockchain.
              {realTimeMode && (
                <Chip label="Real-time mode enabled" color="primary" size="small" sx={{ ml: 1 }} />
              )}
            </Typography>
            
            <ContractForm onSubmit={handleFormSubmit} isLoading={loading} />
          </Paper>
          
          {/* Status and Progress Display */}
          {(loading || status) && (
            <Paper sx={{ p: 3, mb: 4 }}>
              <Stack spacing={2}>
                {loading && (
                  <>
                    <Typography variant="h6">
                      {realTimeMode
                        ? 'Real-time Extraction in Progress...'
                        : 'Extracting Contracts...'}
                    </Typography>
                    {realTimeMode && progress > 0 && (
                      <LinearProgress variant="determinate" value={Math.min(progress, 100)} />
                    )}
                    {!realTimeMode && <LinearProgress />}
                  </>
                )}
                {status && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="body2">{status}</Typography>
                  </Alert>
                )}
              </Stack>
            </Paper>
          )}
          
          {contracts.length > 0 && (
            <ContractResults
              contracts={contracts}
              realTimeMode={realTimeMode}
              onExecuteContract={(contract) => {
                console.log('Execute contract:', contract);
                // Contract execution logic will be implemented here
              }}
            />
          )}
          
          {error && (
            <Paper sx={{ p: 3, mb: 4 }}>
              <Alert severity="error">
                <Typography>{error}</Typography>
              </Alert>
            </Paper>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
