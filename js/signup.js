"use strict"

/*
    Signup Form Script
    This script will load the state select list and validate the form before submission

    by: Emmanuel "Izzy" Gambliel
*/

// set up Global variables
var signup = document.getElementById('signup');

// The main function of the page
function onReady() {

    // Set up the necessary variables
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

    // If occupation is set to other, show the textbox for it
    var occupation = signup.elements['occupation'];

    occupation.addEventListener('change', function() {

        if (occupation.value == 'other') {
            signup.elements['occupationOther'].style.display = 'block';
        }
    });

    // Set up the No Thanks button
    var cancelButton = document.getElementById('cancelButton');

    cancelButton.addEventListener('click', function() {
        if (window.confirm('Are you sure, human?')) {
            window.location = 'http://www.bing.com';
        }
    });

    // WHen the user submits the form, run it through validation
    signup.addEventListener('submit', onSubmit);
}

// Check the submitted data and make it workable for all browsers
function onSubmit(evt) {
    evt.returnValue = validateForm(this);

    if (!evt.returnValue && evt.preventDefault) {
        evt.preventDefault();
    }

    return evt.returnValue;
}

// Validate the form
function validateForm(form) {

    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate']
    var i;
    var valid = true;

    // If Occupation is set to other, make sure it has a value
    if (signup.elements['occupation'] == 'other') {
        requiredFields.add('occupationOther');
    }

    // Check all the fields that need to be verified
    for (i = 0; i < requiredFields.length; i++){
        valid &= validateRequiredField(form.elements[requiredFields[i]]);
    }

    if (!valid) {

       // I need to add in all my validation code here!
    }

    return valid;

}

// Make sure the field is not blank spaces
function validateRequiredField(field) {
    var value = field.value.trim();
    var valid = value.length > 0;

    if (valid) {
        field.className = 'form-control';
    } else {
        field.className = 'form-control invalid-field';
    }

    return valid;
}


//Don't start processing until the DOM is loaded
document.addEventListener('DOMContentLoaded', onReady);

