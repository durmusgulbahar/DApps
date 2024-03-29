const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {
  const metadataURL = "ipfs://Qmbygo38DWF1V8GttM1zy89KzyZTPU2FLUzQtiDvB7q6i5/"

  const lw3PunksContract = await ethers.getContractFactory("LW3Punks");

  const deployedLW3Punk = await lw3PunksContract.deploy(metadataURL);
  await deployedLW3Punk.deployed();

  console.log("Contract address :", deployedLW3Punk.address);

}

main().then(() => process.exit(0)).catch((err) => {
  console.error(err);
  process.exit(1);
})