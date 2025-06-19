# Ethereum Smart Contract Downloader & Executor

A comprehensive web application for extracting, analyzing, and executing smart contracts from the Ethereum blockchain with real-time capabilities.

This software is part of the [SANCUS platform](https://github.com/oeg-upm/sancus), enhanced with modern web technologies and real-time features.

## 🚀 Features

### Core Functionality
- **Smart Contract Extraction**: Extract contracts from specific blocks, block ranges, or entire blockchain
- **Real-time Processing**: Live updates during contract extraction with Server-Sent Events (SSE)
- **Contract Execution Interface**: Interactive UI for executing contract functions
- **Function Analysis**: Automatic extraction and display of contract functions
- **Etherscan Integration**: Direct links to view contracts on Etherscan

### Technical Features
- **Modern Web UI**: React-based frontend with Material-UI components
- **RESTful API**: Spring Boot backend with comprehensive endpoints
- **Real-time Communication**: WebSocket and SSE support for live updates
- **Production Ready**: Configured for deployment with health monitoring
- **Cross-Origin Support**: Proper CORS configuration for development and production

## 🛠️ Technology Stack

### Backend
- **Java 8+** with Spring Boot 2.7.5
- **Web3j** for Ethereum blockchain interaction
- **Spring Security** for authentication
- **Spring Actuator** for monitoring
- **Maven** for dependency management

### Frontend
- **React 18** with modern hooks
- **Material-UI 5** for component library
- **Axios** for HTTP requests
- **Server-Sent Events** for real-time updates

## 📋 Prerequisites

- **Java 8 or higher**
- **Node.js 14 or higher**
- **Maven 3.6 or higher**
- **Ethereum Node URL** (Infura, Alchemy, or local node)
- **EtherScan API Key**

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ethereum-smart-contract-downloader
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies (Maven will handle this)
mvn clean install
```

### 3. Configuration
The application uses `application.properties` for configuration. Key settings:
- Server runs on port 8080
- Frontend proxy configured for development
- CORS enabled for localhost:3000

### 4. Development Mode
```bash
# Start both frontend and backend concurrently
npm run dev

# Or start them separately:
# Terminal 1 - Backend
npm run start-backend

# Terminal 2 - Frontend  
npm start
```

### 5. Production Build
```bash
# Build everything for production
npm run build-all

# Start production server
npm run start-prod
```

## 🎯 Usage

### Web Interface

1. **Access the Application**
   - Development: http://localhost:3000
   - Production: http://localhost:8080

2. **Configure Extraction Parameters**
   - **Ethereum Node URL**: Your Infura/Alchemy endpoint
   - **Block Range**: Specific block, range, or "*" for all
   - **EtherScan API Key**: For contract source code retrieval

3. **Choose Extraction Mode**
   - **Standard Mode**: Traditional synchronous extraction
   - **Real-time Mode**: Live updates with progress tracking

4. **View and Interact with Contracts**
   - Browse extracted contracts
   - View source code and functions
   - Execute contract functions (demo interface)
   - Open contracts in EtherScan

### API Endpoints

#### Contract Extraction
```bash
# Synchronous extraction
POST /api/contracts
Content-Type: application/json
{
  "url": "https://mainnet.infura.io/v3/YOUR_API_KEY",
  "blocks": "1543256",
  "api": "YOUR_ETHERSCAN_API_KEY"
}

# Asynchronous extraction with real-time updates
POST /api/contracts/extract-async
# Same body as above

# Real-time updates stream
GET /api/contracts/stream
# Returns Server-Sent Events
```

#### Health Monitoring
```bash
# Application health
GET /actuator/health

# Application info
GET /actuator/info
```

## 📝 Configuration Examples

### Block Configuration Options

#### Single Block
```json
{
  "url": "https://mainnet.infura.io/v3/YOUR_API_KEY",
  "blocks": "1543256",
  "api": "YOUR_ETHERSCAN_API_KEY"
}
```

#### Block Range
```json
{
  "url": "https://mainnet.infura.io/v3/YOUR_API_KEY", 
  "blocks": "1543250-1543256",
  "api": "YOUR_ETHERSCAN_API_KEY"
}
```

#### From Block to Latest
```json
{
  "url": "https://mainnet.infura.io/v3/YOUR_API_KEY",
  "blocks": "1543256-*", 
  "api": "YOUR_ETHERSCAN_API_KEY"
}
```

#### Entire Blockchain
```json
{
  "url": "https://mainnet.infura.io/v3/YOUR_API_KEY",
  "blocks": "*",
  "api": "YOUR_ETHERSCAN_API_KEY"
}
```

## 🔧 Development

### Project Structure
```
├── src/
│   ├── main/java/oeg/upm/SmartContractGetter/
│   │   ├── Application.java                 # Spring Boot main class
│   │   ├── controller/
│   │   │   └── SmartContractController.java # REST API endpoints
│   │   ├── model/                          # Data models
│   │   └── ...                             # Core logic classes
│   ├── main/resources/
│   │   └── application.properties          # Spring Boot configuration
│   ├── App.js                              # React main component
│   ├── components/
│   │   ├── ContractForm.js                 # Contract extraction form
│   │   └── ContractResults.js              # Contract display & execution
│   └── ...
├── package.json                            # Frontend dependencies & scripts
├── pom.xml                                 # Backend dependencies & build
└── README.md
```

### Available Scripts

#### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

#### Backend  
- `npm run start-backend` - Start Spring Boot server
- `npm run build-backend` - Build JAR file
- `npm run start-backend-jar` - Run built JAR

#### Combined
- `npm run dev` - Start both frontend and backend
- `npm run build-all` - Build both frontend and backend
- `npm run start-prod` - Production build and start

## 🚀 Deployment

### Production Deployment

1. **Build the Application**
   ```bash
   npm run build-all
   ```

2. **Deploy Backend**
   ```bash
   # Copy JAR to server
   scp target/SmartContractExtractor-1.0.jar user@server:/path/to/app/

   # Run on server
   java -jar SmartContractExtractor-1.0.jar
   ```

3. **Deploy Frontend**
   ```bash
   # Copy build files to web server
   scp -r build/* user@server:/var/www/html/
   ```

### Docker Deployment (Optional)
Create a `Dockerfile` for containerized deployment:
```dockerfile
FROM openjdk:8-jre-slim
COPY target/SmartContractExtractor-1.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

## 🔒 Security Considerations

- **API Keys**: Never commit API keys to version control
- **CORS**: Configure appropriate origins for production
- **Authentication**: Default admin credentials should be changed
- **Rate Limiting**: Consider implementing rate limiting for API endpoints
- **Input Validation**: All user inputs are validated

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Change port in application.properties
   server.port=8081
   ```

2. **CORS Errors**
   ```bash
   # Update CORS origins in application.properties
   spring.web.cors.allowed-origins=http://localhost:3000,http://your-domain.com
   ```

3. **Maven Build Errors**
   ```bash
   # Clean and rebuild
   mvn clean install -U
   ```

4. **Node.js Issues**
   ```bash
   # Clear cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the [SANCUS platform documentation](https://github.com/oeg-upm/sancus)

## 🎉 Acknowledgments

- SANCUS platform team
- Web3j library contributors
- React and Material-UI communities
- Ethereum development community
