import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Help, Key, Link as LinkIcon, Search, ViewModule } from '@mui/icons-material';
import axios from 'axios';

const DEFAULT_FORM_CONFIG = {
  url: 'https://mainnet.infura.io/v3/YOUR_API_KEY',
  blocks: '*',
  api: 'YOUR_ETHERSCAN_API_KEY',
};

const BLOCK_EXAMPLES = [
  {
    value: '*',
    label: 'All Blocks',
    description: 'Scan entire blockchain (slow)',
  },
  {
    value: '1543256',
    label: 'Single Block',
    description: 'Scan specific block',
  },
  {
    value: '1543250-1543256',
    label: 'Block Range',
    description: 'Scan range of blocks',
  },
  {
    value: '1543256-*',
    label: 'From Block to Latest',
    description: 'Scan from block to current',
  },
];

const ContractForm = ({ onContractsFound, config, onShowNotification, backendStatus }) => {
  const [formData, setFormData] = useState({
    url: config?.url || DEFAULT_FORM_CONFIG.url,
    blocks: config?.blocks || DEFAULT_FORM_CONFIG.blocks,
    api: config?.api || DEFAULT_FORM_CONFIG.api,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
]
  
  
  const validateFormData = (data) => {
    const newErrors = {};
    
    if (!data.url.trim()) {
      newErrors.url = 'Ethereum node URL is required';
    } else if (!data.url.startsWith('http')) {
      newErrors.url = 'URL must start with http:// or https://';
    }
    
    if (!data.blocks.trim()) {
      newErrors.blocks = 'Block specification is required';
    }
    
    if (!data.api.trim()) {
      newErrors.api = 'Etherscan API key is required';
    } else if (data.api === DEFAULT_FORM_CONFIG.api) {
      newErrors.api = 'Please enter your actual Etherscan API key';
    }
    
    return newErrors;
  };
  
  const clearFieldError = (field) => {
    if (errors[field]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [field]: null,
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = validateFormData(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      onShowNotification('Please fix form errors', 'error');
      return;
    }
    
    if ('connected' !== backendStatus) {
      onShowNotification('Backend is not connected', 'error');
      return;
    }
    
    setLoading(true);
    
    try {
      onShowNotification('Starting contract extraction...', 'info');
      
      const response = await axios.post('/api/contracts', {
        url: formData.url,
        blocks: formData.blocks,
        api: formData.api,
      });
      
      if (response.data && response.data.length > 0) {
        onContractsFound(response.data);
        onShowNotification(`Found ${response.data.length} contracts!`, 'success');
      } else {
        onShowNotification('No contracts found in the specified range', 'warning');
      }
      
    } catch (error) {
      console.error('Contract extraction error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to extract contracts';
      onShowNotification(`Error: ${errorMessage}`, 'error');
    } finally {
      setLoading(false);
    }
  };
    
    const DEFAULT_FORM_CONFIG = {
      url: 'https://mainnet.infura.io/v3/YOUR_API_KEY', blocks: '*', api: 'YOUR_ETHERSCAN_API_KEY',
    };
    
    const BLOCK_EXAMPLES = [{
      value: '*',
      label: 'All Blocks',
      description: 'Scan entire blockchain (slow)',
    }, { value: '1543256', label: 'Single Block', description: 'Scan specific block' }, {
      value: '1543250-1543256',
      label: 'Block Range',
      description: 'Scan range of blocks',
    }, { value: '1543256-*', label: 'From Block to Latest', description: 'Scan from block to current' }];
    
    const ContractForm = ({ onContractsFound, config, onShowNotification, backendStatus }) => {
      const [formData, setFormData] = useState({
        url: config?.url || DEFAULT_FORM_CONFIG.url,
        blocks: config?.blocks || DEFAULT_FORM_CONFIG.blocks,
        api: config?.api || DEFAULT_FORM_CONFIG.api,
      });
      const [loading, setLoading] = useState(false);
      const [errors, setErrors] = useState({});
      
      const validateFormData = (data) => {
        const newErrors = {};
        
        if (!data.url.trim()) {
          newErrors.url = 'Ethereum node URL is required';
        } else if (!data.url.startsWith('http')) import React, { useState } from 'react';
        import {
          Box,
          Card,
          CardContent,
          Typography,
          TextField,
          Button,
          Grid,
          Alert,
          CircularProgress,
          FormControl,
          InputLabel,
          Select,
          MenuItem,
          Chip,
          Tooltip,
          IconButton,
        } from '@mui/material';
        import {
          Search, Help, Link as LinkIcon, Key, ViewModule,
        } from '@mui/icons-material';
        import axios from 'axios';
        
        const DEFAULT_FORM_CONFIG = {
          url: 'https://mainnet.infura.io/v3/YOUR_API_KEY', blocks: '*', api: 'YOUR_ETHERSCAN_API_KEY',
        };
        
        const BLOCK_EXAMPLES = [{
          value: '*',
          label: 'All Blocks',
          description: 'Scan entire blockchain (slow)',
        }, {
          value: '1543256',
          label: 'Single Block',
          description: 'Scan specific block',
        }, {
          value: '1543250-1543256',
          label: 'Block Range',
          description: 'Scan range of blocks',
        }, { value: '1543256-*', label: 'From Block to Latest', description: 'Scan from block to current' }];
        
        const ContractForm = ({ onContractsFound, config, onShowNotification, backendStatus }) => {
          const [formData, setFormData] = useState({
            url: config?.url || DEFAULT_FORM_CONFIG.url,
            blocks: config?.blocks || DEFAULT_FORM_CONFIG.blocks,
            api: config?.api || DEFAULT_FORM_CONFIG.api,
          });
          const [loading, setLoading] = useState(false);
          const [errors, setErrors] = useState({});
          
          const validateFormData = (data) => {
            const newErrors = {};
            
            if (!data.url.trim()) {
              newErrors.url = 'Ethereum node URL is required';
            } else if (!data.url.startsWith('http')) {
              newErrors.url = 'URL must start with http:// or https://';
            }
            
            if (!data.blocks.trim()) {
              newErrors.blocks = 'Block specification is required';
            }
            
            if (!data.api.trim()) {
              newErrors.api = 'Etherscan API key is required';
            } else if (data.api === DEFAULT_FORM_CONFIG.api) {
              newErrors.api = 'Please enter your actual Etherscan API key';
            }
            
            return newErrors;
          };
          
          const clearFieldError = (field) => {
            if (errors[field]) {
              setErrors(prevErrors => ({
                ...prevErrors, [field]: null,
              }));
            }
          };
          
          const validateForm = () => {
            const newErrors = validateFormData(formData);
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
          };
          
          const handleSubmit = async (e) => {
            e.preventDefault();
            
            if (!validateForm()) {
              onShowNotification('Please fix form errors', 'error');
              return;
            }
            
            if ('connected' !== backendStatus) {
              onShowNotification('Backend is not connected', 'error');
              return;
            }
            
            setLoading(true);
            
            try {
              onShowNotification('Starting contract extraction...', 'info');
              
              const response = await axios.post('/api/contracts', {
                url: formData.url, blocks: formData.blocks, api: formData.api,
              });
              
              if (response.data && response.data.length > 0) {
                onContractsFound(response.data);
                onShowNotification(`Found ${response.data.length} contracts!`, 'success');
              } else {
                onShowNotification('No contracts found in the specified range', 'warning');
              }
              
            } catch (error) {
              console.error('Contract extraction error:', error);
              const errorMessage = error.response?.data?.message || error.message || 'Failed to extract contracts';
              onShowNotification(`Error: ${errorMessage}`, 'error');
            } finally {
              setLoading(false);
            }
          };
          
          const handleInputChange = (field) => (event) => {
            setFormData(prevData => ({
              ...prevData,
              [field]: event.target.value,
            }));
            clearFieldError(field);
          };
          
          const setBlockExample = (value) => {
            setFormData(prevData => ({
              ...prevData,
              blocks: value,
            }));
            clearFieldError('blocks');
          };
          
          return (
            <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
              <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
                Manual Contract Search
              </Typography>
              
              {backendStatus !== 'connected' && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  Backend is not connected. Please ensure the Spring Boot server is running on port 8080.
                </Alert>
              )}
              
              <Card>
                <CardContent sx={{ p: 4 }}>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      {/* Ethereum Node URL */}
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Ethereum Node URL"
                          value={formData.url}
                          onChange={handleInputChange('url')}
                          error={!!errors.url}
                          helperText={errors.url || 'Enter your Infura, Alchemy, or local node URL'}
                          variant="outlined"
                          InputProps={{
                            startAdornment: <LinkIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                          }}
                        />
                      </Grid>
                      
                      {/* Block Range */}
                      <Grid item xs={12} md={8}>
                        <TextField
                          fullWidth
                          label="Block Range"
                          value={formData.blocks}
                          onChange={handleInputChange('blocks')}
                          error={!!errors.blocks}
                          helperText={errors.blocks || 'Specify blocks to scan (e.g., *, 1543256, 1543250-1543256)'}
                          variant="outlined"
                          InputProps={{
                            startAdornment: <ViewModule sx={{ mr: 1, color: 'text.secondary' }} />,
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                          <InputLabel>Quick Select</InputLabel>
                          <Select
                            value=""
                            onChange={(e) => setBlockExample(e.target.value)}
                            label="Quick Select"
                          >
                            {BLOCK_EXAMPLES.map((example) => (
                              <MenuItem key={example.value} value={example.value}>
                                <Box>
                                  <Typography variant="body2">{example.label}</Typography>
                                  <Typography variant="caption" color="textSecondary">
                                    {example.description}
                                  </Typography>
                                </Box>
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      {/* Block Examples */}
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" gutterBottom>
                          Block Range Examples:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                          {BLOCK_EXAMPLES.map((example) => (
                            <Tooltip key={example.value} title={example.description} arrow>
                              <Chip
                                label={`${example.label}: ${example.value}`}
                                onClick={() => setBlockExample(example.value)}
                                variant="outlined"
                                size="small"
                                clickable
                              />
                            </Tooltip>
                          ))}
                        </Box>
                      </Grid>
                      
                      {/* Etherscan API Key */}
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Etherscan API Key"
                          value={formData.api}
                          onChange={handleInputChange('api')}
                          error={!!errors.api}
                          helperText={errors.api || 'Get your free API key from etherscan.io/apis'}
                          variant="outlined"
                          type="password"
                          InputProps={{
                            startAdornment: <Key sx={{ mr: 1, color: 'text.secondary' }} />,
                            endAdornment: (
                              <Tooltip title="Get API key from etherscan.io/apis" arrow>
                                <IconButton
                                  size="small"
                                  onClick={() => window.open('https://etherscan.io/apis', '_blank')}
                                >
                                  <Help />
                                </IconButton>
                              </Tooltip>
                            ),
                          }}
                        />
                      </Grid>
                      
                      {/* Submit Button */}
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                          <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={loading || backendStatus !== 'connected'}
                            startIcon={loading ? <CircularProgress size={20} /> : <Search />}
                            sx={{ minWidth: 200, py: 1.5 }}
                          >
                            {loading ? 'Extracting Contracts...' : 'Extract Contracts'}
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
              
              {/* Information Card */}
              <Card sx={{ mt: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    How it works:
                  </Typography>
                  <Typography variant="body2" paragraph>
                    This tool uses your Java backend's SmartContractProvider and SmartContractAnalyser classes to:
                  </Typography>
                  <Box component="ol" sx={{ pl: 2 }}>
                    <Box component="li" sx={{ mb: 1 }}>
                      <Typography variant="body2">
                        Connect to Ethereum blockchain via Web3j using your provided node URL
                      </Typography>
                    </Box>
                    <Box component="li" sx={{ mb: 1 }}>
                      <Typography variant="body2">
                        Scan specified blocks for contract creation transactions
                      </Typography>
                    </Box>
                    <Box component="li" sx={{ mb: 1 }}>
                      <Typography variant="body2">
                        Retrieve contract source code from Etherscan API
                      </Typography>
                    </Box>
                    <Box component="li" sx={{ mb: 1 }}>
                      <Typography variant="body2">
                        Save contracts to local storage and return results
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          );
        };
        
        export default ContractForm;
          
          const handleInputChange = (field) => (event) => {
            setFormData(prevData => ({
              ...prevData, [field]: event.target.value,
            }));
            clearFieldError(field);
          };
          
          const setBlockExample = (value) => {
            setFormData(prevData => ({
              ...prevData, blocks: value,
            }));
            clearFieldError('blocks');
          };
          
          return (<Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
              Manual Contract Search
            </Typography>
            
            {backendStatus !== 'connected' && (<Alert severity="error" sx={{ mb: 3 }}>
              Backend is not connected. Please ensure the Spring Boot server is running on port
              8080.
            </Alert>)}
            
            <Card>
              <CardContent sx={{ p: 4 }}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    {/* Ethereum Node URL */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Ethereum Node URL"
                        value={formData.url}
                        onChange={handleInputChange('url')}
                        error={!!errors.url}
                        helperText={errors.url || 'Enter your Infura, Alchemy, or local node URL'}
                        variant="outlined"
                        InputProps={{
                          startAdornment: <LinkIcon
                            sx={{ mr: 1, color: 'text.secondary' }} />,
                        }}
                      />
                    </Grid>
                    
                    {/* Block Range */}
                    <Grid item xs={12} md={8}>
                      <TextField
                        fullWidth
                        label="Block Range"
                        value={formData.blocks}
                        onChange={handleInputChange('blocks')}
                        error={!!errors.blocks}
                        helperText={errors.blocks || 'Specify blocks to scan (e.g., *, 1543256, 1543250-1543256)'}
                        variant="outlined"
                        InputProps={{
                          startAdornment: <ViewModule
                            sx={{ mr: 1, color: 'text.secondary' }} />,
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <InputLabel>Quick Select</InputLabel>
                        <Select
                          value=""
                          onChange={(e) => setBlockExample(e.target.value)}
                          label="Quick Select"
                        >
                          {BLOCK_EXAMPLES.map((example) => (
                            <MenuItem key={example.value} value={example.value}>
                              <Box>
                                <Typography
                                  variant="body2">{example.label}</Typography>
                                <Typography variant="caption" color="textSecondary">
                                  {example.description}
                                </Typography>
                              </Box>
                            </MenuItem>))}
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    {/* Block Examples */}
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" gutterBottom>
                        Block Range Examples:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        {BLOCK_EXAMPLES.map((example) => (
                          <Tooltip key={example.value} title={example.description} arrow>
                            <Chip
                              label={`${example.label}: ${example.value}`}
                              onClick={() => setBlockExample(example.value)}
                              variant="outlined"
                              size="small"
                              clickable
                            />
                          </Tooltip>))}
                      </Box>
                    </Grid>
                    
                    {/* Etherscan API Key */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Etherscan API Key"
                        value={formData.api}
                        onChange={handleInputChange('api')}
                        error={!!errors.api}
                        helperText={errors.api || 'Get your free API key from etherscan.io/apis'}
                        variant="outlined"
                        type="password"
                        InputProps={{
                          startAdornment: <Key sx={{ mr: 1, color: 'text.secondary' }} />,
                          endAdornment: (
                            <Tooltip title="Get API key from etherscan.io/apis" arrow>
                              <IconButton
                                size="small"
                                onClick={() => window.open('https://etherscan.io/apis', '_blank')}
                              >
                                <Help />
                              </IconButton>
                            </Tooltip>),
                        }}
                      />
                    </Grid>
                    
                    {/* Submit Button */}
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          disabled={loading || backendStatus !== 'connected'}
                          startIcon={loading ? <CircularProgress size={20} /> : <Search />}
                          sx={{ minWidth: 200, py: 1.5 }}
                        >
                          {loading ? 'Extracting Contracts...' : 'Extract Contracts'}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
            
            {/* Information Card */}
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  How it works:
                </Typography>
                <Typography variant="body2" paragraph>
                  This tool uses your Java backend's SmartContractProvider and
                  SmartContractAnalyser classes to:
                </Typography>
                <Box component="ol" sx={{ pl: 2 }}>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Typography variant="body2">
                      Connect to Ethereum blockchain via Web3j using your provided node URL
                    </Typography>
                  </Box>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Typography variant="body2">
                      Scan specified blocks for contract creation transactions
                    </Typography>
                  </Box>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Typography variant="body2">
                      Retrieve contract source code from Etherscan API
                    </Typography>
                  </Box>
                  <Box component="li" sx={{ mb: 1 }}>
                    <Typography variant="body2">
                      Save contracts to local storage and return results
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>);
        };
      instanceof
        
        export default ContractForm;
        {
          newErrors.url = 'URL must start with http:// or https://';
        }
        
        if (!data.blocks.trim()) {
          newErrors.blocks = 'Block specification is required';
        }
        
        if (!data.api.trim()) {
          newErrors.api = 'Etherscan API key is required';
        } else if (data.api === DEFAULT_FORM_CONFIG.api) {
          newErrors.api = 'Please enter your actual Etherscan API key';
        }
        
        return newErrors;
      };
      
      const clearFieldError = (field) => {
        if (errors[field]) {
          let newVar = prevErrors => ({
            ...prevErrors, [field]: null,
          });
          setErrors(newVar);
        }
      };
      
      const validateForm = () => {
        const newErrors = validateFormData(formData);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
          onShowNotification('Please fix form errors', 'error');
          return;
        }
        
        if ('connected' !== backendStatus) {
          onShowNotification('Backend is not connected', 'error');
          return;
        }
        
        setLoading(true);
        
        try {
          onShowNotification('Starting contract extraction...', 'info');
          
          const response = await axios.post('/api/contracts', {
            url: formData.url, blocks: formData.blocks, api: formData.api,
          });
          
          if (response.data && response.data.length > 0) {
            onContractsFound(response.data);
            onShowNotification(`Found ${response.data.length} contracts!`, 'success');
          } else {
            onShowNotification('No contracts found in the specified range', 'warning');
          }
          
        } catch (error) {
          console.error('Contract extraction error:', error);
          const errorMessage = error.response?.data?.message || error.message || 'Failed to extract contracts';
          onShowNotification(`Error: ${errorMessage}`, 'error');
        } finally {
          setLoading(false);
        }
      };
      
      const handleInputChange = (field) => (event) => {
        setFormData(prevData => ({
          ...prevData, [field]: event.target.value,
        }));
        clearFieldError(field);
      };
      
      const setBlockExample = (value) => {
        setFormData(prevData => ({
          ...prevData, blocks: value,
        }));
        clearFieldError('blocks');
      };
      
      return (<Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
          Manual Contract Search
        </Typography>
        
        {backendStatus !== 'connected' && (<Alert severity="error" sx={{ mb: 3 }}>
          Backend is not connected. Please ensure the Spring Boot server is running on port 8080.
        </Alert>)}
        
        <Card>
          <CardContent sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Ethereum Node URL */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Ethereum Node URL"
                    value={formData.url}
                    onChange={handleInputChange('url')}
                    error={!!errors.url}
                    helperText={errors.url || 'Enter your Infura, Alchemy, or local node URL'}
                    variant="outlined"
                    InputProps={{
                      startAdornment: <LinkIcon sx={{
                        mr:
                        if(!validateForm()) {onShowNotification('Please fix form errors', 'error');
                        return;}
                        
                        if ('connected' !== backendStatus) {onShowNotification('Backend is not connected', 'error');
                        return;}
                        
                        setLoading(true);
                        
                        try {onShowNotification('Starting contract extraction...', 'info');
                        
                        const response = await axios.post('/api/contracts', {url: formData.url,
                        blocks: formData.blocks,
                        api: formData.api});
                        
                        if (response.data && response.data.length > 0) {onContractsFound(response.data);
                        onShowNotification(`Found ${response.data.length} contracts!`, 'success');} else {onShowNotification('No contracts found in the specified range', 'warning');}
                        
                      } catch (error) {console.error('Contract extraction error:', error);
                        const errorMessage = error.response?.data?.message || error.message || 'Failed to extract contracts';
                        onShowNotification(`Error: ${errorMessage}`, 'error');} finally {setLoading(false);}}
                        
                        const handleInputChange = (field) => (event) => {setFormData({...formData,
                        [field]: event.target.value});
                        
                        // Clear error when user starts typing
                        if (errors[field]) {setErrors({...errors,
                        [field]: null});}};
                        
                        const setBlockExample = (value) => {setFormData({...formData,
                        blocks: value});
                        if (errors.blocks) {setErrors({...errors,
                        blocks: null});}};
                        
                        return (
                        <Box sx={{maxWidth: 800, mx: 'auto', p: 3}}>
                        <Typography variant="h4" gutterBottom
                                    sx={{ mb: 4, textAlign: 'center' }}>
                          Manual Contract Search
                        </Typography>
                        
                        {backendStatus !== 'connected' && (<Alert severity="error" sx={{ mb: 3 }}>
                          Backend is not connected. Please ensure the Spring Boot
                          server is running on port 8080.
                        </Alert>)}
                        
                        <Card>
                          <CardContent sx={{ p: 4 }}>
                            <form onSubmit={handleSubmit}>
                              <Grid container spacing={3}>
                                {/* Ethereum Node URL */}
                                <Grid item xs={12}>
                                  <TextField
                                    fullWidth
                                    label="Ethereum Node URL"
                                    value={formData.url}
                                    onChange={handleInputChange('url')}
                                    error={!!errors.url}
                                    helperText={errors.url || 'Enter your Infura, Alchemy, or local node URL'}
                                    variant="outlined"
                                    InputProps={{
                                      startAdornment: <LinkIcon sx={{
                                        mr: 1, color: 'text.secondary',
                                      }} />,
                                    }}
                                  />
                                </Grid>
                                
                                {/* Block Range */}
                                <Grid item xs={12} md={8}>
                                  <TextField
                                    fullWidth
                                    label="Block Range"
                                    value={formData.blocks}
                                    onChange={handleInputChange('blocks')}
                                    error={!!errors.blocks}
                                    helperText={errors.blocks || 'Specify blocks to scan (e.g., *, 1543256, 1543250-1543256)'}
                                    variant="outlined"
                                    InputProps={{
                                      startAdornment: <ViewModule sx={{
                                        mr: 1, color: 'text.secondary',
                                      }} />,
                                    }}
                                  />
                                </Grid>
                                
                                <Grid item xs={12} md={4}>
                                  <FormControl fullWidth>
                                    <InputLabel>Quick Select</InputLabel>
                                    <Select
                                      value=""
                                      onChange={(e) => setBlockExample(e.target.value)}
                                      label="Quick Select"
                                    >
                                      {blockExamples.map((example) => (
                                        <MenuItem key={example.value}
                                                  value={example.value}>
                                          <Box>
                                            <Typography
                                              variant="body2">{example.label}</Typography>
                                            <Typography
                                              variant="caption"
                                              color="textSecondary">
                                              {example.description}
                                            </Typography>
                                          </Box>
                                        </MenuItem>))}
                                    </Select>
                                  </FormControl>
                                </Grid>
                                
                                {/* Block Examples */}
                                <Grid item xs={12}>
                                  <Typography variant="subtitle2" gutterBottom>
                                    Block Range Examples:
                                  </Typography>
                                  <Box sx={{
                                    display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2,
                                  }}>
                                    {blockExamples.map((example) => (
                                      <Tooltip key={example.value}
                                               title={example.description}
                                               arrow>
                                        <Chip
                                          label={`${example.label}: ${example.value}`}
                                          onClick={() => setBlockExample(example.value)}
                                          variant="outlined"
                                          size="small"
                                          clickable
                                        />
                                      </Tooltip>))}
                                  </Box>
                                </Grid>
                                
                                {/* Etherscan API Key */}
                                <Grid item xs={12}>
                                  <TextField
                                    fullWidth
                                    label="Etherscan API Key"
                                    value={formData.api}
                                    onChange={handleInputChange('api')}
                                    error={!!errors.api}
                                    helperText={errors.api || 'Get your free API key from etherscan.io/apis'}
                                    variant="outlined"
                                    type="password"
                                    InputProps={{
                                      startAdornment: <Key sx={{
                                        mr: 1, color: 'text.secondary',
                                      }} />, endAdornment: (<Tooltip
                                        title="Get API key from etherscan.io/apis"
                                        arrow>
                                        <IconButton
                                          size="small"
                                          onClick={() => window.open('https://etherscan.io/apis', '_blank')}
                                        >
                                          <Help />
                                        </IconButton>
                                      </Tooltip>),
                                    }}
                                  />
                                </Grid>
                                
                                {/* Submit Button */}
                                <Grid item xs={12}>
                                  <Box sx={{
                                    display: 'flex', justifyContent: 'center', mt: 2,
                                  }}>
                                    <Button
                                      type="submit"
                                      variant="contained"
                                      size="large"
                                      disabled={loading || backendStatus !== 'connected'}
                                      startIcon={loading ?
                                        <CircularProgress size={20} /> :
                                        <Search />}
                                      sx={{ minWidth: 200, py: 1.5 }}
                                    >
                                      {loading ? 'Extracting Contracts...' : 'Extract Contracts'}
                                    </Button>
                                  </Box>
                                </Grid>
                              </Grid>
                            </form>
                          </CardContent>
                        </Card>
                        
                        {/* Information Card */}
                        <Card sx={{ mt: 3 }}>
                          <CardContent>
                            <Typography variant="h6" gutterBottom>
                              How it works:
                            </Typography>
                            <Typography variant="body2" paragraph>
                              This tool uses your Java backend's SmartContractProvider
                              and SmartContractAnalyser classes to:
                            </Typography>
                            <Box component="ol" sx={{ pl: 2 }}>
                              <Box component="li" sx={{ mb: 1 }}>
                                <Typography variant="body2">
                                  Connect to Ethereum blockchain via Web3j using
                                  your provided node URL
                                </Typography>
                              </Box>
                              <Box component="li" sx={{ mb: 1 }}>
                                <Typography variant="body2">
                                  Scan specified blocks for contract creation
                                  transactions
                                </Typography>
                              </Box>
                              <Box component="li" sx={{ mb: 1 }}>
                                <Typography variant="body2">
                                  Retrieve contract source code from Etherscan API
                                </Typography>
                              </Box>
                              <Box component="li" sx={{ mb: 1 }}>
                                <Typography variant="body2">
                                  Save contracts to local storage and return
                                  results
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Box>
                      );}
                    
                    export default ContractForm;;;;;;;;;;;;