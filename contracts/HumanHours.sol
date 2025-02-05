// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HumanHours {
    struct Task {
        uint256 id;
        address creator;
        string title;
        string description;
        uint256 hoursRequired;
        bool isCompleted;
        address worker;
    }

    string public name = "Human Hours";
    string public symbol = "HH";
    uint8 public decimals = 2; // 2 decimals for minute precision
    uint256 public totalSupply = 0;

    mapping(address => uint256) public balances;
    mapping(address => uint256) public trustScores;
    mapping(uint256 => Task) public tasks;
    uint256 public taskCount;

    // Mapping of address to mapping of address to allowance
    mapping(address => mapping(address => uint256)) public allowance;

    // Dispute resolution
    mapping(uint256 => bool) public taskDisputes;
    mapping(uint256 => mapping(address => bool)) public disputeVotes;
    uint256 public requiredVotes = 3;

    // Events
    event TaskCreated(uint256 taskId, address creator);
    event TaskAccepted(uint256 taskId, address worker);
    event TaskCompleted(uint256 taskId);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event HoursEarned(address indexed user, uint256 amount);
    event TrustScoreUpdated(address user, uint256 newScore);
    event DisputeCreated(uint256 taskId);
    event DisputeResolved(uint256 taskId, bool infavorOfProvider);

    constructor() {
        // Initialize contract
    }

    function createTask(string memory _title, string memory _description, uint256 _hours) public {
        taskCount++;
        tasks[taskCount] = Task(
            taskCount,
            msg.sender,
            _title,
            _description,
            _hours,
            false,
            address(0)
        );
        emit TaskCreated(taskCount, msg.sender);
    }

    function acceptTask(uint256 _taskId) public {
        require(tasks[_taskId].worker == address(0), "Task already accepted");
        tasks[_taskId].worker = msg.sender;
        emit TaskAccepted(_taskId, msg.sender);
    }

    function completeTask(uint256 _taskId) public {
        require(tasks[_taskId].worker == msg.sender, "Not the assigned worker");
        tasks[_taskId].isCompleted = true;
        emit TaskCompleted(_taskId);
    }

    function updateTrustScore(address user, bool positive) internal {
        if (positive) {
            trustScores[user] += 1;
        } else {
            if (trustScores[user] > 0) {
                trustScores[user] -= 1;
            }
        }
        emit TrustScoreUpdated(user, trustScores[user]);
    }

    function transfer(address recipient, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
    }

    function earnHours(address user, uint256 amount) external {
        // In production, this would be restricted to validated tasks
        balances[user] += amount;
        emit HoursEarned(user, amount);
        emit Transfer(address(0), user, amount);
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

    function createDispute(uint256 taskId) external {
        Task storage task = tasks[taskId];
        require(!task.isCompleted, "Task already completed");
        require(msg.sender == task.creator, "Only client can create dispute");
        
        taskDisputes[taskId] = true;
        emit DisputeCreated(taskId);
    }

    function voteOnDispute(uint256 taskId, bool infavorOfProvider) external {
        require(taskDisputes[taskId], "No active dispute");
        require(!disputeVotes[taskId][msg.sender], "Already voted");
        require(trustScores[msg.sender] > 0, "Must have trust score to vote");
        
        disputeVotes[taskId][msg.sender] = true;
        
        // Count votes
        uint256 votes = 0;
        // Implementation of vote counting
        
        if (votes >= requiredVotes) {
            resolveDispute(taskId, infavorOfProvider);
        }
    }
} 