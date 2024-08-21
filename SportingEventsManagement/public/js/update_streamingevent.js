/*
Citation for the following JavaScript code:
Date: 8/9/2024
Adapted from
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 
Reworked the request to better accomodate the attributes of the corresponding table.
*/

// Get the objects we need to modify
let updateStreamedEventForm = document.getElementById('update-streamedevent-form-ajax');

// Modify the objects we need
updateStreamedEventForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputStreamedEvent = document.getElementById("input-streamedeventid-update");
    let inputEvent = document.getElementById("input-streamedevent-update");
    let inputService = document.getElementById("input-service-update");

    // Get the values from the form fields
    let streamedEventValue = inputStreamedEvent.value;
    let eventValue = inputEvent.value;
    let serviceValue = inputService.value;

    // Put our data we want to send in a javascript object
    let data = {
        eventstreamid: streamedEventValue,
        event: eventValue,
        service: serviceValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-eventstream-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateEventStreamsRow(xhttp.response, streamedEventValue);
            
            // Update dropdown select
            updateDropDownMenu(xhttp.response, streamedEventValue)

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateEventStreamsRow(data, EventStreamID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("eventstreams-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("id") == EventStreamID) {

            // Get the location of the row where we found the matching ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of current table values
            let eventtd = updateRowIndex.getElementsByTagName("td")[1];
            let servicetd = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign current values to our values we updated to
            eventtd.innerHTML = parsedData.rows[0].Event; 
            servicetd.innerHTML = parsedData.rows[0].StreamingService; 
       }    
    }
}

function updateDropDownMenu(data, EventStreamID) {
    let parsedData = JSON.parse(data);
    let selectMenu = document.getElementById("input-streamedeventid-update");
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].attributes[0].value) === Number(EventStreamID)) {
            selectMenu[i].innerHTML = parsedData.rows[0].Event + " - " + parsedData.rows[0].StreamingService;
            break;
        }
    }
}