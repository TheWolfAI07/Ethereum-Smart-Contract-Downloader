import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  AccountBalanceWallet,
  Code,
  ContentCopy,
  ExpandLess,
  ExpandMore,
  InsertDriveFile,
  OpenInNew,
  Search,
} from '@mui/icons-material';

const ContractList = ({ contracts, onShowNotification }) => {
  const [expandedContract, setExpandedContract] = useState(null);
  const [codeDialogOpen, setCodeDialogOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  
  const handleExpandContract = (contractId) => {
    setExpandedContract(expandedContract === contractId ? null : contractId);
  };
  
  const handleOpenCodeDialog = (contract) => {
    setSelectedContract(contract);
    setCodeDialogOpen(true);
  };
  
  const handleCloseCodeDialog = () => {
    setCodeDialogOpen(false);
  };
  
  const copyToClipboard = (text, successMessage) => {
    navigator.clipboard.writeText(text).then(
      () => onShowNotification(successMessage, 'success'),
      () => onShowNotification('Failed to copy to clipboard', 'error'),
    );
  };
  
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Found Contracts ({contracts.length})
      </Typography>
      
      <TableContainer component={Paper} sx={{ mb: 4, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Contract Address</TableCell>
              <TableCell>Block</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contracts.map((contract) => (
              <React.Fragment key={contract.address}>
                <TableRow hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccountBalanceWallet sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {contract.address.substring(0, 10)}...{contract.address.substring(contract.address.length - 8)}
                      </Typography>
                      <Tooltip title="Copy address">
                        <IconButton
                          size="small"
                          onClick={() => copyToClipboard(contract.address, 'Address copied to clipboard')}
                        >
                          <ContentCopy fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                  <TableCell>{contract.blockNumber}</TableCell>
                  <TableCell>{contract.name || 'Unnamed Contract'}</TableCell>
                  <TableCell>
                    <Chip
                      label={contract.type || 'Unknown'}
                      size="small"
                      color={contract.verified ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell>{contract.byteCodeSize || 'N/A'} bytes</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex' }}>
                      <Tooltip title="View source code">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenCodeDialog(contract)}
                          disabled={!contract.sourceCode}
                        >
                          <Code />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="View on Etherscan">
                        <IconButton
                          size="small"
                          onClick={() => window.open(`https://etherscan.io/address/${contract.address}`, '_blank')}
                        >
                          <OpenInNew />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Toggle details">
                        <IconButton size="small" onClick={() => handleExpandContract(contract.address)}>
                          {expandedContract === contract.address ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={expandedContract === contract.address} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 2 }}>
                        <Typography variant="h6" gutterBottom component="div">
                          Contract Details
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2">Transaction Hash:</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                {contract.transactionHash}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() => copyToClipboard(contract.transactionHash, 'Transaction hash copied')}
                              >
                                <ContentCopy fontSize="small" />
                              </IconButton>
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2">Creator Address:</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                {contract.creatorAddress}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() => copyToClipboard(contract.creatorAddress, 'Creator address copied')}
                              >
                                <ContentCopy fontSize="small" />
                              </IconButton>
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2">Verification Status:</Typography>
                            <Chip
                              label={contract.verified ? 'Verified' : 'Unverified'}
                              color={contract.verified ? 'success' : 'default'}
                              size="small"
                              sx={{ mt: 0.5 }}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2">Compiler Version:</Typography>
                            <Typography variant="body2">
                              {contract.compilerVersion || 'N/A'}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              variant="outlined"
                              startIcon={<Search />}
                              size="small"
                              onClick={() => handleOpenCodeDialog(contract)}
                              disabled={!contract.sourceCode}
                              sx={{ mt: 1 }}
                            >
                              Analyze Contract
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Source Code Dialog */}
      <Dialog
        open={codeDialogOpen}
        onClose={handleCloseCodeDialog}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <InsertDriveFile sx={{ mr: 1 }} />
            {selectedContract?.name || 'Contract'} Source Code
          </Box>
          <Button
            startIcon={<ContentCopy />}
            onClick={() => selectedContract?.sourceCode &&
              copyToClipboard(selectedContract.sourceCode, 'Source code copied to clipboard')}
            disabled={!selectedContract?.sourceCode}
          >
            Copy
          </Button>
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            multiline
            variant="outlined"
            value={selectedContract?.sourceCode || 'Source code not available'}
            InputProps={{
              readOnly: true,
              style: { fontFamily: 'monospace', fontSize: '0.875rem' },
            }}
            rows={20}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCodeDialog}>Close</Button>
          <Button
            variant="contained"
            onClick={() => selectedContract &&
              window.open(`https://etherscan.io/address/${selectedContract.address}#code`, '_blank')}
            startIcon={<OpenInNew />}
          >
            View on Etherscan
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContractList;
