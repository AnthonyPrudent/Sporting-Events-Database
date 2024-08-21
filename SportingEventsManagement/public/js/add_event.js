/*
Citation for the following JavaScript code:
Date: 8/9/2024
Adapted from
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 
Reworked the request to better accomodate the attributes of the corresponding table.
*/

// Get the objects we need to modify
let addEventForm = document.getElementById('add-event-form-ajax');

// Modify the objects we need
addEventForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("input-name");
    let inputDate = document.getElementById("input-date");
    let inputVenue = document.getElementById("input-venue");
    let inputSport = document.getElementById("input-sport");
    let inputScore = document.getElementById("input-score");
    let inputLeague = document.getElementById("input-league");
    let inputTicketPrice = document.getElementById("input-ticketprice");

    // Get the values from the form fields
    let nameValue = inputName.value;
    let dateValue = inputDate.value;
    let venueValue = inputVenue.value;
    let sportValue = inputSport.value;
    let scoreValue = inputScore.value;
    let leagueValue = inputLeague.value;
    let ticketPriceValue = inputTicketPrice.value;

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        date: dateValue,
        venue: venueValue,
        sport: sportValue,
        score: scoreValue,
        league: leagueValue,
        ticketPrice: ticketPriceValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-event-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputName.value = '';
            inputDate.value = '';
            inputVenue.value = '';
            inputSport.value = '';
            inputScore.value = '';
            inputLeague.value = '';
            inputTicketPrice.value = '';
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
    let currentTable = document.getElementById("events-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row with cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let dateCell = document.createElement("TD");
    let venueCell = document.createElement("TD");
    let sportCell = document.createElement("TD");
    let scoreCell = document.createElement("TD");
    let leagueCell = document.createElement("TD");
    let ticketPriceCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.EventID;
    nameCell.innerText = newRow.Name;
    dateCell.innerText = newRow.Date;
    venueCell.innerText = newRow.Venue;
    sportCell.innerText = newRow.Sport;
    scoreCell.innerText = newRow.Score;
    leagueCell.innerText = newRow.League;
    ticketPriceCell.innerText = newRow.TicketPrice;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function() {
        deleteEvent(newRow.EventID);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(dateCell);
    row.appendChild(venueCell);
    row.appendChild(sportCell);
    row.appendChild(scoreCell);
    row.appendChild(leagueCell);
    row.appendChild(ticketPriceCell);
    row.appendChild(deleteCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.EventID);

    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("input-event-update");
    let option = document.createElement("option");
    option.text = newRow.Name;
    option.value = newRow.EventID;
    selectMenu.add(option);
}