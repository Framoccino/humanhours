import { ethers } from "hardhat";
import { writeFileSync } from 'fs';

async function main() {
  // Deploy HumanHours Contract
  const HumanHours = await ethers.getContractFactory("HumanHours");
  console.log("Deploying HumanHours...");
  const humanHours = await HumanHours.deploy();
  await humanHours.deployed();
  console.log("HumanHours deployed to:", humanHours.address);

  // Save deployment addresses
  const addresses = {
    HumanHours: humanHours.address
  };

  writeFileSync('./deployed-addresses.json', JSON.stringify(addresses, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 