// Selectors
const projectContainer = document.querySelector("#projectTable tbody");
const membersInput = document.getElementById("members");
const membersContainer = document.getElementById("membersContainer");
let collectedMembers = [];

function openDialog() {
    document.getElementById("addProject").style.display = "block";
}

function closeDialog() {
    document.getElementById("addProject").style.display = "none";
    document.getElementById("projectForm").reset();
    membersContainer.innerHTML = "";
    collectedMembers = [];
}

function addMembers() {
    const memberName = membersInput.value.trim();
    if (memberName) {
        collectedMembers.push(memberName);
        membersInput.value = "";
    } else {
        alert("Enter a team member name before clicking ADD TEAM MEMBERS");
    }
}

function collectTeamMembers() {
    if (collectedMembers.length === 0) {
        alert("Please add at least one team member.");
        return;
    }
    alert("Team Members Collected: " + collectedMembers.join(", "));
}

function addToList() {
    const projectName = document.getElementById("projectName").value.trim();
    const description = document.getElementById("description").value.trim();
    const deadline = document.getElementById("projectDeadline").value;

    if (!projectName || !description || !deadline || collectedMembers.length === 0) {
        alert("Please fill all fields and add team members.");
        return;
    }

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${projectName}</td>
        <td>${collectedMembers.join(", ")}</td>
        <td>${description}</td>
        <td>${deadline}</td>
        <td>Pending</td>
    `;

    projectContainer.appendChild(newRow);
    saveData();
    closeDialog();
}

function saveData() {
    localStorage.setItem("projectData", projectContainer.innerHTML);
}

function loadData() {
    const saved = localStorage.getItem("projectData");
    if (saved) {
        projectContainer.innerHTML = saved;
    }
}

function search() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const rows = projectContainer.querySelectorAll("tr");
    rows.forEach(row => {
        const name = row.children[0].textContent.toLowerCase();
        row.style.display = name.includes(searchTerm) ? "" : "none";
    });
}

// Load data when page loads
document.addEventListener("DOMContentLoaded", loadData);
