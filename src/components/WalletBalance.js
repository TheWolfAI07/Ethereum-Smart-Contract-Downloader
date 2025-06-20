import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useWallet } from '../context/WalletContext';

// Mock balances for demonstration purposes
const MOCK_BALANCES = {
  '0x56c702ae143BE884eB3B96043Ac11F5c96d41c3F': { balance: '0.428', symbol: 'ETH', usdValue: 1285.44 },
  'LatNuU82uLELmJQqpHvMrVt5UsVY4iPqhy': { balance: '0.0035', symbol: 'BTC', usdValue: 210.00 },
  'DPi49es6MAZSvD5V4MkeSPAiX8LVJpJucL': { balance: '325', symbol: 'DOGE', usdValue: 113.75 },
  // Other addresses would have zero balance initially
};

const WalletBalance = () => {
  const { addresses } = useWallet();
  const [balances, setBalances] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchBalances = async () => {
      setLoading(true);
      try {
        // In a real app, we'd fetch actual balances from blockchain APIs
        // For now, we'll use mock data and a timeout to simulate network request
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Set the mock balances
        setBalances(MOCK_BALANCES);
        setError(null);
      } catch (err) {
        console.error('Error fetching balances:', err);
        setError('Failed to fetch wallet balances');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBalances();
  }, [addresses]);
  
  // Calculate total USD value
  const totalUsdValue = Object.values(balances).reduce(
    (total, { usdValue }) => total + (usdValue || 0),
    0,
  );
  
  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Exodus Wallet Balances
      </Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
      ) : (
        <>
          <Card sx={{ mb: 3, bgcolor: 'primary.dark', color: 'white' }}>
            <CardContent>
              <Typography variant="overline">Total Portfolio Value</Typography>
              <Typography variant="h4">${totalUsdValue.toFixed(2)} USD</Typography>
            </CardContent>
          </Card>
          
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Address</TableCell>
                  <TableCell>Crypto</TableCell>
                  <TableCell align="right">Balance</TableCell>
                  <TableCell align="right">Value (USD)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {addresses.map(address => {
                  const balance = balances[address] || { balance: '0', symbol: 'Unknown', usdValue: 0 };
                  return (
                    <TableRow key={address} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                          {address.substring(0, 8)}...{address.substring(address.length - 6)}
                        </Typography>
                      </TableCell>
                      <TableCell>{balance.symbol}</TableCell>
                      <TableCell align="right">{balance.balance}</TableCell>
                      <TableCell align="right">${balance.usdValue ? balance.usdValue.toFixed(2) : '0.00'}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Box sx={{ mt: 2 }}>
            <Alert severity="info">
              <Typography variant="body2">
                Note: These are simulated balances for demonstration purposes.
              </Typography>
            </Alert>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default WalletBalance;
