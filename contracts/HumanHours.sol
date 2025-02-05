// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HumanHours {
    string public name = "Human Hours";
    string public symbol = "HH";
    uint8 public decimals = 2; // 2 decimals for minute precision
    uint256 public totalSupply = 0;

    // Mapping of address to balance
    mapping(address => uint256) public balances;
    
    // Mapping of address to mapping of address to allowance
    mapping(address => mapping(address => uint256)) public allowance;

    // Events
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event HoursEarned(address indexed user, uint256 amount);

    constructor() {
        // Initialize contract
    }

    // Earn hours through validated work
    function earnHours(address user, uint256 amount) public {
        require(amount > 0, "Amount must be positive");
        totalSupply += amount;
        balances[user] += amount;
        emit HoursEarned(user, amount);
        emit Transfer(address(0), user, amount);
    }

    // Transfer hours to another user
    function transfer(address to, uint256 amount) public returns (bool) {
        require(to != address(0), "Invalid recipient");
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        balances[msg.sender] -= amount;
        balances[to] += amount;
        
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    // Approve spending of hours by another address
    function approve(address spender, uint256 amount) public returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    // Transfer from one address to another (with allowance)
    function transferFrom(address from, address to, uint256 amount) public returns (bool) {
        require(to != address(0), "Invalid recipient");
        require(balances[from] >= amount, "Insufficient balance");
        require(allowance[from][msg.sender] >= amount, "Insufficient allowance");
        
        balances[from] -= amount;
        balances[to] += amount;
        allowance[from][msg.sender] -= amount;
        
        emit Transfer(from, to, amount);
        return true;
    }

    // Get balance of an address
    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }
} 