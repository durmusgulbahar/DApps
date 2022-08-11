require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({path:".env"});

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks : {
    mumbai:{
      url:API_KEY,
      accounts: [`0x${PRIVATE_KEY}`],
    }
  }
};
