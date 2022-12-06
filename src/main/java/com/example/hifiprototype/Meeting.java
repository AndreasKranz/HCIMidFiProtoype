package com.example.hifiprototype;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class Meeting {
    private static int counter = 0;

    private int id;

    private String meetingName;
    private String participants;
    private LocalDateTime meetDateTime;
    private LocalDateTime creationTime;
    private String location;
    private String description;
    private MeetingStatus meetingStatus;

    public Meeting() {
        this.id = counter + 1;
        meetingName = "";
        participants = "";
        meetDateTime = LocalDateTime.now();
        creationTime = LocalDateTime.now();
        location = "";
        description = "";
        meetingStatus = MeetingStatus.IN_VOTING;
    }

    public Meeting(int id,String meetingName, String participants, LocalDateTime meetDateTime,LocalDateTime creation, String location, String description, MeetingStatus meetingStatus) {
        this.id = id;
        this.meetingName = meetingName;
        this.participants = participants;
        this.meetDateTime = meetDateTime;
        this.creationTime = creation;
        this.location = location;
        this.description = description;
        this.meetingStatus = meetingStatus;
    }

    public Meeting(String meetingName, String participants, LocalDateTime meetDateTime,LocalDateTime creation, String location, String description, MeetingStatus meetingStatus) {
        this.id = counter + 1;
        this.meetingName = meetingName;
        this.participants = participants;
        this.meetDateTime = meetDateTime;
        this.creationTime = creation;
        this.location = location;
        this.description = description;
        this.meetingStatus = meetingStatus;
    }

    public String toCsvString() {
        return this.id + ";" + meetingName + ";" + participants + ";" + meetDateTime + ";" +  creationTime + ";" + location + ";" + description + ";" + meetingStatus;
    }
}
