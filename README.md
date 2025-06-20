# Install prettier for JavaScript/TypeScript formatting
npm install --save-dev prettier

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