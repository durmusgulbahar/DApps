// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Whitelist {
  uint public maxWhitelistedAddresses;
  mapping(address=>bool) public whitelistedAddresses;
  uint8 public numAddressesWhitelisted;

  constructor(uint8 _maxWhiteListedAddresses) public{
    maxWhitelistedAddresses = _maxWhiteListedAddresses;
  }


  

  function numberOfWhitelisted() public view returns(uint8){
      return numAddressesWhitelisted;
  }

  function addAddressToWhitelist() public{
      //require if 1. args is false, 2. args is works, else code continue;
      require(!whitelistedAddresses[msg.sender],"Sender has already been whitelisted");
      require(numAddressesWhitelisted<maxWhitelistedAddresses,"More addresses can't be added. Reached Max users.");
      whitelistedAddresses[msg.sender] = true;
      numAddressesWhitelisted +=1;
  }
}
