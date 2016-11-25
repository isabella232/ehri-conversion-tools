$(document).ready(function() {
	/* TODO
	optimize the code since its becomming messy -> JS
	rethink form CSS

	/* 
	** STRUCTURE
	** 1. GLOBAL VARS
	** 2. MAIN FUNCTIONS
	** 3. EVENT HANDLERS
	*/

	//1. GLOBAL VARS
    var submit_button = $('#submit_transform');
    var loader = $('.loader');
    var loader_img = $('.loader_img');
    var incomesource_input = $('#incomesource');
    var income_location_btn = $('#income_location_btn');
    var outcomesource_input = $('#outcomesource')
    var outcome_location_btn = $('#outcome_location_btn');
    var spreadsheet_link_input = $('#spreadsheet_link');
    var checked = 0;
    // /1.GLOBAL VARS

    //2. MAIN FUNCTIONS
    function disableSubmit() {
        $(submit_button).prop('disabled', true);
    }

    function enableSubmit() {
        $(submit_button).prop('disabled', false);
    }

    function showLoader() {
        // calculating the height of the main element and setting the loader same size
        var main_height = $('#main-inner').innerHeight();
        var img_margin = (main_height / 2) - 50;
        $(loader).css({
            'height': main_height + "px"
        });
        // centering the loader gif
        $(loader_img).css({
            'margin-top': img_margin + "px"
        });
        $(loader).show();
    }

    function checkFiles() {
        var value_income = $(incomesource_input).val();
        var value_outcome = $(outcomesource_input).val();
        var spreadsheet_link = $(spreadsheet_link_input).val();
        if (value_income != "" && value_outcome != "") {
        	// checking if there is google spreadsheets to be included
        	// if there isnt enable submit
        	if (checked === 0) {
            	enableSubmit();
        	} else if (checked === 1) {
        		// check if link is filled if yes then enable submit else keep it disabled
        		if (spreadsheet_link != '') {
        			enableSubmit();
        		}
        	}
        }
    }
    // /2. MAIN FUNCTIONS

    //3. EVENT HANDLERS

    // disable submit button on load
    disableSubmit();
    // checkbox actions
    // if google is checked show inputs for adding link
    
    $('#google').click(function() {
    	if ($('#google').prop('checked') == true) {
        	$('.google').slideDown(300);
        	checked = 1;
        	// reason for having disable here is that you can select files and then include google spreadsheet link
        	// because of this we have to disable the button till link is provided
        	disableSubmit();
    	} else {
			$('.google').slideUp(300);
			checked = 0;
    	}
    });

    $(spreadsheet_link_input).change(function() {
        //checking if link is entered
        var spreadsheet_link = $(spreadsheet_link_input).val();
        // if input is not empty enable submit button
        if (spreadsheet_link != '') {
        	checkFiles();
        }
    });

    // submit function
    $(submit_button).click(function() {
        // preventing default form submission
        event.preventDefault();
        //showing loader
        showLoader();
        // hiding the loader after 5s -> will be changed to hide when result apears
        setTimeout(function() {
            // hiding the loader and the form elements
            $('.source, .google, .local, #submit_transform, .loader').hide();
            // showing success message
            $('.success_notes').slideToggle('fast');
            // checking if its from google
            // if from google get the link of the spreadsheet and load it in iframe
            if ($('#google').is(':checked')) {
                // get link for the spreadsheet entered by the user
                var spreadsheet_link = $(spreadsheet_link_input).val();
                // Create an iframe element and append link from the input
                $('<iframe />', {
                    name: 'google-iframe',
                    id: 'google-iframe',
                    src: spreadsheet_link
                }).appendTo('#iframe_holder');
                // show the iframe
                $('#google-iframe').slideDown(300);
            }
        }, 3000);
    });


    // simulate click on hidden input type file
    $(income_location_btn).click(function() {
        $(incomesource_input).click();
    });

    // on change listener for showing the selected file and checking if submit button should be enabled
    $(incomesource_input).change(function() {
        //gettign the address of the file
        var value_income = $(incomesource_input).val();
        // showing the address to the user
        document.getElementById('fakeincomesource').value = value_income;
        // check for enable/disable button
        checkFiles();
    });

    // simulate click on hidden input type file
    $(outcome_location_btn).click(function() {
        $(outcomesource_input).click();
    });

    // on change listener for showing the selected file and checking if submit button should be enabled
    $(outcomesource_input).change(function() {
        //gettign the address of the file
        var value_outcome = $(outcomesource_input).val();
        // showing the address to the user
        document.getElementById('fakeoutcomesource').value = value_outcome;
        // check for enable/disable button
        checkFiles();
    });
    // /3. EVENT HANDLERS

});