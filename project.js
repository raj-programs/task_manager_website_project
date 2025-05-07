let projects = JSON.parse(localStorage.getItem("projects")) || [];
const projectContainer = document.querySelector("#projectTable tbody");
const membersInput = document.getElementById("membersinput"); // Input for team members
const membersListDisplay = document.getElementById("membersList"); // Optional, for visual feedback
let collectedMembers = [];

// Dialog Handling
function openDialog() {
    document.getElementById("addProject").style.display = "block";
}
function closeDialog() {
    document.getElementById("addProject").style.display = "none";
    document.getElementById("projectForm").reset();
    collectedMembers = [];
    updateMembersDisplay(); // Clear visual list
}

// Team Members
function updateMembersDisplay() {
    if (membersListDisplay) {
        membersListDisplay.innerHTML = collectedMembers.map(m => `<li>${m}</li>`).join("");
    }
}

function collectTeamMembers() {
    if (collectedMembers.length === 0) {
        alert("Please add at least one team member.");
        return;
    }
    alert("Team Members Collected: " + collectedMembers.join(", "));
}

function addMembers() {
    const memberName = membersInput.value.trim();
    if (memberName) {
        collectedMembers.push(memberName);
        membersInput.value = "";
        updateMembersDisplay();
    } else {
        alert("Enter a team member name before clicking ADD TEAM MEMBERS");
    }
}





// Add Project
function addToList() {
    const name = document.getElementById("projectName").value.trim();
    const description = document.getElementById("description").value.trim();
    const deadline = document.getElementById("projectDeadline").value;

    if (!name || !description || !deadline || collectedMembers.length === 0) {
        alert("Please fill all fields and add team members.");
        return;
    }

    const project = {
        id: Date.now(),
        name,
        description,
        deadline,
        members: collectedMembers.join(", "),
        status: "Pending"
    };

    projects.push(project);
    saveProjects();
    renderTable();
    renderTabs();
    closeDialog();
}

// Save and Load Projects
function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
}

function loadProjects() {
    const saved = localStorage.getItem("projects");
    if (saved) {
        projects = JSON.parse(saved);
    }
    renderTable();
    renderTabs();
}

// Render Table
function renderTable() {
    projectContainer.innerHTML = "";

    projects.forEach((project, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${project.name}</td>
            <td>${project.members}</td>
            <td>${project.description}</td>
            <td>${project.deadline}</td>
            <td>${project.status}</td>
            <td>
                <button onclick="startProject(${index})" id="btn2" ${project.status !== "Pending" ? "disabled" : ""}>
                    ${project.status === "In Progress" ? "In Progress" : "Start"}
                </button>
                <button onclick="completeProject(${index})" id="btn2" ${project.status === "Completed" ? "disabled" : ""}>
                    ${project.status === "Completed" ? "Completed" : "Complete"}
                </button>
                <button onclick="deleteProject(${index})" id="btn2">Delete</button>
            </td>
        `;
        projectContainer.appendChild(row);
    });
}

// Actions
function startProject(index) {
    if (projects[index].status === "Pending") {
        projects[index].status = "In Progress";
        saveProjects();
        renderTable();
        renderTabs();
    }
}
function completeProject(index) {
    if (projects[index].status !== "Completed") {
        projects[index].status = "Completed";
        saveProjects();
        renderTable();
        renderTabs();
    }
}
function deleteProject(index) {
    if (confirm("Are you sure you want to delete this project?")) {
        projects.splice(index, 1);
        saveProjects();
        renderTable();
        renderTabs();
    }
}

// Render Tabs
function renderTabs() {
    const today = new Date().toISOString().split("T")[0];

    const overdueList = document.getElementById("overdueList");
    const todayList = document.getElementById("todayList");
    const upcomingList = document.getElementById("upcomingList");

    overdueList.innerHTML = "";
    todayList.innerHTML = "";
    upcomingList.innerHTML = "";

    projects.forEach((project, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${project.name}</strong> - ${project.description} <br>
            <em>Deadline: ${project.deadline}</em> - <b>${project.status}</b>
            <br>
            <button onclick="startProject(${index})" class="btn3" ${project.status !== "Pending" ? "disabled" : ""}>
                ${project.status === "In Progress" ? "In Progress" : "Start"}
            </button>
            <button onclick="completeProject(${index})" class="btn3" ${project.status === "Completed" ? "disabled" : ""}>
                ${project.status === "Completed" ? "Completed" : "Complete"}
            </button>
            <button onclick="deleteProject(${index})" class="btn3">Delete</button>
        `;

        if (project.deadline < today) {
            overdueList.appendChild(li);
        } else if (project.deadline === today) {
            todayList.appendChild(li);
        } else {
            upcomingList.appendChild(li);
        }
    });
}

// Search Projects
function search() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const rows = projectContainer.querySelectorAll("tr");
    rows.forEach(row => {
        const name = row.children[0].textContent.toLowerCase();
        row.style.display = name.includes(searchTerm) ? "" : "none";
    });
}

// Display Sections
function display1() {
    document.getElementById("projectList").style.display = "none";
    document.getElementById("overdue").style.display = "block";
    document.getElementById("today").style.display = "none";
    document.getElementById("upcoming").style.display = "none";
}
function display2() {
    document.getElementById("projectList").style.display = "none";
    document.getElementById("overdue").style.display = "none";
    document.getElementById("today").style.display = "block";
    document.getElementById("upcoming").style.display = "none";
}
function display3() {
    document.getElementById("projectList").style.display = "none";
    document.getElementById("overdue").style.display = "none";
    document.getElementById("today").style.display = "none";
    document.getElementById("upcoming").style.display = "block";
}
function display4() {
    document.getElementById("projectList").style.display = "flex";
    document.getElementById("overdue").style.display = "none";
    document.getElementById("today").style.display = "none";
    document.getElementById("upcoming").style.display = "none";
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("overdueHeading").style.color = "red";
    loadProjects();
});
