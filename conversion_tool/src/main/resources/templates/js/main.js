$(document).ready(function(){
 		$( "#google" ).click(function() {
				$('.google, #submit_transofrm').show();
				$('.local').hide();
		});
 		$( "#local" ).click(function() {
				$('.google').hide();
				$('.local, #submit_transofrm').show();
		});

		$('#submit_transofrm').click(function() {
				if($('#google').is(':checked')) {
					$('#google-iframe').show();
				}
				$('.source, .google, .local, #submit_transofrm').hide();
				$('.success_notes').show();
		});
});