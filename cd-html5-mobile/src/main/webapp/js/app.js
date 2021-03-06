/*
 * JBoss, Home of Professional Open Source
 * Copyright 2012, Red Hat, Inc., and individual contributors
 * by the @authors tag. See the copyright.txt in the distribution for a
 * full listing of individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*
Core JavaScript functionality for the application.  Performs the required
Restful calls, validates return values, and populates the member table.
 */

/* Get the member template */
function getMemberTemplate() {
    $.ajax({
        url: "tmpl/member.tmpl",
        dataType: "html",
        success: function( data ) {
            $( "head" ).append( data );
            updateMemberTable();
        }
    });
}
function getCdTemplate() {
    $.ajax({
        url: "tmpl/cd.tmpl",
        dataType: "html",
        success: function( data ) {
            $( "head" ).append( data );
            updateCdTable();
        }
    });
}

/* Builds the updated table for the member list */
function buildMemberRows(members) {
    return _.template( $( "#member-tmpl" ).html(), {"members": members});
}
/* Builds the updated table for the cd list */
function buildCdRows(cds) {
    return _.template( $( "#cd-tmpl" ).html(), {"cds": cds});
}
/* Uses JAX-RS GET to retrieve current member list */
function updateMemberTable() {
    $.ajax({
        url: "rest/members",
        cache: false,
        success: function(data) {
            $('#members').empty().append(buildMemberRows(data));
        },
        error: function(error) {
            //console.log("error updating table -" + error.status);
        }
    });
}
function updateCdTable() {
    $.ajax({
        url: "rest/cds",
        cache: false,
        success: function(data) {
            $('#cds').empty().append(buildCdRows(data));
        },
        error: function(error) {
            //console.log("error updating table -" + error.status);
        }
    });
}

function isValidModelInput(modelString){
	if(containsColon(modelString)){
		return false;
	}
	return true;
}

function containsColon(stringInput){
	if(stringInput.contains(';')){
		alert("does contain a ;");
		return true;
	}
	return false;
}

function startBeforeEnd(startDateTime, endDateTime){
	
}

$(document).ready(function() {
	$("#passwordRetype").keyup(validate);
});


function validate() {
	var password = $("#password").val();
	var passwordRetype = $("#passwordRetype").val();
	
	if(password == passwordRetype) {
		$("#validate-status").text("passwords match :)"); 
		document.getElementById("validate-status").style.color= "#14993E";
	}
	else {
		$("#validate-status").text("passwords don't match");  
		document.getElementById("validate-status").style.color= "#CC0000";
	}
}

/*
Attempts to register a new member using a JAX-RS POST.  The callbacks
the refresh the member table, or process JAX-RS response codes to update
the validation errors.
 */
function registerMember(memberData) {
    //clear existing  msgs
    $('span.invalid').remove();
    $('span.success').remove();

    $.ajax({
        url: 'rest/members',
        contentType: "application/json",
        dataType: "json",
        type: "POST",
        data: JSON.stringify(memberData),
        success: function(data) {
            //console.log("Member registered");

            //clear input fields
            $('#reg')[0].reset();

            //mark success on the registration form
            $('#formMsgs').append($('<span class="success">Member Registered</span>'));

            updateMemberTable();
        },
        error: function(error) {
            if ((error.status == 409) || (error.status == 400)) {
                //console.log("Validation error registering user!");

                var errorMsg = $.parseJSON(error.responseText);

                $.each(errorMsg, function(index, val) {
                    $('<span class="invalid">' + val + '</span>').insertAfter($('#' + index));
                });
            } else {
                //console.log("error - unknown server issue");
                $('#formMsgs').append($('<span class="invalid">Unknown server error</span>'));
            }
        }
    });
}
