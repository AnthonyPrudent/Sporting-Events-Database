/*
Citation for the following JavaScript code:
Date: 8/9/2024
Adapted from
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 
Reworked the request to better accomodate the attributes of the corresponding table.
*/

// Get the objects we need to modify
let addPlayerForm = document.getElementById('add-player-form-ajax');

// Modify the objects we need
addPlayerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("input-name");
    let inputPosition = document.getElementById("input-position");
    let inputTeam = document.getElementById("input-team");

    // Get the values from the form fields
    let nameValue = inputName.value;
    let positionValue = inputPosition.value;
    let teamValue = inputTeam.value;

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        position: positionValue,
        team: teamValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-player-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputName.value = '';
            inputPosition.value = '';
            inputTeam.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("players-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row with cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let positionCell = document.createElement("TD");
    let teamCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.PlayerID;
    nameCell.innerText = newRow.Name;
    positionCell.innerText = newRow.Position;
    teamCell.innerText = newRow.Team;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(positionCell);
    row.appendChild(teamCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.PlayerID);

    // Add the row to the table
    currentTable.appendChild(row);
}