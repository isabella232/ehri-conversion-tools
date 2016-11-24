$(document).ready(function(){
		// radio buttons actions
 		$( "#google" ).click(function() {
				$('.google, #submit_transofrm').show();
				$('.local').hide();
		});
 		$( "#local" ).click(function() {
				$('.google').hide();
				$('.local, #submit_transofrm').show();
		});

		$('#submit_transofrm').click(function() {
				// calculating the height of the main element and setting the loader same size
				var height = $('#main-inner').height();
				var height_corrected = height + 60;
				var img_margin = (height / 2) - 50;
				//alert (img_margin);
				$(".loader").css({ 'height': height_corrected + "px" });
				$(".loader_img").css({'margin-top': img_margin + "px"});
				$(".loader").show();
				// hiding the loader after 5s -> will be changed to hide when result apears
				setTimeout(function() {
					$(".loader").hide();
					// hidding form elements
					$('.source, .google, .local, #submit_transofrm').hide();
					// showing success message
					$('.success_notes').show();
					// checking if its from google or not
					// if from google load the spreadshit in iframe
					if($('#google').is(':checked')) {
						$('#google-iframe').show();
					}
				}, 5000);
		});
});