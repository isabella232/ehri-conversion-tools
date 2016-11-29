$(document).ready(function() {
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
    $('#submit_step7').click(function() {
        event.preventDefault();
        $('#step7').slideUp(300);
        $('#step1').slideDown(300);
        $( "#label_step_1" ).addClass( "active" );
        $( "#label_step_7" ).removeClass( "active" );
    });

});