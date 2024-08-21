/*
Citation for the following JavaScript code:
Date: 8/9/2024
Adapted from
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 
Reworked the request to better accomodate the attributes of the corresponding table.
*/

// Sends request to delete entry from the database then updates the UI
function deleteEvent(EventID) {

    let link = '/delete-event-ajax/';
    let data = {
      id: EventID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(EventID);
        }
    });
}
  
// Removes the entry from the user-facing table
function deleteRow(EventID) {
    
    let table = document.getElementById("events-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == EventID) {
            table.deleteRow(i);
        }
    }

    table = document.getElementById("competingteams-table");
    for (let i = table.rows.length - 1; i >= 0; i--) {
        if (table.rows[i].getAttribute("data-value") == EventID) {
            table.rows[i].remove();
        }
    }

    table = document.getElementById("eventstreams-table");
    for (let i = table.rows.length - 1; i >= 0; i--) {
        if (table.rows[i].getAttribute("data-value") == EventID) {
            table.rows[i].remove();
        }
    }

    deleteDropDownMenu(EventID)
}

// Removes the deleted entry from the dropdown lists
function deleteDropDownMenu(EventID) {
    let selectMenu = document.getElementById("input-event-update");
    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].attributes[0].value) === Number(EventID)) {
            selectMenu[i].remove();
        }
    }
    
    selectMenu = document.getElementById("input-streamedevent");

    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].attributes[0].value) === Number(EventID)) {
            selectMenu[i].remove();
        }
    }
    
    selectMenu = document.getElementById("input-event");

    for (let i = 0; i < selectMenu.length; i++) {
        if (Number(selectMenu.options[i].attributes[0].value) === Number(EventID)) {
            selectMenu[i].remove();
            break;
        }
    }
}