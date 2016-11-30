$(document).ready(function() {

    //1. GLOBAL VARS
    var loader                          = $('.loader');
    var loader_img                      = $('.loader_img');
    var incomesource_input              = $('#incomesource');
    var fakeincomesource                = $('#fakeincomesource');
    var income_location_btn             = $('#income_location_btn');
    var outcomesource_input             = $('#outcomesource')
    var fakeoutcomesource               = $('#fakeoutcomesource');
    var outcome_location_btn            = $('#outcome_location_btn');
    var xsd_location_btn                = $('#xsd_location_btn');
    var fakexsdsource                   = $('#fakexsdsource');
    var xsdsource_input                 = $('#xsdsource');
    var mapping_location_btn            = $('#mapping_location_btn');
    var fakespecific_mapping            = $('#fakespecific_mapping');
    var specific_mapping_input          = $('#specific_mapping');
    var mapping_location_btn_google     = $('#mapping_location_btn_google');
    var fakespecific_mapping_google     = $('#fakespecific_mapping_google');
    var specific_mapping_input_google   = $('#specific_mapping_google');


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

    function hideLoader() {
        $(loader).hide();
    }

    $('#submit_step1').click(function() {

        $('#step1').slideUp(300);
        $('#step2').slideDown(300);
        $( "#label_step_2" ).addClass( "active" );
        $( "#label_step_1" ).removeClass( "active" );
        return false;
    });
    $('#submit_step2').click(function() {

        $('#step2').slideUp(300)
        if ($('#file_type').val() === 'xml_ead'){
            $('#step2_1').slideDown(300);
        } else {;
            $('#step3').slideDown(300);
            $( "#label_step_3" ).addClass( "active" );
            $( "#label_step_2" ).removeClass( "active" );
        }
        return false;
    });
    $('#submit_step2_1').click(function() {

        $('#step2_1').slideUp(300)
        if ($('#transformation_type').val() === 'ead_2'){
            $('#step5').slideDown(300);
            $( "#label_step_5" ).addClass( "active" );
            $( "#label_step_2" ).removeClass( "active" );
        } else if ($('#transformation_type').val() === 'mapping'){
            $('#step3').slideDown(300);
            $( "#label_step_3" ).addClass( "active" );
            $( "#label_step_2" ).removeClass( "active" );
        }
        return false;
    });
    $('#submit_step3').click(function() {        
        if($('#mapping_type').val() === 'generic'){
            $('#step3').slideUp(300);
            $('#step4').slideDown(300);
        } else if ($('#mapping_type').val() === 'specific'){
            $('#step3').slideUp(300);
            $('#step4_1').slideDown(300);
        }
        $( "#label_step_4" ).addClass( "active" );
        $( "#label_step_3" ).removeClass( "active" );
        return false;
    });

    $('#submit_step4').click(function() {
        $('#step4').slideUp(300);
        $('#step5').slideDown(300);
        $( "#label_step_5" ).addClass( "active" );
        $( "#label_step_4" ).removeClass( "active" );
        return false;
    });

    $('#submit_step4_1').click(function() {
        $('#step4_1').slideUp(300);
        $('#step5').slideDown(300);
        $( "#label_step_5" ).addClass( "active" );
        $( "#label_step_4" ).removeClass( "active" );
        return false;
    });

    $('#submit_step5').click(function() {
        showLoader();
        setTimeout(function() {
            $('#step5').slideUp(300);
            $('#step6').slideDown(300);
            $( "#label_step_6" ).addClass( "active" );
            $( "#label_step_5" ).removeClass( "active" );
            hideLoader();
        }, 3000);
        return false;
    });
    $('#submit_step6').click(function() {
        $('#step6').slideUp(300);
        $('#step7').slideDown(300);
        $( "#label_step_7" ).addClass( "active" );
        $( "#label_step_6" ).removeClass( "active" );
        return false;
    });
    $('#start_new').click(function() {
        $('#step7').slideUp(300);
        $('#step2').slideDown(300);
        $( "#label_step_2" ).addClass( "active" );
        $( "#label_step_7" ).removeClass( "active" );
        $(incomesource_input).val('');
        $(fakeincomesource).val('');
        $(outcomesource_input).val('');
        $(fakeoutcomesource).val('');
        $(fakexsdsource).val('');
        $(xsdsource_input).val('');
        $(fakespecific_mapping).val('');
        $(specific_mapping_input).val('');
        $(fakespecific_mapping_google).val('');
        $(specific_mapping_input_google).val('');
        return false;
    });
    $('#repeat').click(function() {
        $('#step7').slideUp(300);
        $('#step5').slideDown(300);
        $( "#label_step_5" ).addClass( "active" );
        $( "#label_step_7" ).removeClass( "active" );
        $(incomesource_input).val('');
        $(fakeincomesource).val('');
        $(outcomesource_input).val('');
        $(fakeoutcomesource).val('');
        return false;
    });


    // simulate click on hidden input type file
    $(income_location_btn).click(function() {
        $(incomesource_input).click();
    });

    // on change listener for showing the selected file and checking if submit button should be enabled
    $(incomesource_input).change(function() {
        //gettign the address of the file
        var URL = $(incomesource_input).val();
        var value_income = URL.substring(0, URL.lastIndexOf("\\") + 1)
        // showing the address to the user
        $(fakeincomesource).val(value_income);
    });

    // simulate click on hidden input type file
    $(outcome_location_btn).click(function() {
        $(outcomesource_input).click();
    });

    // on change listener for showing the selected file and checking if submit button should be enabled
    $(outcomesource_input).change(function() {
        //gettign the address of the file
        var URL = $(outcomesource_input).val();
        var value_outcome = URL.substring(0, URL.lastIndexOf("\\") + 1)
        // showing the address to the user
        $(fakeoutcomesource).val(value_outcome);
    });

    // simulate click on hidden input type file
    $(xsd_location_btn).click(function() {
        $(xsdsource_input).click();
    });

    // on change listener for showing the selected file and checking if submit button should be enabled
    $(xsdsource_input).change(function() {
        var URL = $(xsdsource_input).val();
        var value_xsd = URL.substring(0, URL.lastIndexOf("\\") + 1)
        // showing the address to the user
        $(fakexsdsource).val(value_xsd);
    });

    // simulate click on hidden input type file
    $(mapping_location_btn).click(function() {
        $(specific_mapping_input).click();
    });

    // on change listener for showing the selected file and checking if submit button should be enabled
    $(specific_mapping_input).change(function() {
        var URL = $(specific_mapping_input).val();
        var value_spmapping = URL.substring(0, URL.lastIndexOf("\\") + 1)
        // showing the address to the user
        $(fakespecific_mapping).val(value_spmapping);
    });

    $(mapping_location_btn_google).click(function() {
        $(specific_mapping_input_google).click();
        $('#iframe_holder').slideUp(300);
        $('#view_google').slideUp(300);
    });

    // on change listener for showing the selected file and checking if submit button should be enabled
    $(specific_mapping_input_google).change(function() {
        var URL = $(specific_mapping_input_google).val();
        var value_spmapping_google = URL.substring(0, URL.lastIndexOf("\\") + 1)
        // showing the address to the user
        $(fakespecific_mapping_google).val(value_spmapping_google);
    });

});