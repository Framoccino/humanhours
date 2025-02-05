// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract VotingPower {
    IERC20 public humanHoursToken;
    mapping(address => uint256) public delegatedPower;
    mapping(address => address) public delegates;

    event DelegateChanged(address indexed delegator, address indexed fromDelegate, address indexed toDelegate);
    event DelegateVotesChanged(address indexed delegate, uint256 previousBalance, uint256 newBalance);

    constructor(address _token) {
        humanHoursToken = IERC20(_token);
    }

    function delegate(address delegatee) public {
        address currentDelegate = delegates[msg.sender];
        delegates[msg.sender] = delegatee;

        emit DelegateChanged(msg.sender, currentDelegate, delegatee);

        _moveDelegateVotes(currentDelegate, delegatee, humanHoursToken.balanceOf(msg.sender));
    }

    function getVotes(address account) public view returns (uint256) {
        return delegatedPower[account] + humanHoursToken.balanceOf(account);
    }

    function _moveDelegateVotes(address from, address to, uint256 amount) internal {
        if (from != address(0)) {
            uint256 oldValue = delegatedPower[from];
            delegatedPower[from] = oldValue - amount;
            emit DelegateVotesChanged(from, oldValue, delegatedPower[from]);
        }
        if (to != address(0)) {
            uint256 oldValue = delegatedPower[to];
            delegatedPower[to] = oldValue + amount;
            emit DelegateVotesChanged(to, oldValue, delegatedPower[to]);
        }
    }
} 