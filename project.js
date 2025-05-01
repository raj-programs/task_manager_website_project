const projectContainer = document.getElementById("projectTable");
function openDialog(){
    document.getElementById("addProject").style.display = "block";
}
function closeDialog(){
    document.getElementById("addProject").style.display = "none";
}
function addMemberField() {
    const container = document.getElementById("membersContainer");
    const newMemberInput = document.createElement("input");

    newMemberInput.type = "text";
    newMemberInput.className = "memberInput"; 
    newMemberInput.placeholder = "Enter team member name";

    container.appendChild(newMemberInput);
}

function collectTeamMembers() {
    const members = document.querySelectorAll(".memberInput");
    const teamMembers = [];

    members.forEach(member => {
        if (member.value.trim() !== "") {
            teamMembers.push(member.value.trim());
        }
    });

    console.log("Team Members:", teamMembers);
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