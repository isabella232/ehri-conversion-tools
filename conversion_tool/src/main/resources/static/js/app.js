
$(document).ready(function() {
    //GLOBAL VARS
    var submit_buttons  = $('.submit');
    var loader          = $('.loader');
    var loader_img      = $('.loader_img');

    // dorpdowns
    var organization_select         = $('#organization');
    var file_type_select            = $('#file_type');
    var transformation_type_select  = $('#transformation_type');
    var mapping_type_select         = $('#mapping_type');

    //buttons
    var mapping_location_btn_google = $('#mapping_location_btn_google');

    // REST urls
    var get_organizations_url   = 'http://localhost:8080/rest/list-organisations';
    var mapping_files_url       = 'http://localhost:8080/rest/list-mapping-dir-contents';
    var output_dir_content_url  = 'http://localhost:8080/rest/list-output-dir-contents';
    var input_dir_content_url   = 'http://localhost:8080/rest/list-input-dir-contents';
    var xquery_files_url        = 'http://localhost:8080/rest/list-xquery-dir-contents';


    // COMMON FUNCTIONS
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

    // listing the content of input folder
    function inputFolderListingContent() {
        $.get(input_dir_content_url, function(data) {
            var input_dir_content = data;
            // if folder is not empty list all items in it
            $.each(input_dir_content.split("|"), function(index, item) {
                $('#income_folder').append('<tr><td>' + item + '</td></tr>');
            });
        });
    };

    // listing the content of output folder
    function outputFolderListingContent() {
        $.get(output_dir_content_url, function(data) {
            var output_dir_content = data;
            // if folder is not empty list all items in it
            $.each(output_dir_content.split("|"), function(index, item) {
                $('#outcome_folder').append('<tr><td>' + item + '</td></tr>');
            });
        });
    };

    // Delete rows from table
    function emptyIncomeOutcomeTables() {
        $('#income_folder').empty();
        $('#outcome_folder').empty();
    }

    // Delete rows from table
    function removeResults() {
        $('#for_transformation_files').empty();
        $('#transformed_files').empty();
    }

    // Steps hide steps, Remove Active class and disable submit
    function inactiveState(){
        $('.active').removeClass('active');
        $('.step').slideUp(100);
        disableSubmit();
    }

    //starting transformation
    function startTransformation() {

        //getting all the values of inputs
        var organizationVal                 = $('#organization').val()
        var fileTypeVal                     = $('#file_type').val();
        var transformationTypeVal           = $('#transformation_type').val();
        var mappingTypeVal                  = $('#mapping_type').val();
        var googleLinkVal                   = $('#google_link').val();
        var specificMappingGoogleStepVal    = $('#specific_mapping_google_step').val();
        var specificTransxqueryVal          = $('#specific_trans_xquery').val();
        //var specificTransMapping            = $('#specific_trans_mapping').val();
        var urlToBeSend;

        //          1. EAD1-to-EAD2002

        if ($('#file_type').val() === 'xml_ead') {

            urlToBeSend = 'http://localhost:8080/rest/process';
            //alert('here');
            $.get(urlToBeSend, function(data) {
                var errorsList = data;
                var errors = 0;
                console.log(errorsList)
                $.each(errorsList.split("|"), function(index, item) {
                    var values = item.split('=');
                    var file_name = values[0];
                    var errors_count = values[1];
                    $('#errors_table').append('<tr><td>'+file_name+'</td><td>'+errors_count+'</td></tr>');
                    errors++
                });
                $('#transformed_files').append(errors);
                $('#step5').slideUp(300);
                $('#step6').slideDown(300);
                $('.active').removeClass('active');
                $('#label_step_6').addClass('active');
                hideLoader();
            });
        } else {
            // IF       3. generic transform using local
            // ELSE IF  2. generic transform using Google Sheet mapping:

            if ($('#mapping_type').val() === 'generic' && specificMappingGoogleStepVal != '') {
                urlToBeSend = 'http://localhost:8080/rest/process?mapping='+ specificMappingGoogleStepVal;
                $.get(urlToBeSend, function(data) {
                    var errorsList = data;
                    var errors = 0;
                    console.log(errorsList)
                    $.each(errorsList.split("|"), function(index, item) {
                        var values = item.split('=');
                        var file_name = values[0];
                        var errors_count = values[1];
                        $('#errors_table').append('<tr><td>'+file_name+'</td><td>'+errors_count+'</td></tr>');
                        errors++
                    });
                    $('#transformed_files').append(errors);
                    $('#step5').slideUp(300);
                    $('#step6').slideDown(300);
                    $('.active').removeClass('active');
                    $('#label_step_6').addClass('active');
                    hideLoader();
                });
            } else if ($('#mapping_type').val() === 'generic' && specificMappingGoogleStepVal === '') {
                urlToBeSend = 'http://localhost:8080/rest/process?organisation='+ organizationVal;
                $.get(urlToBeSend, function(data) {
                    var errorsList = data;
                    var errors = 0;
                    console.log(errorsList)
                    $.each(errorsList.split("|"), function(index, item) {
                        var values = item.split('=');
                        var file_name = values[0];
                        var errors_count = values[1];
                        $('#errors_table').append('<tr><td>'+file_name+'</td><td>'+errors_count+'</td></tr>');
                        errors++
                    });
                    $('#transformed_files').append(errors);
                    $('#step5').slideUp(300);
                    $('#step6').slideDown(300);
                    $('.active').removeClass('active');
                    $('#label_step_6').addClass('active');
                    hideLoader();
                });
            } else if ($('#mapping_type').val() === 'specific') {
                urlToBeSend = 'http://localhost:8080/rest/process?xquery='+ specificTransxqueryVal;
                $.get(urlToBeSend, function(data) {
                    var errorsList = data;
                    var errors = 0;
                    console.log(errorsList)
                    $.each(errorsList.split("|"), function(index, item) {
                        var values = item.split('=');
                        var file_name = values[0];
                        var errors_count = values[1];
                        $('#errors_table').append('<tr><td>'+file_name+'</td><td>'+errors_count+'</td></tr>');
                        errors++
                    });
                    $('#transformed_files').append(errors);

                    $('#step5').slideUp(300);
                    $('#step6').slideDown(300);
                    $('.active').removeClass('active');
                    $('#label_step_6').addClass('active');
                    hideLoader();
                });
            }
        }
    }

    function getAllOrganizations(){
        if (navigator.onLine) {
            $.get(get_organizations_url, function(data) {
                var organizationsList = data;
                $.each(organizationsList.split("|"), function(index, item) {
                    $(organization_select).append('<option value="'+item+'">'+item+'</option>');
                });
                $(organization_select).append('<option value="no_organization">Other</option>');
            });
        } else {
            $(organization_select).append('<option value="no_organization">Other</option>');
        }
    }

    // VALIDATION IF VALUE IS SELECTED

    // Check if organization is selected on change
    // Enable submit button
    $(organization_select).on('change', function() {
        var value_organization = this.value;
        if (value_organization != '') {
            enableSubmit();
        }
    });

    // Check if file type is selected on change
    // Enable submit button
    $(file_type_select).on('change', function() {
        var value_file_type = this.value;
        if (value_file_type != '') {
            enableSubmit();
        }
    });

    // Check if file type is selected on change
    // Enable submit button
    $(transformation_type_select).on('change', function() {
        var value_transformation_type_select = this.value;
        if (value_transformation_type_select != '') {
            enableSubmit();
        }
    });


    // Checking if mapping type is selected
    // if selected enable submit button
    $(mapping_type_select).on('change', function() {
        var value_mapping_type_select = this.value;
        if (value_mapping_type_select != '') {
            enableSubmit();
        }
    });

    // on local mapping select hide iframe and google button
    $('#specific_mapping_google_step').on('change', function() {
        var specificMappingVal = $('#specific_mapping_google_step').val();
        if (specificMappingVal != '') {
            $('#view_google').slideUp(300);
            $('#iframe_holder').slideUp(300);
        } else {
            $('#view_google').slideDown(300);
            $('#iframe_holder').slideDown(300);
        }
    });

    //MAIN LOGIC

    //on laod load all organizations
    getAllOrganizations();

    // disable submit on page load
    disableSubmit();

    // previous step
    $(".previous_step").click(function(event) {
        var previous_button = event.target.id;
        if (previous_button === 'previous_step2') {
            inactiveState();
            $('#label_step_1').addClass('active');
            $('#step1').slideDown(300);
        } else if (previous_button === 'previous_step2_1') {
            inactiveState();
            $('#label_step_1').addClass('active');
            $('#step1').slideDown(300);
        } else if (previous_button === 'previous_step3') {
            inactiveState();
            $('#label_step_2').addClass('active');
            $('#step2').slideDown(300);
        } else if (previous_button === 'previous_step4') {
            inactiveState();
            $('#label_step_3').addClass('active');
            $('#step3').slideDown(300);
        } else if (previous_button === 'previous_step4_1') {
            inactiveState();
            $('#label_step_3').addClass('active');
            $('#step3').slideDown(300);
        } else if (previous_button === 'previous_step5') {
            inactiveState();
            $('#label_step_4').addClass('active');
            $('#step4').slideDown(300);
        }
    });

    // Submitting steps of form
    $(".submit_step").click(function(event) {
        var submit_button = event.target.id;
        if (submit_button === 'submit_step1') {
            $('#step1').slideUp(300);
            $('#step2').slideDown(300);
            $('.active').removeClass('active');
            $('#label_step_2').addClass('active');
            $('#organization_name').empty()
            var selectedOrganization = $('#organization').val();
            var organizationDisplay = 'Organization: ' + selectedOrganization;
            $('#organization_name').append(organizationDisplay);
            disableSubmit();
        } else if (submit_button === 'submit_step2') {
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
        } else if (submit_button === 'submit_step2_1') {
            $('#step2_1').slideUp(300)
            if ($('#transformation_type').val() === 'ead_2') {
                $('#step5').slideDown(300);
                $('.active').removeClass('active');
                $('#label_step_5').addClass('active');
                inputFolderListingContent();
                outputFolderListingContent();
            } else if ($('#transformation_type').val() === 'mapping') {
                $('#step3').slideDown(300);
                $('.active').removeClass('active');
                $('#label_step_3').addClass('active');
            }
            disableSubmit();
        } else if (submit_button === 'submit_step3') {
            // IF      -> Generic transformation
            // ELSE IF -> Specific transforamtion
            if ($('#mapping_type').val() === 'generic') {
                //add links from file that we will read if online
                if (navigator.onLine) {
                    if ($('#organization').val() != 'no_organization'){
                        var restUrlSheetUrl = 'http://localhost:8080/rest/mapping-sheet-ID?organisation='+ $('#organization').val();
                        $.get(restUrlSheetUrl, function(data) {
                            var urlForIframeLink = 'https://docs.google.com/spreadsheets/d/'+data+'/edit?usp=sharing';
                            $('#view_google').attr('href', urlForIframeLink);
                            $('#google_link').val(urlForIframeLink);
                            $('#google_link').attr('value', urlForIframeLink);
                            $("#google-iframe").attr("src", urlForIframeLink);
                            $('#google-iframe').show();
                            $('#view_google').show();
                        });
                    } else {
                        $('#google-iframe').hide();
                        $('#view_google').hide();
                    }
                    $('#step3').slideUp(300);
                    $('#step4').slideDown(300);
                } else {
                    $('#step3').slideUp(300);
                    $('#step4').slideDown(300);
                    $('#view_google').hide();
                    $('#iframe_holder').hide();
                }
                //getting mapping files and appending them to select
                $.get(mapping_files_url, function(data) {
                    var mapping_files = data;
                    $.each(mapping_files.split("|"), function(index, item) {
                        $('#specific_mapping_google_step').append('<option value="' + item + '">' + item + '</option>');
                    });
                });
            } else if ($('#mapping_type').val() === 'specific') {
                $('#step3').slideUp(300);
                $('#step4_1').slideDown(300);
                //getting xquery files and appending them to select
                $.get(xquery_files_url, function(data) {
                    var xquery_files = data;

                    $.each(xquery_files.split("|"), function(index, item) {
                        $('#specific_trans_xquery').append('<option value="' + item + '">' + item + '</option>');
                    });
                });
                //getting mapping files and appending them to select
                /*
                $.get(mapping_files_url, function(data) {
                    var mapping_files = data;
                    $.each(mapping_files.split("|"), function(index, item) {
                        $('#specific_trans_mapping').append('<option value="' + item + '">' + item + '</option>');
                    });
                });
                */
            }
            $('.active').removeClass('active');
            $('#label_step_4').addClass('active');
            event.preventDefault();

        } else if (submit_button === 'submit_step4') {
            // on submit append content of input and output folders so that user can see them
            $('#step4').slideUp(300);
            $('#step5').slideDown(300);
            $('.active').removeClass('active');
            $('#label_step_5').addClass('active');
            inputFolderListingContent();
            outputFolderListingContent();
            disableSubmit();
        } else if (submit_button === 'submit_step4_1') {
            // on submit append content of input and output folders so that user can see them
            $('#step4_1').slideUp(300);
            $('#step5').slideDown(300);
            $('.active').removeClass('active');
            $('#label_step_5').addClass('active');
            disableSubmit();
            inputFolderListingContent();
            outputFolderListingContent();
        } else if (submit_button === 'submit_step5') {
            // start transformation, show loader, count files to be transformed and files transformed append to next step so that user can see them
            showLoader();
            startTransformation();
            // listing the content of input and output folder
            var input_files_count = 0;
            $.get(input_dir_content_url, function(data) {
                var input_dir_content = data;
                $.each(input_dir_content.split("|"), function(index, item) {
                    input_files_count++;
                });
                $('#for_transformation_files').append(input_files_count);
            });
            var output_files_count = 0;
            $.get(output_dir_content_url, function(data) {
                var output_dir_content = data;
                $.each(output_dir_content.split("|"), function(index, item) {
                    output_files_count++;
                });
                //$('#transformed_files').append(output_files_count);
            });
        } else if (submit_button === 'start_new') {
            $('#step6').slideUp(300);
            $('#step2').slideDown(300);
            $('.active').removeClass('active');
            $('#label_step_2').addClass('active');
            $('#file_type').val('');
            $('#transformation_type').val('');
            $('#mapping_type').val('');
            $('#iframe_holder').show();
            $('#specific_mapping_google_step').val('');
            $('#specific_trans_xquery').val('');
            //$('#specific_trans_mapping').val('');
            emptyIncomeOutcomeTables();
            removeResults();
            return false;
        } else if (submit_button === 'repeat') {
            $('#step6').slideUp(300);
            $('#step5').slideDown(300);
            $('.active').removeClass('active');
            $('#label_step_5').addClass('active');
            removeResults();
            return false;
        }
    });

    // steps navigation
    $(".step_label").click(function(event) {
        var step = event.target.id;
        if (step === 'label_step_1') {
            inactiveState();
            $('#step1').slideDown(300);
            $(this).addClass('active');
        } else if (step === 'label_step_2') {
            if ($('#organization').val() != '') {
                inactiveState();
                $(this).addClass('active');
                $('#step2').slideDown(300);
            } else {
                inactiveState();
                $('#step1').slideDown(300);
                $('#label_step_1').addClass('active');
            }
        } else if (step === 'label_step_3') {
            if ($('#file_type').val() != '' && $('#organization').val() != '') {
               inactiveState();
                $(this).addClass('active');
                $('#step3').slideDown(300);
            } else if ($('#organization').val() != '') {
                inactiveState();
                $('#step2').slideDown(300);
                $('#label_step_2').addClass('active');
            } else {
                inactiveState();
                $('#step1').slideDown(300);
                $('#label_step_1').addClass('active');
            }
        } else if (step === 'label_step_4') {
            if ($('#file_type').val() != '' && $('#organization').val() != '' && $('#mapping_type').val() != '') {
                inactiveState();
                $(this).addClass('active');
                $('#step4').slideDown(300);
            } else if ($('#organization').val() != '') {
                inactiveState();
                $('#step2').slideDown(300);
                $('#label_step_2').addClass('active');
            } else {
                inactiveState();
                $('#step1').slideDown(300);
                $('#label_step_1').addClass('active');
            }
        } else if (step === 'label_step_5') {
            if ($('#file_type').val() != '' && $('#organization').val() != '' && $('#mapping_type').val() != '') {
                inactiveState();
                $(this).addClass('active');
                $('#step5').slideDown(300);
            } else if ($('#organization').val() != '') {
                inactiveState();
                $('#step2').slideDown(300);
                $('#label_step_2').addClass('active');
            } else {
                inactiveState();
                $('#step1').slideDown(300);
                $('#label_step_1').addClass('active');
            }
        } else if (step === 'label_step_6') {
            if ($('#file_type').val() != '' && $('#organization').val() != '' && $('#mapping_type').val() != '') {
                inactiveState();
                $(this).addClass('active');
                $('#step6').slideDown(300);
            } else if ($('#organization').val() != '') {
                inactiveState();
                $('#step2').slideDown(300);
                $('#label_step_2').addClass('active');
            } else {
                inactiveState();
                $('#step1').slideDown(300);
                $('#label_step_1').addClass('active');
            }
        }
    });
});
