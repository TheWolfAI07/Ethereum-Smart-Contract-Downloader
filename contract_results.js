import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import {
  Alert,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  AccountBalance,
  Close,
  Code,
  ContentCopy,
  Delete,
  Download,
  Functions,
  OpenInNew,
  PlayArrow,
  Token as TokenIcon,
  TrendingUp,
  Visibility,
} from '@mui/icons-material';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

var ContractResults = ({ contracts, onShowNotification, onContractsUpdate }) => {
  const [selectedContract, setSelectedContract] = useState(null);
  const [sourceViewOpen, setSourceViewOpen] = useState(false);
  const [executeDialogOpen, setExecuteDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [contractFunctions, setContractFunctions] = useState([]);
  const [executionResult, setExecutionResult] = useState('');
  const [executionLoading, setExecutionLoading] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [connectedAccount, setConnectedAccount] = useState('');
  
  // Initialize Web3 connection
  useEffect(() => {
    var initWeb3 = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
          
          // Request account access
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setConnectedAccount(accounts[0]);
          
          // Listen for account changes
          window.ethereum.on('accountsChanged', (accounts) => {
            setConnectedAccount(accounts[0]);
          });
        } catch (error) {
          console.error('Error initializing Web3:', error);
          onShowNotification('Failed to connect to Ethereum network', 'error');
        }
      } else {
        console.warn('No Ethereum browser extension detected');
      }
    };
    
    initWeb3();
    
    return () => {
      // Clean up listeners
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
      }
    };
  }, []);
  
  const categorizedContracts = {
    nft: contracts.filter(c => isNFTContract(c)),
    token: contracts.filter(c => isTokenContract(c)),
    defi: contracts.filter(c => isDeFiContract(c)),
    other: contracts.filter(c => !isNFTContract(c) && !isTokenContract(c) && !isDeFiContract(c)),
  };
  
  function isNFTContract(contract) {
    const source = contract.source?.toLowerCase() || '';
    const nftPatterns = ['erc721', 'erc1155', 'nft', 'ownerof', 'tokenuri', 'safetransferfrom'];
    return nftPatterns.some(pattern => source.includes(pattern));
  }
  
  function isTokenContract(contract) {
    const source = contract.source?.toLowerCase() || '';
    const tokenPatterns = ['erc20', 'transfer', 'balanceof', 'approve', 'allowance', 'totalsupply'];
    return tokenPatterns.some(pattern => source.includes(pattern));
  }
  
  function isDeFiContract(contract) {
    const source = contract.source?.toLowerCase() || '';
    const defiPatterns = ['uniswap', 'liquidity', 'stake', 'yield', 'swap', 'lending'];
    return defiPatterns.some(pattern => source.includes(pattern));
  }
  
  const extractFunctions = (sourceCode) => {
    if (!sourceCode) return [];
    
    const functionRegex = /function\s+(\w+)\s*\([^)]*\)\s*(?:public|external|internal|private)?\s*(?:view|pure|payable)?\s*(?:returns\s*\([^)]*\))?\s*{/gi;
    const functions = [];
    let match;
    
    while ((match = functionRegex.exec(sourceCode)) !== null) {
      const functionName = match[1];
      const fullMatch = match[0];
      
      // Extract parameters
      const paramMatch = fullMatch.match(/\(([^)]*)\)/);
      const params = paramMatch ? paramMatch[1].split(',').map(p => p.trim()).filter(p => p) : [];
      
      // Determine function type
      const isView = fullMatch.includes('view') || fullMatch.includes('pure');
      const isPayable = fullMatch.includes('payable');
      
      functions.push({
        name: functionName,
        params,
        isView,
        isPayable,
        fullSignature: fullMatch,
      });
    }
    
    return functions;
  };
  
  const handleViewSource = (contract) => {
    setSelectedContract(contract);
    setSourceViewOpen(true);
  };
  
  var handleExecuteContract = (contract) => {
    setSelectedContract(contract);
    const functions = extractFunctions(contract.source);
    setContractFunctions(functions);
    setExecuteDialogOpen(true);
    setExecutionResult('');
  };
  
  const executeFunction = async (functionName, params = []) => {
    setExecutionLoading(true);
    setExecutionResult('');
    
    try {
      // Connect to the Ethereum network via Web3
      if (!window.ethereum) {
        throw new Error('MetaMask or another Web3 provider is required');
      }
      
      const web3 = new Web3(window.ethereum);
      await window.ethereum.enable(); // Request account access
      const accounts = await web3.eth.getAccounts();
      
      // Create contract instance
      const contractABI = JSON.parse(selectedContract.abi || '[]');
      const contractInstance = new web3.eth.Contract(contractABI, selectedContract.address);
      
      // Check if function exists in the contract
      if (!contractInstance.methods[functionName]) {
        throw new Error(`Function ${functionName} not found in contract`);
      }
      
      // Execute the function with parameters
      let result;
      if (params.length > 0) {
        result = await contractInstance.methods[functionName](...params).call({ from: accounts[0] });
      } else {
        result = await contractInstance.methods[functionName]().call({ from: accounts[0] });
      }
      
      setExecutionResult(JSON.stringify(result, null, 2));
      onShowNotification(`Function ${functionName} executed successfully`, 'success');
      
    } catch (error) {
      setExecutionResult(`Error: ${error.message}`);
      onShowNotification(`Execution failed: ${error.message}`, 'error');
    } finally {
      setExecutionLoading(false);
    }
  };
  
  const downloadContract = (contract) => {
    const blob = new Blob([contract.source || '// No source code available'], {
      type: 'text/plain',
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${contract.address}.sol`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    onShowNotification('Contract downloaded', 'success');
  };
  
  const openInEtherscan = (address) => {
    window.open(`https://etherscan.io/address/${address}`, '_blank');
  };
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    onShowNotification('Copied to clipboard', 'success');
  };
  
  const deleteContract = (contractToDelete) => {
    const updatedContracts = contracts.filter(c => c.id !== contractToDelete.id);
    onContractsUpdate(updatedContracts);
    onShowNotification('Contract removed', 'info');
  };
  
  const ContractCard = ({ contract, category }) => {
    const getCategoryColor = (cat) => {
      switch (cat) {
        case 'nft':
          return 'secondary';
        case 'token':
          return 'success';
        case 'defi':
          return 'warning';
        default:
          return 'primary';
      }
    };
    
    const getCategoryIcon = (cat) => {
      switch (cat) {
        case 'nft':
          return <TrendingUp />;
        case 'token':
          return <TokenIcon />;
        case 'defi':
          return <AccountBalance />;
        default:
          return <Code />;
      }
    };
    
    return (
      <Card sx={{ height: '100%', position: 'relative' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="h6" sx={{
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                wordBreak: 'break-all',
              }}>
                {contract.address}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Block: {contract.blockNumber}
              </Typography>
            </Box>
            <Chip
              icon={getCategoryIcon(category)}
              label={category.toUpperCase()}
              color={getCategoryColor(category)}
              size="small"
            />
          </Box>
          
          {contract.source && (
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Source: {contract.source.length} characters
              {contract.source.length > 1000 && (
                <Chip label="Large Contract" size="small" sx={{ ml: 1 }} />
              )}
            </Typography>
          )}
          
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Tooltip title="View Source Code">
              <IconButton
                size="small"
                onClick={() => handleViewSource(contract)}
                color="primary"
              >
                <Visibility />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Execute Functions">
              <IconButton
                size="small"
                onClick={() => handleExecuteContract(contract)}
                color="success"
              >
                <PlayArrow />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Download Source">
              <IconButton
                size="small"
                onClick={() => downloadContract(contract)}
                color="info"
              >
                <Download />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="View on Etherscan">
              <IconButton
                size="small"
                onClick={() => openInEtherscan(contract.address)}
                color="primary"
              >
                <OpenInNew />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Copy Address">
              <IconButton
                size="small"
                onClick={() => copyToClipboard(contract.address)}
              >
                <ContentCopy />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Remove Contract">
              <IconButton
                size="small"
                onClick={() => deleteContract(contract)}
                color="error"
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        </CardContent>
      </Card>
    );
  };
  
  if (contracts.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Code sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          No Contracts Found
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Use the Auto Hunter or Manual Search to find smart contracts
        </Typography>
      </Box>
    );
  }
  
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Code />
          Contract Results
          <Badge badgeContent={contracts.length} color="primary" max={999} />
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          {connectedAccount ? (
            <Button
              variant="contained"
              color="success"
              disabled
            >
              Connected: {connectedAccount.substring(0, 6)}...{connectedAccount.substring(connectedAccount.length - 4)}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={async () => {
                try {
                  if (window.ethereum) {
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    setConnectedAccount(accounts[0]);
                    onShowNotification('Wallet connected successfully', 'success');
                  } else {
                    onShowNotification('Please install MetaMask or another Web3 provider', 'error');
                  }
                } catch (error) {
                  onShowNotification(`Connection failed: ${error.message}`, 'error');
                }
              }}
            >
              Connect Wallet
            </Button>
          )}
          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={() => {
              contracts.forEach((contract, index) => {
                setTimeout(() => downloadContract(contract), index * 100);
              });
            }}
          >
            Download All
          </Button>
        </Box>
      </Box>
      
      {/* Statistics */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: 'secondary.main', color: 'white' }}>
            <Typography variant="h4">{categorizedContracts.nft.length}</Typography>
            <Typography variant="body2">NFT Contracts</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: 'success.main', color: 'white' }}>
            <Typography variant="h4">{categorizedContracts.token.length}</Typography>
            <Typography variant="body2">Token Contracts</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: 'warning.main', color: 'white' }}>
            <Typography variant="h4">{categorizedContracts.defi.length}</Typography>
            <Typography variant="body2">DeFi Contracts</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: 'primary.main', color: 'white' }}>
            <Typography variant="h4">{categorizedContracts.other.length}</Typography>
            <Typography variant="body2">Other Contracts</Typography>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Tabs for different contract types */}
      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
        <Tab
          label={`NFT Contracts (${categorizedContracts.nft.length})`}
          icon={<TrendingUp />}
          iconPosition="start"
        />
        <Tab
          label={`Token Contracts (${categorizedContracts.token.length})`}
          icon={<TokenIcon />}
          iconPosition="start"
        />
        <Tab
          label={`DeFi Contracts (${categorizedContracts.defi.length})`}
          icon={<AccountBalance />}
          iconPosition="start"
        />
        <Tab
          label={`Other (${categorizedContracts.other.length})`}
          icon={<Code />}
          iconPosition="start"
        />
      </Tabs>
      
      {/* Contract grids for each category */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {categorizedContracts.nft.map((contract) => (
            <Grid item xs={12} md={6} lg={4} key={contract.id}>
              <ContractCard contract={contract} category="nft" />
            </Grid>
          ))}
        </Grid>
        {categorizedContracts.nft.length === 0 && (
          <Alert severity="info">No NFT contracts found</Alert>
        )}
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          {categorizedContracts.token.map((contract) => (
            <Grid item xs={12} md={6} lg={4} key={contract.id}>
              <ContractCard contract={contract} category="token" />
            </Grid>
          ))}
        </Grid>
        {categorizedContracts.token.length === 0 && (
          <Alert severity="info">No token contracts found</Alert>
        )}
      </TabPanel>
      
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          {categorizedContracts.defi.map((contract) => (
            <Grid item xs={12} md={6} lg={4} key={contract.id}>
              <ContractCard contract={contract} category="defi" />
            </Grid>
          ))}
        </Grid>
        {categorizedContracts.defi.length === 0 && (
          <Alert severity="info">No DeFi contracts found</Alert>
        )}
      </TabPanel>
      
      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          {categorizedContracts.other.map((contract) => (
            <Grid item xs={12} md={6} lg={4} key={contract.id}>
              <ContractCard contract={contract} category="other" />
            </Grid>
          ))}
        </Grid>
        {categorizedContracts.other.length === 0 && (
          <Alert severity="info">No other contracts found</Alert>
        )}
      </TabPanel>
      
      {/* Source Code Viewer Dialog */}
      <Dialog
        open={sourceViewOpen}
        onClose={() => setSourceViewOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Code />
            Contract Source Code
          </Box>
          <IconButton onClick={() => setSourceViewOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedContract && (
            <Box>
              <Typography variant="subtitle1" gutterBottom sx={{ fontFamily: 'monospace' }}>
                {selectedContract.address}
              </Typography>
              <TextField
                multiline
                fullWidth
                rows={20}
                value={selectedContract.source || '// No source code available'}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                  sx: { fontFamily: 'monospace', fontSize: '0.875rem' },
                }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => copyToClipboard(selectedContract?.source || '')}>
            Copy Source
          </Button>
          <Button onClick={() => downloadContract(selectedContract)}>
            Download
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Contract Execution Dialog */}
      <Dialog
        open={executeDialogOpen}
        onClose={() => setExecuteDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Functions />
            Execute Contract Functions
          </Box>
          <IconButton onClick={() => setExecuteDialogOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedContract && (
            <Box>
              <Typography variant="subtitle1" gutterBottom sx={{ fontFamily: 'monospace' }}>
                {selectedContract.address}
              </Typography>
              
              <Alert severity="info" sx={{ mb: 2 }}>
                This interface interacts directly with the Ethereum blockchain via Web3. You need a
                connected wallet (like MetaMask) to execute functions.
              </Alert>
              
              <Typography variant="h6" gutterBottom>
                Available Functions ({contractFunctions.length})
              </Typography>
              
              {contractFunctions.length === 0 ? (
                <Alert severity="warning">
                  No functions found in contract source code
                </Alert>
              ) : (
                <List>
                  {contractFunctions.map((func, index) => (
                    <ListItem key={index} divider>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                              {func.name}
                            </Typography>
                            {func.isView && <Chip label="View" size="small" color="info" />}
                            {func.isPayable &&
                              <Chip label="Payable" size="small" color="warning" />}
                          </Box>
                        }
                        secondary={
                          <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                            Parameters: {func.params.length > 0 ? func.params.join(', ') : 'none'}
                          </Typography>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<PlayArrow />}
                          onClick={() => executeFunction(func.name, func.params)}
                          disabled={executionLoading}
                        >
                          Execute
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              )}
              
              {executionResult && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Execution Result:
                  </Typography>
                  <TextField
                    multiline
                    fullWidth
                    rows={4}
                    value={executionResult}
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                      sx: { fontFamily: 'monospace' },
                    }}
                  />
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ContractResults;