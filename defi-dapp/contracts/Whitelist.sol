// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
//import "hardhat/console.sol";

contract Whitelist {
    // maximum number of whitelisted addresses allowed
    uint8 public maxWhiteListedAddresses;


// Create a mapping of Whitelisted addresses.abi
// if an address is whitelisted we would set it to true , however it is false by default to all other addresses
mapping(address => bool) public whitelistedAddresses;

// numAddressesWhitelisted is used to keep track of how many addresses have been whitelisted
//  Don't change the address as it will be used in part of cerification
uint8 public numAddressesWhitelisted;

// Setting the max number of whitelisted addresses
// user will put the value at the time of deployment
//initiate the contract state
constructor(uint8 _maxWhitelistedAddresses) {
    maxWhiteListedAddresses = _maxWhitelistedAddresses;
}
    /**
        addAddressToWhitelist - This function adds the address of the sender to the
        whitelist
     */

    function addressToWhitelist() public {
        //check if the user has already be whitelisted
        require(!whitelistedAddresses[msg.sender], "Sender has already ben whitelisted");
        //check if the numAddressesWhitelisted < maxWhiteListedAddresses , if not throw an error.
        require( numAddressesWhitelisted < maxWhiteListedAddresses, "More addresses can't be added, limit reached");
        // Add the address which called the function to the whitelistedArray array
        whitelistedAddresses[msg.sender] = true;
        //Increase the number of whitelisted assresses
        numAddressesWhitelisted += 1;
    }
}
// 0x6406d1B436C04102b7367072c84A14C1f70Ed359


