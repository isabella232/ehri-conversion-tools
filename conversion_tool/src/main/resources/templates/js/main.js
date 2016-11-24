$(document).ready(function(){
	// radio buttons actions
	// if google show inputs for adding link
	// if local show inputs for loading local file
	$( "#google" ).click(function() {
		$('.google, #submit_transform').slideDown(300);
		$('.local').slideUp(300);
	});
	$( "#local" ).click(function() {
		$('.google').slideUp(300);
		$('.local , #submit_transform').slideDown(300);
	});
		// submit function
	$('#submit_transform').click(function() {
		// calculating the height of the main element and setting the loader same size
		var height = $('#main-inner').innerHeight();
		var img_margin = (height / 2) - 50;
		//alert (img_margin);
		$(".loader").css({
			'height': height + "px"
		});
		$(".loader_img").css({
			'margin-top': img_margin + "px"
		});
		$(".loader").show();
		// hiding the loader after 5s -> will be changed to hide when result apears
		// getting the link for the spreadsheet
		var spreadsheet_link = $('#spreadsheet_link').val();
		setTimeout(function() {
			$(".loader").hide();
			// hidding form elements
			$('.source, .google, .local, #submit_transform').hide();
			// showing success message
			$('.success_notes').slideToggle('fast');
			// checking if its from google or not
			// if from google create spreadsheet and load it in iframe
			if($('#google').is(':checked')) {
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

	$('#income_location_btn').click(function(){
    	$("#incomesource").click();
	});
	$("#incomesource").change(function() {
		var value_income = $("#incomesource").val();
		console.log($("#incomesource").val());
		document.getElementById("fakeincomesource").value = value_income;
	});
	$('#outcome_location_btn').click(function(){
    	$("#outcomesource").click();
	});
	$("#outcomesource").change(function() {
		var value_income = $("#outcomesource").val();
		console.log($("#outcomesource").val());
		document.getElementById("fakeoutcomesource").value = value_income;
	});
});