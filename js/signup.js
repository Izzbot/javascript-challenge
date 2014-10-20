"use strict"

/*
    Signup Form Script
    This script will load the state select list and validate the form before submission

    by: Emmanuel "Izzy" Gambliel
*/

//Don't start processing until the DOM is loaded
document.addEventListener('DOMContentLoaded', onReady);

// The main function of the page
function onReady() {

    // Set up the necessary variables
    var signup = document.getElementById('signup');
    var statesSelect = signup.elements['state'];
    var option;
    var i;

    //Run a loop to populate the State drop-down menu
    for (i = 0; i < usStates.length; i++) {
        option = document.createElement('option');
        option.innerHTML = usStates[i].name;
        option.value = usStates[i].code;
        statesSelect.appendChild(option);
    }


    var occupation = signup.elements['occupation'];

    occupation.addEventListener('change', function() {

        if (occupation.value == 'other') {
            document.getElementById('occupationOther').style.display = 'block';
        }
    });
}