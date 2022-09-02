export const WHITELIST_CONTRACT_ADDRESS = "0xC170567BB29Fd7C5408401E4E3590BD2e88bBfE9";
export const abi = [
  {
    "type": "constructor",
    "payable": false,
    "inputs": [{ "type": "uint8", "name": "_maxWhitelistedAddresses" }]
  },
  {
    "type": "function",
    "name": "addAddressToWhitelist",
    "constant": false,
    "payable": false,
    "inputs": [],
    "outputs": []
  },
  {
    "type": "function",
    "name": "maxWhitelistedAddresses",
    "constant": true,
    "stateMutability": "view",
    "payable": false,
    "inputs": [],
    "outputs": [{ "type": "uint8" }]
  },
  {
    "type": "function",
    "name": "numAddressesWhitelisted",
    "constant": true,
    "stateMutability": "view",
    "payable": false,
    "inputs": [],
    "outputs": [{ "type": "uint8" }]
  },
  {
    "type": "function",
    "name": "whitelistedAddresses",
    "constant": true,
    "stateMutability": "view",
    "payable": false,
    "inputs": [{ "type": "address" }],
    "outputs": [{ "type": "bool" }]
  }
];
