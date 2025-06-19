import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Box,
  Chip,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const ContractResults = ({ contracts }) => {
  const [expanded, setExpanded] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Extracted Smart Contracts ({contracts.length})
      </Typography>
      
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
              <Typography sx={{ fontWeight: 'bold' }}>
                Contract Address: {contract.address}
              </Typography>
              <Box sx={{ display: 'flex', mt: 1 }}>
                <Chip 
                  label={`Block: ${contract.blockNumber}`} 
                  size="small" 
                  sx={{ mr: 1 }} 
                  color="primary" 
                  variant="outlined"
                />
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ position: 'relative' }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<ContentCopyIcon />}
                onClick={() => handleCopyCode(contract.source)}
                sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}
              >
                Copy Code
              </Button>
              <Box 
                component="pre"
                sx={{ 
                  backgroundColor: '#f5f5f5', 
                  p: 2, 
                  borderRadius: 1,
                  overflow: 'auto',
                  maxHeight: '400px',
                  mt: 5,
                  fontSize: '0.875rem',
                  fontFamily: 'monospace'
                }}
              >
                <code>{contract.source}</code>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
      
      <Snackbar open={copySuccess} autoHideDuration={3000} onClose={() => setCopySuccess(false)}>
        <Alert onClose={() => setCopySuccess(false)} severity="success" sx={{ width: '100%' }}>
          Code copied to clipboard!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ContractResults;