#!/bin/bash
# Make script executable with: chmod +x launch.sh

echo "Starting Ethereum Smart Contract Downloader..."

# Check if Docker is installed
if command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
    echo "Docker and Docker Compose are installed. Using containerized deployment."
    USE_DOCKER=true
else
    echo "Docker or Docker Compose not found. Using local deployment."
    USE_DOCKER=false

    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        echo "Node.js is not installed. Please install Node.js and try again."
        exit 1
    fi

    # Check if Java is installed
    if ! command -v java &> /dev/null; then
        echo "Java is not installed. Please install Java 8+ and try again."
        exit 1
    fi

    # Check if Maven is installed
    if ! command -v mvn &> /dev/null; then
        echo "Maven is not installed. Please install Maven 3.6+ and try again."
        exit 1
    fi
fi

# Always create/overwrite .env file with real values
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

echo "Created .env file with real wallet values."

if [ "$USE_DOCKER" = true ]; then
    echo "Starting application using Docker..."
    echo "Frontend will be available at: http://localhost:3000"
    echo "Backend will be available at: http://localhost:8080"
    docker-compose up
else
    # Clean up code formatting
    echo "Cleaning up code formatting..."
    npx prettier --write "src/**/*.{js,jsx,ts,tsx}"
    mvn formatter:format

    # Install dependencies if node_modules doesn't exist
    if [ ! -d "node_modules" ]; then
        echo "Installing dependencies..."
        npm install
    fi

    # Configure the project
    echo "Configuring the project..."
    mvn clean install -DskipTests

    # Start the application in development mode
    echo "Starting application in development mode..."
    echo "Frontend will be available at: http://localhost:3000"
    echo "Backend will be available at: http://localhost:8080"

    npm run dev
fi
