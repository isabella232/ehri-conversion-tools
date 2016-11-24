$(document).ready(function(){
	function disableSubmit (){
		$("#submit_transform").prop('disabled', true);
	}
	function enableSubmit (){
		$("#submit_transform").prop('disabled', false);
	}
	function showLoader (){
		// calculating the height of the main element and setting the loader same size
		var height = $('#main-inner').innerHeight();
		var img_margin = (height / 2) - 50;
		$(".loader").css({
			'height': height + "px"
		});
		$(".loader_img").css({
			'margin-top': img_margin + "px"
		});
		$(".loader").show();
	}
	function checkFiles (){
		var value_income = $("#incomesource").val();
		var value_outcome = $("#outcomesource").val();
		if(value_income != "" && value_outcome != ""){
			enableSubmit();
		}
	}
	// radio buttons actions
	// if google show inputs for adding link
	$( "#google" ).click(function() {
		$('.google, #submit_transform').slideDown(300);
		$('.local').slideUp(300);
		disableSubmit();
	});
	// if local show inputs for loading local file
	$( "#local" ).click(function() {
		$('.google').slideUp(300);
		$('.local , #submit_transform').slideDown(300);
		disableSubmit();
	});
	$("#spreadsheet_link").change(function() {
		//checking if link is entered
		var spreadsheet_link = $('#spreadsheet_link').val();
		// if input is not empty enable submit button
		if (spreadsheet_link != ''){
			enableSubmit();
		}
	});
	// submit function
	$('#submit_transform').click(function() {
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
			if($('#google').is(':checked')) {
				// get link for the spreadsheet entered by the user
				var spreadsheet_link = $('#spreadsheet_link').val();
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
	$('#income_location_btn').click(function(){
    	$("#incomesource").click();
	});
	// on change listener for showing the selected file and checking if submit button should be enabled
	$("#incomesource").change(function() {
		//gettign the address of the file
		var value_income = $("#incomesource").val();
		// showing the address to the user
		document.getElementById("fakeincomesource").value = value_income;
		// check for enable/disable button
		checkFiles();
	});
	// simulate click on hidden input type file
	$('#outcome_location_btn').click(function(){
    	$("#outcomesource").click();
	});
	// on change listener for showing the selected file and checking if submit button should be enabled
	$("#outcomesource").change(function() {
		//gettign the address of the file
		var value_outcome = $("#outcomesource").val();
		// showing the address to the user
		document.getElementById("fakeoutcomesource").value = value_outcome;
		// check for enable/disable button
		checkFiles();
	});
});