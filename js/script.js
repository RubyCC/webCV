function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

$(document).ready(function() {
/* add click event for tiles */
    $('#menu-container > div').click(function() {
        $('#menu-container > div:not(#' + this.id + ')').addClass('inactive');
        $('#' + this.id).removeClass('inactive');
        $('#content-container').load('common/' + this.id  + '.html', function(response, status, xhr) {
            if ( status == "error" ) {
                var msg = "Sorry but there was an error: ";
                $( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
            }
        });
    });
    
    
/* load jobs as primary content */
    $('#content-container').load('common/beruf.html', function(response, status, xhr) {
            if ( status == "error" ) {
                var msg = "Sorry but there was an error: ";
                $( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
            }
        });
    
    



});