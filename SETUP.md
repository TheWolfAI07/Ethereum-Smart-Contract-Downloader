# Setup Instructions for Ethereum Smart Contract Downloader

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **Java** (v8 or higher)
- **Maven** (v3.6 or higher)
- An Ethereum Node provider account (like Infura or Alchemy)
- An Etherscan API key

## Configuration Steps

### 1. Set up API Keys

1. Copy the example environment file to create your own:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and add your actual API keys:
   ```
   ETHEREUM_NODE_URL=https://mainnet.infura.io/v3/YOUR_ACTUAL_INFURA_KEY
   ETHERSCAN_API_KEY=YOUR_ACTUAL_ETHERSCAN_KEY
   ```

### 2. Install Dependencies

Run the following command to install all necessary dependencies:

```bash
npm install
```

### 3. Launch the Application

You have several options to start the application:

#### Development Mode (Recommended for Development)

This will start both the frontend and backend in development mode with hot reloading:

```bash
npm run dev
```

#### Using the Launch Script

We've provided a convenient launch script that checks prerequisites and starts the application:

```bash
chmod +x launch.sh  # Make the script executable (first time only)
./launch.sh
```

#### Docker Deployment (Optional)

If you prefer using Docker:

```bash
docker-compose up
```

### 4. Access the Application

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8080/api](http://localhost:8080/api)

## Troubleshooting

### Common Issues

1. **Port Conflicts**

   If port 3000 or 8080 is already in use, you can change them in the `.env` file.

2. **Java/Maven Issues**

   If you encounter problems with the backend build:
   ```bash
   mvn clean install -U
   ```

3. **Node.js Issues**

   If you have dependency problems:
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **API Connection Issues**

   - Verify your API keys in the `.env` file
   - Check your internet connection
   - Ensure your Infura/Etherscan accounts are active

## Next Steps

Once your application is running:

1. Navigate to the web interface at [http://localhost:3000](http://localhost:3000)
2. Connect your Ethereum wallet (MetaMask recommended)
3. Configure extraction parameters with your API keys
4. Start extracting and analyzing smart contracts!

Refer to the main README.md for detailed usage instructions.