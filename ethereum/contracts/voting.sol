// SPDX-License-Identifier: MIT
pragma solidity ^0.6.5;

contract VotingFactory{
    address[] public deployedVoting;

    function createVoting(string memory _description, string memory _purpose) public {
        address newVoting = address(new Voting(msg.sender, _description, _purpose));
        deployedVoting.push(newVoting);
    }

    function getDeployedVoting() public view returns(address[] memory){
        return deployedVoting;
    }
}

contract Voting{

    struct Candidate{
        string name;
        string studies;
        string description;
        address candidateAddress;
        bool right_wing;
        uint votes;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voters;
    uint private candidatesCount;
    uint private votesCount;
    string public description;
    string public purpose;
    address public manager;

    constructor(address _manager, string memory _description, string memory _purpose) public {
        manager = _manager;
        description = _description;
        purpose = _purpose;
    }

    function getSummary() view public returns( string memory, string memory,address,uint,uint){
        return(description,purpose,manager,votesCount,candidatesCount);
    }

    function getCandidatesCount() view public returns(uint){
        return candidatesCount;
    }

    function getVotesCount() view public returns(uint){
        return votesCount;
    }

    function addVote(uint index) public {
        //Check that the voter has not yet voted  
        require(!voters[msg.sender]);
        voters[msg.sender] = true;
        //Adding vote to the candidate 
        candidates[index].votes++;
        votesCount++;
    }

    function addCandidate(string memory _name, string memory _studies, string memory _description, bool _right_wing) public {
        //Adding the new candidate into the mapping
        Candidate storage newCandidate = candidates[candidatesCount];
        newCandidate.name = _name;
        newCandidate.studies = _studies;
        newCandidate.description = _description;
        newCandidate.candidateAddress = msg.sender;
        newCandidate.right_wing = _right_wing;
        newCandidate.votes = 0;
        candidatesCount++;
    }

}