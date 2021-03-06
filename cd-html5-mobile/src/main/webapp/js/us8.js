//****************************User Story 8******************************//
    
	/*Pass start and end dateTimes into this function which is called from the submit when you enter start and end dateTimes*/
    function getUS08ResultTemplate(start,end, model) {
    	
        $.ajax({
            url: "tmpl/us08.tmpl",
            dataType: "html",
            success: function( data ) {
            	
                $( "head" ).append( data );
                updateUS08Table(start,end, model);
            }
        });
    }
    
    /* Uses JAX-RS GET to retrieve all imsi Numbers for start and end dateTimes*/
    function updateUS08Table(start,end, model) {

        $.ajax({
            url: "rest/supp/us08/"+start+"/"+end+"/"+model,
            type: "GET",
            cache: false,
            success: function(data) {
            	if (data.length < 1) {
                    $('#info').removeClass("hidden");
                    $('#hidden-container').addClass("hidden");
            		$('#info').empty().append("Information: The query between dates " + start + " and " + end + " has returned no results.");
					document.forms["us08Form"].reset();
            	} else {
            		$('#info').addClass("hidden");
                    $('#hidden-container').removeClass("hidden");
                    $('#results').empty().append(buildUS08ResultsRows(data));
                    document.forms["us08Form"].reset();
                }
            },
            error: function(error) {

            }
        });
    }

	/* Builds the updated table for the callfailures list */
	function buildUS08ResultsRows(obj) {
	    return _.template( $( "#us08-tmpl" ).html(), {"obj": obj});
	}