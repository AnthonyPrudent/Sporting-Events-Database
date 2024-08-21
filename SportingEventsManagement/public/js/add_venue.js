/*
Citation for the following JavaScript code:
Date: 8/9/2024
Adapted from
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 
Reworked the request to better accomodate the attributes of the corresponding table.
*/

// Get the objects we need to modify
let addLeagueForm = document.getElementById('add-venue-form-ajax');

// Modify the objects we need
addLeagueForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("input-name");
    let inputCountry = document.getElementById("input-country");
    let inputState = document.getElementById("input-state");
    let inputCity = document.getElementById("input-city");
    let inputCapacity = document.getElementById("input-capacity");

    // Get the values from the form fields
    let nameValue = inputName.value;
    let countryValue = inputCountry.value;
    let stateValue = inputState.value;
    let cityValue = inputCity.value;
    let capacityValue = inputCapacity.value;

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        country: countryValue,
        state: stateValue,
        city: cityValue,
        capacity: capacityValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-venue-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputName.value = '';
            inputCountry.value = '';
            inputState.value = '';
            inputCity.value = '';
            inputCapacity.value = '';
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
    let currentTable = document.getElementById("venues-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row with cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let countryCell = document.createElement("TD");
    let stateCell = document.createElement("TD");
    let cityCell = document.createElement("TD");
    let capacityCell = document.createElement("TD");


    // Fill the cells with correct data
    idCell.innerText = newRow.VenueID;
    nameCell.innerText = newRow.Name;
    countryCell.innerText = newRow.Country;
    stateCell.innerText = newRow.State;
    cityCell.innerText = newRow.City;
    capacityCell.innerText = newRow.Capacity;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(countryCell);
    row.appendChild(stateCell);
    row.appendChild(cityCell);
    row.appendChild(capacityCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.VenueID);

    // Add the row to the table
    currentTable.appendChild(row);
}