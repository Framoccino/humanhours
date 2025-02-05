import { ethers } from 'ethers';

const HH_CONTRACT_ADDRESS = '0x...'; // Your deployed contract address

const HH_ABI = [
    "function earnHours(address user, uint256 amount)",
    "function transfer(address to, uint256 amount)",
    "function balanceOf(address account) view returns (uint256)",
];

export const getContract = (signer: ethers.Signer) => {
    return new ethers.Contract(HH_CONTRACT_ADDRESS, HH_ABI, signer);
};

export const earnHours = async (signer: ethers.Signer, amount: number) => {
    const contract = getContract(signer);
    const tx = await contract.earnHours(await signer.getAddress(), amount);
    await tx.wait();
    return tx;
};

export const transferHours = async (signer: ethers.Signer, to: string, amount: number) => {
    const contract = getContract(signer);
    const tx = await contract.transfer(to, amount);
    await tx.wait();
    return tx;
}; 