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

    $('#previous_step2').click(function() {
        $( "#label_step_1" ).addClass( "active" );
        $( "#label_step_2" ).removeClass( "active" );
        $('#step1').slideDown(300);
        $('#step2').slideUp(100);
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
    $('#previous_step2_1').click(function() {
        $( "#label_step_1" ).addClass( "active" );
        $( "#label_step_2" ).removeClass( "active" );
        $('#step1').slideDown(300);
        $('#step2_1').slideUp(100);
        return false;
    });
    $('#submit_step3').click(function() {        
        if($('#mapping_type').val() === 'generic'){
            if (navigator.onLine) {
                $('#step3').slideUp(300);
                $('#step4').slideDown(300);
            } else {
                $('#step3').slideUp(300);
                $('#step4').slideDown(300);
                $('#view_google').hide();
                $('#iframe_holder').hide();
            }
        } else if ($('#mapping_type').val() === 'specific'){
            $('#step3').slideUp(300);
            $('#step4_1').slideDown(300);
        }
        $( "#label_step_4" ).addClass( "active" );
        $( "#label_step_3" ).removeClass( "active" );
        return false;
    });
    $('#previous_step3').click(function() {
        $( "#label_step_2" ).addClass( "active" );
        $( "#label_step_1" ).removeClass( "active" );
        $('#step2').slideDown(300);
        $('#step3').slideUp(100);
        return false;
    });

    $('#submit_step4').click(function() {
        $('#step4').slideUp(300);
        $('#step5').slideDown(300);
        $( "#label_step_5" ).addClass( "active" );
        $( "#label_step_4" ).removeClass( "active" );
        return false;
    });
    $('#previous_step4').click(function() {
        $( "#label_step_3" ).addClass( "active" );
        $( "#label_step_4" ).removeClass( "active" );
        $('#step3').slideDown(300);
        $('#step4').slideUp(100);
        return false;
    });

    $('#submit_step4_1').click(function() {
        $('#step4_1').slideUp(300);
        $('#step5').slideDown(300);
        $( "#label_step_5" ).addClass( "active" );
        $( "#label_step_4" ).removeClass( "active" );
        return false;
    });
    $('#previous_step4').click(function() {
        $( "#label_step_3" ).addClass( "active" );
        $( "#label_step_4" ).removeClass( "active" );
        $('#step3').slideDown(300);
        $('#step4_1').slideUp(100);
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
    $('#previous_step5').click(function() {
        $( "#label_step_4" ).addClass( "active" );
        $( "#label_step_5" ).removeClass( "active" );
        $('#step4').slideDown(300);
        $('#step5').slideUp(100);
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
        $(outcomesource_input).val('');
        $(xsdsource_input).val('');
        $(specific_mapping_input).val('');
        $(specific_mapping_input_google).val('');
        return false;
    });
    $('#repeat').click(function() {
        $('#step7').slideUp(300);
        $('#step5').slideDown(300);
        $( "#label_step_5" ).addClass( "active" );
        $( "#label_step_7" ).removeClass( "active" );
        $(incomesource_input).val('');
        $(outcomesource_input).val('');
        return false;
    });


    // simulate click on hidden input type file
    $(income_location_btn).click(function() {
        $(incomesource_input).click();
    });

    // simulate click on hidden input type file
    $(outcome_location_btn).click(function() {
        $(outcomesource_input).click();
    });

    // simulate click on hidden input type file
    $(xsd_location_btn).click(function() {
        $(xsdsource_input).click();
    });


    // simulate click on hidden input type file
    $(mapping_location_btn).click(function() {
        $(specific_mapping_input).click();
    });


    $(mapping_location_btn_google).click(function() {
        $(specific_mapping_input_google).click();
        $('#iframe_holder').slideUp(300);
        $('#view_google').slideUp(300);
    });


    $('#incomesource').attr('webkitdirectory', '');
    $('#outcomesource').attr('webkitdirectory', '');


    $('#label_step_1').click(function() {
        $('.active').removeClass('active');
        $('#step1').slideDown(300);
        $( "#label_step_1" ).addClass( "active" );
        $('#step2').slideUp(100);
        $('#step3').slideUp(100);
        $('#step4').slideUp(100);
        $('#step5').slideUp(100);
        $('#step6').slideUp(100);
        $('#step7').slideUp(100);
    });
    $('#label_step_2').click(function() {
        $('.active').removeClass('active');
        $( "#label_step_2" ).addClass( "active" );
        $('#step2').slideDown(300);
        $('#step1').slideUp(100);
        $('#step3').slideUp(100);
        $('#step4').slideUp(100);
        $('#step5').slideUp(100);
        $('#step6').slideUp(100);
        $('#step7').slideUp(100);
    });
    $('#label_step_3').click(function() {
        $('.active').removeClass('active');
        $( "#label_step_3" ).addClass( "active" );
        $('#step3').slideDown(300);
        $('#step1').slideUp(100);
        $('#step2').slideUp(100);
        $('#step4').slideUp(100);
        $('#step5').slideUp(100);
        $('#step6').slideUp(100);
        $('#step7').slideUp(100);
    });
    $('#label_step_4').click(function() {
        $('.active').removeClass('active');
        $( "#label_step_4" ).addClass( "active" );
        $('#step4').slideDown(300);
        $('#step1').slideUp(100);
        $('#step2').slideUp(100);
        $('#step3').slideUp(100);
        $('#step5').slideUp(100);
        $('#step6').slideUp(100);
        $('#step7').slideUp(100);
    });
    $('#label_step_5').click(function() {
        $('.active').removeClass('active');
        $( "#label_step_5" ).addClass( "active" );
        $('#step5').slideDown(300);
        $('#step1').slideUp(100);
        $('#step2').slideUp(100);
        $('#step3').slideUp(100);
        $('#step4').slideUp(100);
        $('#step6').slideUp(100);
        $('#step7').slideUp(100);
    });
    $('#label_step_6').click(function() {
        $('.active').removeClass('active');
        $( "#label_step_6" ).addClass( "active" );
        $('#step6').slideDown(300);
        $('#step1').slideUp(100);
        $('#step2').slideUp(100);
        $('#step3').slideUp(100);
        $('#step4').slideUp(100);
        $('#step5').slideUp(100);
        $('#step7').slideUp(100);
    });
    $('#label_step_7').click(function() {
        $('.active').removeClass('active');
        $( "#label_step_7" ).addClass( "active" );
        $('#step7').slideDown(300);
        $('#step1').slideUp(100);
        $('#step2').slideUp(100);
        $('#step3').slideUp(100);
        $('#step4').slideUp(100);
        $('#step5').slideUp(100);
        $('#step6').slideUp(100);
    });
});