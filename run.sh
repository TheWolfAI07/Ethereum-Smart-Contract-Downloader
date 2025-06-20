#!/bin/bash
# Ultra-simple start script

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
