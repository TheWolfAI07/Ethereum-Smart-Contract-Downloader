#!/bin/bash

echo "Starting Ethereum Smart Contract Downloader..."

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

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Check if .env file exists, if not create template
if [ ! -f ".env" ]; then
    echo "Creating .env file template. Please edit with your actual API keys."
    cp .env.example .env
fi

# Start the application in development mode
echo "Starting application in development mode..."
echo "Frontend will be available at: http://localhost:3000"
echo "Backend will be available at: http://localhost:8080"

npm run dev
