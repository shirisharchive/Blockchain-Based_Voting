// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct CandidateInfo {
        string name;
        string party;
        string position;
        uint256 voteCount;
    }

    mapping(uint256 => CandidateInfo) public candidates;
    mapping(string => bool) private positionVoted; // Renamed mapping
    uint256 public candidateCount;

    
    function addCandidate(
        string memory _name,
        string memory _party,
        string memory _position
    ) public returns (bool success) {
        for (uint256 i = 0; i < candidateCount; i++) {
            require(
                !(keccak256(abi.encodePacked(candidates[i].position)) ==
                    keccak256(abi.encodePacked(_position)) &&
                  keccak256(abi.encodePacked(candidates[i].party)) ==
                    keccak256(abi.encodePacked(_party))),
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
            !positionVoted[candidate.position],
            "A vote has already been cast for this position"
        );

        positionVoted[candidate.position] = true; // Mark this position as voted
        candidate.voteCount++;
        return true;
    }

    
    function getCandidate(uint256 candidateId)
        public
        view
        returns (
            string memory name,
            string memory party,
            string memory position,
            uint256 voteCount
        )
    {
        require(candidateId < candidateCount, "Candidate does not exist");

        CandidateInfo memory candidate = candidates[candidateId];
        return (
            candidate.name,
            candidate.party,
            candidate.position,
            candidate.voteCount
        );
    }

    
    function hasVotedForPosition(string memory position)
        public
        view
        returns (bool result)
    {
        return positionVoted[position];
    }
}
