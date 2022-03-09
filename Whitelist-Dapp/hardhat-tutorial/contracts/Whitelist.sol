//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Whitelist{

    uint8 public maxWhitelistedAddresses;
    mapping(address=>bool) public whitelistedAddresses;

    uint8 public numAddressesWhitelisted;

    constructor (uint8 _maxWhitelistedaddresses)  {
        maxWhitelistedAddresses = _maxWhitelistedaddresses;
    }

    function addAddressToWhitelist() public{
        require(whitelistedAddresses[msg.sender],"Sender has already been whitelisted");
        require(numAddressesWhitelisted<maxWhitelistedAddresses,"Addresses can't be added, limit reached");
        whitelistedAddresses[msg.sender] = true;

        numAddressesWhitelisted +=1;

    }   
    
}