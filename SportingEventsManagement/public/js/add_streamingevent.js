/*
Citation for the following JavaScript code:
Date: 8/9/2024
Adapted from
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 
Reworked the request to better accomodate the attributes of the corresponding table.
*/

// Get the objects we need to modify
let addEventStreamForm = document.getElementById('add-eventstream-form-ajax');

// Modify the objects we need
addEventStreamForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputEvent = document.getElementById("input-streamedevent");
    let inputService = document.getElementById("input-service");

    // Get the values from the form fields
    let eventValue = inputEvent.value;
    let serviceValue = inputService.value;

    // Put our data we want to send in a javascript object
    let data = {
        event: eventValue,
        service: serviceValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-eventstream-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addEventStreamRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputEvent.value = '';
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
addEventStreamRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("eventstreams-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row with cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let eventCell = document.createElement("TD");
    let serviceCell = document.createElement("TD");

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function() {
        deleteEvent(newRow.EventStreamID);
    };

    // Fill the cells with correct data
    idCell.innerText = newRow.EventStreamID;
    eventCell.innerText = newRow.Event;
    serviceCell.innerText = newRow.StreamingService;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(eventCell);
    row.appendChild(serviceCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.EventStreamID);

    // Add the row to the table
    currentTable.appendChild(row);
}