import { ethers } from "hardhat";

async function main() {
  const HumanHours = await ethers.getContractFactory("HumanHours");
  console.log("Deploying HumanHours...");
  const humanHours = await HumanHours.deploy();
  await humanHours.deployed();
  console.log("HumanHours deployed to:", humanHours.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 