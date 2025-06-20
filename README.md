# Ethereum Contract Explorer

A React & Java application for analyzing Ethereum smart contracts.

## Quick Start

```bash
npm run launch
```

Access at:

- `http://0.0.0.0:3000`
- `http://YOUR_IP_ADDRESS:3000`

## Features

- Connect to any Ethereum node
- Extract smart contracts from blocks
- View contract source code and details
- Analyze contract functions and security

## Tech Stack

- **Frontend**: React with Material UI
- **Backend**: Java Spring Boot
- **Blockchain**: Web3j for Ethereum integration

## Configuration

Wallet addresses are preconfigured:

- Primary: `0x742d35Cc6634C0532925a3b844Bc454e4438f44e`
- Backup: `0x1234567890123456789012345678901234567890`

# Ethereum Contract Explorer

A modern application for exploring and analyzing Ethereum smart contracts directly from the blockchain.

## Features

- Search and extract contracts from the Ethereum blockchain
- View contract source code and functions
- Execute read-only contract calls
- Dark mode UI with Material Design

## Quick Start

### Running the Application

```bash
# Start the application with the run script
./run.sh
```

The application will be available at:

- http://localhost:8888
- http://YOUR_IP:8888 (on your local network)

### Alternative: Using Docker

```bash
# Start with Docker Compose
docker-compose up
```

## Configuration

The application uses environment variables for configuration. These can be set in the `.env` file:

- `PORT`: Application port (default: 8888)
- `ETHEREUM_NODE_URL`: Ethereum node URL (Infura, Alchemy, etc.)
- `ETHERSCAN_API_KEY`: Etherscan API key for source code verification

## Development

### Prerequisites

- Node.js 14+ and npm
- Java 11+ (optional, for backend)

### Installation

```bash
# Install dependencies
npm install

# Start the application in development mode
npm start
```

## License

MIT
Contract whitelist:

- USDC: `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`
- USDT: `0xdAC17F958D2ee523a2206206994597C13D831ec7`

## Development

### Frontend (React)

```bash
# Install dependencies
npm install

# Start React development server
npm start
```

### Backend (Java)

```bash
# Build the Java backend
mvn clean package

# Run the backend
java -jar target/SmartContractExtractor-1.0.jar
```

## License

MIT