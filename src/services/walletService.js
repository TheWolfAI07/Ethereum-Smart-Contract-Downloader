/**
 * Wallet Service - Manages wallet addresses and validation
 */

// Default Exodus wallet addresses
const DEFAULT_EXODUS_ADDRESSES = [
  // Ethereum addresses
  '0x56c702ae143BE884eB3B96043Ac11F5c96d41c3F',
  // Bitcoin address
  'LatNuU82uLELmJQqpHvMrVt5UsVY4iPqhy',
  // Dogecoin address
  'DPi49es6MAZSvD5V4MkeSPAiX8LVJpJucL',
  // Zcash address
  'qz9wuhyj3c9hj2mltm3key9wrgcyfdhxe5zrkdx0t0',
  // Cardano address
  'addr1qxcacg8fwctfh0r9vz857kpx228d9svc4rqaxzn4rgy54ed3msswjasknw7x2cy0favzv55w6tqe32xp6v982xsfftjs5k2ytc',
  // Polkadot address
  '18EskvWcJighSayinHhWNbJt2xiNpX17tMSw8aJ3akRTedX',
  // Solana NFT addresses
  '8EW7CuQ5Eb3Zak5oVW6XSGdoxMeAojijPWkBMTvepG9X',
  'C22KAZ6CVW7BFHI7MVUPZBL37HZNP2TRTB3GUO74LUVS724KXNQ4SUYLOQ',
];

// Store the wallet addresses in localStorage
export const saveWalletAddresses = (addresses) => {
  localStorage.setItem('exodusWalletAddresses', JSON.stringify(addresses));
  return addresses;
};

// Get saved wallet addresses from localStorage or use defaults
export const getWalletAddresses = () => {
  const saved = localStorage.getItem('exodusWalletAddresses');
  return saved ? JSON.parse(saved) : DEFAULT_EXODUS_ADDRESSES;
};

// Add a new wallet address
export const addWalletAddress = (address) => {
  const addresses = getWalletAddresses();
  if (!addresses.includes(address)) {
    addresses.push(address);
    saveWalletAddresses(addresses);
  }
  return addresses;
};

// Remove a wallet address
export const removeWalletAddress = (address) => {
  const addresses = getWalletAddresses();
  const updatedAddresses = addresses.filter(addr => addr !== address);
  saveWalletAddresses(updatedAddresses);
  return updatedAddresses;
};

// Reset to default addresses
export const resetToDefaultAddresses = () => {
  return saveWalletAddresses(DEFAULT_EXODUS_ADDRESSES);
};

// Cryptocurrency patterns for validation
export const CRYPTO_PATTERNS = {
  ethereum: /^0x[a-fA-F0-9]{40}$/,
  bitcoin: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[ac-hj-np-z02-9]{8,87}$/,
  dogecoin: /^D{1}[5-9A-HJ-NP-U]{1}[1-9A-HJ-NP-Za-km-z]{32}$/,
  cardano: /^addr1[a-z0-9]+$/,
  polkadot: /^[1-9A-HJ-NP-Za-km-z]{47,48}$/,
  solana: /^[1-9A-HJ-NP-Za-km-z]{32,44}$/,
};

// Validate a crypto address (basic pattern matching)
export const validateAddress = (address) => {
  // Check against all patterns
  for (const [type, pattern] of Object.entries(CRYPTO_PATTERNS)) {
    if (pattern.test(address)) {
      return { isValid: true, type };
    }
  }
  
  // If no pattern matches but address is reasonably long, assume it might be valid
  if (address.length >= 26) {
    return { isValid: true, type: 'unknown' };
  }
  
  return { isValid: false, type: 'invalid' };
};
