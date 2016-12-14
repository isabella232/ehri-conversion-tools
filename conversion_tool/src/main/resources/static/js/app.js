$(document).ready(function() {

    //GLOBAL VARS
    var submit_buttons = $('.submit');
    var loader = $('.loader');
    var loader_img = $('.loader_img');

    // dorpdowns   
    var organization_select = $('#organization');
    var file_type_select = $('#file_type');
    var transformation_type_select = $('#transformation_type');
    var mapping_type_select = $('#mapping_type');

    // file selects
    var specific_mapping_input_google = $('#specific_mapping_google');
    var xsdsource_input = $('#xsdsource');
    var specific_mapping_input = $('#specific_mapping');
    var incomesource_input = $('#incomesource');
    var outcomesource_input = $('#outcomesource')

    //buttons
    var mapping_location_btn_google = $('#mapping_location_btn_google');
    var xsd_location_btn = $('#xsd_location_btn');
    var mapping_location_btn = $('#mapping_location_btn');
    var income_location_btn = $('#income_location_btn');
    var outcome_location_btn = $('#outcome_location_btn');

    // Common functions
    function disableSubmit() {
        $(submit_buttons).prop('disabled', true);
    }

    function enableSubmit() {
        $(submit_buttons).prop('disabled', false);
    }

    function showLoader() {
        // calculating the height of the main element and setting the loader same size
        var main_height = $('#main-inner').innerHeight();
        var img_margin = (main_height / 2) - 50;
        $(loader).css({
            'height': main_height + 'px'
        });
        // centering the loader gif
        $(loader_img).css({
            'margin-top': img_margin + 'px'
        });
        $(loader).show();
    }

    function hideLoader() {
        $(loader).hide();
    }

    // disable submit on page load
    disableSubmit();

    function sendDataRest(){          
        $.get( "http://localhost:8080/rest/process?organisation=ontotext&fileType=xml&inputDir=/home/georgi/Downloads/test-conversion-input/&outputDir=/home/georgi/Downloads/test-conversion-output/", function( data ) {
          alert( "Data Loaded: " + data );
        });
    }

    // Check if organization is selected on change
    // Enable submit button
    $(organization_select).on('change', function() {
        var value_organization = this.value;
        if (value_organization != '') {
            enableSubmit();
        }
        
    });

    $('#submit_step1').click(function() {
        $('#step1').slideUp(300);
        $('#step2').slideDown(300);
        $('.active').removeClass('active');
        $('#label_step_2').addClass('active');
        disableSubmit();
    });

    // Check if file type is selected on change
    // Enable submit button
    $(file_type_select).on('change', function() {
        var value_file_type = this.value;
        if (value_file_type != '') {
            enableSubmit();
        }
    });

    $('#submit_step2').click(function() {
        $('#step2').slideUp(300)
        if ($('#file_type').val() === 'xml_ead') {
            $('#step2_1').slideDown(300);
            disableSubmit();
        } else {;
            $('#step3').slideDown(300);
            $('.active').removeClass('active');
            $('#label_step_3').addClass('active');
            disableSubmit();
        }
        disableSubmit();
    });

    $('#previous_step2').click(function() {
        $('.active').removeClass('active');
        $('#label_step_1').addClass('active');
        $('#step1').slideDown(300);
        $('#step2').slideUp(100);
        disableSubmit();
    });


    // Check if file type is selected on change
    // Enable submit button
    $(transformation_type_select).on('change', function() {
        var value_transformation_type_select = this.value;
        if (value_transformation_type_select != '') {
            enableSubmit();
        }
    });

    $('#submit_step2_1').click(function() {
        $('#step2_1').slideUp(300)
        if ($('#transformation_type').val() === 'ead_2') {
            $('#step5').slideDown(300);
            $('.active').removeClass('active');
            $('#label_step_5').addClass('active');
        } else if ($('#transformation_type').val() === 'mapping') {
            $('#step3').slideDown(300);
            $('.active').removeClass('active');
            $('#label_step_3').addClass('active');
        }
        disableSubmit();
    });

    $('#previous_step2_1').click(function() {
        $('.active').removeClass('active');
        $('#label_step_1').addClass('active');
        $('#step1').slideDown(300);
        $('#step2_1').slideUp(100);
        disableSubmit();
    });


    $(mapping_type_select).on('change', function() {
        var value_mapping_type_select = this.value;
        if (value_mapping_type_select != '') {
            enableSubmit();
        }
    });

    $('#submit_step3').click(function() {
        if ($('#mapping_type').val() === 'generic') {
            //add links from file that we will read if online
            if (navigator.onLine) {
                $('#step3').slideUp(300);
                $('#step4').slideDown(300);
            } else {
                $('#step3').slideUp(300);
                $('#step4').slideDown(300);
                $('#view_google').hide();
                $('#iframe_holder').hide();
            }
        } else if ($('#mapping_type').val() === 'specific') {
            $('#step3').slideUp(300);
            $('#step4_1').slideDown(300);
        }
        $('.active').removeClass('active');
        $('#label_step_4').addClass('active');
        event.preventDefault();
    });

    $('#previous_step3').click(function() {
        $('.active').removeClass('active');
        $('#label_step_2').addClass('active');
        $('#step2').slideDown(300);
        $('#step3').slideUp(100);
        disableSubmit();
    });

    // simulate click on input type file
    $(mapping_location_btn_google).click(function() {
        $(specific_mapping_input_google).click();
        $('#iframe_holder').slideUp(300);
        $('#view_google').slideUp(300);
    });

    $(specific_mapping_input_google).click(function() {
        $('#iframe_holder').slideUp(300);
        $('#view_google').slideUp(300);
    })

    $(specific_mapping_input_google).on('change', function() {
        var value_specifi_mapping_input_google = this.value;
        if (value_specifi_mapping_input_google != '') {
            enableSubmit();
        }
    });

    $('#submit_step4').click(function() {
        $('#step4').slideUp(300);
        $('#step5').slideDown(300);
        $('.active').removeClass('active');
        $('#label_step_5').addClass('active');
        disableSubmit();
    });

    $('#previous_step4').click(function() {
        $('.active').removeClass('active');
        $('#label_step_3').addClass('active');
        $('#step3').slideDown(300);
        $('#step4').slideUp(100);
        disableSubmit();
    });

    // simulate click on hidden input type file
    $(xsd_location_btn).click(function() {
        $(xsdsource_input).click();
    });

    $(xsdsource_input).on('change', function() {
        var value_specific_mapping_input = $(specific_mapping_input).val();
        var value_xsdsource_input = this.value;
        if (value_xsdsource_input != '' && value_specific_mapping_input != '') {
            enableSubmit();
        }
    });

    $(mapping_location_btn).click(function() {
        $(specific_mapping_input).click();
    });

    $(specific_mapping_input).on('change', function() {
        var value_specific_mapping_input = this.value;
        var value_xsdsource_input = $(xsdsource_input).val();
        if (value_xsdsource_input != '' && value_specific_mapping_input != '') {
            enableSubmit();
        }
    });

    $('#submit_step4_1').click(function() {
        $('#step4_1').slideUp(300);
        $('#step5').slideDown(300);
        $('.active').removeClass('active');
        $('#label_step_5').addClass('active');
        disableSubmit();
    });

    $('#previous_step4').click(function() {
        $('.active').removeClass('active');
        $('#label_step_3').addClass('active');
        $('#step3').slideDown(300);
        $('#step4_1').slideUp(100);
        disableSubmit();
    });

    //here
    // simulate click on hidden input type file
    $(income_location_btn).click(function() {
        $(incomesource_input).click();
    });

    $(incomesource_input).on('change', function() {
        var value_outcomesource_input = $(outcomesource_input).val();
        var value_incomesource_input = this.value;
        if (value_outcomesource_input != '' && value_incomesource_input != '') {
            enableSubmit();
        }
    });

    // simulate click on hidden input type file
    $(outcome_location_btn).click(function() {
        $(outcomesource_input).click();
    });

    $(outcomesource_input).on('change', function() {
        var value_outcomesource_input = this.value;
        var value_incomesource_input = $(incomesource_input).val();
        if (value_outcomesource_input != '' && value_incomesource_input != '') {
            enableSubmit();
        }
    });

    $('#submit_step5').click(function() {
        showLoader();
        setTimeout(function() {
            $('#step5').slideUp(300);
            $('#step6').slideDown(300);
            $('.active').removeClass('active');
            $('#label_step_6').addClass('active');
            hideLoader();
        }, 3000);

        var organization_select_to_file = organization_select.val();
        var file_type_select_to_file = file_type_select.val();
        var transformation_type_select_to_file = transformation_type_select.val();
        var mapping_type_select_to_file = mapping_type_select.val();
        var specific_mapping_input_google_to_file = specific_mapping_input_google.val();
        var xsdsource_input_to_file = xsdsource_input.val();
        var specific_mapping_input_to_file = specific_mapping_input.val();
        var incomesource_input_to_file = incomesource_input.val();
        var outcomesource_input_to_file = outcomesource_input.val();
        var googledocsurl = $('#googledocsurl');
        var googledocsurl_val = googledocsurl.val();
        console.log(googledocsurl_val);

        /*
        create check so that we know if we will make
        1. EAD1-to-EAD2002 conversion: http://localhost:8080/rest/process?organisation=ontotext&fileType=xml&inputDir=/home/georgi/Downloads/test-conversion-input/&outputDir=/home/georgi/Downloads/test-conversion-output/
        2. generic transform using Google Sheet mapping: http://localhost:8080/rest/process?organisation=ontotext&fileType=xml&mapping=1H8bgPSWTvvfICZ6znvFpf4iDCib39KZ0jfgTYHmv5e0&mappingRange=A1:D&inputDir=/home/georgi/Downloads/test-input/&outputDir=/home/georgi/Downloads/test-output/
        3. generic transform using local Excel mapping: http://localhost:8080/rest/process?organisation=ontotext&fileType=xml&mapping=/home/georgi/Downloads/0-TEST-mapping-DO-NOT-MODIFY.xlsx&inputDir=/home/georgi/Downloads/test-input/&outputDir=/home/georgi/Downloads/test-output/
        4. custom transform using Google Sheet mapping: http://localhost:8080/rest/process?organisation=ontotext&fileType=xml&xquery=/home/georgi/Downloads/test.xqy&inputDir=/home/georgi/Downloads/test-input/&outputDir=/home/georgi/Downloads/test-output/
        */
        //1. EAD1-to-EAD2002
        if ($(file_type_select).val() === 'xml_ead'){
            var urlToBeSend = 'http://localhost:8080/rest/process?organisation='+organization_select_to_file+'&fileType='+file_type_select_to_file+'&inputDir=/home/georgi/Downloads/test-conversion-input/&outputDir=/home/georgi/Downloads/test-conversion-output/';
        }
        //3. generic transform using local
        //2. generic transform using Google Sheet mapping:
        if ($(mapping_type_select).val() === 'generic' && specific_mapping_input_google_to_file != '') {
            console.log('if');
            var urlToBeSend = 'http://localhost:8080/rest/process?organisation='+organization_select_to_file+'&fileType='+file_type_select_to_file+'&mapping='+specific_mapping_input_google_to_file+'&inputDir=/home/georgi/Downloads/test-input/&outputDir=/home/georgi/Downloads/test-output/';
        } else if ($(mapping_type_select).val() === 'generic' && specific_mapping_input_google_to_file === ''){
            console.log('else if');
            var urlToBeSend = 'http://localhost:8080/rest/process?organisation='+organization_select_to_file+'&fileType='+file_type_select_to_file+'&mapping='+googledocsurl_val+'&mappingRange=A1:D&&inputDir=/home/georgi/Downloads/test-input/&outputDir=/home/georgi/Downloads/test-output/';
        }
        //4 custom transform using Google Sheet mapping
        if ($(mapping_type_select).val() === 'specific') {
            var urlToBeSend = 'http://localhost:8080/rest/process?organisation='+organization_select_to_file+'&fileType='+file_type_select_to_file+'&mapping='+specific_mapping_input_google_to_file+'&inputDir=/home/georgi/Downloads/test-input/&outputDir=/home/georgi/Downloads/test-output/';
        }
        console.log(urlToBeSend);
        $.get( urlToBeSend, function( data ) {
          alert( data );
        });

    });

    $('#previous_step5').click(function() {
        $('.active').removeClass('active');
        $('#label_step_4').addClass('active');
        $('#step4').slideDown(300);
        $('#step5').slideUp(100);
        disableSubmit();
    });

    // transform step 6 to last step
    $('#submit_step6').click(function() {
        $('#step6').slideUp(300);
        $('#step7').slideDown(300);
        $('.active').removeClass('active');
        $('#label_step_7').addClass('active');
        return false;
    });

    $('#start_new').click(function() {
        $('#step7').slideUp(300);
        $('#step2').slideDown(300);
        $('.active').removeClass('active');
        $('#label_step_2').addClass('active');
        $(incomesource_input).val('');
        $(outcomesource_input).val('');
        $(xsdsource_input).val('');
        $(specific_mapping_input).val('');
        $(specific_mapping_input_google).val('');
        return false;
    });

    $('#repeat').click(function() {
        $('#step7').slideUp(300);
        $('#step5').slideDown(300);
        $('.active').removeClass('active');
        $('#label_step_5').addClass('active');
        $(incomesource_input).val('');
        $(outcomesource_input).val('');
        return false;
    });

    //creating file with values
    /*
    document.getElementById('submit_step5').onclick = function() {
        var organization_select_to_file = organization_select.val();
        var file_type_select_to_file = file_type_select.val();
        var transformation_type_select_to_file = transformation_type_select.val();
        var mapping_type_select_to_file = mapping_type_select.val();
        var specific_mapping_input_google_to_file = specific_mapping_input_google.val();
        var xsdsource_input_to_file = xsdsource_input.val();
        var specific_mapping_input_to_file = specific_mapping_input.val();
        var incomesource_input_to_file = incomesource_input.val();
        var outcomesource_input_to_file = outcomesource_input.val();
        this.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(
            "selectedOrganization " + organization_select_to_file + " \r\n" +
            "fileType " + file_type_select_to_file + " \r\n" +
            "transformationType " + transformation_type_select_to_file + " \r\n" +
            "mappingTypeGeneric " + mapping_type_select_to_file + " \r\n" +
            "specificMapping " + specific_mapping_input_google_to_file + " \r\n" +
            "xsdSource " + xsdsource_input_to_file + " \r\n" +
            "localMapping " + specific_mapping_input_to_file + " \r\n" +
            "incomeSource " + incomesource_input_to_file + " \r\n" +
            "outcomeSource " + outcomesource_input_to_file + " \r\n"
        );
    };
    */

    $('#incomesource').attr('webkitdirectory', '');
    $('#outcomesource').attr('webkitdirectory', '');

    $('#label_step_1').click(function() {
        $('.active').removeClass('active');
        $('#step1').slideDown(300);
        $(this).addClass('active');
        $('#step2, #step3, #step4, #step5, #step6').slideUp(100);
    });

    $('#label_step_2').click(function() {
        $('.active').removeClass('active');
        $(this).addClass('active');
        $('#step2').slideDown(300);
        $('#step1, #step3, #step4, #step5, #step6').slideUp(100);
    });

    $('#label_step_3').click(function() {
        $('.active').removeClass('active');
        $(this).addClass('active');
        $('#step3').slideDown(300);
        $('#step1, #step2, #step4, #step5, #step6').slideUp(100);
    });

    $('#label_step_4').click(function() {
        $('.active').removeClass('active');
        $(this).addClass('active');
        $('#step4').slideDown(300);
        $('#step1, #step2, #step3, #step5, #step6').slideUp(100);
    });

    $('#label_step_5').click(function() {
        $('.active').removeClass('active');
        $(this).addClass('active');
        $('#step5').slideDown(300);
        $('#step1, #step2, #step3, #step4, #step6').slideUp(100);
    });

    $('#label_step_6').click(function() {
        $('.active').removeClass('active');
        $(this).addClass('active');
        $('#step6').slideDown(300);
        $('#step1, #step2, #step3, #step4, #step5').slideUp(100);
    });
});