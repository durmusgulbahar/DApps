const { ethers } = require("hardhat");

async function main() {

    const whitelistContract = await ethers.getContractFactory("Whitelist");
    const deployedWhitelistContract = await whitelistContract.deploy(10);

    await deployedWhitelistContract.deployed();

    console.log(
        "Whitelist Contract Addresss",
        deployedWhitelistContract.address
    );
}

main().then(() => process.exit(0)).catch((err) => {
    console.error(err);
    process.exit(1);
})