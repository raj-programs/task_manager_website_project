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
function search() {
    document.querySelector("input[type='search']").addEventListener("input", function() {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll("table tbody tr");
        rows.forEach(row => {
            const taskName = row.cells[0].textContent.toLowerCase();
            if (taskName.includes(searchTerm)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });

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
document.getElementById("priority_container").style.display = "none";
document.getElementById("calender_container").style.display = "none";
document.getElementById("priority_container1").style.display = "none";
document.getElementById("Pbtn").style.display = "none";
document.getElementById("addTask").style.display = "none";

}
function display2() {
document.getElementById("task_container").style.display = "none";
document.getElementById("deadline_container").style.display = "flex";
document.getElementById("priority_container").style.display = "none";
document.getElementById("calender_container").style.display = "none";
document.getElementById("priority_container1").style.display = "none";
document.getElementById("Pbtn").style.display = "none";
document.getElementById("addTask").style.display = "none";


}
function display3() {
document.getElementById("task_container").style.display = "none";
document.getElementById("deadline_container").style.display = "none";
document.getElementById("priority_container").style.display = "flex";
document.getElementById("calender_container").style.display = "none";
document.getElementById("priority_container1").style.display = "none";
document.getElementById("Pbtn").style.display = "block";
document.getElementById("addTask").style.display = "none";




     
}

function display4() {
document.getElementById("task_container").style.display = "none";
document.getElementById("deadline_container").style.display = "none";
document.getElementById("priority_container").style.display = "none";
document.getElementById("calender_container").style.display = "block";
document.getElementById("priority_container1").style.display = "none";
document.getElementById("Pbtn").style.display = "none";
document.getElementById("addTask").style.display = "none";




}
function priorityList(){
     document.getElementById("priority_container1").style.display = "flex";
    document.getElementById("Pbtn").style.display = "none";
    const Name = document.getElementsById("taskName").value;
    const priority = document.getElementById("Priority");
const selectedValue = priority.value;
const table = document.getElementById("Ptable").querySelector("tbody");
const newRow = table.insertRow();
const newCell1 = newRow.insertCell(0);
newCell1.textContent = Name;
const newCell2 = newRow.insertCell(1);
newCell2.textContent = selectedValue;
}


