import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  addWalletAddress,
  getWalletAddresses,
  removeWalletAddress,
  resetToDefaultAddresses,
} from '../services/walletService';

// Create context
const WalletContext = createContext();

// Custom hook for using the wallet context
export const useWallet = () => useContext(WalletContext);

// Provider component
export const WalletProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Load addresses on initial render
  useEffect(() => {
    const savedAddresses = getWalletAddresses();
    setAddresses(savedAddresses);
    setLoading(false);
  }, []);
  
  // Add a new address
  const addAddress = (address) => {
    const updated = addWalletAddress(address);
    setAddresses(updated);
    return updated;
  };
  
  // Remove an address
  const removeAddress = (address) => {
    const updated = removeWalletAddress(address);
    setAddresses(updated);
    return updated;
  };
  
  // Reset to defaults
  const resetAddresses = () => {
    const defaults = resetToDefaultAddresses();
    setAddresses(defaults);
    return defaults;
  };
  
  // Check if an address exists
  const hasAddress = (address) => {
    return addresses.includes(address);
  };
  
  // Context value
  const value = {
    addresses,
    addAddress,
    removeAddress,
    resetAddresses,
    hasAddress,
    loading,
  };
  
  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContext;
