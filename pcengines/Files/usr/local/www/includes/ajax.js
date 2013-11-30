$(document).ready(function() {
    // select all the links with class="lnk", when one of them is clicked, get its "href" value
    // load the content from that URL and check the "status" of the request
    // place the response or an error message into the tag with id="content"
    $('a.arrow').click(function() {
        var url = $(this).attr('href');
		$('#pagecontainer').hide();
        $('.loading').show();
        $('#pagecontainer').load(url, function(response, status, xhr) {
            // check the status, if "success", place the response into #content
            // else, if "error", define an error message and insert it into #content
            // else, display an Alert with the status
            if (status == 'success') {
                $('#pagecontainer').html(response);
            }
            else if (status == 'error') {
                var ermsg = '<i>There was an error: ' + xhr.status + ' ' + xhr.statusText + '</i>';
                $('#pagecontainer').html(ermsg);
            }
            else {
                alert(status);
            }
			$('.loading').hide();
			$('#pagecontainer').show();
		});
        return false;
	});
});
