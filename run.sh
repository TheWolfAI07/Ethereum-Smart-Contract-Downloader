#!/bin/bash
# ETHEREUM CONTRACT EXPLORER - LAUNCHER

echo "===== ETHEREUM CONTRACT EXPLORER ====="

# Create environment file
cat > .env << 'EOF'
# Network Configuration
HOST=0.0.0.0
PORT=8888
DANGEROUSLY_DISABLE_HOST_CHECK=true

# Wallet Configuration
WALLET_ADDRESS=0x742d35Cc6634C0532925a3b844Bc454e4438f44e
BACKUP_WALLET_ADDRESS=0x56c702ae143BE884eB3B96043Ac11F5c96d41c3F

# Exodus Wallet Addresses
EXODUS_ADDRESSES="DPi49es6MAZSvD5V4MkeSPAiX8LVJpJucL,qz9wuhyj3c9hj2mltm3key9wrgcyfdhxe5zrkdx0t0,addr1qxcacg8fwctfh0r9vz857kpx228d9svc4rqaxzn4rgy54ed3msswjasknw7x2cy0favzv55w6tqe32xp6v982xsfftjs5k2ytc,LatNuU82uLELmJQqpHvMrVt5UsVY4iPqhy,18EskvWcJighSayinHhWNbJt2xiNpX17tMSw8aJ3akRTedX,0x56c702ae143BE884eB3B96043Ac11F5c96d41c3F,8EW7CuQ5Eb3Zak5oVW6XSGdoxMeAojijPWkBMTvepG9X,C22KAZ6CVW7BFHI7MVUPZBL37HZNP2TRTB3GUO74LUVS724KXNQ4SUYLOQ"

# Contract Configuration
CONTRACT_ADDRESS_WHITELIST=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48,0xdAC17F958D2ee523a2206206994597C13D831ec7
ETHEREUM_NODE_URL=https://mainnet.infura.io/v3/1a2b3c4d5e6f7g8h9i0j
ETHERSCAN_API_KEY=ABC123DEF456GHI789JKL
EOF

# Export environment variables
export HOST=0.0.0.0
export PORT=8888
export DANGEROUSLY_DISABLE_HOST_CHECK=true
export BROWSER=none

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install --no-audit --no-fund --silent
fi

# Run backend if Java is available
if command -v java &> /dev/null && [ -f "target/SmartContractExtractor-1.0.jar" ]; then
  echo "Starting Java backend..."
  java -jar target/SmartContractExtractor-1.0.jar &
  BACKEND_PID=$!
  echo "Backend running with PID: $BACKEND_PID"
fi

# Print access information
echo ""
echo "Application ready! Access at:"
echo "→ http://0.0.0.0:8888"
IP=$(hostname -I | awk '{print $1}')
if [ ! -z "$IP" ]; then
  echo "→ http://$IP:8888"
fi
echo "==================================="
echo ""

# Start frontend
npx --no-install react-scripts start --host=0.0.0.0 --port=8888 --disable-host-check

# Cleanup backend on exit
trap "kill $BACKEND_PID 2>/dev/null" EXIT
echo "Starting application..."

# Check if Docker is available
if command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
    # Copy env file if it doesn't exist
    if [ ! -f ".env" ]; then
        cp .env.example .env
        echo "Created .env file. You may want to edit it with your API keys."
    fi

    # Start with Docker
    echo "Starting with Docker..."
    docker-compose up
else
    # Fallback to launch script
    echo "Docker not found. Using standard launch script..."
    bash launch.sh
fi
