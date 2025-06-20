import React, { useState } from 'react';
import { Button, CircularProgress, FormControl, FormHelperText, Grid, TextField } from '@mui/material';

const ContractForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    url: '',
    blocks: '',
    api: '',
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.url) {
      newErrors.url = 'URL is required';
    } else if (!formData.url.startsWith('http')) {
      newErrors.url = 'URL must start with http:// or https://';
    }
    
    if (!formData.blocks) {
      newErrors.blocks = 'Block number or range is required';
    } else {
      // Check if blocks is a valid format: number, "*", or "number-number" or "number-*"
      const blocksPattern = /^(\d+|\*|\d+-\d+|\d+-\*)$/;
      if (!blocksPattern.test(formData.blocks)) {
        newErrors.blocks =
          'Invalid block format. Use a number, "*", or a range like "1000-2000" or "1000-*"';
      }
    }
    
    if (!formData.api) {
      newErrors.api = 'API key is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth error={!!errors.url}>
            <TextField
              label="Ethereum Node URL"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://mainnet.infura.io/v3/YOUR_API_KEY"
              variant="outlined"
              error={!!errors.url}
              disabled={isLoading}
              required
            />
            {errors.url && <FormHelperText>{errors.url}</FormHelperText>}
          </FormControl>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={!!errors.blocks}>
            <TextField
              label="Block Number or Range"
              name="blocks"
              value={formData.blocks}
              onChange={handleChange}
              placeholder="1543256 or 1543250-1543256 or 1543256-* or *"
              variant="outlined"
              error={!!errors.blocks}
              disabled={isLoading}
              required
            />
            {errors.blocks && <FormHelperText>{errors.blocks}</FormHelperText>}
          </FormControl>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={!!errors.api}>
            <TextField
              label="EtherScan API Key"
              name="api"
              value={formData.api}
              onChange={handleChange}
              placeholder="Your EtherScan API Key"
              variant="outlined"
              error={!!errors.api}
              disabled={isLoading}
              required
            />
            {errors.api && <FormHelperText>{errors.api}</FormHelperText>}
          </FormControl>
        </Grid>
        
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={24} color="inherit" /> : null}
          >
            {isLoading ? 'Extracting Contracts...' : 'Extract Smart Contracts'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ContractForm;
