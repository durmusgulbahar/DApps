const Whitelist = artifacts.require("Whitelist");
var maxWhitelist = 10;
module.exports = function (deployer) {
  deployer.deploy(Whitelist,maxWhitelist);
  deployer.deploy

  
};




