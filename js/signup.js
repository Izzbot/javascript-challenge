"use strict"

/*
    Signup Form Script
    This script will load the state select list and validate the form before submission

    by: Emmanuel "Izzy" Gambliel
*/

// set up Global variables
var signup = document.getElementById('signup');

//// The main function of the page
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
        } else {
            signup.elements['occupationOther'].style.display = 'none';
        }
    });

    // Set up the No Thanks button
    var cancelButton = document.getElementById('cancelButton');

    cancelButton.addEventListener('click', function() {
        if (window.confirm('Are you sure, human?')) {
            window.location = 'http://www.bing.com';
        }
    });

    // When the user submits the form, run it through validation
    signup.addEventListener('submit', onSubmit);
}

//// Check the submitted data and make it workable for all browsers
function onSubmit(evt) {

    try {
        evt.returnValue = validateForm(this);

        if (!evt.returnValue && evt.preventDefault) {
            evt.preventDefault();
        }

    } catch(exception) {
        alert(exception);
    }

    return evt.returnValue;
}

//// Validate the form
function validateForm(form) {
	
	// Set up all the needed variables
    var i;
    var requiredFields = [
        {name: 'firstName', valid: 1},
        {name: 'lastName', valid: 1},
        {name: 'address1', valid: 1},
        {name: 'city', valid: 1},
        {name: 'state', valid: 1},
        {name: 'zip', valid: 1},
        {name: 'birthdate', valid: 1}];
    var valid = true;
	var age = calculateAge(form);
	var bdMessageElem = document.getElementById('birthdateMessage');
	var zipRegex = new RegExp('^\\d{5}$');
	var zip = form.elements['zip'].value;

   try {
	    // If Occupation is set to other, make sure it has a value
	    if (signup.elements['occupation'].value == 'other') {
	        requiredFields.push({name: 'occupationOther', valid: 1});
	    }
	
	    // Check all the fields that require information
	    for (i = 0; i < requiredFields.length; i++){
	        var fieldValid = validateRequiredField(form.elements[requiredFields[i].name]);
	
	        // If that field is not valid, mark it as so
	        if (!fieldValid) {
	            requiredFields[i].valid = 0;
	
	        // Otherwise, clear it
	        } else {
	            requiredFields[i].valid = 1;
	            form.elements[requiredFields[i].name].style.borderColor = '';
	        }
	
	        // make sure the entire form is marked as not valid if necessary
	        valid &= fieldValid;
	    }
	
		// Check the age
		if (age < 13) {
			valid = false;
			requiredFields[6].valid = 0;
			bdMessageElem.innerHTML = 'No one under 13 allowed.';		
		} else {
			bdMessageElem.innerHTML = '';				
		}
		
		// Make sure the Zip Code has 5 numbers
		if (!zipRegex.test(zip)) {
			requiredFields[5].valid = 0;		
		}
		
	    // If the form is not valid, handle it!
	    if (!valid) {
	
	        for (i = 0; i < requiredFields.length; i++) {
	            if (!requiredFields[i].valid) {
	                form.elements[requiredFields[i].name].style.borderColor = '#FF0000';
	            }
	        }
	    }
    } catch(exception) {
        alert(exception);
    }
	
    return valid;
}

//// Make sure the field is not blank spaces
function validateRequiredField(field) {

    // Remove the unnecessary blanks at the front and back
    field.value = field.value.trim();

    // check to see if it's valid
    var valid = field.value.length > 0;

    // Valid like salad!
    if (valid) {
        field.className = 'form-control';
    } else {
        field.className = 'form-control invalid-field';
    }

    return valid;
}

//// Check their age
function calculateAge(form) { 
	
	var dob = form.elements['birthdate'].value;

    if (!dob) { 
		form.elements['birthdate'].style.borderColor = '#FF0000';
		return;
   } 

    return moment().diff(dob, 'years');
} 


//Don't start processing until the DOM is loaded
document.addEventListener('DOMContentLoaded', onReady);

