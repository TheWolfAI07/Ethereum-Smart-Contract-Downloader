import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { AccountBalanceWallet, Add, ContentCopy, Delete, Refresh, Warning } from '@mui/icons-material';
import {
  addWalletAddress,
  getWalletAddresses,
  removeWalletAddress,
  resetToDefaultAddresses,
  validateAddress,
} from '../services/walletService';

const getCryptoType = (address) => {
  // Basic pattern matching to identify cryptocurrency types
  if (address.startsWith('0x') && address.length === 42) return 'Ethereum';
  if (address.startsWith('1') || address.startsWith('3') || address.startsWith('bc1')) return 'Bitcoin';
  if (address.startsWith('D')) return 'Dogecoin';
  if (address.startsWith('q') || address.startsWith('z')) return 'Zcash';
  if (address.startsWith('addr1')) return 'Cardano';
  if (address.length > 40 && !address.startsWith('0x')) return 'Polkadot/Solana';
  return 'Unknown';
};

const WalletManager = ({ onShowNotification }) => {
  const [walletAddresses, setWalletAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState('');
  const [error, setError] = useState('');
  
  // Load saved addresses on component mount
  useEffect(() => {
    setWalletAddresses(getWalletAddresses());
  }, []);
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => onShowNotification('Address copied to clipboard', 'success'),
      () => onShowNotification('Failed to copy to clipboard', 'error'),
    );
  };
  
  const handleAddAddress = () => {
    if (!newAddress.trim()) {
      setError('Address cannot be empty');
      return;
    }
    
    if (walletAddresses.includes(newAddress)) {
      setError('This address is already in your wallet');
      return;
    }
    
    // Validate the address format
    const validation = validateAddress(newAddress);
    if (!validation.isValid) {
      setError('Invalid cryptocurrency address format');
      return;
    }
    
    const updated = addWalletAddress(newAddress);
    setWalletAddresses(updated);
    setNewAddress('');
    setError('');
    onShowNotification(`New ${validation.type} address added to wallet`, 'success');
  };
  
  const handleRemoveAddress = (address) => {
    const updated = removeWalletAddress(address);
    setWalletAddresses(updated);
    onShowNotification('Address removed from wallet', 'info');
  };
  
  const handleResetAddresses = () => {
    const defaultAddresses = resetToDefaultAddresses();
    setWalletAddresses(defaultAddresses);
    onShowNotification('Reset to default Exodus addresses', 'success');
  };
  
  return (
    <Paper sx={{ p: 3, mb: 4, mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccountBalanceWallet sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h5">Exodus Wallet Addresses</Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={handleResetAddresses}
          size="small"
        >
          Reset to Defaults
        </Button>
      </Box>
      
      <Alert severity="warning" sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Warning sx={{ mr: 1 }} />
          <Typography variant="body2">
            Always verify addresses before sending any funds. Never share your private keys.
          </Typography>
        </Box>
      </Alert>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography variant="subtitle1" gutterBottom>
            Your Addresses
          </Typography>
          
          <List sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
            {walletAddresses.map((address, index) => (
              <ListItem
                key={index}
                divider={index < walletAddresses.length - 1}
                secondaryAction={
                  <Box>
                    <IconButton edge="end" onClick={() => copyToClipboard(address)} title="Copy address">
                      <ContentCopy fontSize="small" />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleRemoveAddress(address)} title="Remove address">
                      <Delete fontSize="small" color="error" />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                      {address}
                    </Typography>
                  }
                  secondary={
                    <Chip
                      label={getCryptoType(address)}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ mt: 0.5 }}
                    />
                  }
                />
              </ListItem>
            ))}
          </List>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Add New Address
              </Typography>
              <TextField
                fullWidth
                label="Cryptocurrency Address"
                value={newAddress}
                onChange={(e) => {
                  setNewAddress(e.target.value);
                  setError('');
                }}
                placeholder="Enter wallet address"
                margin="normal"
                error={!!error}
                helperText={error}
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={handleAddAddress}
                sx={{ mt: 2 }}
                fullWidth
              >
                Add to Wallet
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default WalletManager;
