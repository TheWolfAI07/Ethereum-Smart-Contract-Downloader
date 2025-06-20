#!/bin/bash

echo "=== Starting Ethereum Smart Contract Extractor ==="

# Check if Docker and Docker Compose are installed
if command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
    echo "Docker found. Starting with Docker..."

    # Create .env file if it doesn't exist
    if [ ! -f ".env" ]; then
        cp .env.example .env
        echo "Created .env file from template."
        echo "WARNING: You should edit .env with your actual API keys!"
    fi

    # Build and start Docker containers
    echo "Building and starting Docker containers..."
    docker-compose up --build

    exit 0
fi

# If Docker is not available, try local development setup
echo "Docker not found. Trying local development setup..."

# Check prerequisites
MISSING_PREREQS=false

if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed."
    MISSING_PREREQS=true
fi

if ! command -v npm &> /dev/null; then
    echo "ERROR: npm is not installed."
    MISSING_PREREQS=true
fi

if ! command -v java &> /dev/null; then
    echo "ERROR: Java is not installed."
    MISSING_PREREQS=true
fi

if ! command -v mvn &> /dev/null; then
    echo "ERROR: Maven is not installed."
    MISSING_PREREQS=true
fi

if [ "$MISSING_PREREQS" = true ]; then
    echo "Missing prerequisites. Please install the required tools and try again."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "Created .env file from template."
    echo "WARNING: You should edit .env with your actual API keys!"
fi

# Install dependencies
if [ ! -d "node_modules" ]; then
    echo "Installing Node.js dependencies..."
    npm install
fi

# Build and start the application
echo "Building and starting the application..."
npm run dev
