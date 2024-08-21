/*
Citation for the following JavaScript code:
Date: 8/9/2024
Adapted from
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 
Reworked the request to better accomodate the attributes of the corresponding table.
*/

// Get the objects we need to modify
let updatePersonForm = document.getElementById('update-event-form-ajax');

// Modify the objects we need
updatePersonForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputEvent = document.getElementById("input-event-update");
    let inputName = document.getElementById("input-name-update");
    let inputDate = document.getElementById("input-date-update");
    let inputVenue = document.getElementById("input-venue-update");
    let inputSport = document.getElementById("input-sport-update");
    let inputScore = document.getElementById("input-score-update");
    let inputLeague = document.getElementById("input-league-update");
    let inputTicketPrice = document.getElementById("input-ticketprice-update");

    // Get the values from the form fields
    let eventValue = inputEvent.value;
    let nameValue = inputName.value;
    let dateValue = inputDate.value;
    let venueValue = inputVenue.value;
    let sportValue = inputSport.value;
    let scoreValue = inputScore.value;
    let leagueValue = inputLeague.value;
    let ticketPriceValue = inputTicketPrice.value;


    // Put our data we want to send in a javascript object
    let data = {
        eventid: eventValue,
        name: nameValue,
        date: dateValue,
        venue: venueValue,
        sport: sportValue,
        score: scoreValue,
        league: leagueValue,
        ticketprice: ticketPriceValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-event-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, eventValue);
            
            // Update event dropdown select
            updateDropDownMenu(xhttp.response, eventValue)

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, EventID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("events-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == EventID) {

            // Get the location of the row where we found the matching ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of current table values
            let nametd = updateRowIndex.getElementsByTagName("td")[1];
            let datetd = updateRowIndex.getElementsByTagName("td")[2];
            let venuetd = updateRowIndex.getElementsByTagName("td")[3];
            let sporttd = updateRowIndex.getElementsByTagName("td")[4];
            let scoretd = updateRowIndex.getElementsByTagName("td")[5];
            let leaguetd = updateRowIndex.getElementsByTagName("td")[6];
            let ticketpricetd = updateRowIndex.getElementsByTagName("td")[7];

            // Reassign current values to our values we updated to
            nametd.innerHTML = parsedData.rows[0].Name; 
            datetd.innerHTML = parsedData.rows[0].Date; 
            venuetd.innerHTML = parsedData.rows[0].Venue; 
            sporttd.innerHTML = parsedData.rows[0].Sport; 
            scoretd.innerHTML = parsedData.rows[0].Score; 
            leaguetd.innerHTML = parsedData.rows[0].League; 
            ticketpricetd.innerHTML = parsedData.rows[0].TicketPrice; 
       }    
    }

    table = document.getElementById("competingteams-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == EventID) {
 
             // Get the location of the row where we found the matching ID
             let updateRowIndex = table.getElementsByTagName("tr")[i];
 
             // Get td of current table values
             let eventtd = updateRowIndex.getElementsByTagName("td")[1];
 
             // Reassign current values to our values we updated to
             eventtd.innerHTML = parsedData.rows[0].Name; 

        }
    }

    table = document.getElementById("eventstreams-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == EventID) {
 
             // Get the location of the row where we found the matching ID
             let updateRowIndex = table.getElementsByTagName("tr")[i];
 
             // Get td of current table values
             let eventtd = updateRowIndex.getElementsByTagName("td")[1];
 
             // Reassign current values to our values we updated to
             eventtd.innerHTML = parsedData.rows[0].Name; 

        }
    }

}

// Updates the dropdowns that use the event name
function updateDropDownMenu(data, EventID) {
    let parsedData = JSON.parse(data);
    let selectMenu = document.getElementById("input-event-update");
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].attributes[0].value) === Number(EventID)) {
            selectMenu[i].innerHTML = parsedData.rows[0].Name;
        }
    }

    selectMenu = document.getElementById("input-streamedevent");

    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].attributes[0].value) === Number(EventID)) {
            selectMenu[i].innerHTML = parsedData.rows[0].Name;
        }
    }

    selectMenu = document.getElementById("input-event");

    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].attributes[0].value) === Number(EventID)) {
            selectMenu[i].innerHTML = parsedData.rows[0].Name;
        }
    }
}
