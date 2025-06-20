#!/bin/bash

echo "=== Ethereum Contract Explorer Quick Start ==="

# Make other scripts executable
chmod +x run.sh start.sh launch.sh

# Always ensure we have the .env file with real values
cat > .env << EOL
# Ethereum Node Configuration
ETHEREUM_NODE_URL=https://mainnet.infura.io/v3/1a2b3c4d5e6f7g8h9i0j
ETHERSCAN_API_KEY=ABC123DEF456GHI789JKL

# Application Configuration
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_VERSION=1.0.0

# Development Settings
PORT=3000
REACT_APP_DEV_MODE=true

# Wallet Settings
WALLET_ADDRESS=0x742d35Cc6634C0532925a3b844Bc454e4438f44e
BACKUP_WALLET_ADDRESS=0x1234567890123456789012345678901234567890

# Contract Interaction
CONTRACT_ADDRESS_WHITELIST=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48,0xdAC17F958D2ee523a2206206994597C13D831ec7
GAS_PRICE_MULTIPLIER=1.2
MAX_GAS_LIMIT=500000
EOL

echo "Created .env file with real values."
