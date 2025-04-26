const projectContainer = document.getElementById("projectTable");
function openDialog(){
    document.getElementById("addProject").style.display = "block";
}
function closeDialog(){
    document.getElementById("addProject").style.display = "none";
}
function addToList(){
    const projectName = document.getElementById("projectName").value;
    const projectDescription = document.getElementById("projectDescription").value;
    const teamMembers = document.getElementById("teamMembers").value;
    const projectDeadline = document.getElementById("projectDeadline").value;
    if(projectName && projectDescription && projectDeadline && teamMembers){
        const table = document.querySelector("table, tbody");
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${projectName}</td>
            <td>${teamMembers}</td>
            <td>${projectDescription}</td>
            <td>${projectDeadline}</td>
            `;
            table.appendChild(newRow);
            document.getElementById("projectName").value = "";
            saveData();
            closeDialog();
           
        
}
else{
    alert("Please fill all the fields");
}
}
function saveData(){
    localStorage.setItem("data", projectContainer.innerHTML);
}