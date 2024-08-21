/*
Citation for the following JavaScript code:
Date: 8/9/2024
Adapted from
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 
Reworked the request to better accomodate the attributes of the corresponding table.
*/

// Sends request to delete entry from the database then updates the UI
function deleteLeague(LeagueID) {

    let link = '/delete-league-ajax/';
    let data = {
      id: LeagueID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(LeagueID);
        }
    });
}
  
// Removes the entry from the user-facing table
function deleteRow(LeagueID) {
    let table = document.getElementById("leagues-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == LeagueID) {
            table.deleteRow(i);
            deleteDropDownMenu(LeagueID)
            break;
        }
    }
}

// Removes the deleted entry from the edit dropdown list
function deleteDropDownMenu(LeagueID) {
    let selectMenu = document.getElementById("input-league-update");
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].attributes[0].value) === Number(LeagueID)) {
            selectMenu[i].remove();
            break;
        }
    }
}