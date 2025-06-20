import React from 'react';
import {
  Box,
  Card,
  CardHeader,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import { AccountBalanceWallet, Circle, ContentCopy, OpenInNew } from '@mui/icons-material';
import { useWallet } from '../context/WalletContext';

// Helper to format cryptocurrency addresses for display
const formatAddress = (address, type) => {
  if (address.length > 42) {
    // For very long addresses like Cardano
    return `${address.substring(0, 16)}...${address.substring(address.length - 8)}`;
  } else if (address.length > 20) {
    // For medium addresses
    return `${address.substring(0, 10)}...${address.substring(address.length - 6)}`;
  }
  // For shorter addresses, show as is
  return address;
};

// Get link to appropriate blockchain explorer
const getExplorerLink = (address, type) => {
  if (type === 'Ethereum') {
    return `https://etherscan.io/address/${address}`;
  } else if (type === 'Bitcoin') {
    return `https://blockstream.info/address/${address}`;
  } else if (type === 'Dogecoin') {
    return `https://dogechain.info/address/${address}`;
  } else if (type === 'Cardano') {
    return `https://cardanoscan.io/address/${address}`;
  } else if (type === 'Polkadot/Solana') {
    // Try Solana first
    return `https://explorer.solana.com/address/${address}`;
  }
  // Generic fallback to Blockchain.com
  return `https://www.blockchain.com/explorer/search?search=${address}`;
};

// Get color for different cryptocurrencies
const getCryptoColor = (type) => {
  const colors = {
    'Ethereum': '#627EEA',
    'Bitcoin': '#F7931A',
    'Dogecoin': '#C2A633',
    'Zcash': '#ECB244',
    'Cardano': '#0033AD',
    'Polkadot/Solana': '#E6007A',
    'Unknown': '#9E9E9E',
  };
  return colors[type] || colors['Unknown'];
};

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

const ExodusWalletDisplay = ({ onCopyAddress }) => {
  const { addresses, loading } = useWallet();
  
  // Count addresses by type
  const addressCounts = addresses.reduce((acc, address) => {
    const type = getCryptoType(address);
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
  
  const copyToClipboard = (address) => {
    navigator.clipboard.writeText(address).then(
      () => onCopyAddress('Address copied to clipboard', 'success'),
      () => onCopyAddress('Failed to copy address', 'error'),
    );
  };
  
  if (loading) {
    return <Typography>Loading wallet addresses...</Typography>;
  }
  
  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccountBalanceWallet sx={{ mr: 1 }} />
            <Typography variant="h6">Exodus Wallet</Typography>
          </Box>
        }
        subheader={
          <Box sx={{ mt: 1 }}>
            {Object.entries(addressCounts).map(([type, count]) => (
              <Chip
                key={type}
                label={`${type}: ${count}`}
                size="small"
                sx={{
                  mr: 1,
                  mb: 1,
                  bgcolor: 'rgba(0,0,0,0.1)',
                  '& .MuiChip-avatar': {
                    bgcolor: getCryptoColor(type),
                    width: 10,
                    height: 10,
                  },
                }}
                avatar={<Circle style={{ color: getCryptoColor(type) }} />}
              />
            ))}
          </Box>
        }
      />
      <List dense>
        {addresses.map((address, index) => {
          const type = getCryptoType(address);
          return (
            <ListItem
              key={index}
              divider={index < addresses.length - 1}
              secondaryAction={
                <Box>
                  <Tooltip title="Copy to clipboard">
                    <IconButton edge="end" onClick={() => copyToClipboard(address)}>
                      <ContentCopy fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="View on blockchain explorer">
                    <IconButton
                      edge="end"
                      onClick={() => window.open(getExplorerLink(address, type), '_blank')}
                    >
                      <OpenInNew fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              }
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Circle
                      sx={{
                        fontSize: 10,
                        mr: 1,
                        color: getCryptoColor(type),
                      }}
                    />
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {address}
                    </Typography>
                  </Box>
                }
                secondary={type}
              />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};

export default ExodusWalletDisplay;
