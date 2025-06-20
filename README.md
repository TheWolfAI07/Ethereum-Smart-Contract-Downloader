# Install prettier for JavaScript/TypeScript formatting
npm install --save-dev prettier

# Ethereum Contract Explorer

A modern React application for searching, extracting, and analyzing Ethereum smart contracts.

## Features

- Connect to any Ethereum node (Infura, Alchemy, or local)
- Scan blocks for contract creation transactions
- Retrieve and display smart contract source code
- Analyze contract details and metadata
- Intuitive, responsive Material UI interface

## Setup and Installation

### Prerequisites

- Node.js 16+ and npm
- Java 11+ for the backend (Spring Boot)
- An Ethereum node access URL (e.g., Infura, Alchemy)
- Etherscan API key (free tier available)

### Frontend Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

### Backend Setup

1. Make sure you have Java 11+ installed
2. Navigate to the backend folder
3. Run the Spring Boot application:
   ```
   ./mvnw spring-boot:run
   ```

## Configuration

The application requires:

1. **Ethereum Node URL** - Create a free account on [Infura](https://infura.io) or [Alchemy](https://www.alchemy.com)
2. **Etherscan API Key** - Get a free API key from [Etherscan](https://etherscan.io/apis)

## Usage

1. Enter your Ethereum node URL and Etherscan API key
2. Specify the blocks to scan:
    - `*` for all blocks (slow)
    - `1543256` for a specific block
    - `1543250-1543256` for a range of blocks
    - `1543256-*` from a block to the latest
3. Click "Extract Contracts" to begin the search
4. View and analyze the found contracts in the results table

## License

MIT
# Ethereum Smart Contract Extractor

An application for downloading, analyzing and extracting information from Ethereum smart contracts.

## Quick Start

### One-Click Launch

To launch the application with a single command:

```bash
# Make launch script executable
chmod +x launch.sh

# Run the launch script
./launch.sh
```

The launch script will detect if Docker is available and use it. Otherwise, it will fall back to local deployment.

### Manual Launch

#### Using Docker (Recommended)

1. Make sure Docker and Docker Compose are installed
2. Copy environment template: `cp .env.example .env`
3. Edit `.env` with your API keys
4. Run `docker-compose up`

#### Using npm scripts

```bash
# Setup the environment
npm run setup

# Start the application (Docker)
npm run docker-start

# OR start in development mode (local)
npm run dev
```

## Available Scripts

- `npm run one-click` - Setup and start application with one command
- `npm run setup` - Create .env file and install dependencies
- `npm run dev` - Start local development servers
- `npm run docker-start` - Start application using Docker
- `npm run docker-stop` - Stop Docker containers
- `npm run build-all` - Build both frontend and backend

## Configuration

Edit the `.env` file to configure:

- Ethereum node URL (Infura)
- Etherscan API key
- Application settings

## Accessing the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api

## Development

To contribute to development:

1. Clone the repository
2. Run `npm run setup`
3. Run `npm run dev` to start local development servers
4. Make your changes
5. Run `npm run build-all` to verify everything builds correctly

## License

See the [LICENSE](LICENSE) file for details.
# Run prettier on all JS/TS files
npx prettier --write "src/**/*.{js,jsx,ts,tsx}"

# Install Maven formatter plugin for Java code
# Add to pom.xml and run: mvn formatter: format