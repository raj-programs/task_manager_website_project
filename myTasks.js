function openDialog(){
    document.getElementById("addTask").style.display = "block";
}
function hideDialog(){
    document.getElementById("addTask").style.display = "none";
}
function addToTable(){
    const name = document.getElementById("taskName").value;
    const assignee = document.getElementById("Assignee").value;
    const deadline = document.getElementById("Deadline").value;

    if(name && assignee && deadline){
        const table = document.querySelector("table tbody");
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${name}</td>
            <td>Pending</td>
            <td onclick="deadlinemeet()">${deadline}</td>
            <td>${assignee}</td>
            <td><button class="btn3" onclick="progress()">Start</button></td>
            <td><button class="btn4" onclick="complete()">Complete</button></td>
        `;
        table.appendChild(newRow);
        document.getElementById("taskName").value = "";
        hideDialog();
    }
    else {
        alert("Please fill in all fields.");
    }
}
function searchTask() {
    const searchValue = document.getElementById("searchTask").value.toLowerCase();
    const tableBody = document.querySelector("#task_table tbody");
    const rows = tableBody.getElementsByTagName("tr");
    let found = false;

    for (let row of rows) {
        const taskNameCell = row.cells[0]; // Task Name is in the first column
        if (taskNameCell.textContent.toLowerCase() === searchValue) {
            document.getElementById("searchResult").innerHTML = `
                <strong>Task Found:</strong> 
                <br> Task Name: ${row.cells[0].textContent}
                <br> Assignee: ${row.cells[1].textContent}
                <br> Deadline: ${row.cells[2].textContent}
                <br> Priority: ${row.cells[3].textContent}
            `;
            found = true;
            break;
        }
    }

    if (!found) {
        document.getElementById("searchResult").innerHTML = "No matching task found!";
    }
}

function progress() {
    const rows = document.querySelectorAll("table tbody tr");
    rows.forEach(row => {
            row.cells[1].textContent = "In Progress";
            row.style.backgroundColor = "#f0e68c"; // Light yellow color
    });
}
function deadlinemeet(){
    const deadline = document.getElementById("Deadline").value;
    const row = document.querySelectorAll("table tbody tr");
    if(deadline){
        const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    if(deadlineDate < currentDate){
        row.forEach(r => {
            r.cells[2].textContent = "Overdue";
            r.style.backgroundColor = "#ff0000"; // Red color for overdue tasks
        });
    }
    else if (deadlineDate.toDateString() === currentDate.toDateString()) {
        row.forEach(r => {
            if(r.cells[2]){
            r.cells[2].textContent = "Due Today";
            r.style.backgroundColor = "#ffffff"; // white color for tasks due today
        }
    });
    
        
}
else if(row.cells[1] === "Completed"  || row.cells[1] === "In Progress"){
    return 0;
}
}
}
function complete() {
const rows = document.querySelectorAll("table tbody tr");
rows.forEach(row => {
        row.cells[1].textContent = "Completed";
        row.style.backgroundColor = "#90ee90"; // Light green color
        row.style.color = "#1a2421"; 
    
});
document.querySelector(".btn3").style.display = "none"; 

}
function display1() {
document.getElementById("task_container").style.display = "block";
document.getElementById("deadline_container").style.display = "none";
document.getElementById("calendar").style.display = "none";
document.getElementById("priority_container1").style.display = "none";
document.getElementById("addTask").style.display = "none";

}

function sortTableByDeadline() {
    const table = document.getElementById("Ntable");
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr")); // Convert NodeList to Array

    // Sort rows based on the deadline column (2nd column)
    rows.sort((rowA, rowB) => {
        const dateA = new Date(rowA.cells[1].textContent);
        const dateB = new Date(rowB.cells[1].textContent);
        return dateA - dateB; // Sort in ascending order
    });

    // Reorder rows in table
    tbody.innerHTML = ""; // Clear old rows
    rows.forEach(row => tbody.appendChild(row));
}
function display2() {
document.getElementById("task_container").style.display = "none";
document.getElementById("deadline_container").style.display = "flex";
document.getElementById("calendar").style.display = "none";
document.getElementById("priority_container1").style.display = "none";
document.getElementById("addTask").style.display = "none";
sortTableByDeadline(); 
}


function display3() {
document.getElementById("task_container").style.display = "none";
document.getElementById("deadline_container").style.display = "none";
document.getElementById("calendar").style.display = "none";
document.getElementById("addTask").style.display = "none";
document.getElementById("priority_container1").style.display = "flex";
const Name = document.getElementById("taskName").value;
const priority = document.getElementById("Priority").value;
 const table = document.getElementById("Ptable").querySelector("tbody");
 const newRow = document.createElement("tr");
 newRow.innerHTML = `
     <td>${Name}</td>
     <td>${priority}</td>
 `;
 table.appendChild(newRow);
 document.getElementById("taskName").value = "";
}


function display4() {
document.getElementById("task_container").style.display = "none";
document.getElementById("deadline_container").style.display = "none";
document.getElementById("calendar").style.display = "flex";
document.getElementById("priority_container1").style.display = "none";
document.getElementById("addTask").style.display = "none";
}


