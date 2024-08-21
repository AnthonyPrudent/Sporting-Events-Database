/*
Citation for the following JavaScript code:
Date: 8/9/2024
Adapted from
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 
Reworked the request to better accomodate the attributes of the corresponding table.
*/

// Get the objects we need to modify
let addLeagueForm = document.getElementById('add-league-form-ajax');

// Modify the objects we need
addLeagueForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("input-name");
    let inputYearFounded = document.getElementById("input-yearfounded");
    let inputCommisioner = document.getElementById("input-commisioner");
    let inputSport = document.getElementById("input-sport");

    // Get the values from the form fields
    let nameValue = inputName.value;
    let yearfoundedValue = inputYearFounded.value;
    let commisionerValue = inputCommisioner.value;
    let sportValue = inputSport.value;

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        yearFounded: yearfoundedValue,
        commisioner: commisionerValue,
        sport: sportValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-league-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputName.value = '';
            inputYearFounded.value = '';
            inputCommisioner.value = '';
            inputSport.value = '';
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
    let currentTable = document.getElementById("leagues-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row with cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let yearFoundedCell = document.createElement("TD");
    let commisionerCell = document.createElement("TD");
    let sportCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.LeagueID;
    nameCell.innerText = newRow.Name;
    yearFoundedCell.innerText = newRow.YearFounded;
    commisionerCell.innerText = newRow.Commisioner;
    sportCell.innerText = newRow.Sport;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function() {
        deleteLeague(newRow.LeagueID);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(yearFoundedCell);
    row.appendChild(commisionerCell);
    row.appendChild(sportCell);
    row.appendChild(deleteCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.LeagueID);

    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("input-league-update");
    let option = document.createElement("option");
    option.text = newRow.Name;
    option.value = newRow.LeagueID;
    selectMenu.add(option);
}