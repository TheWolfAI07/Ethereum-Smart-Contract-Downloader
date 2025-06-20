import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { Backup, Refresh, Security } from '@mui/icons-material';
import ExodusWalletDisplay from '../components/ExodusWalletDisplay';
import WalletManager from '../components/WalletManager';
import { useWallet } from '../context/WalletContext';

const WalletPage = ({ onShowNotification }) => {
  const [activeTab, setActiveTab] = useState(0);
  const { resetAddresses } = useWallet();
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleReset = () => {
    resetAddresses();
    onShowNotification('Wallet addresses reset to defaults', 'success');
  };
  
  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Exodus Wallet Management
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          This is your Exodus wallet integration. All addresses are stored locally in your browser.
        </Alert>
        
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          sx={{ mb: 3 }}
        >
          <Tab label="My Addresses" />
          <Tab label="Manage Wallet" />
          <Tab label="Security & Backup" />
        </Tabs>
        
        {activeTab === 0 && (
          <Box>
            <ExodusWalletDisplay onCopyAddress={onShowNotification} />
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Refresh />}
                onClick={handleReset}
              >
                Reset to Default Addresses
              </Button>
            </Box>
          </Box>
        )}
        
        {activeTab === 1 && (
          <WalletManager onShowNotification={onShowNotification} />
        )}
        
        {activeTab === 2 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Security color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Security Tips</Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body2" paragraph>
                    • Never share your private keys or seed phrase
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • Always verify addresses before sending funds
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • Be cautious of phishing attempts and fake websites
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • Use hardware wallets for large amounts
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Backup color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Backup Information</Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body2" paragraph>
                    • Your wallet addresses are stored in your browser's local storage
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • To back up, export your addresses or write them down securely
                  </Typography>
                  <Typography variant="body2" paragraph>
                    • Remember that this app only stores addresses, not private keys
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Button variant="contained" color="primary">
                      Export Addresses
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default WalletPage;
