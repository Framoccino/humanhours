import { expect } from "chai";
import { ethers } from "hardhat";
import { HumanHours } from "../../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("User Experience Tests", function() {
  let humanHours: HumanHours;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;

  beforeEach(async function() {
    [owner, user1, user2] = await ethers.getSigners();
    const HumanHours = await ethers.getContractFactory("HumanHours");
    humanHours = await HumanHours.deploy();
    await humanHours.deployed();
  });

  describe("Task Creation and Management", function() {
    it("Should handle task creation with validation", async function() {
      await humanHours.earnHours(user1.address, 100);
      const deadline = Math.floor(Date.now() / 1000) + 3600;
      
      await expect(
        humanHours.connect(user1).createTask(user2.address, 50, deadline)
      ).to.emit(humanHours, "TaskCreated");
    });

    it("Should prevent creating tasks without sufficient balance", async function() {
      const deadline = Math.floor(Date.now() / 1000) + 3600;
      
      await expect(
        humanHours.connect(user1).createTask(user2.address, 50, deadline)
      ).to.be.revertedWith("Insufficient balance");
    });

    it("Should update trust scores after task completion", async function() {
      await humanHours.earnHours(user1.address, 100);
      const deadline = Math.floor(Date.now() / 1000) + 3600;
      
      await humanHours.connect(user1).createTask(user2.address, 50, deadline);
      await humanHours.connect(user1).completeTask(1);
      
      const trustScore = await humanHours.trustScores(user2.address);
      expect(trustScore).to.be.gt(0);
    });
  });
}); 