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

# Check if .env file exists, if not create template
if [ ! -f ".env" ]; then
    echo "Creating .env file template. Please edit with your actual API keys."
    cp .env.example .env
    echo "IMPORTANT: Please edit .env file with your actual API keys before proceeding."
    echo "Press Enter to continue after editing the .env file..."
    read -r
fi

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
