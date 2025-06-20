# Quick Setup Guide

## Prerequisites

- Java 8+
- Node.js 14+
- Maven 3.6+

## One-Command Launch

For the quickest setup and launch, simply run:

```bash
bash launch.sh
```

This will:
1. Format all code files
2. Install dependencies
3. Create configuration files if missing
4. Build the project
5. Launch the application in development mode

## Manual Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your API keys
```

### 3. Launch

```bash
npm run dev  # Development mode with hot reload
# OR
npm run start-prod  # Production build and run
```

## Connecting to Real Ethereum Wallets

This application can interact with the Ethereum blockchain and execute contract functions. When prompted for connection:

1. Use MetaMask or another web3 wallet
2. Connect to the application
3. Approve transactions when executing contract functions (this requires ETH for gas)

## Security Notes

- Never share your private keys
- Verify contract addresses before interaction
- Test with small amounts before large transactions

Happy blockchain exploring!
