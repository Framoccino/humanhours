const { expect } = require("chai");

describe("HumanHours", function () {
    let HumanHours;
    let humanHours;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        HumanHours = await ethers.getContractFactory("HumanHours");
        [owner, addr1, addr2] = await ethers.getSigners();
        humanHours = await HumanHours.deploy();
        await humanHours.deployed();
    });

    describe("Deployment", function () {
        it("Should set the right name and symbol", async function () {
            expect(await humanHours.name()).to.equal("Human Hours");
            expect(await humanHours.symbol()).to.equal("HH");
        });

        it("Should start with zero total supply", async function () {
            expect(await humanHours.totalSupply()).to.equal(0);
        });
    });

    describe("Transactions", function () {
        it("Should allow earning hours", async function () {
            await humanHours.earnHours(addr1.address, 100);
            expect(await humanHours.balanceOf(addr1.address)).to.equal(100);
        });

        it("Should transfer hours between accounts", async function () {
            await humanHours.earnHours(addr1.address, 100);
            await humanHours.connect(addr1).transfer(addr2.address, 50);
            expect(await humanHours.balanceOf(addr1.address)).to.equal(50);
            expect(await humanHours.balanceOf(addr2.address)).to.equal(50);
        });

        it("Should fail if sender doesn't have enough hours", async function () {
            await expect(
                humanHours.connect(addr1).transfer(addr2.address, 1)
            ).to.be.revertedWith("Insufficient balance");
        });
    });

    describe("Allowances", function () {
        it("Should update allowances on approval", async function () {
            await humanHours.earnHours(addr1.address, 100);
            await humanHours.connect(addr1).approve(addr2.address, 50);
            expect(await humanHours.allowance(addr1.address, addr2.address)).to.equal(50);
        });

        it("Should transfer with allowance", async function () {
            await humanHours.earnHours(addr1.address, 100);
            await humanHours.connect(addr1).approve(addr2.address, 50);
            await humanHours.connect(addr2).transferFrom(addr1.address, owner.address, 50);
            expect(await humanHours.balanceOf(owner.address)).to.equal(50);
            expect(await humanHours.balanceOf(addr1.address)).to.equal(50);
        });
    });
}); 