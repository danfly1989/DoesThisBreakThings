package org.jboss.as.quickstarts.html5_mobile.rest;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import javax.ejb.Stateful;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.validation.Validator;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.jboss.as.quickstarts.html5_mobile.data.CallfailureRepository;
import org.jboss.as.quickstarts.html5_mobile.service.MemberRegistration;

import com.conygre.training.entities.query.UserStory09Structure;


@Path("/net")
@RequestScoped
@Stateful
public class NetworkManagementEngineerService {
    @Inject
    private Logger log;

    @Inject
    private Validator validator;

    @Inject
    private CallfailureRepository repository;

    @Inject
    MemberRegistration upload;
  
    
    // EXAMPLE METHOD - path consists of user story number and variable to send to query; can also use @QueryParam instead
    @GET
    @Path("/us09/{start}/{end}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<UserStory09Structure> findCauseCode_EventIDByIMSI(	@PathParam("start") String startString,
    																@PathParam("end") String endString) {
    	System.out.println("net mgmt");
    	Date startDateTime=null, endDateTime=null;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");      
		try {
		    startDateTime = sdf.parse(startString);
		    endDateTime = sdf.parse(endString);
		} catch (ParseException e) {
		    e.printStackTrace();
		}
    	List<UserStory09Structure> userStory09Structures = repository.findCountBetweenTimesTotalDuration(startDateTime, endDateTime);
        if (userStory09Structures == null) {
        	System.out.println("null ret");
        	return null;
        }
    	System.out.println("full ret");
        return userStory09Structures;
    }  
    
}