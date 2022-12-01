package com.example.midfiprototype;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class ChronosController {

    @Autowired
    ChronosService service;

    //ArrayList<Meeting> tempMeetings = new ArrayList<>();

    /*@PostMapping(value = "/createMeet", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createMeeting(@RequestBody MeetingDTO dto) {
        //tempMeetings.add(new Meeting(dto.getMeetingname(), dto.getParticipants(), dto.getMeetingTime(), LocalDateTime.now(), dto.getLocation(), dto.getDescription(), dto.getMeetingStatus()));

        //service.saveMeeting(tempMeetings);

        return ResponseEntity.status(HttpStatus.OK).body("Sucessfully saved new meeting!");
    }

    @PostMapping(value = "/editMeet", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> editMeeting(@RequestBody MeetingDTO dto) {

        //this.tempMeetings = service.editMeeting(tempMeetings, dto);

        return ResponseEntity.status(HttpStatus.OK).body("Sucessfully edited Meeting");
    }*/

    @RequestMapping(value = "")
    public String viewIndex() {
        //if (tempMeetings.size() == 0) {
       //     tempMeetings = service.loadMeetings();
        //}
        return "index";
    }

    @RequestMapping(value = "/index")
    public String viewIndex1() {
        //if (tempMeetings.size() == 0) {
        //    tempMeetings = service.loadMeetings();
        //}

        return "index";
    }

    @RequestMapping(value = "/timeform")
    public String retrieveFindByTime() {

        /*ArrayList<Meeting> meets = new ArrayList<>();
        meets.add(new Meeting("testname", "leute,haha", LocalDateTime.now(), LocalDateTime.now(), "important adress", "long text", MeetingStatus.IN_VOTING));


        service.saveMeeting(meets);*/
        return "findByTime";
    }

    @RequestMapping(value = "/locform")
    public String retrieveFindByLocation() {
        /*ArrayList<Meeting> meets1 = service.loadMeetings();

        System.out.println(meets1.toString());*/

        return "findByLocation";
    }

    @RequestMapping(value = "/vote")
    public String openVoting() {
        return "voting";
    }

    @RequestMapping(value = "/map")
    public String retrieveMap() {
        return "mapFragment";
    }

    @PostMapping(value = "/success")
    public String retrieveSucess() {
        return "invSent";
    }

    @GetMapping(value = "/searchResult")
    public String retrieveSearchResult() {
        return "keywordSearchResult";
    }

    @RequestMapping(value= "/details")
    public String details() {
        return "details";
    }

    @RequestMapping("/finished")
    public String getFinishedSchedules() {
        return "pastSchedules";
    }

}
