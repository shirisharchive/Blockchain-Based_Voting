const web3 = new Web3('http://127.0.0.1:7545');


const abi =[
  {
    "inputs": [],
    "name": "candidateCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "candidates",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "party",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "position",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "voteCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "voterCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_party",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_position",
        "type": "string"
      }
    ],
    "name": "addCandidate",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "candidateId",
        "type": "uint256"
      }
    ],
    "name": "vote",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "candidateId",
        "type": "uint256"
      }
    ],
    "name": "getCandidate",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "party",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "position",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "voteCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "voter",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "position",
        "type": "string"
      }
    ],
    "name": "hasVotedForPosition",
    "outputs": [
      {
        "internalType": "bool",
        "name": "hasVoted",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

const contractAddress = "0x610B00522681Aaa8D2B8BD21117E1878FbF0Fbbc"; 
const contract = new web3.eth.Contract(abi, contractAddress); 

// Function to fetch and display the voter count
async function displayVoterCount() {
    try {
        // Fetch the current voter count from the contract
        const voterCount = await contract.methods.voterCount().call();
        
        // Display voter count in the designated element
        document.getElementById("voterCount").textContent = `Total Voters: ${voterCount}`;
    } catch (error) {
        
        //console.error("Error fetching voter count:", error);
        document.getElementById("voterCount").textContent = "Error fetching voter count.";
    }
}

// Event listener to call the displayVoterCount function when the document is loaded
document.addEventListener("DOMContentLoaded", async () => {
    await displayVoterCount();
});
