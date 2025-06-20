import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CodeIcon from '@mui/icons-material/Code';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LaunchIcon from '@mui/icons-material/Launch';

const ContractResults = ({ contracts, realTimeMode = false, onExecuteContract }) => {
  const [expanded, setExpanded] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [executeDialog, setExecuteDialog] = useState({ open: false, contract: null });
  const [executionParams, setExecutionParams] = useState({
    functionName: '',
    parameters: '',
    value: '0',
  });
  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  const handleCopyCode = (code) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };
  
  const handleExecuteContract = (contract) => {
    setExecuteDialog({ open: true, contract });
    setExecutionParams({
      functionName: '',
      parameters: '',
      value: '0',
    });
  };
  
  const handleCloseExecuteDialog = () => {
    setExecuteDialog({ open: false, contract: null });
  };
  
  const handleExecuteSubmit = () => {
    if (onExecuteContract && executeDialog.contract) {
      onExecuteContract({
        contract: executeDialog.contract,
        functionName: executionParams.functionName,
        parameters: executionParams.parameters,
        value: executionParams.value,
      });
    }
    handleCloseExecuteDialog();
  };
  
  const extractFunctions = (sourceCode) => {
    // Simple regex to extract function names from Solidity code
    const functionRegex = /function\s+(\w+)\s*\(/g;
    const functions = [];
    let match;
    while ((match = functionRegex.exec(sourceCode)) !== null) {
      functions.push(match[1]);
    }
    return functions;
  };
  
  const openEtherscan = (address) => {
    window.open(`https://etherscan.io/address/${address}`, '_blank');
  };
  
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2">
          Extracted Smart Contracts ({contracts.length})
        </Typography>
        {realTimeMode && (
          <Chip label="Real-time Updates" color="success" size="small" icon={<PlayArrowIcon />} />
        )}
      </Box>
      
      {contracts.map((contract) => (
        <Accordion
          key={contract.id}
          expanded={expanded === contract.id}
          onChange={handleChange(contract.id)}
          sx={{ mb: 2 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${contract.id}-content`}
            id={`panel-${contract.id}-header`}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Typography sx={{ fontWeight: 'bold' }}>
                  Contract Address: {contract.address}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title="View on Etherscan">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEtherscan(contract.address);
                      }}
                    >
                      <LaunchIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Execute Contract">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExecuteContract(contract);
                      }}
                      color="primary"
                    >
                      <PlayArrowIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', mt: 1, gap: 1 }}>
                <Chip
                  label={`Block: ${contract.blockNumber}`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label={`Functions: ${extractFunctions(contract.source).length}`}
                  size="small"
                  color="secondary"
                  variant="outlined"
                />
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              {/* Contract Actions */}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<ContentCopyIcon />}
                  onClick={() => handleCopyCode(contract.source)}
                >
                  Copy Code
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<PlayArrowIcon />}
                  onClick={() => handleExecuteContract(contract)}
                  color="primary"
                >
                  Execute Contract
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<LaunchIcon />}
                  onClick={() => openEtherscan(contract.address)}
                >
                  View on Etherscan
                </Button>
              </Box>
              
              <Divider />
              
              {/* Contract Functions */}
              {extractFunctions(contract.source).length > 0 && (
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Available Functions:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {extractFunctions(contract.source).map((func, index) => (
                      <Chip
                        key={index}
                        label={func}
                        size="small"
                        variant="outlined"
                        icon={<CodeIcon />}
                      />
                    ))}
                  </Box>
                </Box>
              )}
              
              <Divider />
              
              {/* Source Code */}
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Source Code:
                </Typography>
                <Box
                  component="pre"
                  sx={{
                    backgroundColor: '#f5f5f5',
                    p: 2,
                    borderRadius: 1,
                    overflow: 'auto',
                    maxHeight: '400px',
                    fontSize: '0.875rem',
                    fontFamily: 'monospace',
                    border: '1px solid #e0e0e0',
                  }}
                >
                  <code>{contract.source}</code>
                </Box>
              </Box>
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
      
      <Snackbar open={copySuccess} autoHideDuration={3000} onClose={() => setCopySuccess(false)}>
        <Alert onClose={() => setCopySuccess(false)} severity="success" sx={{ width: '100%' }}>
          Code copied to clipboard!
        </Alert>
      </Snackbar>
      
      {/* Contract Execution Dialog */}
      <Dialog open={executeDialog.open} onClose={handleCloseExecuteDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccountBalanceWalletIcon />
            Execute Smart Contract
          </Box>
        </DialogTitle>
        <DialogContent>
          {executeDialog.contract && (
            <Stack spacing={3} sx={{ mt: 1 }}>
              <Alert severity="info">
                <Typography variant="body2">
                  <strong>Contract Address:</strong> {executeDialog.contract.address}
                </Typography>
                <Typography variant="body2">
                  <strong>Block:</strong> {executeDialog.contract.blockNumber}
                </Typography>
              </Alert>
              
              <TextField
                label="Function Name"
                value={executionParams.functionName}
                onChange={(e) =>
                  setExecutionParams((prev) => ({ ...prev, functionName: e.target.value }))
                }
                fullWidth
                placeholder="e.g., transfer, approve, balanceOf"
                helperText="Enter the name of the function you want to call"
              />
              
              <TextField
                label="Parameters (JSON format)"
                value={executionParams.parameters}
                onChange={(e) =>
                  setExecutionParams((prev) => ({ ...prev, parameters: e.target.value }))
                }
                fullWidth
                multiline
                rows={3}
                placeholder='e.g., ["0x742d35Cc6634C0532925a3b844Bc454e4438f44e", "1000"]'
                helperText="Enter function parameters as a JSON array"
              />
              
              <TextField
                label="Value (ETH)"
                value={executionParams.value}
                onChange={(e) => setExecutionParams((prev) => ({ ...prev, value: e.target.value }))}
                fullWidth
                placeholder="0"
                helperText="Amount of ETH to send with the transaction (for payable functions)"
              />
              
              {extractFunctions(executeDialog.contract.source).length > 0 && (
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Available Functions:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {extractFunctions(executeDialog.contract.source).map((func, index) => (
                      <Chip
                        key={index}
                        label={func}
                        size="small"
                        variant="outlined"
                        clickable
                        onClick={() =>
                          setExecutionParams((prev) => ({ ...prev, functionName: func }))
                        }
                        color={executionParams.functionName === func ? 'primary' : 'default'}
                      />
                    ))}
                  </Box>
                </Box>
              )}
              
              <Alert severity="warning">
                <Typography variant="body2">
                  <strong>Note:</strong> This is a demonstration interface. In a production
                  environment, you would need to connect a Web3 wallet (like MetaMask) to actually
                  execute transactions on the blockchain. Make sure you understand the contract
                  functions before executing them.
                </Typography>
              </Alert>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseExecuteDialog}>Cancel</Button>
          <Button
            onClick={handleExecuteSubmit}
            variant="contained"
            disabled={!executionParams.functionName}
            startIcon={<PlayArrowIcon />}
          >
            Execute Function
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ContractResults;
