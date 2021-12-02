# Ethereum-Smart-Contract-Downloader
A tool for extracting smart contracts from the Ethereum blockchain

This software is part of the [SANCUS platform](https://github.com/oeg-upm/sancus), actually on development.

## Quick Start

To use this software, follow these steps:

1- Place the SmartContractExtractor-X.X.jar in some folder

2- Place the config.json in the same folder than SmartContractExtractor-X.X.jar

3- Configure config.json file as follow:

* url: URL (and port if is necessary) of the Ethereum blockchain
* blocks: Block/s
    * *. Recover all the chain
    * Number of the block. Recover a specific block.
    * Block 1 - Block 2. Recover the blocks between 2 blocks.
    * Block 1 - * . Recover from 1 block to the final of the chain.
* api: The API provided by EtherScan.

#### Example 1. Retrieve 1 block.

`````
{
	"url":"https://mainnet.infura.io/v3/API_KEY",
	"blocks":"1543256",
	"api":"EtherScanAPI"
}
`````

#### Example 2. Retrieve a range given 2 block.

`````
{
	"url":"https://mainnet.infura.io/v3/API_KEY",
	"blocks":"1543250-1543256",
	"api":"EtherScanAPI"
}
`````

#### Example 3. Retrieve for one block to the last block.

`````
{
	"url":"https://mainnet.infura.io/v3/API_KEY",
	"blocks":"1543256-*",
	"api":"EtherScanAPI"
}
`````

#### Example 4. Retrieve the entire Ethereum blockchain.

`````
{
	"url":"https://mainnet.infura.io/v3/API_KEY",
	"blocks":"*",
	"api":"EtherScanAPI"
}
`````
