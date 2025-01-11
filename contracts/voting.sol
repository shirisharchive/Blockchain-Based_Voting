// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct CandidateInfo {
        string name;
        string party;
        string position;
        uint256 voteCount;
    }

    struct VoterInfo {
        mapping(string => bool) hasVotedForPosition;
        bool hasVoted;
    }

    mapping(uint256 => CandidateInfo) public candidates;
    mapping(address => VoterInfo) private voters;

    uint256 public candidateCount;
    uint256 public voterCount;

    function addCandidate(string memory _name, string memory _party, string memory _position) public returns (bool success) {
        for (uint256 i = 0; i < candidateCount; i++) {
            require(
                !(keccak256(abi.encodePacked(candidates[i].position)) == keccak256(abi.encodePacked(_position)) &&
                  keccak256(abi.encodePacked(candidates[i].party)) == keccak256(abi.encodePacked(_party))),
                "A candidate from the same party is already running for this position"
            );
        }

        candidates[candidateCount] = CandidateInfo({
            name: _name,
            party: _party,
            position: _position,
            voteCount: 0
        });

        candidateCount++;
        return true;
    }

    function vote(uint256 candidateId) public returns (bool success) {
        require(candidateId < candidateCount, "Candidate does not exist");

        CandidateInfo storage candidate = candidates[candidateId];

        require(
            !voters[msg.sender].hasVotedForPosition[candidate.position],
            "Voter has already voted for this position"
        );

        voters[msg.sender].hasVotedForPosition[candidate.position] = true;
        candidate.voteCount++;

        if (!voters[msg.sender].hasVoted) {
            voters[msg.sender].hasVoted = true;
            voterCount++;
        }

        return true;
    }

    function getCandidate(uint256 candidateId) public view returns (string memory name, string memory party, string memory position, uint256 voteCount) {
        require(candidateId < candidateCount, "Candidate does not exist");

        CandidateInfo memory candidate = candidates[candidateId];
        return (candidate.name, candidate.party, candidate.position, candidate.voteCount);
    }

    function hasVotedForPosition(address voter, string memory position) public view returns (bool result) {
        return voters[voter].hasVotedForPosition[position];
    }

    function hasVoted(address voter) public view returns (bool result) {
        return voters[voter].hasVoted;
    }
}
