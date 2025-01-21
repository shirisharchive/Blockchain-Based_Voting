// Initialize Web3 and connect to Ganache
const web3 = new Web3(window.ethereum);

const abi = [
  {
    "inputs": [],
    "name": "candidateCount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "candidates",
    "outputs": [
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "party", "type": "string" },
      { "internalType": "string", "name": "position", "type": "string" },
      { "internalType": "uint256", "name": "voteCount", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "candidateId", "type": "uint256" }],
    "name": "vote",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
];

const contractAddress = "0xE563e4bA2fE0FB9C91b1FEea39F32E1C01badFcd";
const contract = new web3.eth.Contract(abi, contractAddress);

async function displayCandidates() {
  try {
    const candidateCount = await contract.methods.candidateCount().call();
    const candidateContainer = document.getElementById("candidates");

    // Create a mapping of parties to their candidates
    const partyMap = {};

    for (let i = 0; i < candidateCount; i++) {
      const candidate = await contract.methods.candidates(i).call();
      const party = candidate.party;

      if (!partyMap[party]) {
        partyMap[party] = [];
      }
      partyMap[party].push({ id: i, ...candidate });
    }

    candidateContainer.innerHTML = "";

    // Create a table
    const table = document.createElement("table");
    table.border = "1";
    table.style.width = "100%";

    // Create table headers
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `<th>Party</th><th>Candidates</th>`;
    table.appendChild(headerRow);

    // Populate the table with candidates grouped by party
    for (const party in partyMap) {
      const row = document.createElement("tr");

      // Party column
      const partyCell = document.createElement("td");
      partyCell.textContent = party;
      row.appendChild(partyCell);

      // Candidates column (all candidates under this party displayed horizontally)
      const candidatesCell = document.createElement("td");
      candidatesCell.style.whiteSpace = "nowrap";

      partyMap[party].forEach(candidate => {
        const candidateElement = document.createElement("div");
        candidateElement.style.display = "inline-block";
        candidateElement.style.margin = "0 20px";

        candidateElement.innerHTML = `
          <p>Name: <strong>${candidate.name}</strong></p>
          <p>Position: ${candidate.position}</p>
          <p>Votes: ${candidate.voteCount}</p>
          <button onclick="vote(${candidate.id})">Vote</button>
        `;
        candidatesCell.appendChild(candidateElement);
      });

      row.appendChild(candidatesCell);
      table.appendChild(row);
    }

    candidateContainer.appendChild(table);
  } catch (error) {
    console.error("Error fetching candidates:", error);
  }
}

// async function vote(candidateId) {
//   try {
//     // const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

//     // if (accounts.length === 0) {
//     //   alert("No account found. Please connect to MetaMask.");
//     //   return;
//     // }

//     const account = accounts[0];
//     await contract.methods.vote(candidateId).send({ from: account });

//     alert(`Vote cast successfully for candidate ID: ${candidateId}`);
//     await displayCandidates();
//   } catch (error) {
//     console.error("Error casting vote:", error);
//     alert("Failed to cast vote. User may have already voted or there was an issue.");
//   }
// }

// document.addEventListener("DOMContentLoaded", async () => {
//   await displayCandidates();
// });
const predefinedAccount = "0x4a437c1E83e1bd7CD9CbBFf72f26b9b823418846";// Lalit yesma chai tmro ganache ko jun account ma ethers chha ni tesko address rakha hai.
async function vote(candidateId) {
  try {
    // Request access to MetaMask if not already connected
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // Use the predefined account to cast the vote
    await contract.methods.vote(candidateId).send({ from: predefinedAccount });

    alert(`Vote cast successfully for candidate ID: ${candidateId}`);
    await displayCandidates();
  } catch (error) {
    console.error("Error casting vote:", error);
    alert("Failed to cast vote. User may have already voted or there was an issue.");
  }
}
document.addEventListener("DOMContentLoaded", async () => {
    await displayCandidates();
  });