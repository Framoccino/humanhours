import { expect } from "chai";
import { ethers } from "hardhat";
import { HumanHours } from "../../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { AIMatchingSystem } from "../../utils/aiMatching";

describe("Complete Workflow", function() {
  let humanHours: HumanHours;
  let owner: SignerWithAddress;
  let provider: SignerWithAddress;
  let client: SignerWithAddress;
  let aiSystem: AIMatchingSystem;

  beforeEach(async function() {
    [owner, provider, client] = await ethers.getSigners();
    
    // Deploy contract
    const HumanHours = await ethers.getContractFactory("HumanHours");
    humanHours = await HumanHours.deploy();
    await humanHours.deployed();

    // Initialize AI system
    aiSystem = new AIMatchingSystem();
  });

  it("Should complete a full service exchange workflow", async function() {
    // 1. Create task
    const amount = 2; // 2 hours
    const deadline = Math.floor(Date.now() / 1000) + 3600;
    
    await humanHours.earnHours(client.address, amount);
    await humanHours.connect(client).createTask(provider.address, amount, deadline);

    // 2. Complete task
    await humanHours.connect(client).completeTask(1);
    
    // 3. Verify balances
    expect(await humanHours.balanceOf(provider.address)).to.equal(amount);
  });
}); 