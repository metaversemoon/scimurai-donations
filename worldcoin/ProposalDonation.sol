```
// SPDX-License-Identifier: GPL-3.0
import { ByteHasher } from './helpers/ByteHasher.sol';
import { IWorldID } from './interfaces/IWorldID.sol';

pragma solidity >=0.7.0 <0.9.0;

contract ProposalDonation {
    using ByteHasher for bytes;

    struct Proposal {
        uint8 id;
        string IPFSCid;
        uint256 amount;
        address owner;
        uint256 target;
    }

    struct ProposalId {
        uint id;
    }

    uint8 id = 0;

    mapping(uint256 => address) public ownerById;
    mapping(uint256 => address) public winner;
    mapping(address => uint[]) proposalByWinner;
    mapping(address => uint[]) proposalsByOwner;
    mapping(address => ProposalId[]) subscriptions;

    IWorldID internal immutable worldId;
    error InvalidNullifier();
    uint256 internal immutable externalNullifier;
    uint256 internal immutable groupId = 1;
    mapping(uint256 => bool) internal nullifierHashes;

    Proposal[] public proposals;

    event proposalAdded(address indexed _from, uint8 indexed _id, uint _value);
    event rewardCollected(address indexed _to, uint8 indexed _taskId, uint _value);

    constructor(
        IWorldID _worldId,
        string memory _appId,
        string memory _actionId
    ) {
        worldId = _worldId;
        externalNullifier = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _actionId)
            .hashToField();
    }
    function addProposal(
        string memory _IPFSCid,
        uint256 _target,
        address input,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) public payable {
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();

        proposals.push(
            Proposal({
                id: id,
                IPFSCid: _IPFSCid,
                amount: 0,
                owner: msg.sender,
                target: _target
            })
        );

        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(input).hashToField(),
            nullifierHash,
            abi.encodePacked(address(this)).hashToField(),
            proof
        );

        nullifierHashes[nullifierHash] = true;

        proposalsByOwner[msg.sender].push(id);
        ownerById[id] = msg.sender;
        emit proposalAdded(msg.sender, id, msg.value);
        id++;

    }

    function getOwnerById(uint256 _id) public view returns (address) {
        return proposals[_id].owner;
    }

    function getAllProposals() public view returns (Proposal[] memory) {
        return proposals;
    }

    function getAllTProposalsByOwner(address _owner)
        public view
        returns (uint[] memory)
    {
        return proposalsByOwner[_owner];
        
    }

    function getSubscriptions(address _subscriber)
        public
        view
        returns (ProposalId[] memory)
    {
        return subscriptions[_subscriber];
    }

    function transferReward(uint8 _taskId)
        public
        payable
        returns (bool, bytes memory)
    {
        require(winner[_taskId] == msg.sender, "No money");
        (bool sent, bytes memory data) = msg.sender.call{
            value: proposals[_taskId].amount
        }("");
        emit rewardCollected(msg.sender, _taskId, msg.value);
        return (sent, data);
    }

    function contractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
```