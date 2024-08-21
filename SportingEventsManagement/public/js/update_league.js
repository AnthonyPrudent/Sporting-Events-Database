/*
Citation for the following JavaScript code:
Date: 8/9/2024
Adapted from
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 
Reworked the request to better accomodate the attributes of the corresponding table.
*/

// Get the objects we need to modify
let updateLeagueForm = document.getElementById('update-league-form-ajax');

// Modify the objects we need
updateLeagueForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputLeague = document.getElementById("input-league-update");
    let inputName = document.getElementById("input-name-update");
    let inputYearFounded = document.getElementById("input-yearfounded-update");
    let inputCommisioner = document.getElementById("input-commisioner-update");
    let inputSport = document.getElementById("input-sport-update");

    // Get the values from the form fields
    let leagueValue = inputLeague.value;
    let nameValue = inputName.value;
    let yearFoundedValue = inputYearFounded.value;
    let commisionerValue = inputCommisioner.value;
    let sportValue = inputSport.value;

    // Put our data we want to send in a javascript object
    let data = {
        leagueid: leagueValue,
        name: nameValue,
        yearfounded: yearFoundedValue,
        commisioner: commisionerValue,
        sport: sportValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-league-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, leagueValue);
            
            // Update dropdown select
            updateDropDownMenu(xhttp.response, leagueValue)

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, LeagueID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("leagues-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == LeagueID) {

            // Get the location of the row where we found the matching ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of current table values
            let nametd = updateRowIndex.getElementsByTagName("td")[1];
            let yearfoundedtd = updateRowIndex.getElementsByTagName("td")[2];
            let commisionertd = updateRowIndex.getElementsByTagName("td")[3];
            let sporttd = updateRowIndex.getElementsByTagName("td")[4];

            // Reassign current values to our values we updated to
            nametd.innerHTML = parsedData.rows[0].Name; 
            yearfoundedtd.innerHTML = parsedData.rows[0].YearFounded; 
            commisionertd.innerHTML = parsedData.rows[0].Commisioner; 
            sporttd.innerHTML = parsedData.rows[0].Sport; 
       }    
    }
}

function updateDropDownMenu(data, LeagueID) {
    let parsedData = JSON.parse(data);
    let selectMenu = document.getElementById("input-league-update");
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].attributes[0].value) === Number(LeagueID)) {
            selectMenu[i].innerHTML = parsedData.rows[0].Name;
            break;
        }
    }
}