// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require('hardhat')
const hre = require('hardhat')

async function main() {
  /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so whitelistContract here is a factory for instances of our Whitelist contract.
  */
  const whitelistContract = await ethers.getContractFactory('Whitelist')

  //Here we deploy the contract
  const deployedWhiteContract = await whitelistContract.deploy(15)
  // 15 is the maximum number of whitelisted addresses allowed

  //// Await for it to finish deploying
  await deployedWhiteContract.deployed()
  // Finally you print the address of the deployed contract
  console.log('Whitelist Contract Address:', deployedWhiteContract.address)
}

// call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
  })
