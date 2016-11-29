$(document).ready(function() {

    //1. GLOBAL VARS
    var loader                  = $('.loader');
    var loader_img              = $('.loader_img');
    var incomesource_input      = $('#incomesource');
    var fakeincomesource        = $('#fakeincomesource');
    var income_location_btn     = $('#income_location_btn');
    var outcomesource_input     = $('#outcomesource')
    var fakeoutcomesource       = $('#fakeoutcomesource');
    var outcome_location_btn    = $('#outcome_location_btn');

    $('#submit_step1').click(function() {
        event.preventDefault();
        $('#step1').slideUp(300);
        $('#step2').slideDown(300);
        $( "#label_step_2" ).addClass( "active" );
        $( "#label_step_1" ).removeClass( "active" );
    });
    $('#submit_step2').click(function() {
        event.preventDefault();
        $('#step2').slideUp(300);
        $('#step3').slideDown(300);
        $( "#label_step_3" ).addClass( "active" );
        $( "#label_step_2" ).removeClass( "active" );
    });
    $('#submit_step3').click(function() {
        event.preventDefault();
        $('#step3').slideUp(300);
        $('#step4').slideDown(300);
        $( "#label_step_4" ).addClass( "active" );
        $( "#label_step_3" ).removeClass( "active" );
    });

    $('#submit_step4').click(function() {
        event.preventDefault();
        $('#step4').slideUp(300);
        $('#step5').slideDown(300);
        $( "#label_step_5" ).addClass( "active" );
        $( "#label_step_4" ).removeClass( "active" );
    });
    $('#submit_step5').click(function() {
        event.preventDefault();
        $('#step5').slideUp(300);
        $('#step6').slideDown(300);
        $( "#label_step_6" ).addClass( "active" );
        $( "#label_step_5" ).removeClass( "active" );
    });
    $('#submit_step6').click(function() {
        event.preventDefault();
        $('#step6').slideUp(300);
        $('#step7').slideDown(300);
        $( "#label_step_7" ).addClass( "active" );
        $( "#label_step_6" ).removeClass( "active" );
    });
    $('#start_new').click(function() {
        event.preventDefault();
        $('#step7').slideUp(300);
        $('#step1').slideDown(300);
        $( "#label_step_1" ).addClass( "active" );
        $( "#label_step_7" ).removeClass( "active" );
        $(incomesource_input).val('');
        $(fakeincomesource).val('');
        $(outcomesource_input).val('');
        $(fakeoutcomesource).val('');
    });
    $('#repeat').click(function() {
        event.preventDefault();
        $('#step7').slideUp(300);
        $('#step5').slideDown(300);
        $( "#label_step_5" ).addClass( "active" );
        $( "#label_step_7" ).removeClass( "active" );
        $(incomesource_input).val('');
        $(fakeincomesource).val('');
        $(outcomesource_input).val('');
        $(fakeoutcomesource).val('');
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
        $(fakeincomesource).val(value_income);
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
        $(fakeoutcomesource).val(value_outcome);
        // check for enable/disable button
        checkFiles();
    });
});