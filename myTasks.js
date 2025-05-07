document.addEventListener("DOMContentLoaded", function () {
  loadTasks();
  display1(); // Default to main view
});

let tasks = [];

function openDialog() {
  document.getElementById("addTask").style.display = "block";
}

function hideDialog() {
  document.getElementById("addTask").style.display = "none";
  document.getElementById("taskName").value = "";
  document.getElementById("Assignee").value = "";
  document.getElementById("Deadline").value = "";
  document.getElementById("Priority").value = "";
}

function addToTable() {
  const name = document.getElementById("taskName").value;
  const assignee = document.getElementById("Assignee").value;
  const deadline = document.getElementById("Deadline").value;
  const priority = document.getElementById("Priority").value;

  if (name && assignee && deadline && priority) {
    const task = {
      id: Date.now(), // Unique ID
      name,
      assignee,
      deadline,
      priority,
      status: "Pending"
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
    hideDialog();
  } else {
    alert("Please fill in all fields.");
  }
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const stored = localStorage.getItem("tasks");
  if (stored) {
    tasks = JSON.parse(stored);
    renderTasks();
  }
}

function renderTasks() {
  const tbody = document.querySelector(".task_table_body");
  const deadlineTable = document.querySelector("#Ntable tbody");
  const priorityTable = document.querySelector("#Ptable tbody");

  tbody.innerHTML = "";
  deadlineTable.innerHTML = "";
  priorityTable.innerHTML = "";

  const sortedByDeadline = [...tasks].sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
  const sortedByPriority = [...tasks].sort((a, b) => {
    const priorityOrder = { "High": 3, "Medium": 2, "Low": 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  sortedByDeadline.forEach(task => {
    // Main task table
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${task.name}</td>
      <td>${task.status}</td>
      <td>${task.deadline}</td>
      <td>${task.assignee}</td>
      <td>
        <button onclick="startTask(${task.id})" ${task.status !== "Pending" ? "disabled" : ""} id="btn2">
          ${task.status === "In Progress" ? "In Progress" : "Start"}
        </button>
        <button onclick="completeTask(${task.id})" ${task.status === "Completed" ? "disabled" : ""} id="btn2">
          ${task.status === "Completed" ? "Completed" : "Complete"}
        </button>
        <button onclick="deleteTask(${task.id})" id="btn2">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  sortedByDeadline.forEach(task => {
    const deadlineRow = document.createElement("tr");
    deadlineRow.innerHTML = `
      <td>${task.name}</td>
      <td>${task.deadline}</td>
      <td>${task.status}</td>
      <td>
      <button onclick="startTask(${task.id})" ${task.status !== "Pending" ? "disabled" : ""} id="btn2">
          ${task.status === "In Progress" ? "In Progress" : "Start"}
        </button>
        <button onclick="completeTask(${task.id})" ${task.status === "Completed" ? "disabled" : ""} id="btn2">
          ${task.status === "Completed" ? "Completed" : "Complete"}
        </button>
        <button onclick="deleteTask(${task.id})" id="btn2">Delete</button>
      </td>
    `;
    deadlineTable.appendChild(deadlineRow);
  });

  sortedByPriority.forEach(task => {
    const priorityRow = document.createElement("tr");
    priorityRow.innerHTML = `
      <td>${task.name}</td>
      <td>${task.priority}</td>
      <td>${task.status}</td>
      <td>
      <button onclick="startTask(${task.id})" ${task.status !== "Pending" ? "disabled" : ""} id="btn2">
          ${task.status === "In Progress" ? "In Progress" : "Start"}
        </button>
        <button onclick="completeTask(${task.id})" ${task.status === "Completed" ? "disabled" : ""} id="btn2">
          ${task.status === "Completed" ? "Completed" : "Complete"}
        </button>
        <button onclick="deleteTask(${task.id})" id="btn2">Delete</button>
      </td>
    `;
    priorityTable.appendChild(priorityRow);
  });
}

function startTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task && task.status === "Pending") {
    task.status = "In Progress";
    saveTasks();
    renderTasks();
  }
}

function completeTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task && task.status !== "Completed") {
    task.status = "Completed";
    saveTasks();
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

function display1() {
  document.getElementById("task_container").style.display = "block";
  document.getElementById("deadline_container").style.display = "none";
  document.getElementById("priority_container1").style.display = "none";
}

function display2() {
  document.getElementById("task_container").style.display = "none";
  document.getElementById("deadline_container").style.display = "block";
  document.getElementById("priority_container1").style.display = "none";
}

function display3() {
  document.getElementById("task_container").style.display = "none";
  document.getElementById("deadline_container").style.display = "none";
  document.getElementById("priority_container1").style.display = "block";
}
