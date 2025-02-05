import { expect } from "chai";
import { ethers } from "hardhat";
import { HumanHours } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("HumanHours", function () {
  let humanHours: HumanHours;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    const HumanHours = await ethers.getContractFactory("HumanHours");
    humanHours = await HumanHours.deploy();
    await humanHours.deployed();
  });

  describe("Tasks", function () {
    it("Should create a task", async function () {
      await humanHours.earnHours(user1.address, 100);
      const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
      
      await expect(humanHours.connect(user1).createTask(user2.address, 50, deadline))
        .to.emit(humanHours, "TaskCreated")
        .withArgs(1, user2.address, 50);
    });

    it("Should complete a task", async function () {
      await humanHours.earnHours(user1.address, 100);
      const deadline = Math.floor(Date.now() / 1000) + 3600;
      
      await humanHours.connect(user1).createTask(user2.address, 50, deadline);
      await expect(humanHours.connect(user1).completeTask(1))
        .to.emit(humanHours, "TaskCompleted")
        .withArgs(1);
    });
  });
}); 